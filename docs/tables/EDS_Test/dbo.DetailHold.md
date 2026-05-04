# Table: `dbo.DetailHold`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DetailId` | int | NO |  |  |
| 2 | `RequisitionId` | int | YES |  |  |
| 3 | `CatalogId` | int | YES |  |  |
| 4 | `ItemId` | int | YES |  |  |
| 5 | `AddendumItem` | tinyint | YES |  |  |
| 6 | `ItemCode` | varchar(50) | YES |  |  |
| 7 | `Quantity` | int | YES |  |  |
| 8 | `LastYearsQuantity` | int | YES |  |  |
| 9 | `Description` | varchar(1024) | YES |  |  |
| 10 | `UnitId` | int | YES |  |  |
| 11 | `UnitCode` | varchar(20) | YES |  |  |
| 12 | `BidPrice` | money | YES |  |  |
| 13 | `CatalogPrice` | money | YES |  |  |
| 14 | `GrossPrice` | money | YES |  |  |
| 15 | `DiscountRate` | decimal(9,5) | YES |  |  |
| 16 | `CatalogPage` | char(4) | YES |  |  |
| 17 | `PricePlanId` | int | YES |  |  |
| 18 | `PriceId` | int | YES |  |  |
| 19 | `AwardId` | int | YES |  |  |
| 20 | `VendorId` | int | YES |  |  |
| 21 | `VendorItemCode` | varchar(50) | YES |  |  |
| 22 | `Alternate` | varchar(1024) | YES |  |  |
| 23 | `POId` | int | YES |  |  |
| 24 | `BatchDetailId` | int | YES |  |  |
| 25 | `Modified` | datetime | YES |  |  |
| 26 | `ModifiedById` | int | YES |  |  |
| 27 | `SourceId` | int | YES |  |  |
| 28 | `SortSeq` | varchar(64) | YES |  |  |
| 29 | `BidItemId` | int | YES |  |  |
| 30 | `ExtraDescription` | varchar(1024) | YES |  |  |
| 31 | `ReProc` | tinyint | YES |  |  |
| 32 | `UseGrossPrices` | tinyint | YES |  |  |
| 33 | `BidHeaderId` | int | YES |  |  |
| 34 | `DistrictRequisitionNumber` | varchar(50) | YES |  |  |
| 35 | `HeadingTitle` | varchar(255) | YES |  |  |
| 36 | `Keyword` | varchar(50) | YES |  |  |
| 37 | `SectionId` | int | YES |  |  |
| 38 | `SectionName` | varchar(255) | YES |  |  |
| 39 | `OriginalItemId` | int | YES |  |  |
| 40 | `HeadingId` | int | YES |  |  |
| 41 | `KeywordId` | int | YES |  |  |
| 42 | `ItemMustBeBid` | int | YES |  |  |
| 43 | `SessionId` | int | YES |  |  |
| 44 | `Active` | tinyint | YES |  |  |
| 45 | `RTK_MSDSId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
