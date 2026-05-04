# Table: `dbo.VoipCCMPhones`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | int | NO |  | YES |
| 2 | `VoipCCMMonitoringID` | int | NO |  |  |
| 3 | `MAC_Address` | varchar(50) | YES |  |  |
| 4 | `Name` | varchar(255) | YES |  |  |
| 5 | `IP_Address` | varchar(50) | YES |  |  |
| 6 | `Description` | ntext(1073741823) | YES |  |  |
| 7 | `Status` | int | YES |  |  |
| 8 | `Licensed` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_VoipCCMPhones` | `VoipCCMMonitoringID` | [`dbo.VoipCCMMonitoring.ID`](dbo.VoipCCMMonitoring.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.VoipCCMPhonesAvayaData`](dbo.VoipCCMPhonesAvayaData.md) | `VoipCCMPhonesID` | `ID` | NO_ACTION | NO_ACTION |
| [`dbo.VoipCCMPhonesCiscoData`](dbo.VoipCCMPhonesCiscoData.md) | `VoipCCMPhonesID` | `ID` | NO_ACTION | NO_ACTION |
| [`dbo.VoipCCMPhoneStats_Daily`](dbo.VoipCCMPhoneStats_Daily.md) | `VoipCCMPhonesID` | `ID` | NO_ACTION | NO_ACTION |
| [`dbo.VoipCCMPhoneStats_Detail`](dbo.VoipCCMPhoneStats_Detail.md) | `VoipCCMPhonesID` | `ID` | NO_ACTION | NO_ACTION |
| [`dbo.VoipCCMPhoneStats_Hourly`](dbo.VoipCCMPhoneStats_Hourly.md) | `VoipCCMPhonesID` | `ID` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `NI_VoipCCMPhones_MonitoringID` | no | NONCLUSTERED | `VoipCCMMonitoringID` |  |
