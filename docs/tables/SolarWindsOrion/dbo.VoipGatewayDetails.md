# View: `dbo.VoipGatewayDetails`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipGatewayID` | int | NO |  |  |
| 2 | `NodeID` | int | NO |  |  |
| 3 | `Status` | int | NO |  |  |
| 4 | `StatusName` | nvarchar(50) | YES |  |  |
| 5 | `LastResultRecordTimeUtc` | datetime | YES |  |  |
| 6 | `DateTime` | datetime | YES |  |  |
| 7 | `LastResultRecordTime` | datetime | YES |  |  |
| 8 | `Caption` | nvarchar(255) | YES |  |  |
| 9 | `SysName` | nvarchar(255) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Nodes` | VIEW |
| `StatusInfo` | USER_TABLE |
| `VoipGateways` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.VoipGatewayEndpointAlertsAggregateLast1Hour`](dbo.VoipGatewayEndpointAlertsAggregateLast1Hour.md) | VIEW |

## Definition

```sql
CREATE VIEW [dbo].[VoipGatewayDetails] AS
	
SELECT  VoipGateways.VoipGatewayID, 
VoipGateways.NodeID, 
VoipGateways.Status, 
StatusInfo.StatusName,
VoipGateways.LastResultRecordTimeUtc, 
DATEADD(minute, DATEDIFF(minute, GETUTCDATE(), GETDATE()), VoipGateways.LastResultRecordTimeUtc) AS [DateTime],
DATEADD(minute, DATEDIFF(minute, GETUTCDATE(), GETDATE()), VoipGateways.LastResultRecordTimeUtc) AS LastResultRecordTime,
Nodes.Caption,                         
Nodes.SysName
FROM VoipGateways 
INNER JOIN Nodes ON VoipGateways.NodeID = Nodes.NodeID 
LEFT OUTER JOIN StatusInfo ON VoipGateways.Status = StatusInfo.StatusId
```
