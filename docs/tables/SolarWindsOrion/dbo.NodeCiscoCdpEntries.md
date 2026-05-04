# Table: `dbo.NodeCiscoCdpEntries`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `IfIndex` | int | YES |  |  |
| 3 | `CacheAddressType` | int | YES |  |  |
| 4 | `IpAddress` | nvarchar(255) | YES |  |  |
| 5 | `DeviceId` | nvarchar(255) | YES |  |  |
| 6 | `DevicePort` | nvarchar(255) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_NodeCiscoCdpEntries_NodeID` | no | CLUSTERED | `NodeID` |  |
