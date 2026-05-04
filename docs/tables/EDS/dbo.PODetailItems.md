# Table: `dbo.PODetailItems`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 24511399

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

PO line-item detail (~24.5M rows). Snapshot of item, quantity, unit price, and account split at the moment of PO issuance. Independent from `Detail` — Detail can change after PO issuance, PODetailItems is the immutable contractual record.

## Columns

| # | Column | Type | Nullable | Default | PK | Description |
|---|--------|------|----------|---------|----|-------------|
| 1 | `PODetailItemId` | int | NO |  | YES | Surrogate primary key for the immutable PO line snapshot. Distinct from `DetailId` — one `Detail` row produces exactly one `PODetailItems` row at conversion. |
| 2 | `POId` | int | YES |  |  | FK to `PO`. Always set — every PO line item belongs to a purchase order. |
| 3 | `DetailId` | int | YES |  |  | Back-link to the originating `Detail` row. Lets you trace from a PO line back to the requisition history. |
| 4 | `ItemId` | int | YES |  |  | FK to `Items`. Frozen at PO issuance — does NOT update if the master `Items` row changes later. |
| 5 | `Quantity` | int | YES |  |  | Units ordered, locked in at PO issuance. For receiving variance, compare against the receiving-side tables, not against `Detail.Quantity`. |
| 6 | `BidItemId` | int | YES |  |  |  |
| 7 | `BidPrice` | money | YES |  |  | Per-unit price locked in at PO issuance, in dollars. Contractual — does not change even if the source bid is later re-awarded or `Detail.BidPrice` is edited. |
| 8 | `GrossPrice` | money | YES |  |  |  |
| 9 | `DiscountRate` | decimal(9,5) | YES |  |  |  |
| 10 | `AwardId` | int | YES |  |  |  |
| 11 | `VendorId` | int | YES |  |  | FK to `Vendors`. The vendor this PO line ships from — frozen at PO issuance. |
| 12 | `VendorItemCode` | varchar(50) | YES |  |  |  |
| 13 | `Alternate` | varchar(1024) | YES |  |  |  |
| 14 | `ContractNumber` | varchar(50) | YES |  |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_PODetailItems_Detail` | `DetailId` | [`dbo.Detail.DetailId`](dbo.Detail.md) | NO_ACTION | NO_ACTION |
| `FK_PODetailItems_PO` | `POId` | [`dbo.PO.POId`](dbo.PO.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_Detail` | no | NONCLUSTERED | `DetailId` |  |
| `SK_PO` | no | NONCLUSTERED | `POId` |  |
| `SKI_POVendor_Detail` | no | NONCLUSTERED | `POId`, `VendorId` | `DetailId` |
| `SKI_POVendorDetailBidItem_Award` | no | NONCLUSTERED | `POId`, `VendorId`, `DetailId`, `BidItemId` | `AwardId` |
