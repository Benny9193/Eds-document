# Table: `dbo.NodeIPAddresses`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 126

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `IPAddress` | nvarchar(255) | NO |  |  |
| 3 | `IPAddressN` | uniqueidentifier | NO |  |  |
| 4 | `InterfaceIndex` | int | YES |  |  |
| 5 | `IPAddressType` | nvarchar(10) | YES |  |  |
| 6 | `SubnetMask` | nvarchar(255) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_NodeIPAddresses_NodeID` | no | CLUSTERED | `NodeID` |  |
