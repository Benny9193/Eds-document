# Table: `dbo.CON_EVENT_TEN_MINUTE_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 5519

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DATEHOUR` | datetime | NO |  | YES |
| 2 | `EVENTID` | bigint | NO |  | YES |
| 3 | `PERIOD` | char(1) | NO | `('T')` | YES |
| 4 | `TIMESECS` | decimal(20,1) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
