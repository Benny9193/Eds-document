# View: `dbo.VoipOperationsUDPEcho`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SummaryDate` | datetime | YES |  |  |
| 2 | `SummaryMonth` | datetime | YES |  |  |
| 3 | `Operation_Name` | nvarchar(max) | YES |  |  |
| 4 | `Target_Port` | nvarchar(max) | YES |  |  |
| 5 | `MIN_of_Min_Round_Trip_Time` | int | YES |  |  |
| 6 | `AVERAGE_of_Avg_Round_Trip_Time` | int | YES |  |  |
| 7 | `MAX_of_Max_Round_Trip_Time` | int | YES |  |  |
| 8 | `SUM_of_Down_Count` | int | YES |  |  |
| 9 | `Operation_ID` | int | NO |  |  |

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
CREATE VIEW [dbo].[VoipOperationsUDPEcho]
AS
SELECT TOP 10000
	Convert(DateTime,Floor(Cast((DateTime) as Float)),0) AS SummaryDate,	
	Convert(DateTime, LTRIM(MONTH(DateTime)) + '/01/' + LTRIM(YEAR(DateTime)), 101) AS SummaryMonth,
	st.OperationName AS Operation_Name,
	params.TargetPort AS Target_Port,
	MIN(results.MinRoundTripTime) AS MIN_of_Min_Round_Trip_Time,
	AVG(results.AvgRoundTripTime) AS AVERAGE_of_Avg_Round_Trip_Time,
	MAX(results.MaxRoundTripTime) AS MAX_of_Max_Round_Trip_Time,
	SUM(results.StatusCountDown) AS SUM_of_Down_Count,
	st.VoipOperationInstanceID AS Operation_ID
FROM 
	([dbo].[VoIPOperationCurrentStats] st
		INNER JOIN [dbo].[VoipOperationParameterInfo] params
			ON (st.VoipOperationInstanceID = params.VoipOperationInstanceID))
		INNER JOIN [dbo].[VoipOperationResults] results
			ON (st.VoipOperationInstanceID = results.VoipOperationInstanceID
			AND params.VoipOperationInstanceID = results.VoipOperationInstanceID)
WHERE
	st.OperationTypeName = 'UDP Echo'
GROUP BY
	Convert(DateTime,Floor(Cast((DateTime) as Float)),0),
	Convert(DateTime, LTRIM(MONTH(DateTime)) + '/01/' + LTRIM(YEAR(DateTime)), 101), 
	st.OperationName,
	params.TargetPort,
	st.VoipOperationInstanceID
ORDER BY
	SummaryMonth ASC
```
