# Table: `archive.allitems`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `archive`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `ItemId` | int | YES |  |  |
| 3 | `ItemCode` | varchar(50) | YES |  |  |
| 4 | `Description` | varchar(2311) | YES |  |  |
| 5 | `UnitCode` | varchar(20) | YES |  |  |
| 6 | `VendorItemCode` | varchar(50) | YES |  |  |
| 7 | `Alternate` | varchar(512) | YES |  |  |
| 8 | `BidPrice` | money | YES |  |  |
| 9 | `VendorId` | int | YES |  |  |
| 10 | `BidItemId` | int | YES |  |  |
| 11 | `CatalogId` | int | YES |  |  |
| 12 | `CrossRefId` | int | YES |  |  |
| 13 | `PricePlanId` | int | YES |  |  |
| 14 | `CategoryId` | int | YES |  |  |
| 15 | `PackedVendorItemCode` | varchar(50) | YES |  |  |
| 16 | `ItemBidType` | varchar(50) | YES |  |  |
| 17 | `TotalOrdered` | int | YES |  |  |
| 18 | `TotalBid` | int | YES |  |  |
| 19 | `SysId` | int | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
