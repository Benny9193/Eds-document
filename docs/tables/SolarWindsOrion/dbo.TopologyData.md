# View: `dbo.TopologyData`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DiscoveryProfileID` | int | NO |  |  |
| 2 | `SourceNodeID` | int | NO |  |  |
| 3 | `SourceInterfaceID` | int | YES |  |  |
| 4 | `MappedNodeID` | int | NO |  |  |
| 5 | `MappedInterfaceID` | int | YES |  |  |
| 6 | `SrcType` | nvarchar(50) | NO |  |  |
| 7 | `DestType` | nvarchar(50) | NO |  |  |
| 8 | `DataSourceNodeID` | int | YES |  |  |
| 9 | `LastUpdateUtc` | datetime | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.TopologyConnections`](dbo.TopologyConnections.md) | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| `dbo.dbm_DiscoveredTopologyData_DeleteStale` | SQL_STORED_PROCEDURE |

## Definition

```sql
CREATE VIEW dbo.TopologyData AS
	SELECT	DiscoveryProfileID,
		SourceNodeID,
		SourceInterfaceID,
		MappedNodeID,
		MappedInterfaceID,
		SrcType,
		DestType,
		[DataSourceNodeID],
		[LastUpdateUtc]
	FROM dbo.TopologyConnections where Layer_Type = 'L2' AND (SrcType <> 'Orion.ShadowNodes' AND DestType <> 'Orion.ShadowNodes')
```
