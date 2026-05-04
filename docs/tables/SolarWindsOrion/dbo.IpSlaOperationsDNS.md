# View: `dbo.IpSlaOperationsDNS`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SummaryDate` | datetime | YES |  |  |
| 2 | `OperationName` | nvarchar(250) | YES |  |  |
| 3 | `MinRoundTripTime` | int | YES |  |  |
| 4 | `AvgRoundTripTime` | int | YES |  |  |
| 5 | `MaxRoundTripTime` | int | YES |  |  |
| 6 | `TotalFailed` | int | YES |  |  |
| 7 | `Hostname` | nvarchar(max) | YES |  |  |
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
CREATE VIEW [dbo].[IpSlaOperationsDNS] AS
Select SummaryDate,  Cast(OperationName As nvarchar(250)) as OperationName, 
MinRoundTripTime, AvgRoundTripTime, 
MaxRoundTripTime, TotalFailed,Hostname, OperationId 
FROM 
(SELECT  TOP 10000 Convert(DateTime,Floor(Cast((DateTime) as Float)),0) AS SummaryDate,
OperationCurrentStats_VoIPOperationCurrentStats.OperationName AS OperationName,
OperationParameterInfo_VoipOperationParameterInfo.DnsHostName AS Hostname,
MIN(OperationResults_VoipOperationResults.MinRoundTripTime) AS MinRoundTripTime,
AVG(OperationResults_VoipOperationResults.AvgRoundTripTime) AS AvgRoundTripTime,
MAX(OperationResults_VoipOperationResults.MaxRoundTripTime) AS MaxRoundTripTime,
SUM(OperationResults_VoipOperationResults.StatusCountDown) AS TotalFailed,
OperationCurrentStats_VoIPOperationCurrentStats.VoipOperationInstanceID AS OperationId

FROM 
dbo.VoIPOperationCurrentStats OperationCurrentStats_VoIPOperationCurrentStats 
INNER JOIN 
dbo.VoipOperationParameterInfo OperationParameterInfo_VoipOperationParameterInfo 
ON (OperationCurrentStats_VoIPOperationCurrentStats.VoipOperationInstanceID = OperationParameterInfo_VoipOperationParameterInfo.VoipOperationInstanceID)
INNER JOIN 
dbo.VoipOperationResults OperationResults_VoipOperationResults 
ON (OperationCurrentStats_VoIPOperationCurrentStats.VoipOperationInstanceID = OperationResults_VoipOperationResults.VoipOperationInstanceID 
AND OperationParameterInfo_VoipOperationParameterInfo.VoipOperationInstanceID = OperationResults_VoipOperationResults.VoipOperationInstanceID)


WHERE 
(
  OperationCurrentStats_VoIPOperationCurrentStats.OperationTypeName = 'DNS'
)


GROUP BY Convert(DateTime,Floor(Cast((DateTime) as Float)),0), 
OperationCurrentStats_VoIPOperationCurrentStats.OperationName, OperationParameterInfo_VoipOperationParameterInfo.DnsHostName, OperationCurrentStats_VoIPOperationCurrentStats.VoipOperationInstanceID
ORDER BY
	Convert(DateTime,Floor(Cast((DateTime) as Float)),0) DESC
) as r
```
