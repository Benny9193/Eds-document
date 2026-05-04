# Table: `dbo.VoipCCMStats_Detail`

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
| `FK_VoipCCMStats_Detail` | `VoipCCMMonitoringID` | [`dbo.VoipCCMMonitoring.ID`](dbo.VoipCCMMonitoring.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.VoipCCMStats_DetailData`](dbo.VoipCCMStats_DetailData.md) | `VoipCCMStats_DetailID` | `ID` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `NI_VoipCCMStats_Detail` | no | NONCLUSTERED | `VoipCCMMonitoringID` |  |
| `NI_VoipCCMStats_Detail_RecordTime` | no | NONCLUSTERED | `RecordTime` |  |
