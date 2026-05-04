# Table: `dbo.Rates`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RateId` | int | NO |  | YES |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `ServiceId` | int | NO |  |  |
| 4 | `BidId` | int | NO |  |  |
| 5 | `BidQuantity` | decimal(9,5) | NO |  |  |
| 6 | `RateTypeId` | tinyint | NO |  |  |
| 7 | `RateUnitId` | int | NO |  |  |
| 8 | `Rate` | decimal(9,5) | YES |  |  |
| 9 | `BidCost` | decimal(11,5) | YES |  |  |
| 10 | `Comments` | text(2147483647) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
