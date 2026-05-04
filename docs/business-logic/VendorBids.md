# Business Logic: `VendorBids`

_Generated: 2026-05-04_

**Server:** `eds-sqlserver.eastus2.cloudapp.azure.com`

[← back to business-logic index](README.md)

---

## Table of Contents

1. [Domain Summary](#domain-summary)
2. [Core Entities and Lifecycle](#core-entities-and-lifecycle)
3. [Workflows and Processes](#workflows-and-processes)
4. [Business Rules](#business-rules)
5. [Status and State Machines](#status-and-state-machines)
6. [Computed and Derived Data](#computed-and-derived-data)
7. [Cross-Database Touchpoints](#cross-database-touchpoints)
8. [Open Questions and Ambiguities](#open-questions-and-ambiguities)
9. [Source Queries](#source-queries)

---

## Domain Summary

VendorBids is the vendor-facing bid response portal. It is the counterpart to EDS's buyer-side bid solicitation tables. Vendors registered for a bid open the portal, download bid item spreadsheets, fill in their prices and catalog references, and upload or directly submit their responses. The database manages vendor registration per bid, the encrypted item-price journal, document uploads, and the bid lifecycle from open through submitted.

The database has 64 tables under `dbo`. Naming conventions differ from EDS: table and column names are predominantly lowercase (`vendorbids`, `bidcalendar`, `registrations`), and a journal pattern is used pervasively — every mutable entity has a companion `*journal` table that records every state change with a session reference and timestamp. Prices and sensitive bid data are stored encrypted using SQL Server's `EncryptByPassPhrase` / `DecryptByPassPhrase` cell-level encryption.

---

## Core Entities and Lifecycle

### BidCalendar

`bidcalendar` is the central bid event record. Each row represents one bid solicitation's scheduling in the vendor portal. Key columns include open/close dates and flags that control submission rules (`requirevendoritemcode`, `requireitemsperunit`, `requirepagenumber`). `bidcalendaritems` (~1.66M rows) holds the line items associated with each calendar.

### Registrations and Vendor Sessions

Vendors register for individual bids through `registrations`. Each registered vendor can then create a `vendorbids` header and enter prices. `vendorsessions` tracks authenticated vendor portal sessions analogously to EDS's `SessionTable`.

### VendorBid and VendorBidItems

- `vendorbids` — one row per (registration, calendar) vendor submission header.
- `vendorbiditems` (~24.5M rows) — one row per bid item that the vendor can price.
- `vendorbiditems_Orig` (~20M rows) — archive snapshot of the original items before any edits.
- `vendorbiditemsjournal` (~5.3M rows) — every write to `vendorbiditems` is journaled here with session and timestamp. Encrypted columns are re-encrypted with the item's own key (using `vendorBidItemId` as the associated data).

### Document Uploads and Acknowledgements

`biddocuments` (~175K rows) holds documents associated with a bid. `DocumentUploads` (~144K rows) is the vendor document upload log. `biddocumentacks` and `BidDocumentLog` track which vendors have acknowledged and downloaded bid documents.

---

## Workflows and Processes

### 1. Vendor Registration for a Bid

```
sp_CreateVendorSession(@registrationId, @calendarId, ...) [inferred]
  → INSERT vendorsessions
  → Returns session context

sp_NewVendorBid(@registrationId, @calendarId, @sessionId)
  → Validates registration is active
  → INSERT vendorbids header
  → INSERT vendorbiditems (one row per bidcalendaritem for this calendar)
  → INSERT vendorbidsjournal (initial draft status)
```

### 2. Bid Item Price Entry (via File Upload)

```
sp_VBUploadXML(@vendorBidId, @passPhrase, @xml, ...)
  → Parses XML payload
  → INSERT vendorbidimports header
  → INSERT vendorbiditemimports (one row per item with encrypted fields)

sp_ProcessBid(@vendorBidImportId, @passPhrase)
  1. Reset ImportStatus = null for all import rows
  2. Validate ItemBidType: must be '', 'A', 'C', or 'N' (after decrypt)
  3. Validate required fields per bidcalendar flags:
       - VendorItemCode (if requirevendoritemcode = 1)
       - ItemsPerUnit   (if requireitemsperunit = 1)
       - PageNumber     (if requirepagenumber = 1)
  4. Validate AlternateDescription present when ItemBidType in ('C', 'N')
  5. If all validations pass (ImportStatus IS NULL):
       INSERT vendorbiditemsjournal:
         - Re-encrypts each field from import key (BidRequestItemId) → item key (vendorBidItemId)
         - Fields: itemBidType, unitPrice, cost (qty × price), vendorItemCode,
                   quantityBid, alternate, itemsPerUnit, pageNo
  6. Returns 'OK' or 'Errors in Import'
```

**Encryption pattern:** All price and identity fields in `vendorbiditemimports` are encrypted with a passphrase keyed to the `BidRequestItemId`. After import validation, `sp_ProcessBid` re-encrypts them into `vendorbiditemsjournal` keyed to the `vendorBidItemId`. This ensures each table's ciphertext is bound to its own row's identity.

### 3. Bid Submission

```
sp_SubmitBid(@registrationId, @calendarId, @vendorBidId, @sessionId, @override)
  1. Look up latest journal entry for @vendorBidId
  2. Check if StatusId = 2 (Already Submitted):
       - If @override != 1: return error message with prior submitter and timestamp
       - If @override = 1: proceed anyway
  3. INSERT vendorbidsjournal with StatusId = 2 (copies header fields from latest entry)
  4. Returns 'OK' (0) or error string (1)
```

Submission is idempotent if `@override = 1` is supplied — an admin can re-submit on behalf of a vendor without changing any item data, only updating the submission timestamp.

### 4. Bid Import from EDS

```
sp_ImportBid(@calendarId, ...)
  → Creates the bidcalendar record on the VendorBids side from EDS bid header data

sp_ImportBidItem(@calendarId, @bidRequestItemId, ...)
  → Inserts bidcalendaritems rows

sp_CreateBidJournalEntry / sp_createBidItemsJournalEntry
  → Append journal rows for bid header and item changes
```

### 5. Bid Deletion and Undeletion

```
sp_DeleteBid(@vendorBidId)
  → Soft-delete: marks vendorbids.active = 0 (inferred from naming)
  → Appends journal entry

sp_UnDeleteBid(@vendorBidId)
  → Reverses deletion
```

---

## Business Rules

### Submission Idempotency Guard

```sql
-- from sp_SubmitBid
if isnull(@CurrentStatus,0) = 2
begin
  if isnull(@override,0) != 1
  begin
    select @status as [status]   -- returns 'Already Submitted by <user> at <time>'
    return 1
  end
end
```

A bid can only be submitted once unless an explicit override is supplied. The error message includes the identity of the prior submitter and the submission timestamp.

### Import Validation Rules (from sp_ProcessBid)

Each uploaded row must pass all of the following before being accepted into the journal:

| Rule | Condition |
|------|-----------|
| ItemBidType value | Must be `''`, `'A'` (Award), `'C'` (Catalog), or `'N'` (No Bid) |
| ItemBidType presence | If any price/code fields are filled, ItemBidType cannot be blank |
| AlternateDescription | Required when ItemBidType is `'C'` or `'N'` |
| VendorItemCode | Required if `bidcalendar.requirevendoritemcode = 1` |
| ItemsPerUnit | Required if `bidcalendar.requireitemsperunit = 1` |
| PageNumber | Required if `bidcalendar.requirepagenumber = 1` |

Validation errors are accumulated in `ImportStatus` using `coalesce(ImportStatus + '<br>', '') + '<error>'` — so a single row can carry multiple HTML-formatted error messages.

### Per-Bid Required Field Configuration

Each `bidcalendar` row has three flags that the bid administrator sets when creating the bid:
- `requirevendoritemcode` (bit)
- `requireitemsperunit` (bit)
- `requirepagenumber` (bit)

These are enforced during import processing, making each bid's validation rules configurable without code changes.

---

## Status and State Machines

### VendorBid Submission Status (`vendorbidsjournal.StatusId`)

The journal is append-only; the current state is the latest row.

| StatusId | Meaning | Set by |
|----------|---------|--------|
| `1` | Draft / In Progress | `sp_NewVendorBid` (inferred) |
| `2` | Submitted | `sp_SubmitBid` |

*Note: `statustable` in VendorBids has only 2 rows, consistent with this two-state model.*

### Import Item Status (`vendorbiditemimports.ImportStatus`)

| Value | Meaning |
|-------|---------|
| `NULL` | Valid — eligible for journal insertion |
| `'Invalid Item Bid Type'` | Unrecognized bid type after decryption |
| `'Missing Item Bid Type'` | Fields present but bid type blank |
| `'Alternate Description missing'` | Required for C/N types |
| `'Vendor Item Code missing'` | Required by calendar config |
| `'Items Per Unit missing'` | Required by calendar config |
| `'Page Number missing'` | Required by calendar config |

Multiple errors are concatenated with `<br>`.

---

## Computed and Derived Data

### MSRP / List-Price Responses

`VendorBidMSRPResults` and `VendorBidMSRPResultsJournal` (~141K rows each) capture MSRP-based bid responses. `VendorBidMSRPPriceRanges` (~537K rows) holds the price-range brackets. These tables are separate from the per-item `vendorbiditems` flow, likely used for discount-rate bids where vendors quote a percentage off list rather than a unit price.

### VendorBidTMAnswers

`VendorBidTMAnswers` and `VendorBidTMAnswersJournal` (~696K rows each) capture vendor answers to terms/conditions and attribute questions — analogous to `EDS.dbo.BidAnswers`. Every answer row is journaled.

### DownloadLog and VendorEmailLog

`DownloadLog` (~426K rows) records every bid document download. `VendorEmailLog` (~804K rows) records outbound email notifications. Neither is a business-logic driver — both are audit/compliance records.

---

## Cross-Database Touchpoints

VendorBids is primarily a write target from EDS (via 51 outbound edges from EDS views and procedures) and from `EDS_TEST_Old` (20 edges from 7 views).

| Inbound source | Edges | Purpose |
|----------------|-------|---------|
| `EDS` | 51 | Bid-manager views read registration, calendar, and submission data |
| `EDS_TEST_Old` | 20 | Mirrors of EDS bid-management views for the test environment |

VendorBids does not make outbound cross-database calls in its own procedures.

See [`docs/dependencies/VendorBids/inbound.md`](../dependencies/VendorBids/inbound.md) for the full edge list.

---

## Open Questions and Ambiguities

1. **Encryption passphrase management.** All price data is encrypted with `EncryptByPassPhrase`. The passphrase is passed as `@passPhrase varchar(255)` to every procedure that accesses encrypted columns. The passphrase origin (application config, environment variable, etc.) is not visible in the database. A data-breach or passphrase rotation would require re-encrypting all journal rows.

2. **`sp_VBUpload` vs `sp_VBUploadXML` vs `sp_VBUploadXMLSaved`.** Three upload paths exist; the differences between them (format, validation, save-vs-submit) are not fully traced here. *(Inferred from naming: XMLSaved may allow saving a draft without submitting.)*

3. **`vendorbiditems_Orig` population.** How and when rows are copied to the `_Orig` archive is not clear from the procedures examined. It may be populated by a batch job or the `sp_ImportBid` path.

4. **`regcalendar` vs `bidcalendar` relationship.** `regcalendar` (~631K rows) and `bidcalendar` (~6.7K rows) appear to be distinct entities. The registration calendar's relationship to the bid calendar is not fully traced here.

5. **`TransmitLog` purpose.** `TransmitLog` (~5.9K rows) with a `trantypes` lookup (3 rows) likely records system-to-EDS data transmissions, but the exact trigger and content are not documented.

---

## Source Queries

This document was synthesized from the following artifact sources — no additional live queries were executed:

| Source | Used for |
|--------|----------|
| `docs/procedures/VendorBids/*.md` | Procedure definitions, parameters, dependency lists |
| `docs/tables/VendorBids/README.md` | Table list, row counts |
| `docs/dependencies/VendorBids/inbound.md` | Cross-database reference edges |
| `SCHEMA.md` | Cross-database dependency matrix |
