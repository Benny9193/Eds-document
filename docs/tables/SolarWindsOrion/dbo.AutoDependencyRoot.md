# Table: `dbo.AutoDependencyRoot`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `EngineID` | int | NO |  | YES |
| 2 | `RootNodeID` | int | NO |  | YES |
| 3 | `RootEngineID` | int | NO |  |  |
| 4 | `LastUpdateUTC` | datetime | NO |  |  |
| 5 | `TotalNodeCount` | int | NO | `((0))` |  |
| 6 | `EngineNodeCount` | int | NO | `((0))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
