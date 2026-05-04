# Table: `archive.BatchDetail`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `archive`
**Approx rows:** 4060286

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BatchDetailId` | int | NO |  |  |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `BatchBookId` | int | YES |  |  |
| 4 | `BatchId` | int | NO |  |  |
| 5 | `RecordNumber` | int | YES |  |  |
| 6 | `Type` | char(1) | YES |  |  |
| 7 | `DistrictCode` | char(2) | YES |  |  |
| 8 | `Category` | char(1) | YES |  |  |
| 9 | `CometId` | char(5) | YES |  |  |
| 10 | `BookAmount` | char(10) | YES |  |  |
| 11 | `ItemCode` | char(20) | YES |  |  |
| 12 | `Quantity` | char(6) | YES |  |  |
| 13 | `OrigType` | char(1) | YES |  |  |
| 14 | `OrigDistrictCode` | char(2) | YES |  |  |
| 15 | `OrigCategory` | char(1) | YES |  |  |
| 16 | `OrigCometCode` | char(5) | YES |  |  |
| 17 | `OrigItemCode` | char(15) | YES |  |  |
| 18 | `OrigQuantity` | char(6) | YES |  |  |
| 19 | `ErrorField` | tinyint | YES |  |  |
| 20 | `DistrictId` | int | YES |  |  |
| 21 | `CategoryId` | int | YES |  |  |
| 22 | `UserId` | int | YES |  |  |
| 23 | `ItemId` | int | YES |  |  |
| 24 | `BidPrice` | money | YES |  |  |
| 25 | `Qty` | int | YES |  |  |
| 26 | `Total` | money | YES |  |  |
| 27 | `DetailId` | int | YES |  |  |
| 28 | `SourceId` | int | YES |  |  |
| 29 | `Modified` | datetime | YES |  |  |
| 30 | `ModifiedBy` | int | YES |  |  |
| 31 | `PackedCode` | varchar(16) | YES |  |  |
| 32 | `Location` | char(1) | YES |  |  |
| 33 | `OrigBookAmount` | char(10) | YES |  |  |
| 34 | `BatchFileName` | varchar(16) | YES |  |  |
| 35 | `BidHeaderId` | int | YES |  |  |
| 36 | `PreviousCategory` | char(1) | YES |  |  |
| 37 | `PackComplete` | tinyint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
