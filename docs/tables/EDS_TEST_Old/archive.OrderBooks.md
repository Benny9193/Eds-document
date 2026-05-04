# Table: `archive.OrderBooks`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `archive`
**Approx rows:** 692

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `OrderBookId` | int | NO |  |  |
| 2 | `PricePlanDescription` | varchar(255) | YES |  |  |
| 3 | `Category` | varchar(255) | YES |  |  |
| 4 | `CategoryId` | int | YES |  |  |
| 5 | `PricePlanId` | int | YES |  |  |
| 6 | `AwardId` | int | YES |  |  |
| 7 | `Type` | char(1) | YES |  |  |
| 8 | `DistrictId` | int | YES |  |  |
| 9 | `Markup` | decimal(9,5) | YES |  |  |
| 10 | `BidHeaderId` | int | YES |  |  |
| 11 | `OrderBookYear` | int | YES |  |  |
| 12 | `OrderBookCreated` | datetime | YES |  |  |
| 13 | `Active` | int | YES |  |  |
| 14 | `MasterBook` | int | YES |  |  |
| 15 | `MasterLetter` | char(1) | YES |  |  |
| 16 | `UseParentCatalog` | int | YES |  |  |
| 17 | `KeepZeroPages` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
