# Table: `dbo.DiscoveredNetObjectStatuses`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 108

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ProfileID` | int | NO |  | YES |
| 2 | `DiscoveredObjectID` | int | NO |  | YES |
| 3 | `DiscoveredObjectType` | varchar(5) | NO |  | YES |
| 4 | `ImportStatus` | smallint | NO |  |  |
| 5 | `ManagedNetObjectID` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
