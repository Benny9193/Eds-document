# Table: `dbo.PODetailItems`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 24326153

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PODetailItemId` | int | NO |  | YES |
| 2 | `POId` | int | YES |  |  |
| 3 | `DetailId` | int | YES |  |  |
| 4 | `ItemId` | int | YES |  |  |
| 5 | `Quantity` | int | YES |  |  |
| 6 | `BidItemId` | int | YES |  |  |
| 7 | `BidPrice` | money | YES |  |  |
| 8 | `GrossPrice` | money | YES |  |  |
| 9 | `DiscountRate` | decimal(9,5) | YES |  |  |
| 10 | `AwardId` | int | YES |  |  |
| 11 | `VendorId` | int | YES |  |  |
| 12 | `VendorItemCode` | varchar(50) | YES |  |  |
| 13 | `Alternate` | varchar(1024) | YES |  |  |
| 14 | `ContractNumber` | varchar(50) | YES |  |  |

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
