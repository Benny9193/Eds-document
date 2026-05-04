# Table: `dbo.VoipCCMStats_DailyData`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | int | NO |  | YES |
| 2 | `VoipCCMStats_DailyID` | int | NO |  |  |
| 3 | `VoipCCMStatsTypeID` | int | NO |  |  |
| 4 | `MinValue` | int | YES |  |  |
| 5 | `AvgValue` | int | YES |  |  |
| 6 | `MaxValue` | int | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_VoipCCMStats_DailyData1` | `VoipCCMStats_DailyID` | [`dbo.VoipCCMStats_Daily.ID`](dbo.VoipCCMStats_Daily.md) | NO_ACTION | NO_ACTION |
| `FK_VoipCCMStats_DailyData2` | `VoipCCMStatsTypeID` | [`dbo.VoipCCMStatsType.ID`](dbo.VoipCCMStatsType.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `NI_VoipCCMStats_DailyData1` | no | NONCLUSTERED | `VoipCCMStats_DailyID` |  |
| `NI_VoipCCMStats_DailyData2` | no | NONCLUSTERED | `VoipCCMStatsTypeID` |  |
