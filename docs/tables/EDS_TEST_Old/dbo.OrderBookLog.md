# Table: `dbo.OrderBookLog`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 474243

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `OrderBookLogId` | int | NO |  | YES |
| 2 | `Printed` | datetime | YES |  |  |
| 3 | `OrderBookId` | int | YES |  |  |
| 4 | `DistrictId` | int | YES |  |  |
| 5 | `SchoolId` | int | YES |  |  |
| 6 | `UserId` | int | YES |  |  |
| 7 | `ItemsPrinted` | int | YES |  |  |
| 8 | `PagesPrinted` | int | YES |  |  |
| 9 | `Device` | varchar(255) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
