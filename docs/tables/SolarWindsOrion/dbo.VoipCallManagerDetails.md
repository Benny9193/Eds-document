# View: `dbo.VoipCallManagerDetails`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipCCMMonitoringID` | int | NO |  |  |
| 2 | `CallManagerSysName` | nvarchar(255) | YES |  |  |
| 3 | `CallManagerName` | nvarchar(255) | YES |  |  |
| 4 | `NodeID` | int | NO |  |  |
| 5 | `CallManagerType` | nvarchar(255) | YES |  |  |
| 6 | `ClusterName` | nvarchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Nodes`](dbo.Nodes.md) | VIEW |
| [`dbo.VoipCCMMonitoring`](dbo.VoipCCMMonitoring.md) | USER_TABLE |
| [`dbo.VoipCCMMonitoringType`](dbo.VoipCCMMonitoringType.md) | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| `dbo.voip_GetCCMSipTrunksStatusesTotalDurations` | SQL_TABLE_VALUED_FUNCTION |

## Definition

```sql
CREATE VIEW dbo.VoipCallManagerDetails
AS
SELECT vccm.ID AS VoipCCMMonitoringID
      ,nodes.SysName AS CallManagerSysName
      ,nodes.Caption AS CallManagerName
      ,vccm.NodeID AS NodeID
      ,vccmt.Description AS CallManagerType
      ,vccm.ClusterName AS ClusterName
  FROM dbo.VoipCCMMonitoring vccm
  INNER JOIN dbo.VoipCCMMonitoringType vccmt ON vccm.VoipCCMMonitoringTypeID = vccmt.ID
  INNER JOIN dbo.Nodes nodes ON vccm.NodeID = nodes.NodeID
  WHERE vccm.Deleted != 1
```
