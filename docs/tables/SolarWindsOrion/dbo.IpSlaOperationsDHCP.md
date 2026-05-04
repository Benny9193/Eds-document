# View: `dbo.IpSlaOperationsDHCP`

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
CREATE VIEW [dbo].[IpSlaOperationsDHCP] AS
Select SummaryDate,  Cast(OperationName As nvarchar(250)) as OperationName, 
MinRoundTripTime, AvgRoundTripTime, 
MaxRoundTripTime, TotalFailed, OperationId FROM 
( SELECT  TOP 10000 Convert(DateTime,Floor(Cast((DateTime) as Float)),0) AS SummaryDate,
OperationCurrentStats_VoIPOperationCurrentStats.OperationName AS OperationName,
MIN(OperationResults_VoipOperationResults.MinRoundTripTime) AS MinRoundTripTime,
AVG(OperationResults_VoipOperationResults.AvgRoundTripTime) AS AvgRoundTripTime,
MAX(OperationResults_VoipOperationResults.MaxRoundTripTime) AS MaxRoundTripTime,
SUM(OperationResults_VoipOperationResults.StatusCountDown) AS TotalFailed,
OperationCurrentStats_VoIPOperationCurrentStats.VoipOperationInstanceID AS OperationId 
FROM 
dbo.VoIPOperationCurrentStats OperationCurrentStats_VoIPOperationCurrentStats INNER JOIN dbo.VoipOperationResults OperationResults_VoipOperationResults ON 
(OperationCurrentStats_VoIPOperationCurrentStats.VoipOperationInstanceID = OperationResults_VoipOperationResults.VoipOperationInstanceID)
WHERE 
((OperationCurrentStats_VoIPOperationCurrentStats.OperationTypeName = 'DHCP'))
GROUP BY Convert(DateTime,Floor(Cast((DateTime) as Float)),0), 
OperationCurrentStats_VoIPOperationCurrentStats.OperationName, OperationCurrentStats_VoIPOperationCurrentStats.VoipOperationInstanceID
) As r
```
