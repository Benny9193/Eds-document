# Table: `dbo.Cortex_MetricRollupTypes`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 3

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `minutesPerRollup` | int | NO |  | YES |
| 2 | `label` | varchar(100) | NO |  |  |
| 3 | `CreateTableScript` | varchar(max) | YES |  |  |
| 4 | `NumberOfDaysPerPartition` | int | YES |  |  |
| 5 | `NumberOfDaysAhead` | int | YES |  |  |
| 6 | `ReadableViewColumns` | varchar(250) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
