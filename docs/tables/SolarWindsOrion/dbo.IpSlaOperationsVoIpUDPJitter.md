# View: `dbo.IpSlaOperationsVoIpUDPJitter`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SummaryDate` | datetime | YES |  |  |
| 2 | `OperationName` | nvarchar(250) | YES |  |  |
| 3 | `Target_Port` | nvarchar(max) | YES |  |  |
| 4 | `MIN_of_Min_Latency` | float | YES |  |  |
| 5 | `AVERAGE_of_Avg_Latency` | float | YES |  |  |
| 6 | `MAX_of_Max_Latency` | float | YES |  |  |
| 7 | `MIN_of_Min_MOS` | float | YES |  |  |
| 8 | `AVERAGE_of_Avg_MOS` | float | YES |  |  |
| 9 | `MAX_of_Max_MOS` | float | YES |  |  |
| 10 | `MIN_of_Min_Packet_Loss` | float | YES |  |  |
| 11 | `AVERAGE_of_Avg_Packet_Loss` | float | YES |  |  |
| 12 | `MAX_of_Max_Packet_Loss` | float | YES |  |  |
| 13 | `MIN_of_Min_Jitter` | float | YES |  |  |
| 14 | `AVERAGE_of_Avg_Jitter` | float | YES |  |  |
| 15 | `MAX_of_Max_Jitter` | float | YES |  |  |
| 16 | `MAX_of_Max_Jitter_Source_to_Destination` | float | YES |  |  |
| 17 | `AVERAGE_of_Avg_Jitter_Source_to_Destination` | float | YES |  |  |
| 18 | `MAX_of_Max_Jitter_Destination_to_Source` | float | YES |  |  |
| 19 | `AVERAGE_of_Avg_Jitter_Destination_to_Source` | float | YES |  |  |
| 20 | `SUM_of_Down_Count` | int | YES |  |  |
| 21 | `OperationId` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VoIPOperationCurrentStats` | VIEW |
| `VoipOperationParameterInfo` | VIEW |
| `VoipOperationResults` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[IpSlaOperationsVoIpUDPJitter] AS 
	SELECT 
		SummaryDate,
		Cast(OperationName As nvarchar(250)) as OperationName,
		Target_Port,
		MIN_of_Min_Latency,
		AVERAGE_of_Avg_Latency,
		MAX_of_Max_Latency,
		MIN_of_Min_MOS,
		AVERAGE_of_Avg_MOS,
		MAX_of_Max_MOS,
		MIN_of_Min_Packet_Loss,
		AVERAGE_of_Avg_Packet_Loss,
		MAX_of_Max_Packet_Loss,
		MIN_of_Min_Jitter,
		AVERAGE_of_Avg_Jitter,
		MAX_of_Max_Jitter,
		MAX_of_Max_Jitter_Source_to_Destination,
		AVERAGE_of_Avg_Jitter_Source_to_Destination,
		MAX_of_Max_Jitter_Destination_to_Source,
		AVERAGE_of_Avg_Jitter_Destination_to_Source,
		SUM_of_Down_Count,
		OperationId
	FROM
	(SELECT  TOP 10000
		Convert(DateTime,Floor(Cast((DateTime) as Float)),0) AS SummaryDate,
		OperationCurrentStats_VoIPOperationCurrentStats.OperationName AS OperationName,
		OperationParameterInfo_VoipOperationParameterInfo.TargetPort AS Target_Port,
		MIN(OperationResults_VoipOperationResults.MinLatency) AS MIN_of_Min_Latency,
		AVG(OperationResults_VoipOperationResults.AvgLatency) AS AVERAGE_of_Avg_Latency,
		MAX(OperationResults_VoipOperationResults.MaxLatency) AS MAX_of_Max_Latency,
		MIN(OperationResults_VoipOperationResults.MinMOS) AS MIN_of_Min_MOS,
		AVG(OperationResults_VoipOperationResults.AvgMOS) AS AVERAGE_of_Avg_MOS,
		MAX(OperationResults_VoipOperationResults.MaxMOS) AS MAX_of_Max_MOS,
		MIN(OperationResults_VoipOperationResults.MinPacketLoss) AS MIN_of_Min_Packet_Loss,
		AVG(OperationResults_VoipOperationResults.AvgPacketLoss) AS AVERAGE_of_Avg_Packet_Loss,
		MAX(OperationResults_VoipOperationResults.MaxPacketLoss) AS MAX_of_Max_Packet_Loss,
		MIN(OperationResults_VoipOperationResults.MinJitter) AS MIN_of_Min_Jitter,
		AVG(OperationResults_VoipOperationResults.AvgJitter) AS AVERAGE_of_Avg_Jitter,
		MAX(OperationResults_VoipOperationResults.MaxJitter) AS MAX_of_Max_Jitter,
		MAX(OperationResults_VoipOperationResults.MaxJitterSD) AS MAX_of_Max_Jitter_Source_to_Destination,
		AVG(OperationResults_VoipOperationResults.AvgJitterSD) AS AVERAGE_of_Avg_Jitter_Source_to_Destination,
		MAX(OperationResults_VoipOperationResults.MaxJitterDS) AS MAX_of_Max_Jitter_Destination_to_Source,
		AVG(OperationResults_VoipOperationResults.AvgJitterDS) AS AVERAGE_of_Avg_Jitter_Destination_to_Source,
		SUM(OperationResults_VoipOperationResults.StatusCountDown) AS SUM_of_Down_Count,
		OperationCurrentStats_VoIPOperationCurrentStats.VoipOperationInstanceID AS OperationId
	FROM 
		VoIPOperationCurrentStats OperationCurrentStats_VoIPOperationCurrentStats 
		INNER JOIN VoipOperationParameterInfo OperationParameterInfo_VoipOperationParameterInfo 
		ON OperationCurrentStats_VoIPOperationCurrentStats.VoipOperationInstanceID = OperationParameterInfo_VoipOperationParameterInfo.VoipOperationInstanceID 
		INNER JOIN VoipOperationResults OperationResults_VoipOperationResults 
		ON (OperationCurrentStats_VoIPOperationCurrentStats.VoipOperationInstanceID = OperationResults_VoipOperationResults.VoipOperationInstanceID 
		AND OperationParameterInfo_VoipOperationParameterInfo.VoipOperationInstanceID = OperationResults_VoipOperationResults.VoipOperationInstanceID)
	WHERE 
		OperationCurrentStats_VoIPOperationCurrentStats.OperationTypeName = 'VoIP UDP Jitter'
	GROUP BY 
		Convert(DateTime,Floor(Cast((DateTime) as Float)),0), 
		OperationCurrentStats_VoIPOperationCurrentStats.OperationName, 
		OperationParameterInfo_VoipOperationParameterInfo.TargetPort, 
		OperationCurrentStats_VoIPOperationCurrentStats.VoipOperationInstanceID	
	ORDER BY
		Convert(DateTime,Floor(Cast((DateTime) as Float)),0) DESC
	) as r
```
