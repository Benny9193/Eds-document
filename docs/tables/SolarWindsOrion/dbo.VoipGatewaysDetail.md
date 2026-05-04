# View: `dbo.VoipGatewaysDetail`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipGatewayID` | int | NO |  |  |
| 2 | `NodeID` | int | NO |  |  |
| 3 | `GatewayName` | nvarchar(255) | YES |  |  |
| 4 | `Status` | int | NO |  |  |
| 5 | `LastResultRecordTimeUtc` | datetime | YES |  |  |
| 6 | `StatusName` | nvarchar(50) | YES |  |  |
| 7 | `DateTime` | datetime | YES |  |  |
| 8 | `LastResultRecordTime` | datetime | YES |  |  |
| 9 | `SysName` | nvarchar(255) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Nodes`](dbo.Nodes.md) | VIEW |
| [`dbo.StatusInfo`](dbo.StatusInfo.md) | USER_TABLE |
| [`dbo.VoipGateways`](dbo.VoipGateways.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[VoipGatewaysDetail]
AS
SELECT        vg.VoipGatewayID, vg.NodeID, n.Caption AS GatewayName, vg.Status, vg.LastResultRecordTimeUtc, dbo.StatusInfo.StatusName, DATEADD(minute, 
                         DATEDIFF(minute, GETUTCDATE(), GETDATE()), vg.LastResultRecordTimeUtc) AS DateTime, DATEADD(minute, DATEDIFF(minute, GETUTCDATE(), GETDATE()), 
                         vg.LastResultRecordTimeUtc) AS LastResultRecordTime, n.SysName
FROM            dbo.VoipGateways AS vg INNER JOIN
                         dbo.Nodes AS n ON n.NodeID = vg.NodeID LEFT OUTER JOIN
                         dbo.StatusInfo ON vg.Status = dbo.StatusInfo.StatusId
```
