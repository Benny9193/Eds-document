# Table: `dbo.VoipOneWayDelayOperationResults_Hourly`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipOperationInstanceID` | int | NO |  | YES |
| 2 | `RecordTimeUtc` | datetime | NO |  | YES |
| 3 | `MinOneWayDelayDS` | float | YES |  |  |
| 4 | `AvgOneWayDelayDS` | float | YES |  |  |
| 5 | `MaxOneWayDelayDS` | float | YES |  |  |
| 6 | `MinOneWayDelaySD` | float | YES |  |  |
| 7 | `AvgOneWayDelaySD` | float | YES |  |  |
| 8 | `MaxOneWayDelaySD` | float | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
