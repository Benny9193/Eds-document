# Table: `dbo.VoipCCMStats_Daily`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | int | NO |  | YES |
| 2 | `VoipCCMMonitoringID` | int | NO |  |  |
| 3 | `RecordTime` | datetime | NO |  |  |
| 4 | `Archive` | tinyint | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_VoipCCMStats_Daily` | `VoipCCMMonitoringID` | [`dbo.VoipCCMMonitoring.ID`](dbo.VoipCCMMonitoring.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.VoipCCMStats_DailyData`](dbo.VoipCCMStats_DailyData.md) | `VoipCCMStats_DailyID` | `ID` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `NI_VoipCCMStats_Daily` | no | NONCLUSTERED | `VoipCCMMonitoringID` |  |
| `NI_VoipCCMStats_Daily_RecordTime` | no | NONCLUSTERED | `RecordTime` |  |
