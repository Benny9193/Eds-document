# Table: `dbo.ForecastCapacitySettings`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `InstanceId` | int | NO |  | YES |
| 2 | `MetricId` | int | NO |  | YES |
| 3 | `Enabled` | bit | YES |  |  |
| 4 | `UsePeakValues` | bit | YES |  |  |
| 5 | `WarningThreshold` | int | YES |  |  |
| 6 | `CriticalThreshold` | int | YES |  |  |
| 7 | `CapacityThreshold` | int | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_ForecastCapacity_ForecastMetrics` | `MetricId` | [`dbo.ForecastMetrics.Id`](dbo.ForecastMetrics.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
