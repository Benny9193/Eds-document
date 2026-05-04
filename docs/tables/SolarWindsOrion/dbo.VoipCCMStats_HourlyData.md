# Table: `dbo.VoipCCMStats_HourlyData`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | int | NO |  | YES |
| 2 | `VoipCCMStats_HourlyID` | int | NO |  |  |
| 3 | `VoipCCMStatsTypeID` | int | NO |  |  |
| 4 | `MinValue` | int | YES |  |  |
| 5 | `AvgValue` | int | YES |  |  |
| 6 | `MaxValue` | int | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_VoipCCMStats_HourlyData1` | `VoipCCMStats_HourlyID` | [`dbo.VoipCCMStats_Hourly.ID`](dbo.VoipCCMStats_Hourly.md) | NO_ACTION | NO_ACTION |
| `FK_VoipCCMStats_HourlyData2` | `VoipCCMStatsTypeID` | [`dbo.VoipCCMStatsType.ID`](dbo.VoipCCMStatsType.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `NI_VoipCCMStats_HourlyData1` | no | NONCLUSTERED | `VoipCCMStats_HourlyID` |  |
| `NI_VoipCCMStats_HourlyData2` | no | NONCLUSTERED | `VoipCCMStatsTypeID` |  |
