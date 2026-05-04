# View: `dbo.VoipCallPathMetrics`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SourceSiteName` | nvarchar(100) | NO |  |  |
| 2 | `DestSiteName` | nvarchar(100) | NO |  |  |
| 3 | `SourceSiteID` | int | NO |  |  |
| 4 | `DestSiteID` | int | NO |  |  |
| 5 | `DateTime` | datetime | YES |  |  |
| 6 | `MOS` | float | YES |  |  |
| 7 | `Jitter` | float | YES |  |  |
| 8 | `Latency` | float | YES |  |  |
| 9 | `PacketLoss` | float | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VoipOperationResults` | VIEW |
| `VoipSites` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW dbo.[VoipCallPathMetrics]
AS

SELECT
	vss.Name as SourceSiteName,
	vds.Name as DestSiteName,
	vss.VoipSiteID as SourceSiteID,
	vds.VoipSiteID as DestSiteID,
	res.RecordTime as DateTime,
	res.AvgMOS as MOS,
	res.AvgJitter as Jitter,
	res.AvgLatency as Latency,
	res.AvgPacketLoss as PacketLoss
FROM VoipOperationResults as res
INNER JOIN VoipSites as vss ON res.SourceNodeID=vss.NodeID
INNER JOIN VoipSites as vds ON res.TargetNodeID=vds.NodeID
WHERE res.VoipOperationTypeID=11
```
