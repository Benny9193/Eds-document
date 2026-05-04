# Business Logic: `EDS`

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

EDS is the core K-12 cooperative procurement platform. It supports the full purchase lifecycle for participating school districts: building a shopping cart of vendor catalog items, routing that cart through a multi-level approval chain, converting approved carts into purchase orders, and tracking those POs through fulfillment. On the supply side, it maintains a vendor and catalog registry, runs competitive-bid solicitations, and awards contracts that flow back into the catalog as price entries.

The database stores roughly 440 tables under the `dbo` schema (no custom schemas other than `archive`). Naming conventions are consistent across the codebase: PKs follow the `{Table}Id` pattern, timestamps follow `Date{Action}` (`DateCreated`, `DateApproved`, `DateAwarded`), and soft-delete is always an `Active` (tinyint) or `IsActive` (bit) column rather than a hard delete. The `archive.*` schema holds cold-storage snapshots of historical tables with no indexes.

---

## Core Entities and Lifecycle

### District

A school district (or other public entity) is the top of the customer hierarchy. Every budget, user, approval chain, and price plan hangs from a `DistrictId`.

- **Created by:** `dbo.sp_AddDistrict` — inserts a `District` row, creates two or three sequential `Budgets` rows spanning the current and next fiscal year (Jul–Jun), and updates `SessionTable`.
- **Deactivated by:** the same procedure when `@pDistrictName` is blank — sets `District.Active = 0` without deleting.
- **Fiscal year:** `Budgets.StartDate` / `EndDate` use a Jul 1 – Jun 30 fiscal year. Two forward-years are always pre-created at district setup time. The `VisibleFrom` / `VisibleUntil` window controls when a budget is usable during requisition creation.

### User and Session

Every application interaction is authenticated through a session row. `dbo.sp_AttemptLogin` validates credentials against `Users`, `School`, and `District`, enforces `Users.Active = 1`, `School.Active = 1`, `District.Active = 1`, and `District.DisableLogins = 0`, then inserts a `SessionTable` row and calls `sp_SetDistrictAndBudgetYear` to attach the correct active budget. All downstream procedures receive `@pSessionId` and use it to look up the district, user, and budget context rather than re-authenticating.

### Requisition

A requisition is a buyer's purchase request (shopping cart). One header row in `Requisitions`; one row per item in `Detail`.

- **Created by:** `dbo.sp_CreateNewRequisition` — validates the session, selects the correct budget (respecting `EarlyAccess` flags and `DistrictCategories.AllowIncidentals`), then calls the helper `sp_NewRequisitionId` to insert the header. If the session has a cXML context (`CXmlSession`), account codes are copied in immediately.
- **Lines added:** directly into `Detail` by the application, or in bulk by `sp_BatchConvert` (for textbook batch orders).
- **Approved:** `dbo.sp_ApproveReq` — described in detail in [Workflows](#workflows-and-processes).
- **Converted to PO:** `dbo.sp_ConvertReqs` (batch) or `dbo.sp_CreatePO` (single). After conversion, `Detail` rows are snapshotted into `PODetailItems` — this snapshot is the contractual record and does not change if `Detail` is later edited.
- **Audit trail:** `RequisitionChangeLog` (header edits) and `DetailChangeLog` (line edits) are append-only.

### Purchase Order (PO)

`PO` is the converted, vendor-committed record. `POStatus` is a lookup table (`StatusCode`) that drives PO lifecycle state. `PODetailItems` is the immutable line-item snapshot.

### Vendor and Catalog

- **Vendors** — master supplier record. `Active` (tinyint) gates all downstream visibility.
- **Catalog** — a named container grouping `CrossRefs` entries for one vendor in one category. `Catalog.PostDate` is stamped when `Catalogs.dbo.sp_PostCatalog` completes.
- **CrossRefs** — the pricing table (~171M rows). Each row links a vendor part number to an `Items` master record with price and effective dates. This is the live price source for requisition lines.
- **Items** — the vendor-agnostic product master (~44M rows). Created automatically by `sp_PostCatalog` when a new product has no existing match.

### Bid Solicitation

- **BidHeaders** — one solicitation (RFP/IFB).
- **BidHeaderDetail** — per-line specifications (~123M rows). Always filter by `BidHeaderId`.
- **Bids** — one row per (bid, vendor) submission.
- **BidResults** — vendor's line-by-line price responses.
- **Awards** — winning vendor/price selections. Awarded prices re-enter the catalog via a vendor upload → `Catalogs` staging → `sp_PostCatalog` → `CrossRefs`.

---

## Workflows and Processes

### 1. Authentication

```
sp_AttemptLogin(@DistrictCode, @CometId, @UserName, @Password, ...)
  → validates Users/School/District (Active checks + DisableLogins)
  → INSERT SessionTable
  → sp_SetDistrictAndBudgetYear(@SessionId, 0, 0)
    → sets SessionTable.BudgetId to the active budget
```

### 2. Requisition Approval Chain

`dbo.sp_ApproveReq` drives the multi-level approval workflow. The procedure accepts a status code (`@pStatusCode`) that maps to a `StatusCode` character in `StatusTable`:

```
sp_ApproveReq(@pSessionId, @pRequisitionId, @pStatusCode)
  1. Validate session → get UserId, UserApprovalLevel, DistrictId, RequiredApprovalLevel
  2. Resolve @pStatusCode → StatusId in StatusTable
  3. Validate Requisition belongs to user's district
  4. Enforce zero-amount guard: RAISERROR if TotalRequisitionCost = 0
  5. If StatusCode = 'H' (Hold):
       → archive Approvals rows → ApprovalsHistory
       → DELETE from Approvals
       → UPDATE Requisitions.StatusId = HoldId
       → reset DateExported = null
  6. Else:
       → If UserApprovalLevel >= RequiredApprovalLevel AND StatusCode='A':
           → UPDATE Requisitions.StatusId = AtEDSId (status 'I', inhouse)
       → If UserApprovalLevel >= 5 AND StatusCode='A':
           → UPDATE Requisitions.StatusId = 'I' (at EDS)
       → If UserApprovalLevel >= 5 AND StatusCode='O':
           → UPDATE Requisitions.StatusId = 'O' (PO printed)
       → Else: UPDATE Requisitions.StatusId = PendingId ('P')
       → INSERT or UPDATE Approvals row at the user's level
```

Key guards:
- Cannot approve a requisition that already has POs (`PO` count > 0).
- A lower-level approver cannot override a higher-level approval (`UserApprovalLevel < 5`).
- Status codes 27 or 29 ("Ready to Bid", "Out to Bid") block normal approval flow.
- Status 4 (Rejected) also blocks approval.

### 3. Requisition → PO Conversion

```
sp_ConvertReqs(@pSessionId, @pRSId)
  1. Verify requisition totals match vw_RequisitionShippingCosts (guard against mismatch)
  2. For each RequisitionId in ReportSessionLinks:
       sp_CreatePO(@pSessionId, @ReqId)
  3. sp_RefreshDistrictVendors(@DistrictId)
```

`sp_CreatePO` (not shown in full) inserts the `PO` header and snapshots `Detail` lines into `PODetailItems`.

### 4. Textbook Batch Ordering

```
sp_BatchConvert(@pSessionId, @pBatchId)
  → For each BatchBook (district/category/user grouping in the batch):
      sp_NewRequisitionId → creates Requisitions header
      INSERT Detail (from BatchDetail lines)
      De-duplicate Detail lines (temp table pattern)
      INSERT Approvals with StatusCode='J' (Converted)
  → UPDATE LastYearsQuantity from prior-year data
  → UPDATE Batches.Converted = getdate()
  → UPDATE TaskSchedule.EndDateActual
```

Textbook batches produce requisitions pre-stamped as "Converted" (status `J`) — they skip the normal approval queue.

### 5. Bid Award

Single-vendor (legacy) award:

```
sp_AwardBid(@pBidId)
  → Compute item count + amount from BidItems
  → INSERT or reuse Awards row (Active=1)
  → UPDATE BidItems.AwardId
  → INSERT DistrictVendor if not already present
```

Full bid-header award:

```
sp_AwardBidHeader(@pBidHeaderId)
  → Operates across BidHeaders, BidResults, BidRequestItems, BidMappedItems
  → Creates CrossRefs entries, inserts Awards rows, updates Catalog
  → ~30 dependent tables (see procedure doc for full dependency list)
```

### 6. Catalog Import and Posting

```
EDS: sp_CatalogImport(@pFileName, @pCatalogId, @pXmlFieldMap, @pXML)
  → INSERT Catalogs.dbo.CatalogXML

Catalogs: sp_PostCatalog(@pCatalogId)
  1. Fill blank UniqueItemNumber (uf_PackCodeCatalog)
  2. Deduplicate Master Catalog rows (same item/price/description/unit)
  3. RAISERROR if unresolved duplicates remain
  4. INSERT EDS.dbo.PostCatalogHeader (audit start)
  5. Match existing Items (by UniqueItemNumber via prior vendor catalogs)
  6. INSERT missing Units into EDS.dbo.Units
  7. INSERT missing Headings into EDS.dbo.Headings
  8. INSERT missing Items into EDS.dbo.Items
  9. INSERT missing CrossRefs into EDS.dbo.CrossRefs (generic + catalog-specific)
  10. UPDATE CrossRefs prices/metadata from Master Catalog
  11. UPDATE EDS.dbo.Catalog.PostDate
  12. UPDATE EDS.dbo.PostCatalogHeader.PostDateComplete (audit end)
```

`ImportFormat` (values 0–5) controls matching strategy. Modes 4 and 5 match by `UniqueItemNumber`; older modes match by `PackedCode`. Each major step logs a row to `EDS.dbo.PostCatalogDetail`.

---

## Business Rules

### Zero-Amount Requisition Guard

```sql
-- from sp_ApproveReq
if ISNULL(@Amount,0) = 0
begin
  RAISERROR('Cannot approve a requisition with a zero amount.',16,1)
  RETURN
end
```

A requisition with zero total cost cannot advance through the approval chain.

### PO Existence Blocks Status Changes

```sql
-- from sp_ApproveReq
if @POCount > 0
begin
  RAISERROR('Requisition %s has POs. It''s status cannot be changed.',16,1,@RequisitionNumber)
  RETURN
end
```

Once a PO exists for a requisition, the requisition's status is frozen.

### Approval Level Hierarchy

Only an approver at level 5 or above can override a higher-level approval. District's `RequiredApprovalLevel` determines when "Approved" status is reached:

```sql
if @UserApprovalLevel < 5 and @CurrentApprovalLevel > @UserApprovalLevel
begin
  RAISERROR('Requisition %s has been processed by a higher authority...',16,1,@RequisitionNumber)
  RETURN
end
```

### Active Flag Pattern

Three tables use `Active` (tinyint 0/1) as a soft-delete and visibility gate:
- `Vendors.Active` — gates all catalog and bid-response visibility system-wide.
- `District.Active` — gates login (`sp_AttemptLogin` checks `District.Active = 1`).
- `Users.Active` — gates login.
- `CrossRefs.Active` — gates price visibility to buyers.
- `Catalog.Active`, `Items.Active`, `Headings.Active` — similar pattern throughout.

### Duplicate-Resolution Guard in Catalog Posting

```sql
If Exists (
  SELECT UniqueItemNumber, count(*)
  FROM [Catalogs].[dbo].[Master Catalog]
  where catalogid = @CatalogId
  group by UniqueItemNumber having count(*) > 1
)
BEGIN
  RAISERROR('Unresolved duplicates were found, process cancelled.',16,1)
  return
END
```

Catalog posting is an all-or-nothing operation: if any item remains with a duplicate `UniqueItemNumber` after the deduplication pass, the entire post is aborted.

### DistrictCode Uniqueness

```sql
-- from sp_AddDistrict
select DistrictId from District where DistrictCode = @pDistrictCode
if @@rowcount > 0
begin
  select @pDistrictCode = null
end
```

`DistrictCode` is unique; a duplicate silently nullifies it rather than raising an error. *(Open question: see below.)*

### Budget Budget-Year Window

```sql
-- from sp_CreateNewRequisition
and GETDATE() between
  case when (Users.AllowEarlyAccess = 1 or Users.ApprovalLevel > 1)
            and DistrictCategories.EarlyAccess = 1
       then coalesce(Budgets.EarlyAccess, Budgets.VisibleFrom)
  end
  and Budgets.VisibleUntil
```

Early-access users (high approval level or `AllowEarlyAccess = 1`) can shop against a budget before its `VisibleFrom` date, using `Budgets.EarlyAccess` as the earlier gate.

---

## Status and State Machines

### Requisition Status (`StatusTable`)

`Requisitions.StatusId` references `StatusTable`. The following status codes are directly referenced in procedure logic:

| StatusCode | Description (inferred from code) | Key transitions |
|------------|----------------------------------|-----------------|
| `H` | Hold (default initial state) | Approval step sets to Hold; `DateExported` reset |
| `P` | Pending (awaiting next approver) | Approval below required level |
| `E` | Changes Requested | *(referenced in variable but not traced in sp_ApproveReq branch)* |
| `A` | Approved | Approval level >= RequiredApprovalLevel |
| `I` | At EDS / Inhouse | ApprovalLevel >= 5 and Approved |
| `O` | PO Printed | ApprovalLevel >= 5 and PO printed |
| `J` | Converted (Batch) | Batch conversion stamp |
| `M` | Manually Processed | Admin override; inserts Approvals with StatusId=45 |
| `4` | Rejected | Blocks further approval |
| `27` | Ready to Bid | Blocks approval flow |
| `29` | Out to Bid | Blocks approval flow |

*Note: StatusId values 4, 27, 29, and 45 are used as raw integers in procedure logic, not via `StatusCode`. The mapping between integer and code must be confirmed from `StatusTable` data.*

State machine (simplified):

```
[Created/Hold H]
    │
    ▼ sp_ApproveReq (ApprovalLevel < RequiredApprovalLevel)
[Pending P]
    │
    ▼ sp_ApproveReq (ApprovalLevel >= RequiredApprovalLevel)
[Approved A]
    │
    ▼ (ApprovalLevel >= 5)
[At EDS I] → [PO Printed O] → sp_ConvertReqs → PO created
    │
    ▼ admin
[Manually Processed (StatusId 45)]

Any state ← sp_ApproveReq(H) ← [Hold H]  (moves history to ApprovalsHistory)
```

### Vendor Bid Status (VendorBids journal)

`vendorbidsjournal.StatusId`:
- `1` = In progress / draft (inferred)
- `2` = Submitted (`sp_SubmitBid` inserts a row with `StatusId = 2`)

---

## Computed and Derived Data

### OrderBookDetail

`OrderBookDetail` is an aggregated reporting fact table populated by `sp_CreateOrderBook` (and variants `sp_CreateOrderBook03`, `sp_CreateOrderBookTest`). It is fed from completed `PODetailItems` and drives spend reporting. The prior-format archive is `OrderBookDetailOld` (~187M rows, read-only).

### ReportSession / ReportSessionLinks

Report runs are persisted in `ReportSession`; result-set row handles are stored in `ReportSessionLinks`. `sp_ConvertReqs` uses `ReportSessionLinks` as the source list of requisitions to convert — meaning conversion is triggered from within a saved report session.

### PostCatalogHeader / PostCatalogDetail

Each `sp_PostCatalog` run creates a `PostCatalogHeader` audit row and appends `PostCatalogDetail` rows recording the count of affected objects at each step (match existing cross-refs, insert items, insert cross-refs, etc.). This is the only persistent operation log for catalog posting.

### PendingApprovals

`PendingApprovals` is the live approver work queue (one row per requisition-approver pair awaiting action). Rows are deleted as approvers act; `Approvals` retains the permanent audit trail. `ApprovalsHistory` is a further archive of deleted `Approvals` rows.

---

## Cross-Database Touchpoints

EDS has outbound references to five other databases on the same server.

| Target DB | Edges | Primary purpose |
|-----------|-------|-----------------|
| `Catalogs` | 5 | Writes XML data to staging (`CatalogXML`, `CatalogImports`); reads `Master Catalog` during unpost |
| `Documents` | 222 | Reads/writes vendor bid documents, RTK documents, SDS documents via ~20 EDS views |
| `ContentCentral` | 68 | Reads scanned-document metadata for RTK and chemical-safety lookups |
| `VendorBids` | 51 | Reads vendor bid responses, calendars, and submission data for bid-management views |
| `NJ_RTK` | 16 | Reads RTK site data (`EDS.dbo.RTK_Sites`) from NJ_RTK procedures |

See [`docs/dependencies/EDS/outbound.md`](../dependencies/EDS/outbound.md) for the full per-routine edge list.

EDS is also an inbound target: `Catalogs.dbo.sp_PostCatalog` makes extensive cross-database writes into `EDS.dbo.Items`, `EDS.dbo.CrossRefs`, `EDS.dbo.Units`, `EDS.dbo.Headings`, `EDS.dbo.Catalog`, and `EDS.dbo.PostCatalogHeader/Detail`.

---

## Open Questions and Ambiguities

1. **StatusId raw integers in `sp_ApproveReq`.** The procedure uses `StatusId = 4` (Rejected), `StatusId = 27` (Ready to Bid), `StatusId = 29` (Out to Bid), and `StatusId = 45` (Manually Processed) as magic numbers without looking them up from `StatusTable`. A human reviewer should confirm these IDs are stable and document the full `StatusTable` contents.

2. **Silent DistrictCode nullification.** When a duplicate `DistrictCode` is detected in `sp_AddDistrict`, the code sets `@pDistrictCode = null` and proceeds with the insert rather than raising an error. Whether this is intentional or a legacy bug is unclear.

3. **`sp_NewRequisitionId` is unresolved** in dependency scans — it is called by `sp_CreateNewRequisition`, `sp_BatchConvert`, and likely others, but its definition was not captured in `docs/procedures/EDS/`. It presumably generates the `RequisitionNumber` sequence. Its logic (sequential per district? per budget year?) should be documented.

4. **`sp_CreatePO` full definition** was not read during this pass. It is the central conversion procedure and its full logic (what fields are copied to `PO` and `PODetailItems`, whether it validates anything) warrants explicit documentation.

5. **Online vs. offline district flow.** `sp_ApproveReq` checks `DistrictTypes.UsesOnline` and short-circuits approval for online districts when status is Hold. The exact intended behavior is not obvious from the code alone.

6. **`uf_LookupItems` and `uf_LookupPriceByReq`** — commented-out code in `sp_BatchConvert` references a `EDSIQWebUser.uf_LookupItems` cross-server function. This implies a former linked-server dependency. Current production path uses direct `Detail` inserts instead.

---

## Source Queries

This document was synthesized from the following artifact sources — no additional live queries were executed:

| Source | Used for |
|--------|----------|
| `docs/procedures/EDS/*.md` | Procedure definitions, parameters, and dependency lists |
| `docs/tables/EDS/README.md` | Table list, row counts |
| `docs/dependencies/EDS/outbound.md` | Cross-database reference edges |
| `EDS_GUIDE.md` | Domain layout, table descriptions, row counts |
| `SCHEMA.md` | Cross-database dependency matrix |
