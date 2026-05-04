# Table: `dbo.ForecastMetrics`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 3

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | int | NO |  | YES |
| 2 | `EntityType` | nvarchar(150) | NO |  |  |
| 3 | `SourceDataEntityName` | nvarchar(150) | YES |  |  |
| 4 | `Name` | nvarchar(150) | NO |  |  |
| 5 | `DisplayName` | nvarchar(500) | NO |  |  |
| 6 | `UsePeakValues` | bit | NO |  |  |
| 7 | `ThresholdType` | smallint | NO |  |  |
| 8 | `Icon` | varchar(150) | YES |  |  |
| 9 | `CriticalThresholdSettingID` | nvarchar(250) | YES |  |  |
| 10 | `WarningThresholdSettingID` | nvarchar(250) | YES |  |  |
| 11 | `CapacityThresholdSettingID` | nvarchar(250) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.ForecastCapacitySettings`](dbo.ForecastCapacitySettings.md) | `MetricId` | `Id` | NO_ACTION | NO_ACTION |

## Indexes

_No non-PK indexes._
