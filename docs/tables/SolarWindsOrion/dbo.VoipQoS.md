# View: `dbo.VoipQoS`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `Caption` | nvarchar(255) | YES |  |  |
| 3 | `DateTime` | datetime | YES |  |  |
| 4 | `MOS` | float | YES |  |  |
| 5 | `Jitter` | float | YES |  |  |
| 6 | `Latency` | float | YES |  |  |
| 7 | `PacketLoss` | float | YES |  |  |
| 8 | `VoipSiteID` | int | NO |  |  |
| 9 | `Name` | nvarchar(100) | NO |  |  |
| 10 | `VoipLinkTestResultsID` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Nodes` | VIEW |
| `VoipOperationResults` | VIEW |
| `VoipSites` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW dbo.[VoipQoS]
AS

SELECT
	sn.NodeID, sn.Caption,
	res.RecordTime as DateTime,
	res.AvgMOS as MOS,
	res.AvgJitter as Jitter,
	res.AvgLatency as Latency,
	res.AvgPacketLoss as PacketLoss,
	vss.VoipSiteID, vss.Name,
	res.VoipOperationInstanceID as VoipLinkTestResultsID
FROM VoipOperationResults as res
INNER JOIN Nodes as sn ON res.SourceNodeID=sn.NodeID
INNER JOIN VoipSites as vss ON res.SourceNodeID=vss.NodeID
WHERE res.VoipOperationTypeID=11
```
