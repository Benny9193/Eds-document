# Table: `dbo.TopologyConnections`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 31

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
| 10 | `Layer_Type` | nvarchar(10) | NO | `('L2')` |  |
| 11 | `LinkType` | nvarchar(100) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
