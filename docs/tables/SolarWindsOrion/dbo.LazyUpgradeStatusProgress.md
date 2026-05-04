# Table: `dbo.LazyUpgradeStatusProgress`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `LazyUpgradeStatusID` | uniqueidentifier | NO |  | YES |
| 2 | `StartInt64` | bigint | YES |  |  |
| 3 | `EndInt64` | bigint | YES |  |  |
| 4 | `StartInt32` | int | YES |  |  |
| 5 | `EndInt32` | int | YES |  |  |
| 6 | `StartDate` | datetime | YES |  |  |
| 7 | `EndDate` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
