# Table: `dbo.NodeLldpEntries`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `LocalPortNumber` | int | YES |  |  |
| 3 | `RemotePortId` | nvarchar(255) | YES |  |  |
| 4 | `RemotePortDescription` | nvarchar(255) | YES |  |  |
| 5 | `RemoteSystemName` | nvarchar(255) | YES |  |  |
| 6 | `RemoteIpAddress` | nvarchar(255) | YES |  |  |
| 7 | `RemoteIfIndex` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_NodeLldpEntries_NodeID` | no | CLUSTERED | `NodeID` |  |
