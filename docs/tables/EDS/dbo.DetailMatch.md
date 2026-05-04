# Table: `dbo.DetailMatch`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 103534

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Repeat-purchase / re-order matching working set (~104K rows). For each `Detail` line it joins the `LastYearsQuantity` plus the full pricing snapshot (`BidPrice`, `CatalogPrice`, `GrossPrice`, `DiscountRate`, `AwardId`) so a buyer can be shown last-year quantities when building a new requisition. Rebuilt by batch jobs.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BudgetId` | int | YES |  |  |
| 2 | `TotalRequisitionCost` | money | YES |  |  |
| 3 | `DetailId` | int | NO |  |  |
| 4 | `RequisitionId` | int | YES |  |  |
| 5 | `CatalogId` | int | YES |  |  |
| 6 | `ItemId` | int | YES |  |  |
| 7 | `AddendumItem` | tinyint | YES |  |  |
| 8 | `ItemCode` | varchar(50) | YES |  |  |
| 9 | `Quantity` | int | YES |  |  |
| 10 | `LastYearsQuantity` | int | YES |  |  |
| 11 | `Description` | varchar(1024) | YES |  |  |
| 12 | `UnitId` | int | YES |  |  |
| 13 | `UnitCode` | varchar(20) | YES |  |  |
| 14 | `BidPrice` | money | YES |  |  |
| 15 | `CatalogPrice` | money | YES |  |  |
| 16 | `GrossPrice` | money | YES |  |  |
| 17 | `DiscountRate` | decimal(9,5) | YES |  |  |
| 18 | `CatalogPage` | char(4) | YES |  |  |
| 19 | `PricePlanId` | int | YES |  |  |
| 20 | `PriceId` | int | YES |  |  |
| 21 | `AwardId` | int | YES |  |  |
| 22 | `VendorId` | int | YES |  |  |
| 23 | `VendorItemCode` | varchar(50) | YES |  |  |
| 24 | `Alternate` | varchar(1024) | YES |  |  |
| 25 | `POId` | int | YES |  |  |
| 26 | `BatchDetailId` | int | YES |  |  |
| 27 | `Modified` | datetime | YES |  |  |
| 28 | `ModifiedById` | int | YES |  |  |
| 29 | `SourceId` | int | YES |  |  |
| 30 | `SortSeq` | varchar(64) | YES |  |  |
| 31 | `BidItemId` | int | YES |  |  |
| 32 | `ExtraDescription` | varchar(1024) | YES |  |  |
| 33 | `ReProc` | tinyint | YES |  |  |
| 34 | `UseGrossPrices` | tinyint | YES |  |  |
| 35 | `BidHeaderId` | int | YES |  |  |
| 36 | `DistrictRequisitionNumber` | varchar(50) | YES |  |  |
| 37 | `HeadingTitle` | varchar(255) | YES |  |  |
| 38 | `Keyword` | varchar(50) | YES |  |  |
| 39 | `SectionId` | int | YES |  |  |
| 40 | `SectionName` | varchar(255) | YES |  |  |
| 41 | `OriginalItemId` | int | YES |  |  |
| 42 | `HeadingId` | int | YES |  |  |
| 43 | `KeywordId` | int | YES |  |  |
| 44 | `ItemMustBeBid` | int | YES |  |  |
| 45 | `SessionId` | int | YES |  |  |
| 46 | `Active` | tinyint | YES |  |  |
| 47 | `RTK_MSDSId` | int | YES |  |  |
| 48 | `AddedFromAddenda` | datetime | YES |  |  |
| 49 | `LastAlteredSessionId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
