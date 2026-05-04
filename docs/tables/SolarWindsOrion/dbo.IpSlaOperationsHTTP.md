# View: `dbo.IpSlaOperationsHTTP`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SummaryDate` | datetime | YES |  |  |
| 2 | `OperationName` | nvarchar(250) | YES |  |  |
| 3 | `MIN_of_Min_HTTP_Round_Trip_Time` | int | YES |  |  |
| 4 | `AVERAGE_of_Avg_HTTP_Round_Trip_Time` | int | YES |  |  |
| 5 | `MAX_of_Max_HTTP_Round_TripTime` | int | YES |  |  |
| 6 | `MIN_of_Min_DNS_Round_Trip_Time` | int | YES |  |  |
| 7 | `AVERAGE_of_Avg_DNS_Round_Trip_Time` | int | YES |  |  |
| 8 | `MAX_of_Max_DNS_Round_Trip_Time` | int | YES |  |  |
| 9 | `MIN_of_Min_TCP_Connect_Round_Trip_Time` | int | YES |  |  |
| 10 | `AVERAGE_of_Avg_TCP_Connect_Round_Trip_Time` | int | YES |  |  |
| 11 | `MAX_of_Max_TCP_Connect_Round_Trip_Time` | int | YES |  |  |
| 12 | `TotalFailed` | int | YES |  |  |
| 13 | `OperationID` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.VoIPOperationCurrentStats`](dbo.VoIPOperationCurrentStats.md) | VIEW |
| [`dbo.VoipOperationResults`](dbo.VoipOperationResults.md) | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[IpSlaOperationsHTTP] AS

Select SummaryDate,  Cast(OperationName As nvarchar(250)) as OperationName, 
MIN_of_Min_HTTP_Round_Trip_Time, 
AVERAGE_of_Avg_HTTP_Round_Trip_Time, 
MAX_of_Max_HTTP_Round_TripTime, 
MIN_of_Min_DNS_Round_Trip_Time, 
AVERAGE_of_Avg_DNS_Round_Trip_Time, 
MAX_of_Max_DNS_Round_Trip_Time, 
MIN_of_Min_TCP_Connect_Round_Trip_Time, 
AVERAGE_of_Avg_TCP_Connect_Round_Trip_Time, 
MAX_of_Max_TCP_Connect_Round_Trip_Time, 
TotalFailed, OperationID 
From 
( SELECT  TOP 10000 Convert(DateTime,Floor(Cast((DateTime) as Float)),0) AS SummaryDate,
OperationCurrentStats_VoIPOperationCurrentStats.OperationName AS OperationName,
MIN(OperationResults_VoipOperationResults.MinHttpRtt) AS MIN_of_Min_HTTP_Round_Trip_Time,
AVG(OperationResults_VoipOperationResults.AvgHttpRtt) AS AVERAGE_of_Avg_HTTP_Round_Trip_Time,
MAX(OperationResults_VoipOperationResults.MaxHttpRtt) AS MAX_of_Max_HTTP_Round_TripTime,
MIN(OperationResults_VoipOperationResults.MinDnsRtt) AS MIN_of_Min_DNS_Round_Trip_Time,
AVG(OperationResults_VoipOperationResults.AvgDnsRtt) AS AVERAGE_of_Avg_DNS_Round_Trip_Time,
MAX(OperationResults_VoipOperationResults.MaxDnsRtt) AS MAX_of_Max_DNS_Round_Trip_Time,
MIN(OperationResults_VoipOperationResults.MinTcpConnectRtt) AS MIN_of_Min_TCP_Connect_Round_Trip_Time,
AVG(OperationResults_VoipOperationResults.AvgTcpConnectRtt) AS AVERAGE_of_Avg_TCP_Connect_Round_Trip_Time,
MAX(OperationResults_VoipOperationResults.MaxTcpConnectRtt) AS MAX_of_Max_TCP_Connect_Round_Trip_Time,
SUM(OperationResults_VoipOperationResults.StatusCountDown) AS TotalFailed,
OperationCurrentStats_VoIPOperationCurrentStats.VoipOperationInstanceID AS OperationID 

FROM 
dbo.VoIPOperationCurrentStats OperationCurrentStats_VoIPOperationCurrentStats INNER JOIN dbo.VoipOperationResults OperationResults_VoipOperationResults ON 
(OperationCurrentStats_VoIPOperationCurrentStats.VoipOperationInstanceID = OperationResults_VoipOperationResults.VoipOperationInstanceID)

WHERE (OperationCurrentStats_VoIPOperationCurrentStats.OperationTypeName = 'HTTP')
GROUP BY Convert(DateTime,Floor(Cast((DateTime) as Float)),0), 
OperationCurrentStats_VoIPOperationCurrentStats.OperationName, OperationCurrentStats_VoIPOperationCurrentStats.VoipOperationInstanceID
) As r
```
