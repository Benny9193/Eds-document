# Table: `dbo.VoipCCMStatsType`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 6

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | int | NO |  | YES |
| 2 | `Code` | nvarchar(16) | NO |  |  |
| 3 | `Description` | nvarchar(255) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.VoipCCMMonitoringData`](dbo.VoipCCMMonitoringData.md) | `VoipCCMStatsTypeID` | `ID` | NO_ACTION | NO_ACTION |
| [`dbo.VoipCCMStats_DailyData`](dbo.VoipCCMStats_DailyData.md) | `VoipCCMStatsTypeID` | `ID` | NO_ACTION | NO_ACTION |
| [`dbo.VoipCCMStats_DetailData`](dbo.VoipCCMStats_DetailData.md) | `VoipCCMStatsTypeID` | `ID` | NO_ACTION | NO_ACTION |
| [`dbo.VoipCCMStats_HourlyData`](dbo.VoipCCMStats_HourlyData.md) | `VoipCCMStatsTypeID` | `ID` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `UI_VoipCCMStatsType_Code` | YES | NONCLUSTERED | `Code` |  |
