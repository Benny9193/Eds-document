# Table: `dbo.OrderBookLog`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 474353

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Print / render log for OrderBooks (~474K rows). Captures who printed which `OrderBookId` (district / school / user), how many items and pages were emitted, and the target `Device`. Operational telemetry, not a financial record.

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
