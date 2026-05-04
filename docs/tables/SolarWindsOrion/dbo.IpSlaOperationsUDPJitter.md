# View: `dbo.IpSlaOperationsUDPJitter`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SummaryDate` | datetime | YES |  |  |
| 2 | `OperationName` | nvarchar(250) | YES |  |  |
| 3 | `Target_Port` | nvarchar(max) | YES |  |  |
| 4 | `AVERAGE_of_Avg_Latency` | float | YES |  |  |
| 5 | `MAX_of_Max_Latency` | float | YES |  |  |
| 6 | `AVERAGE_of_Avg_One_Way_Delay_Source_to_Destination` | float | YES |  |  |
| 7 | `MAX_of_Max_One_Way_Delay_Source_to_Destination` | float | YES |  |  |
| 8 | `AVERAGE_of_Avg_One_Way_Delay_Destination_to_Source` | float | YES |  |  |
| 9 | `MAX_of_Max_One_Way_Delay_Destination_to_Source` | float | YES |  |  |
| 10 | `AVERAGE_of_Avg_Jitter_Source_to_Destination` | float | YES |  |  |
| 11 | `MAX_of_Max_Jitter_Source_to_Destination` | float | YES |  |  |
| 12 | `AVERAGE_of_Avg_Jitter_Destination_to_Source` | float | YES |  |  |
| 13 | `MAX_of_Max_Jitter_Destination_to_Source` | float | YES |  |  |
| 14 | `SUM_of_Down_Count` | int | YES |  |  |
| 15 | `OperationId` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.VoIPOperationCurrentStats`](dbo.VoIPOperationCurrentStats.md) | VIEW |
| [`dbo.VoipOperationParameterInfo`](dbo.VoipOperationParameterInfo.md) | VIEW |
| [`dbo.VoipOperationResults`](dbo.VoipOperationResults.md) | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[IpSlaOperationsUDPJitter] AS 
	SELECT 
		SummaryDate,
		Cast(OperationName As nvarchar(250)) as OperationName,
		Target_Port,
		AVERAGE_of_Avg_Latency,
		MAX_of_Max_Latency,
		AVERAGE_of_Avg_One_Way_Delay_Source_to_Destination,
		MAX_of_Max_One_Way_Delay_Source_to_Destination,
		AVERAGE_of_Avg_One_Way_Delay_Destination_to_Source,
		MAX_of_Max_One_Way_Delay_Destination_to_Source,
		AVERAGE_of_Avg_Jitter_Source_to_Destination,
		MAX_of_Max_Jitter_Source_to_Destination,
		AVERAGE_of_Avg_Jitter_Destination_to_Source,
		MAX_of_Max_Jitter_Destination_to_Source,
		SUM_of_Down_Count,
		OperationId
	FROM
	(
	SELECT  TOP 10000
		Convert(DateTime,Floor(Cast((DateTime) as Float)),0) AS SummaryDate,
		OperationCurrentStats_VoIPOperationCurrentStats.OperationName AS OperationName,
		OperationParameterInfo_VoipOperationParameterInfo.TargetPort AS Target_Port,
		AVG(OperationResults_VoipOperationResults.AvgLatency) AS AVERAGE_of_Avg_Latency,
		MAX(OperationResults_VoipOperationResults.MaxLatency) AS MAX_of_Max_Latency,
		AVG(OperationResults_VoipOperationResults.AvgOneWayDelaySD) AS AVERAGE_of_Avg_One_Way_Delay_Source_to_Destination,
		MAX(OperationResults_VoipOperationResults.MaxOneWayDelaySD) AS MAX_of_Max_One_Way_Delay_Source_to_Destination,
		AVG(OperationResults_VoipOperationResults.AvgOneWayDelayDS) AS AVERAGE_of_Avg_One_Way_Delay_Destination_to_Source,
		MAX(OperationResults_VoipOperationResults.MaxOneWayDelayDS) AS MAX_of_Max_One_Way_Delay_Destination_to_Source,
		AVG(OperationResults_VoipOperationResults.AvgJitterSD) AS AVERAGE_of_Avg_Jitter_Source_to_Destination,
		MAX(OperationResults_VoipOperationResults.MaxJitterSD) AS MAX_of_Max_Jitter_Source_to_Destination,
		AVG(OperationResults_VoipOperationResults.AvgJitterDS) AS AVERAGE_of_Avg_Jitter_Destination_to_Source,
		MAX(OperationResults_VoipOperationResults.MaxJitterDS) AS MAX_of_Max_Jitter_Destination_to_Source,
		SUM(OperationResults_VoipOperationResults.StatusCountDown) AS SUM_of_Down_Count,
		OperationCurrentStats_VoIPOperationCurrentStats.VoipOperationInstanceID AS OperationId
	FROM 
		dbo.VoIPOperationCurrentStats OperationCurrentStats_VoIPOperationCurrentStats 
		INNER JOIN dbo.VoipOperationParameterInfo OperationParameterInfo_VoipOperationParameterInfo 
		ON (OperationCurrentStats_VoIPOperationCurrentStats.VoipOperationInstanceID = OperationParameterInfo_VoipOperationParameterInfo.VoipOperationInstanceID) 
		INNER JOIN dbo.VoipOperationResults OperationResults_VoipOperationResults 
		ON (OperationCurrentStats_VoIPOperationCurrentStats.VoipOperationInstanceID = OperationResults_VoipOperationResults.VoipOperationInstanceID 
		AND OperationParameterInfo_VoipOperationParameterInfo.VoipOperationInstanceID = OperationResults_VoipOperationResults.VoipOperationInstanceID)
	WHERE 
		OperationCurrentStats_VoIPOperationCurrentStats.OperationTypeName = 'UDP Jitter'
	GROUP BY 
		Convert(DateTime,Floor(Cast((DateTime) as Float)),0), 
		OperationCurrentStats_VoIPOperationCurrentStats.OperationName, 
		OperationParameterInfo_VoipOperationParameterInfo.TargetPort, 
		OperationCurrentStats_VoIPOperationCurrentStats.VoipOperationInstanceID	
	ORDER BY
		Convert(DateTime,Floor(Cast((DateTime) as Float)),0) DESC
	) as r
```
