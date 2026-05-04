# Table: `dbo.VoipCCMMonitoringData`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | int | NO |  | YES |
| 2 | `VoipCCMMonitoringID` | int | NO |  |  |
| 3 | `VoipCCMStatsTypeID` | int | NO |  |  |
| 4 | `Value` | int | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_VoipCCMMonitoringData1` | `VoipCCMMonitoringID` | [`dbo.VoipCCMMonitoring.ID`](dbo.VoipCCMMonitoring.md) | NO_ACTION | NO_ACTION |
| `FK_VoipCCMMonitoringData2` | `VoipCCMStatsTypeID` | [`dbo.VoipCCMStatsType.ID`](dbo.VoipCCMStatsType.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
