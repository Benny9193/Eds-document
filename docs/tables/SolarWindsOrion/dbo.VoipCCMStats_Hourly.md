# Table: `dbo.VoipCCMStats_Hourly`

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
| `FK_VoipCCMStats_Hourly` | `VoipCCMMonitoringID` | [`dbo.VoipCCMMonitoring.ID`](dbo.VoipCCMMonitoring.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.VoipCCMStats_HourlyData`](dbo.VoipCCMStats_HourlyData.md) | `VoipCCMStats_HourlyID` | `ID` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `NI_VoipCCMStats_Hourly` | no | NONCLUSTERED | `VoipCCMMonitoringID` |  |
| `NI_VoipCCMStats_Hourly_RecordTime` | no | NONCLUSTERED | `RecordTime` |  |
