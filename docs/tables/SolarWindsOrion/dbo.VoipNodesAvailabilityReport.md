# View: `dbo.VoipNodesAvailabilityReport`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SummaryDate` | datetime | YES |  |  |
| 2 | `NodeID` | int | NO |  |  |
| 3 | `NodeName` | nvarchar(255) | YES |  |  |
| 4 | `AVERAGEofAvailability` | float | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `DailyNodeAvailability` | VIEW |
| `Nodes` | VIEW |
| `VoipInfrastructureNodes` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[VoipNodesAvailabilityReport]
AS

SELECT
	SummaryDate,
	NodeID,
	NodeName,
	AVERAGEofAvailability
FROM
(
SELECT TOP 10000
	Convert(DateTime,Floor(Cast(DateTime as Float)),0) AS SummaryDate,
	Nodes.NodeID          AS NodeID,
	Nodes.Caption         AS NodeName,
	AVG(DNA.Availability) AS AVERAGEofAvailability

FROM VoipInfrastructureNodes InfraN

INNER JOIN Nodes ON InfraN.NodeID = Nodes.NodeID
INNER JOIN DailyNodeAvailability DNA ON InfraN.NodeID = DNA.NodeID

GROUP BY 
	Convert(DateTime,Floor(Cast(DateTime as Float)),0), 
	Nodes.Caption,
	Nodes.NodeID

ORDER BY SummaryDate DESC

) as r
```
