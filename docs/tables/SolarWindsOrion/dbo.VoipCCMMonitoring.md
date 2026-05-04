# Table: `dbo.VoipCCMMonitoring`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | int | NO |  | YES |
| 2 | `NodeID` | int | NO |  |  |
| 3 | `VoipCCMMonitoringTypeID` | int | NO |  |  |
| 4 | `RecordTime` | datetime | YES |  |  |
| 5 | `UtcOffsetMinutes` | int | YES |  |  |
| 6 | `Deleted` | bit | NO | `((0))` |  |
| 7 | `CcmName` | nvarchar(255) | YES |  |  |
| 8 | `ClusterName` | nvarchar(50) | YES |  |  |
| 9 | `ClusterNodeID` | int | YES |  |  |
| 10 | `Version` | nvarchar(max) | YES |  |  |
| 11 | `MonitoringEnabled` | bit | YES | `((0))` |  |
| 12 | `PollingFrequency` | int | NO | `((0))` |  |
| 13 | `PollingStatus` | nvarchar(100) | YES |  |  |
| 14 | `SipTrunkPollingFrequency` | int | YES |  |  |
| 15 | `SipTrunkMonitoringEnabled` | bit | YES | `((0))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_VoipCCMMonitoring` | `VoipCCMMonitoringTypeID` | [`dbo.VoipCCMMonitoringType.ID`](dbo.VoipCCMMonitoringType.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.VoipCCMMonitoringData`](dbo.VoipCCMMonitoringData.md) | `VoipCCMMonitoringID` | `ID` | NO_ACTION | NO_ACTION |
| [`dbo.VoipCCMPhones`](dbo.VoipCCMPhones.md) | `VoipCCMMonitoringID` | `ID` | NO_ACTION | NO_ACTION |
| [`dbo.VoipCCMStats_Daily`](dbo.VoipCCMStats_Daily.md) | `VoipCCMMonitoringID` | `ID` | NO_ACTION | NO_ACTION |
| [`dbo.VoipCCMStats_Detail`](dbo.VoipCCMStats_Detail.md) | `VoipCCMMonitoringID` | `ID` | NO_ACTION | NO_ACTION |
| [`dbo.VoipCCMStats_Hourly`](dbo.VoipCCMStats_Hourly.md) | `VoipCCMMonitoringID` | `ID` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `NI_VoipCCMMonitoring_Deleted` | no | NONCLUSTERED | `Deleted` |  |
| `NI_VoipCCMMonitoring_NodeID` | no | NONCLUSTERED | `NodeID` |  |
