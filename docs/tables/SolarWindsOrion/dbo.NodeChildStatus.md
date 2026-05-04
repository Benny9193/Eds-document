# Table: `dbo.NodeChildStatus`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  | YES |
| 2 | `EntityType` | nvarchar(40) | NO |  | YES |
| 3 | `BestStatus` | int | NO |  |  |
| 4 | `WorstStatus` | int | NO |  |  |
| 5 | `StatusDescription` | nvarchar(100) | YES |  |  |
| 6 | `Severity` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
