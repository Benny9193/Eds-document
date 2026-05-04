# View: `dbo.VoipOperationsICMPEcho`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SummaryDate` | datetime | YES |  |  |
| 2 | `SummaryMonth` | datetime | YES |  |  |
| 3 | `Operation_Name` | nvarchar(250) | YES |  |  |
| 4 | `MIN_of_Min_Round_Trip_Time` | int | YES |  |  |
| 5 | `AVERAGE_of_Avg_Round_Trip_Time` | int | YES |  |  |
| 6 | `MAX_of_Max_Round_Trip_Time` | int | YES |  |  |
| 7 | `SUM_of_Down_Count` | int | YES |  |  |
| 8 | `Operation_ID` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.VoIPOperationCurrentStats`](dbo.VoIPOperationCurrentStats.md) | VIEW |
| [`dbo.VoipOperationResults`](dbo.VoipOperationResults.md) | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[VoipOperationsICMPEcho] AS
SELECT
	SummaryDate,
	SummaryMonth,
	Cast(Operation_Name As nvarchar(250)) as Operation_Name,
	MIN_of_Min_Round_Trip_Time,
	AVERAGE_of_Avg_Round_Trip_Time,
	MAX_of_Max_Round_Trip_Time,
	SUM_of_Down_Count,
	Operation_ID
FROM
	(SELECT	TOP 10000
		Convert(DateTime,Floor(Cast((DateTime) as Float)),0) AS SummaryDate,
		Convert(DateTime,LTRIM(MONTH(DateTime)) + '/01/' + LTRIM(YEAR(DateTime)),101) AS SummaryMonth,
		st.OperationName AS Operation_Name,
		MIN(results.MinRoundTripTime) AS MIN_of_Min_Round_Trip_Time,
		AVG(results.AvgRoundTripTime) AS AVERAGE_of_Avg_Round_Trip_Time,
		MAX(results.MaxRoundTripTime) AS MAX_of_Max_Round_Trip_Time,
		SUM(results.StatusCountDown) AS SUM_of_Down_Count,
		st.VoipOperationInstanceID AS Operation_ID 
	FROM 
		[dbo].[VoIPOperationCurrentStats] st
			INNER JOIN [dbo].[VoipOperationResults] results
				ON (st.VoipOperationInstanceID = results.VoipOperationInstanceID)
	WHERE 
		st.OperationTypeName = 'ICMP Echo'	
	GROUP BY
		Convert(DateTime,Floor(Cast((DateTime) as Float)),0), 
		CONVERT(DateTime, LTRIM(MONTH(DateTime)) + '/01/' + LTRIM(YEAR(DateTime)), 101), 
		st.OperationName,
		st.VoipOperationInstanceID
	) AS R
```
