# Table: `dbo.NodeL3Entries`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 38

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `IfIndex` | int | NO |  |  |
| 3 | `MACAddress` | nvarchar(255) | NO |  |  |
| 4 | `IPAddress` | nvarchar(255) | NO |  |  |
| 5 | `Type` | int | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_NodeL3Entries_NodeID` | no | CLUSTERED | `NodeID` |  |
