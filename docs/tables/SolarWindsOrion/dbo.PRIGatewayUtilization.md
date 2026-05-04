# View: `dbo.PRIGatewayUtilization`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Node` | nvarchar(255) | YES |  |  |
| 2 | `IfName` | nvarchar(100) | NO |  |  |
| 3 | `RecordTimeUtc` | datetime | NO |  |  |
| 4 | `AvgVoiceIncomingUtilization` | float | NO |  |  |
| 5 | `AvgVoiceOutgoingUtilization` | float | NO |  |  |
| 6 | `AvgDataIncomingUtilization` | float | NO |  |  |
| 7 | `AvgDataOutgoingUtilization` | float | NO |  |  |
| 8 | `AvgChannelCount` | float | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Nodes`](dbo.Nodes.md) | VIEW |
| [`dbo.VoipGatewayEndpoints`](dbo.VoipGatewayEndpoints.md) | USER_TABLE |
| [`dbo.VoipGatewayEndpointStats`](dbo.VoipGatewayEndpointStats.md) | VIEW |
| [`dbo.VoipGateways`](dbo.VoipGateways.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[PRIGatewayUtilization] AS

SELECT n.Caption as Node, vge.IfName
      ,vges.[RecordTimeUtc]
      ,vges.[AvgVoiceIncomingUtilization]
      ,vges.[AvgVoiceOutgoingUtilization]
      ,vges.[AvgDataIncomingUtilization]
      ,vges.[AvgDataOutgoingUtilization]
      ,vges.[AvgChannelCount]
  FROM [dbo].[VoipGatewayEndpointStats] vges
  JOIN [dbo].[VoipGatewayEndpoints] vge ON vges.VoipGatewayEndpointID = vge.VoipGatewayEndpointID
  JOIN [dbo].[VoipGateways] vg ON vge.VoipGatewayID = vg.VoipGatewayID
  JOIN [dbo].[Nodes] n ON vg.NodeID = n.NodeID
```
