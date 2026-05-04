# View: `dbo.IpSlaOperationsJitter`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SummaryDate` | datetime | YES |  |  |
| 2 | `Source_Site_Name` | nvarchar(100) | NO |  |  |
| 3 | `Display_Target` | nvarchar(max) | YES |  |  |
| 4 | `AVERAGE_of_Avg_Jitter` | float | YES |  |  |
| 5 | `Source_Node_ID` | int | NO |  |  |
| 6 | `Target_Node_ID` | int | YES |  |  |
| 7 | `AVERAGE_of_Avg_Jitter_Source_to_Destination` | float | YES |  |  |
| 8 | `AVERAGE_of_Avg_Jitter_Destination_to_Source` | float | YES |  |  |
| 9 | `Operation_ID` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VoIPOperationCurrentStats` | VIEW |
| `VoipOperationResults` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[IpSlaOperationsJitter] AS 
	SELECT 
		SummaryDate,
		Source_Site_Name,
		Display_Target,
		AVERAGE_of_Avg_Jitter,
		Source_Node_ID,
		Target_Node_ID,
		AVERAGE_of_Avg_Jitter_Source_to_Destination,
		AVERAGE_of_Avg_Jitter_Destination_to_Source,
		Operation_ID
	FROM
	(
	SELECT  TOP 10000 
		Convert(DateTime,Floor(Cast((DateTime) as Float)),0) AS SummaryDate,
		OperationCurrentStats_VoIPOperationCurrentStats.SourceSiteName AS Source_Site_Name,
		OperationCurrentStats_VoIPOperationCurrentStats.DisplayTarget AS Display_Target,
		AVG(OperationResults_VoipOperationResults.AvgJitter) AS AVERAGE_of_Avg_Jitter,
		OperationCurrentStats_VoIPOperationCurrentStats.SourceNodeID AS Source_Node_ID,
		OperationCurrentStats_VoIPOperationCurrentStats.TargetNodeID AS Target_Node_ID,
		AVG(OperationResults_VoipOperationResults.AvgJitterSD) AS AVERAGE_of_Avg_Jitter_Source_to_Destination,
		AVG(OperationResults_VoipOperationResults.AvgJitterDS) AS AVERAGE_of_Avg_Jitter_Destination_to_Source,
		OperationCurrentStats_VoIPOperationCurrentStats.VoipOperationInstanceID AS Operation_ID
	FROM 
		VoIPOperationCurrentStats OperationCurrentStats_VoIPOperationCurrentStats 
		INNER JOIN VoipOperationResults OperationResults_VoipOperationResults 
		ON (OperationCurrentStats_VoIPOperationCurrentStats.VoipOperationInstanceID = OperationResults_VoipOperationResults.VoipOperationInstanceID)
	WHERE
		(OperationCurrentStats_VoIPOperationCurrentStats.OperationTypeName = 'VoIP UDP Jitter') OR 
		(OperationCurrentStats_VoIPOperationCurrentStats.OperationTypeName = 'UDP Jitter') OR 
		(OperationCurrentStats_VoIPOperationCurrentStats.OperationTypeName = 'ICMP Path Jitter')
	GROUP BY 
		Convert(DateTime,Floor(Cast((DateTime) as Float)),0), 
		OperationCurrentStats_VoIPOperationCurrentStats.SourceSiteName, 
		OperationCurrentStats_VoIPOperationCurrentStats.DisplayTarget, 
		OperationCurrentStats_VoIPOperationCurrentStats.SourceNodeID, 
		OperationCurrentStats_VoIPOperationCurrentStats.TargetNodeID, 
		OperationCurrentStats_VoIPOperationCurrentStats.VoipOperationInstanceID
	ORDER BY
		Convert(DateTime,Floor(Cast((DateTime) as Float)),0) DESC
	) as r
```
