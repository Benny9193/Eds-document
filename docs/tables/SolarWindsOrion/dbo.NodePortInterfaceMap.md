# Table: `dbo.NodePortInterfaceMap`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 96

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `PortID` | int | NO |  |  |
| 3 | `IfIndex` | int | NO |  |  |
| 4 | `VlanId` | int | YES |  |  |
| 5 | `PortType` | tinyint | NO | `((0))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_NodePortInterfaceMap_NodeID` | no | CLUSTERED | `NodeID` |  |
