# View: `EDSIQWebUser.OrderBookDetailView`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `EDSIQWebUser`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `OrderBookDetailId` | int | NO |  |  |
| 2 | `OrderBookId` | int | NO |  |  |
| 3 | `ItemCode` | varchar(50) | YES |  |  |
| 4 | `UnitCode` | varchar(20) | YES |  |  |
| 5 | `GrossPrice` | money | YES |  |  |
| 6 | `CatalogPage` | varchar(4) | YES |  |  |
| 7 | `CatalogYear` | varchar(2) | YES |  |  |
| 8 | `VendorName` | varchar(255) | YES |  |  |
| 9 | `VendorItemCode` | varchar(50) | YES |  |  |
| 10 | `TotalQuantity` | int | NO |  |  |
| 11 | `TotalRequisitions` | int | NO |  |  |
| 12 | `ExpandAll` | tinyint | YES |  |  |
| 13 | `Weight` | int | NO |  |  |
| 14 | `SortSeq` | varchar(64) | YES |  |  |
| 15 | `Active` | tinyint | YES |  |  |
| 16 | `Alternate` | varchar(1024) | YES |  |  |
| 17 | `VendorId` | int | YES |  |  |
| 18 | `VendorCode` | varchar(16) | YES |  |  |
| 19 | `ItemDescription` | varchar(512) | YES |  |  |
| 20 | `HeadingId` | int | YES |  |  |
| 21 | `HeadingCode` | varchar(16) | YES |  |  |
| 22 | `HeadingTitle` | varchar(255) | YES |  |  |
| 23 | `HeadingDescription` | varchar(4096) | YES |  |  |

## Depends on

_None resolved._

## Used by

_No other objects reference this view._

## Definition

_Definition not available (view may be encrypted, or insufficient permissions)._
