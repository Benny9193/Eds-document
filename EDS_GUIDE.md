# EDS Database — Curated Guide

_Generated on 2026-05-04 from descriptions.json_

This is a hand-curated tour of the most load-bearing tables in the **EDS** production database (~440 base tables total — this guide covers the 37 that most operational and analytical work touches).

For full structural metadata (every column, every FK, every index) of any table, follow its link to the auto-generated per-table page under `docs/tables/EDS/`.

## Contents

- [Procurement chain](#procurement-chain)
- [Vendors and catalog](#vendors-and-catalog)
- [Bidding and awards](#bidding-and-awards)
- [Customer hierarchy](#customer-hierarchy)
- [Budget and pricing controls](#budget-and-pricing-controls)
- [Audit and reporting](#audit-and-reporting)

## Procurement chain

The core operational workflow: a buyer creates a requisition, lines move through approvals, and on final approval a purchase order is issued to the vendor.

**Flow:** `Requisitions → Detail → Approvals/PendingApprovals → PO → PODetailItems`

| Table | Rows | Description |
|-------|------|-------------|
| [`dbo.Requisitions`](docs/tables/EDS/dbo.Requisitions.md) | ~2.2M | Header record for every purchase request created in EDS. One row per requisition; line items live in `Detail`. Drives the approval workflow that ultimately produces a PO. Belongs to a District and originating User. |
| [`dbo.Detail`](docs/tables/EDS/dbo.Detail.md) | ~32.6M | Line items for both requisitions and purchase orders — ~30M rows, the largest transactional table in the procurement chain. Each row links back to its `Requisitions` (and after conversion, to its `PO`) and references either a vendor catalog item via `CrossRefs` or a free-text entry. Pricing, quantities, and account distribution all live here. |
| [`dbo.Approvals`](docs/tables/EDS/dbo.Approvals.md) | ~8.0M | Per-step approval audit trail (~8M rows). Records who approved or rejected each requisition at each level of the district's approval chain, with timestamp and any comment. Combined with `PendingApprovals` to drive the queue an approver sees in the UI. |
| [`dbo.PendingApprovals`](docs/tables/EDS/dbo.PendingApprovals.md) | ~585K | Active work queue — one row per (requisition, approver) pair currently awaiting action. Rows are deleted as approvers act; historical record is preserved in `Approvals`. |
| [`dbo.PO`](docs/tables/EDS/dbo.PO.md) | ~2.5M | Purchase order header (~2.5M rows). Created when a requisition reaches final approval and is converted. One PO has many `PODetailItems` lines and references the originating `Requisitions` row 1:1. |
| [`dbo.PODetailItems`](docs/tables/EDS/dbo.PODetailItems.md) | ~24.5M | PO line-item detail (~24.5M rows). Snapshot of item, quantity, unit price, and account split at the moment of PO issuance. Independent from `Detail` — Detail can change after PO issuance, PODetailItems is the immutable contractual record. |
| [`dbo.POStatus`](docs/tables/EDS/dbo.POStatus.md) | ~413K | Lookup table of PO lifecycle states (open, partial, received, closed, voided, etc.) joined to `PO` via status code. |
| [`dbo.RequisitionChangeLog`](docs/tables/EDS/dbo.RequisitionChangeLog.md) | ~1.9M | Append-only audit log of edits to requisition headers and lines (~1.9M rows). Captures field-level before/after values with user and timestamp. Used for the requisition history view. |
| [`dbo.DetailChangeLog`](docs/tables/EDS/dbo.DetailChangeLog.md) | ~2.9M | Append-only audit log of edits to `Detail` rows (~2.9M rows). Same structure as `RequisitionChangeLog` but scoped to line items. |

## Vendors and catalog

Suppliers, the catalogs they publish, and the per-item price/availability rows that buyers actually shop against.

**Flow:** `Vendors → VendorContacts / VendorUploads → Catalog → CrossRefs → Items → Category / Manufacturers`

| Table | Rows | Description |
|-------|------|-------------|
| [`dbo.Vendors`](docs/tables/EDS/dbo.Vendors.md) | ~19K | Master vendor record — supplier directory for the whole platform (~19K rows). One row per vendor company. The `Active` column (tinyint) gates whether a vendor's catalogs and bid responses are visible to buyers; mutating it has system-wide effect. |
| [`dbo.VendorContacts`](docs/tables/EDS/dbo.VendorContacts.md) | ~24K | Named contacts (sales reps, AP contacts, etc.) attached to a vendor. Used for PO routing, bid notifications, and dispute correspondence. |
| [`dbo.VendorUploads`](docs/tables/EDS/dbo.VendorUploads.md) | ~1.5M | Log of every vendor catalog or pricing file submitted (~1.5M rows). Tracks file name, vendor, upload type, status, and the eventual import result. Direct writes to `CrossRefs` should always trace back to a row here. |
| [`dbo.Catalog`](docs/tables/EDS/dbo.Catalog.md) | ~4K | Vendor-published catalog — a named container that groups a set of `CrossRefs` entries (~4K rows). One vendor may publish multiple catalogs (e.g., per product line or per bid award). |
| [`dbo.CrossRefs`](docs/tables/EDS/dbo.CrossRefs.md) | ~171.7M | Vendor-item cross-reference (~171M rows — by far the hottest table in EDS). Maps a vendor's part number to an EDS `Items` master record with vendor-specific price, pack size, and effective dates. This is where pricing actually lives. Always filter or `TOP n` when querying — full scans are catastrophic. |
| [`dbo.Items`](docs/tables/EDS/dbo.Items.md) | ~44.0M | Master product catalog (~44M rows) — normalized, vendor-agnostic items that vendor offerings link to via `CrossRefs`. Categorized by `Category` and (where applicable) attributed to a `Manufacturers` record. |
| [`dbo.Category`](docs/tables/EDS/dbo.Category.md) | 134 | Top-level product taxonomy (~134 rows). Small, stable lookup — used for browse, reporting rollups, and price-plan scoping. |
| [`dbo.Manufacturers`](docs/tables/EDS/dbo.Manufacturers.md) | ~9K | Manufacturer/brand directory (~9K rows). Note the legacy column spelling `Manufacturor` appears in some related tables — see quirks reference. Items reference a manufacturer; vendors do not. |

## Bidding and awards

Cooperative procurement: solicit prices from many vendors, collect their responses, and pick winners. Awarded prices typically flow back into the catalog as a vendor upload.

**Flow:** `BidHeaders → BidHeaderDetail / BidRequestItems → Bids → BidResults → Awards`

| Table | Rows | Description |
|-------|------|-------------|
| [`dbo.BidHeaders`](docs/tables/EDS/dbo.BidHeaders.md) | ~10K | Bid solicitation header (~9.6K rows). One row per RFP/IFB/cooperative bid issued to vendors. Drives the bid-response window and ultimately produces `Awards`. |
| [`dbo.BidHeaderDetail`](docs/tables/EDS/dbo.BidHeaderDetail.md) | ~123.8M | Per-line bid specifications (~123M rows — second-largest table in EDS). Holds the items, specs, and quantities a bid is asking vendors to price. Always filter by `BidHeaderId` before any analytical work. |
| [`dbo.BidRequestItems`](docs/tables/EDS/dbo.BidRequestItems.md) | ~27.9M | Items the bid is asking about (~27.9M rows) — paired with `BidHeaderDetail` to define the buy. Vendor responses to these line items land in `BidResults`. |
| [`dbo.BidItems`](docs/tables/EDS/dbo.BidItems.md) | ~27.5M | Master list of items eligible to appear on bids (~27.5M rows). Distinct from `BidRequestItems` (request-time snapshot) — this is the catalog side. |
| [`dbo.Bids`](docs/tables/EDS/dbo.Bids.md) | ~147K | Vendor bid response header (~147K rows). One row per (bid, vendor) submission, indicating intent to respond and submission status. Line-by-line responses are in `BidResults`. |
| [`dbo.BidResults`](docs/tables/EDS/dbo.BidResults.md) | ~33.2M | Vendor line-item bid responses (~33.2M rows) — the prices, lead times, and notes a vendor submitted for each `BidRequestItems` line they chose to bid on. |
| [`dbo.Awards`](docs/tables/EDS/dbo.Awards.md) | ~139K | Bid award outcomes (~139K rows). Records which vendor's `BidResults` were chosen for each awarded line, including award date and award type. Awarded prices typically flow back into `CrossRefs` via a vendor catalog upload. |
| [`dbo.BidAnswers`](docs/tables/EDS/dbo.BidAnswers.md) | ~553K | Vendor responses to non-pricing bid questions (~552K rows) — terms, certifications, attribute confirmations. |

## Customer hierarchy

The school-district customer model. Effectively static — bulk changes propagate everywhere, so treat with care.

**Flow:** `District → School → Users → UserAccounts`

| Table | Rows | Description |
|-------|------|-------------|
| [`dbo.District`](docs/tables/EDS/dbo.District.md) | 979 | Master record for a participating school district or other public entity (~979 rows). Top of the customer hierarchy. Budgets, approval chains, and price plans attach here. Treat as effectively static — bulk changes propagate everywhere. |
| [`dbo.School`](docs/tables/EDS/dbo.School.md) | ~7K | Schools/buildings beneath a district (~6.6K rows). Used for ship-to address and reporting rollups; not a security boundary. |
| [`dbo.Users`](docs/tables/EDS/dbo.Users.md) | ~346K | Master user directory (~345K rows) — every person with login or named-recipient status across all districts. `Active` flag controls login eligibility; deletion is rare (audit references). |
| [`dbo.UserAccounts`](docs/tables/EDS/dbo.UserAccounts.md) | ~3.4M | Per-user budget account permissions (~3.4M rows). Joins users to the `BudgetAccounts` they're allowed to charge against. Drives the account dropdown shown when building a requisition. |

## Budget and pricing controls

Where money comes from (budget accounts) and what each district sees at what price (price plans).

| Table | Rows | Description |
|-------|------|-------------|
| [`dbo.BudgetAccounts`](docs/tables/EDS/dbo.BudgetAccounts.md) | ~1.4M | District budget accounts / charge codes (~1.4M rows). Hierarchical (often fund-function-object), district-scoped. Requisition lines distribute against rows here. |
| [`dbo.PricePlans`](docs/tables/EDS/dbo.PricePlans.md) | 585 | Named price-plan definitions (~585 rows) — controls which categories/vendors are visible to which districts at what pricing tier. Small but pivotal: changes here change what buyers see. |

## Audit and reporting

Long-running event and history tables. Mostly cold storage — query with date filters.

| Table | Rows | Description |
|-------|------|-------------|
| [`dbo.Audit`](docs/tables/EDS/dbo.Audit.md) | ~2.6M | Generic audit log (~2.6M rows) — application-level events (logins, permission changes, data exports, admin actions). Distinct from the change-log tables, which are field-level. |
| [`dbo.TransactionLog_HISTORY`](docs/tables/EDS/dbo.TransactionLog_HISTORY.md) | ~122.3M | Long-tail historical event log (~124M rows). Cold storage — query with date filters and expect slow reads. Rarely needed for operational work; kept for compliance. |
| [`dbo.OrderBookDetail`](docs/tables/EDS/dbo.OrderBookDetail.md) | ~37.8M | Aggregated order/spending facts used by reporting (~37.8M rows). Fed from completed `PODetailItems`. The `OrderBookDetailOld` table (~187M rows) is the prior-format archive — read but do not write. |
| [`dbo.OrderBookDetailOld`](docs/tables/EDS/dbo.OrderBookDetailOld.md) | ~187.6M | Legacy archive of `OrderBookDetail` (~187M rows). Read-only; all new spend rolls up into `OrderBookDetail`. |
| [`dbo.ReportSession`](docs/tables/EDS/dbo.ReportSession.md) | ~5.4M | User-facing report executions (~5.4M rows) — what reports were run, by whom, with which parameters. |
| [`dbo.ReportSessionLinks`](docs/tables/EDS/dbo.ReportSessionLinks.md) | ~52.7M | Per-session output links (~52.7M rows) — joins a report session to the rows it generated, used to support drill-throughs and saved exports. |

## Related databases

EDS shares a server with several adjacent databases that come up in analytics and import workflows. Per-table descriptions for these (where curated) live alongside the EDS pages under `docs/tables/<db>/`.

| Database | What it is |
|----------|------------|
| [`Catalogs`](docs/tables/Catalogs/README.md) | Catalog import staging — `Master Catalog` (~144M rows) plus historical Grainger snapshots. |
| [`ProcurementAnalytics`](docs/tables/ProcurementAnalytics/README.md) | Clean, modern analytics flatten of EDS data — entities, vendors, contracts, spend transactions, vendor performance. Different schema conventions (PascalCase, `datetime2`). |
| [`VendorBids`](docs/tables/VendorBids/README.md) | Vendor-side bid response staging (64 tables; UAT mirror at `VendorBids_TEST`). |
| [`Documents`](docs/tables/Documents/README.md) | Document-management storage referenced by `EDS.dbo.DMSVendorBidDocuments`. |
| [`IDIQ_Platform`](docs/tables/IDIQ_Platform/README.md) | Indefinite-Delivery / Indefinite-Quantity contract platform (UAT mirror at `IDIQ_Platform_UAT`). |
| [`ContentCentral`](docs/tables/ContentCentral/README.md) | Content/CMS data — 141 tables. |

## Conventions worth knowing

- **PK / FK naming.** Primary keys are usually `{Table}Id` (e.g. `VendorId`); foreign keys reuse the same column name.
- **Timestamps.** Most are `Date{Action}` — `DateCreated`, `DateApproved`, `DateAwarded`. UTC vs. local is per-table; check the column.
- **Active flags.** Both `Active` (tinyint) and `IsActive` (bit) appear across the schema. Always verify which a given table uses.
- **Archive schema.** `archive.*` tables are cold storage with no PKs/indexes. Read-only, slow scans only.
- **High-volume tables.** `CrossRefs` (~171M), `BidHeaderDetail` (~123M), `Items` (~44M), `Detail` (~33M), `BidResults` (~33M), `BidRequestItems` (~28M), `PODetailItems` (~25M). Always filter or `TOP n` against these.
- **Source of descriptions.** This guide and the `## Description` blocks on per-table pages are generated from `descriptions.json`. Update one place, regenerate, and all three outputs (guide, per-table pages, MS_Description SQL) refresh.
