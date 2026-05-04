# Table: `dbo.NodeVlans`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `VlanId` | int | NO |  |  |
| 3 | `VlanName` | nvarchar(32) | YES | `(NULL)` |  |
| 4 | `VlanIfIndex` | int | YES | `(NULL)` |  |
| 5 | `VlanStatus` | int | NO | `((0))` |  |
| 6 | `VlanTag` | varchar(8) | YES | `(NULL)` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_NodeVlans_NodeID` | no | CLUSTERED | `NodeID` |  |
