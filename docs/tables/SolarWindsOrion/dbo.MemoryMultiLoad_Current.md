# Table: `dbo.MemoryMultiLoad_Current`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  | YES |
| 2 | `TimeStampUTC` | datetime | NO |  | YES |
| 3 | `Index` | int | NO |  | YES |
| 4 | `TotalMemory` | real | YES |  |  |
| 5 | `MinMemoryUsed` | real | YES |  |  |
| 6 | `MaxMemoryUsed` | real | YES |  |  |
| 7 | `AvgMemoryUsed` | real | YES |  |  |
| 8 | `AvgPercentMemoryUsed` | real | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
