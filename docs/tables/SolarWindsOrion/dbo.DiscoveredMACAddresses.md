# Table: `dbo.DiscoveredMACAddresses`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 150

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ProfileID` | int | NO |  |  |
| 2 | `DiscoveredNodeID` | int | NO |  |  |
| 3 | `MACAddress` | varchar(50) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_DiscoveredMACAddresses` | no | CLUSTERED | `ProfileID`, `DiscoveredNodeID` |  |
