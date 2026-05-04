# Table: `dbo.NodeL3RoutingData`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 22

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `NextHopAddress` | nvarchar(50) | NO |  |  |
| 3 | `RouteDestination` | nvarchar(50) | NO |  |  |
| 4 | `RouteIfIndex` | int | NO |  |  |
| 5 | `RouteType` | int | NO |  |  |
| 6 | `RouteMask` | nvarchar(50) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_NodeL3RoutingData_NodeID` | no | CLUSTERED | `NodeID` |  |
