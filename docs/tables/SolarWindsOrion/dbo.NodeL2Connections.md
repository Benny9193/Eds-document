# Table: `dbo.NodeL2Connections`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 179

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `PortID` | int | NO |  |  |
| 3 | `MACAddress` | nvarchar(255) | NO |  |  |
| 4 | `Status` | int | NO |  |  |
| 5 | `VlanId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_NodeL2Connections_NodeID` | no | CLUSTERED | `NodeID` |  |
