# View: `dbo.VolumesPercentDiskUsedForecastCapacity`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `InstanceId` | int | NO |  |  |
| 3 | `EntityType` | nvarchar(150) | NO |  |  |
| 4 | `MetricId` | int | NO |  |  |
| 5 | `MetricName` | nvarchar(150) | NO |  |  |
| 6 | `InstanceCaption` | nvarchar(75) | YES |  |  |
| 7 | `ThresholdType` | smallint | NO |  |  |
| 8 | `Timestamp` | datetime | NO |  |  |
| 9 | `MinDateTime` | datetime | NO |  |  |
| 10 | `MaxDateTime` | datetime | NO |  |  |
| 11 | `CurrentValue` | real | YES |  |  |
| 12 | `WarningThreshold` | float | YES |  |  |
| 13 | `CriticalThreshold` | float | YES |  |  |
| 14 | `Capacitythreshold` | int | YES |  |  |
| 15 | `Aavg` | real | YES |  |  |
| 16 | `Bavg` | real | YES |  |  |
| 17 | `Apeak` | real | YES |  |  |
| 18 | `Bpeak` | real | YES |  |  |
| 19 | `DaysToWarningAvg` | float | YES |  |  |
| 20 | `DaysToCriticalAvg` | float | YES |  |  |
| 21 | `DaysToCapacityAvg` | float | YES |  |  |
| 22 | `DaysToWarningPeak` | float | YES |  |  |
| 23 | `DaysToCriticalPeak` | float | YES |  |  |
| 24 | `DaysToCapacityPeak` | float | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VolumesForecastCapacity` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[VolumesPercentDiskUsedForecastCapacity]
AS
  SELECT NodeID 
        ,InstanceId
		,EntityType
		,MetricId
		,MetricName
		,InstanceCaption
		,ThresholdType
		,[Timestamp]
		,MinDateTime
		,MaxDateTime
		,CurrentValue
		,WarningThreshold
		,CriticalThreshold
		,Capacitythreshold
		,Aavg
		,Bavg
		,Apeak
		,Bpeak
		,DaysToWarningAvg
		,DaysToCriticalAvg
		,DaysToCapacityAvg
		,DaysToWarningPeak
		,DaysToCriticalPeak
		,DaysToCapacityPeak
  FROM  VolumesForecastCapacity
  WHERE MetricName = N'Forecast.Metric.PercentDiskUsed'
```
