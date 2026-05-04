# Table: `dbo.OBView`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `OBDWorkId` | int | NO |  | YES |
| 2 | `Title` | varchar(255) | YES |  |  |
| 3 | `HeadingDescription` | varchar(4096) | YES |  |  |
| 4 | `ItemCode` | varchar(32) | YES |  |  |
| 5 | `ItemDescription` | varchar(1024) | YES |  |  |
| 6 | `UnitCode` | varchar(10) | YES |  |  |
| 7 | `BidPrice` | money | YES |  |  |
| 8 | `PricePlanDescription` | varchar(255) | YES |  |  |
| 9 | `CatalogPage` | varchar(4) | YES |  |  |
| 10 | `CatalogYear` | char(2) | YES |  |  |
| 11 | `VendorCode` | varchar(16) | YES |  |  |
| 12 | `VendorName` | varchar(255) | YES |  |  |
| 13 | `VendorItemCode` | varchar(32) | YES |  |  |
| 14 | `Alternate` | varchar(1024) | YES |  |  |
| 15 | `Category` | varchar(255) | YES |  |  |
| 16 | `TotalQuantity` | int | YES |  |  |
| 17 | `TotalRequisitions` | int | YES |  |  |
| 18 | `DistrictUsed` | int | YES |  |  |
| 19 | `ExpandAll` | tinyint | YES |  |  |
| 20 | `ItemId` | int | YES |  |  |
| 21 | `HeadingId` | int | YES |  |  |
| 22 | `BidItemId` | int | YES |  |  |
| 23 | `Weight` | int | YES |  |  |
| 24 | `SortSeq` | varchar(64) | YES |  |  |
| 25 | `LYQty` | int | YES |  |  |
| 26 | `MustKeep` | int | YES |  |  |
| 27 | `GrossPrice` | money | YES |  |  |
| 28 | `BidDiscountRate` | decimal(9,5) | YES |  |  |
| 29 | `CatalogDiscountRate` | decimal(9,5) | YES |  |  |
| 30 | `Compliant` | tinyint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
