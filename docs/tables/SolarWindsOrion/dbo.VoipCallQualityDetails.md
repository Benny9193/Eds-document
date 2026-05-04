# View: `dbo.VoipCallQualityDetails`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CcmID` | int | NO |  |  |
| 2 | `CallManagerSysName` | nvarchar(255) | YES |  |  |
| 3 | `CallManagerName` | nvarchar(255) | YES |  |  |
| 4 | `CallID` | int | NO |  |  |
| 5 | `DateTimeStamp` | datetime | YES |  |  |
| 6 | `CallIdentifier` | int | NO |  |  |
| 7 | `Jitter` | int | NO |  |  |
| 8 | `Latency` | int | NO |  |  |
| 9 | `MOS` | float | YES |  |  |
| 10 | `PacketLoss` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Nodes`](dbo.Nodes.md) | VIEW |
| [`dbo.VoipCCMMonitoring`](dbo.VoipCCMMonitoring.md) | USER_TABLE |
| [`dbo.VoipCMRs`](dbo.VoipCMRs.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW dbo.VoipCallQualityDetails
AS
	SELECT 
		CMRs.VoipCCMMonitoringID AS CcmID,
		Nodes.SysName AS CallManagerSysName,
		Nodes.Caption AS CallManagerName,
		CMRs.GlobalCallID_callId AS CallID,
		DATEADD(MINUTE, DATEDIFF(MINUTE, GETUTCDATE(), GETDATE()), CMRs.DateTimeStampUTC) AS DateTimeStamp,
		CMRs.CallIdentifier
      ,CMRs.Jitter
      ,CMRs.Latency
      ,CMRs.MOS
      ,CMRs.PacketLoss
	FROM dbo.VoipCMRs CMRs
	JOIN dbo.VoipCCMMonitoring CCMMonitoring ON
		CCMMonitoring.ID = CMRs.VoipCCMMonitoringID
	JOIN dbo.Nodes Nodes ON
		Nodes.NodeID = CCMMonitoring.NodeID
```
