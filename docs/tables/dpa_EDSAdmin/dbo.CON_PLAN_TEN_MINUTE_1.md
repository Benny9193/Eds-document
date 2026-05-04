# Table: `dbo.CON_PLAN_TEN_MINUTE_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 31333

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DATEHOUR` | datetime | NO |  | YES |
| 2 | `PERIOD` | char(1) | NO | `('T')` | YES |
| 3 | `SQLHASH` | bigint | NO |  | YES |
| 4 | `PLANHASH` | bigint | NO |  | YES |
| 5 | `TIMESECS` | decimal(20,1) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
