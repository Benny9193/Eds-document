# View: `dbo.VoipAlertQos`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CallPathID` | int | NO |  |  |
| 2 | `CallPathName` | nvarchar(max) | YES |  |  |
| 3 | `SourceSiteID` | int | NO |  |  |
| 4 | `DestSiteID` | int | YES |  |  |
| 5 | `SourceSiteName` | nvarchar(100) | NO |  |  |
| 6 | `DestSiteName` | nvarchar(100) | YES |  |  |
| 7 | `NodeID` | int | NO |  |  |
| 8 | `SourceNodeID` | int | NO |  |  |
| 9 | `DestNodeID` | int | YES |  |  |
| 10 | `SourceNodeName` | nvarchar(255) | YES |  |  |
| 11 | `DestNodeName` | nvarchar(255) | YES |  |  |
| 12 | `SourceIP` | nvarchar(50) | YES |  |  |
| 13 | `DestIP` | nvarchar(50) | YES |  |  |
| 14 | `IpSlaOp` | int | YES |  |  |
| 15 | `Status` | nchar(10) | YES |  |  |
| 16 | `SourceSiteIsAutoConfigured` | bit | NO |  |  |
| 17 | `IsHub` | int | NO |  |  |
| 18 | `DateTime` | datetime | YES |  |  |
| 19 | `MOS` | float | YES |  |  |
| 20 | `Jitter` | float | YES |  |  |
| 21 | `Latency` | float | YES |  |  |
| 22 | `PacketLoss` | float | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Nodes` | VIEW |
| `VoIPOperationCurrentStats` | VIEW |
| `dbo.ipslam_OperationState2Status21` | SQL_SCALAR_FUNCTION |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW dbo.[VoipAlertQos]
AS

SELECT
	stat.VoipOperationInstanceID as CallPathID,
	stat.OperationName as CallPathName,
	stat.SourceSiteID,
	stat.TargetSiteID as DestSiteID,
	stat.SourceSiteName,
	stat.TargetSiteName as DestSiteName,
	stat.NodeID, stat.SourceNodeID,
	stat.TargetNodeID as DestNodeID,
	stat.SourceNodeCaption as SourceNodeName,
	stat.TargetNodeCaption as DestNodeName,
	sn.IP_Address as SourceIP,
	dn.IP_Address as DestIP,
	stat.IpSlaOperationNumber as IpSlaOp,
	dbo.ipslam_OperationState2Status21(stat.VoipOperationStateID) as Status,
	stat.SourceSiteIsAutoConfigured,
	0 as IsHub,
	stat.RecordTime as DateTime,
	stat.MOS,
	stat.Jitter,
	stat.Latency,
	stat.PacketLoss
FROM VoIPOperationCurrentStats as stat
INNER JOIN Nodes as sn on stat.SourceNodeID=sn.NodeID
INNER JOIN Nodes as dn on stat.TargetNodeID=dn.NodeID
WHERE stat.VoipOperationTypeID=11
```
