# View: `dbo.IpSlaOperationsMOS`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SummaryDate` | datetime | YES |  |  |
| 2 | `Source` | nvarchar(100) | NO |  |  |
| 3 | `Target` | nvarchar(250) | YES |  |  |
| 4 | `AverageofAvgMOS` | float | YES |  |  |
| 5 | `SourceNodeId` | int | NO |  |  |
| 6 | `TargetNodeId` | int | YES |  |  |
| 7 | `OperationId` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.VoIPOperationCurrentStats`](dbo.VoIPOperationCurrentStats.md) | VIEW |
| [`dbo.VoipOperationResults`](dbo.VoipOperationResults.md) | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[IpSlaOperationsMOS] AS

Select SummaryDate, Source, Cast(Target As nvarchar(250)) as Target, AverageofAvgMOS, SourceNodeId, TargetNodeId, OperationId
From ( SELECT  TOP 10000 Convert(DateTime,Floor(Cast((DateTime) as Float)),0) AS SummaryDate,
OperationCurrentStats_VoIPOperationCurrentStats.SourceSiteName AS Source,
OperationCurrentStats_VoIPOperationCurrentStats.DisplayTarget AS Target,
AVG(OperationResults_VoipOperationResults.AvgMOS) AS AverageofAvgMOS,
OperationCurrentStats_VoIPOperationCurrentStats.SourceNodeID AS SourceNodeId,
OperationCurrentStats_VoIPOperationCurrentStats.TargetNodeID AS TargetNodeId,
OperationCurrentStats_VoIPOperationCurrentStats.VoipOperationInstanceID AS OperationId 

FROM 
dbo.VoIPOperationCurrentStats OperationCurrentStats_VoIPOperationCurrentStats INNER JOIN dbo.VoipOperationResults OperationResults_VoipOperationResults ON 
(OperationCurrentStats_VoIPOperationCurrentStats.VoipOperationInstanceID = OperationResults_VoipOperationResults.VoipOperationInstanceID)

WHERE  (OperationCurrentStats_VoIPOperationCurrentStats.OperationTypeName = 'VoIP UDP Jitter')

GROUP BY Convert(DateTime,Floor(Cast((DateTime) as Float)),0), 
OperationCurrentStats_VoIPOperationCurrentStats.SourceSiteName, 
OperationCurrentStats_VoIPOperationCurrentStats.DisplayTarget, 
OperationCurrentStats_VoIPOperationCurrentStats.SourceNodeID, 
OperationCurrentStats_VoIPOperationCurrentStats.TargetNodeID, 
OperationCurrentStats_VoIPOperationCurrentStats.VoipOperationInstanceID

) As r
```
