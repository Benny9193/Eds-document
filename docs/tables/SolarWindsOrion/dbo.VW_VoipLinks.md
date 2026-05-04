# View: `dbo.VW_VoipLinks`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SourceVoipSiteID` | int | NO |  |  |
| 2 | `DestVoipSiteID` | int | NO |  |  |
| 3 | `SourceSiteName` | nvarchar(100) | NO |  |  |
| 4 | `DestSiteName` | nvarchar(100) | NO |  |  |
| 5 | `SourceNodeID` | int | NO |  |  |
| 6 | `DestNodeID` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VoipOperationInstances` | USER_TABLE |
| `VoipSites` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW dbo.[VW_VoipLinks]
AS

SELECT
	vss.VoipSiteID as SourceVoipSiteID,
	vds.VoipSiteID as DestVoipSiteID,
	vss.Name as SourceSiteName,
	vds.Name as DestSiteName,
	voi.SourceNodeID,
	voi.TargetNodeID as DestNodeID
FROM VoipOperationInstances as voi
INNER JOIN VoipSites as vss ON voi.SourceNodeID=vss.NodeID
INNER JOIN VoipSites as vds ON voi.TargetNodeID=vds.NodeID
WHERE voi.VoipOperationTypeID=11 AND voi.VoipOperationStateID<>6 AND voi.Deleted=0
```
