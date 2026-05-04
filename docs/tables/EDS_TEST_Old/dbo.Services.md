# Table: `dbo.Services`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ServiceId` | int | NO |  | YES |
| 2 | `ParentId` | int | YES |  |  |
| 3 | `TradeId` | int | YES |  |  |
| 4 | `Active` | tinyint | YES |  |  |
| 5 | `Description` | varchar(50) | YES |  |  |
| 6 | `BidQuantity` | decimal(9,5) | NO |  |  |
| 7 | `RateTypeId` | tinyint | NO |  |  |
| 8 | `RateUnitId` | int | NO |  |  |
| 9 | `Comments` | text(2147483647) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
