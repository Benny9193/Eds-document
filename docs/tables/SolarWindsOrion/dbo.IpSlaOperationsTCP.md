# View: `dbo.IpSlaOperationsTCP`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SummaryDate` | datetime | YES |  |  |
| 2 | `OperationName` | nvarchar(250) | YES |  |  |
| 3 | `TargetPort` | nvarchar(250) | YES |  |  |
| 4 | `MinRoundTripTime` | int | YES |  |  |
| 5 | `AvgRoundTripTime` | int | YES |  |  |
| 6 | `MaxRoundTripTime` | int | YES |  |  |
| 7 | `TotalFailed` | int | YES |  |  |
| 8 | `OperationId` | int | NO |  |  |

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
CREATE VIEW [dbo].[IpSlaOperationsTCP] AS

Select SummaryDate, Cast(OperationName As nvarchar(250)) as OperationName,  
Cast(TargetPort As nvarchar(250)) as TargetPort, 
MinRoundTripTime, AvgRoundTripTime, MaxRoundTripTime, TotalFailed, 
OperationId From ( SELECT  TOP 10000 Convert(DateTime,Floor(Cast((DateTime) as Float)),0) AS SummaryDate,
OperationCurrentStats_VoIPOperationCurrentStats.OperationName AS OperationName,
OperationParameterInfo_VoipOperationParameterInfo.TargetPort AS TargetPort,
MIN(OperationResults_VoipOperationResults.MinRoundTripTime) AS MinRoundTripTime,
AVG(OperationResults_VoipOperationResults.AvgRoundTripTime) AS AvgRoundTripTime,
MAX(OperationResults_VoipOperationResults.MaxRoundTripTime) AS MaxRoundTripTime,
SUM(OperationResults_VoipOperationResults.StatusCountDown) AS TotalFailed,
OperationCurrentStats_VoIPOperationCurrentStats.VoipOperationInstanceID AS OperationId 

FROM 
(dbo.VoIPOperationCurrentStats OperationCurrentStats_VoIPOperationCurrentStats INNER JOIN dbo.VoipOperationParameterInfo OperationParameterInfo_VoipOperationParameterInfo ON 
(OperationCurrentStats_VoIPOperationCurrentStats.VoipOperationInstanceID = OperationParameterInfo_VoipOperationParameterInfo.VoipOperationInstanceID))  
INNER JOIN dbo.VoipOperationResults OperationResults_VoipOperationResults 
ON (OperationCurrentStats_VoIPOperationCurrentStats.VoipOperationInstanceID = OperationResults_VoipOperationResults.VoipOperationInstanceID 
AND OperationParameterInfo_VoipOperationParameterInfo.VoipOperationInstanceID = OperationResults_VoipOperationResults.VoipOperationInstanceID)


WHERE  OperationCurrentStats_VoIPOperationCurrentStats.OperationTypeName = 'TCP Connect'

GROUP BY Convert(DateTime,Floor(Cast((DateTime) as Float)),0), 
OperationCurrentStats_VoIPOperationCurrentStats.OperationName, OperationParameterInfo_VoipOperationParameterInfo.TargetPort, OperationCurrentStats_VoIPOperationCurrentStats.VoipOperationInstanceID

) As r
```
