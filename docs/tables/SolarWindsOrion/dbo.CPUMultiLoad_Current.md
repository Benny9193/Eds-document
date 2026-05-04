# Table: `dbo.CPUMultiLoad_Current`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 136

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  | YES |
| 2 | `TimeStampUTC` | datetime | NO |  | YES |
| 3 | `CPUIndex` | smallint | NO |  | YES |
| 4 | `MinLoad` | smallint | NO |  |  |
| 5 | `MaxLoad` | smallint | NO |  |  |
| 6 | `AvgLoad` | smallint | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
