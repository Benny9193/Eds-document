# View: `dbo.VoipCCMMonitoringDetail`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | int | NO |  |  |
| 2 | `NodeID` | int | NO |  |  |
| 3 | `CcmName` | nvarchar(255) | YES |  |  |
| 4 | `ClusterName` | nvarchar(50) | YES |  |  |
| 5 | `ClusterNodeID` | int | YES |  |  |
| 6 | `Version` | nvarchar(max) | YES |  |  |
| 7 | `VoipCCMMonitoringTypeID` | int | NO |  |  |
| 8 | `RecordTime` | datetime | YES |  |  |
| 9 | `Deleted` | bit | NO |  |  |
| 10 | `Status` | char(20) | YES |  |  |
| 11 | `UtcOffsetMinutes` | int | YES |  |  |
| 12 | `MonitoringEnabled` | bit | YES |  |  |
| 13 | `PollingFrequency` | int | NO |  |  |
| 14 | `SipTrunkPollingFrequency` | int | YES |  |  |
| 15 | `SipTrunkMonitoringEnabled` | bit | YES |  |  |
| 16 | `Caption` | nvarchar(255) | YES |  |  |
| 17 | `CallManagerSysName` | nvarchar(255) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Nodes`](dbo.Nodes.md) | VIEW |
| [`dbo.VoipCCMMonitoring`](dbo.VoipCCMMonitoring.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[VoipCCMMonitoringDetail]
AS
SELECT        vccm.ID, vccm.NodeID, vccm.CcmName, vccm.ClusterName, vccm.ClusterNodeID, vccm.Version, vccm.VoipCCMMonitoringTypeID, vccm.RecordTime, vccm.Deleted, 
                         n.Status, vccm.UtcOffsetMinutes, vccm.MonitoringEnabled, vccm.PollingFrequency, vccm.SipTrunkPollingFrequency, vccm.SipTrunkMonitoringEnabled, n.Caption, n.SysName AS CallManagerSysName
FROM            dbo.VoipCCMMonitoring AS vccm INNER JOIN
                         dbo.Nodes AS n ON n.NodeID = vccm.NodeID
```
