# View: `dbo.VoipCallManagerStats`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `Caption` | nvarchar(255) | YES |  |  |
| 3 | `DateTime` | datetime | NO |  |  |
| 4 | `RegisteredPhones` | int | YES |  |  |
| 5 | `UnRegisteredPhones` | int | YES |  |  |
| 6 | `RejectedPhones` | int | YES |  |  |
| 7 | `TotalPhones` | int | YES |  |  |
| 8 | `RegisteredGateways` | int | YES |  |  |
| 9 | `UnRegisteredGateways` | int | YES |  |  |
| 10 | `RejectedGateways` | int | YES |  |  |
| 11 | `TotalGateways` | int | YES |  |  |
| 12 | `RegisteredPhonesPercentage` | float | YES |  |  |
| 13 | `ActivePhonesPercentage` | float | YES |  |  |
| 14 | `UnRegisteredPhonesPercentage` | float | YES |  |  |
| 15 | `InactivePhonesPercentage` | float | YES |  |  |
| 16 | `RejectedPhonesPercentage` | float | YES |  |  |
| 17 | `RegisteredGatewaysPercentage` | float | YES |  |  |
| 18 | `ActiveGatewaysPercentage` | float | YES |  |  |
| 19 | `UnRegisteredGatewaysPercentage` | float | YES |  |  |
| 20 | `InactiveGatewaysPercentage` | float | YES |  |  |
| 21 | `RejectedGatewaysPercentage` | float | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Nodes`](dbo.Nodes.md) | VIEW |
| [`dbo.VoipCCMStats`](dbo.VoipCCMStats.md) | VIEW |

## Used by

| Object | Type |
|--------|------|
| [`dbo.VoipCallManagerAlertStats`](dbo.VoipCallManagerAlertStats.md) | VIEW |

## Definition

```sql
CREATE VIEW [dbo].[VoipCallManagerStats]
AS
SELECT     dbo.Nodes.NodeID, Caption, RecordTime AS DateTime, AvgRegisteredPhones as RegisteredPhones, AvgUnRegisteredPhones as UnRegisteredPhones, AvgRejectedPhones as RejectedPhones, AvgRegisteredPhones + AvgUnRegisteredPhones + AvgRejectedPhones AS TotalPhones, 
                AvgRegisteredGateways as RegisteredGateways, AvgUnRegisteredGateways as UnRegisteredGateways, AvgRejectedGateways as RejectedGateways, AvgRegisteredGateways + AvgUnRegisteredGateways + AvgRejectedGateways AS TotalGateways, 
				CASE when (isnull(AvgRegisteredPhones,0) + isnull(AvgUnRegisteredPhones,0) + isnull(AvgRejectedPhones,0)) = 0 then 0 else Round(cast(isnull(AvgRegisteredPhones,0) as float) / (cast((isnull(AvgRegisteredPhones,0) + isnull(AvgUnRegisteredPhones,0) + isnull(AvgRejectedPhones,0)) as float)) * 100.0, 2) END as RegisteredPhonesPercentage, 
				CASE when (isnull(AvgRegisteredPhones,0) + isnull(AvgUnRegisteredPhones,0) + isnull(AvgRejectedPhones,0)) = 0 then 0 else Round(cast(isnull(AvgRegisteredPhones,0) as float) / (cast((isnull(AvgRegisteredPhones,0) + isnull(AvgUnRegisteredPhones,0) + isnull(AvgRejectedPhones,0)) as float)) * 100.0, 2) END as ActivePhonesPercentage, 
				CASE when (isnull(AvgRegisteredPhones,0) + isnull(AvgUnRegisteredPhones,0) + isnull(AvgRejectedPhones,0)) = 0 then 0 else Round(cast(isnull(AvgUnRegisteredPhones,0) as float) / (cast((isnull(AvgRegisteredPhones,0) + isnull(AvgUnRegisteredPhones,0) + isnull(AvgRejectedPhones,0)) as float)) * 100.0, 2) END as UnRegisteredPhonesPercentage, 
				CASE when (isnull(AvgRegisteredPhones,0) + isnull(AvgUnRegisteredPhones,0) + isnull(AvgRejectedPhones,0)) = 0 then 0 else Round(cast(isnull(AvgUnRegisteredPhones,0) as float) / (cast((isnull(AvgRegisteredPhones,0) + isnull(AvgUnRegisteredPhones,0) + isnull(AvgRejectedPhones,0)) as float)) * 100.0, 2) END as InactivePhonesPercentage, 
				CASE when (isnull(AvgRegisteredPhones,0) + isnull(AvgUnRegisteredPhones,0) + isnull(AvgRejectedPhones,0)) = 0 then 0 else Round(cast(isnull(AvgRejectedPhones,0) as float) / (cast((isnull(AvgRegisteredPhones,0) + isnull(AvgUnRegisteredPhones,0) + isnull(AvgRejectedPhones,0)) as float)) * 100.0, 2) END as RejectedPhonesPercentage, 
				CASE when (isnull(AvgRegisteredGateways,0) + isnull(AvgUnRegisteredGateways,0) + isnull(AvgRejectedGateways,0)) = 0 then 0 else Round(cast(isnull(AvgRegisteredGateways,0) as float) / (cast((isnull(AvgRegisteredGateways,0) + isnull(AvgUnRegisteredGateways,0) + isnull(AvgRejectedGateways,0)) as float)) * 100.0, 2) END as RegisteredGatewaysPercentage, 
				CASE when (isnull(AvgRegisteredGateways,0) + isnull(AvgUnRegisteredGateways,0) + isnull(AvgRejectedGateways,0)) = 0 then 0 else Round(cast(isnull(AvgRegisteredGateways,0) as float) / (cast((isnull(AvgRegisteredGateways,0) + isnull(AvgUnRegisteredGateways,0) + isnull(AvgRejectedGateways,0)) as float)) * 100.0, 2) END as ActiveGatewaysPercentage, 
				CASE when (isnull(AvgRegisteredGateways,0) + isnull(AvgUnRegisteredGateways,0) + isnull(AvgRejectedGateways,0)) = 0 then 0 else Round(cast(isnull(AvgUnRegisteredGateways,0) as float) / (cast((isnull(AvgRegisteredGateways,0) + isnull(AvgUnRegisteredGateways,0) + isnull(AvgRejectedGateways,0)) as float)) * 100.0, 2) END as UnRegisteredGatewaysPercentage, 
				CASE when (isnull(AvgRegisteredGateways,0) + isnull(AvgUnRegisteredGateways,0) + isnull(AvgRejectedGateways,0)) = 0 then 0 else Round(cast(isnull(AvgUnRegisteredGateways,0) as float) / (cast((isnull(AvgRegisteredGateways,0) + isnull(AvgUnRegisteredGateways,0) + isnull(AvgRejectedGateways,0)) as float)) * 100.0, 2) END as InactiveGatewaysPercentage, 
				CASE when (isnull(AvgRegisteredGateways,0) + isnull(AvgUnRegisteredGateways,0) + isnull(AvgRejectedGateways,0)) = 0 then 0 else Round(cast(isnull(AvgRejectedGateways,0) as float) / (cast((isnull(AvgRegisteredGateways,0) + isnull(AvgUnRegisteredGateways,0) + isnull(AvgRejectedGateways,0)) as float)) * 100.0, 2) END as RejectedGatewaysPercentage
FROM         dbo.VoipCCMStats
INNER JOIN dbo.Nodes on dbo.Nodes.NodeID = dbo.VoipCCMStats.NodeID
```
