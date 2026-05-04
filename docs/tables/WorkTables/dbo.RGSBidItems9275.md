# Table: `dbo.RGSBidItems9275`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 209

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidItemId` | int | NO |  |  |
| 2 | `BidItemId_Old` | int | YES |  |  |
| 3 | `BidId` | int | YES |  |  |
| 4 | `ItemId` | int | YES |  |  |
| 5 | `Price` | money | YES |  |  |
| 6 | `Alternate` | varchar(512) | YES |  |  |
| 7 | `BidQuantity` | int | YES |  |  |
| 8 | `BidRequest` | int | YES |  |  |
| 9 | `AwardId` | int | YES |  |  |
| 10 | `VendorItemCode` | varchar(50) | YES |  |  |
| 11 | `CrossRefId` | int | YES |  |  |
| 12 | `ItemBidType` | varchar(32) | YES |  |  |
| 13 | `PackedItemCode` | varchar(50) | YES |  |  |
| 14 | `PackedVendorItemCode` | varchar(50) | YES |  |  |
| 15 | `DateUpdated` | datetime | YES |  |  |
| 16 | `PageNo` | int | YES |  |  |
| 17 | `RTK_MSDSId` | int | YES |  |  |
| 18 | `BidResultsId` | int | YES |  |  |
| 19 | `ContractNumber` | varchar(50) | YES |  |  |
| 20 | `AdditionalShipping` | tinyint | YES |  |  |
| 21 | `rowguid` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
