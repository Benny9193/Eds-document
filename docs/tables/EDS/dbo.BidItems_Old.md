# Table: `dbo.BidItems_Old`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 16238384

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidItemId` | int | NO |  | YES |
| 2 | `BidId` | int | YES |  |  |
| 3 | `ItemId` | int | YES |  |  |
| 4 | `Price` | money | YES |  |  |
| 5 | `Alternate` | varchar(512) | YES |  |  |
| 6 | `BidQuantity` | int | YES |  |  |
| 7 | `BidRequest` | int | YES |  |  |
| 8 | `AwardId` | int | YES |  |  |
| 9 | `VendorItemCode` | varchar(50) | YES |  |  |
| 10 | `CrossRefId` | int | YES |  |  |
| 11 | `ItemBidType` | varchar(32) | YES |  |  |
| 12 | `PackedItemCode` | varchar(50) | YES |  |  |
| 13 | `PackedVendorItemCode` | varchar(50) | YES |  |  |
| 14 | `DateUpdated` | datetime | YES |  |  |
| 15 | `PageNo` | int | YES |  |  |
| 16 | `RTK_MSDSId` | int | YES |  |  |
| 17 | `BidResultsId` | int | YES |  |  |
| 18 | `ContractNumber` | varchar(50) | YES |  |  |
| 19 | `AdditionalShipping` | tinyint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.Prices`](dbo.Prices.md) | `BidItemId` | `BidItemId` | CASCADE | CASCADE |

## Indexes

_No non-PK indexes._
