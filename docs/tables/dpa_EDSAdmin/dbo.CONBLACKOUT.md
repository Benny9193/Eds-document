# Table: `dbo.CONBLACKOUT`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SCHEDULEID` | bigint | NO |  | YES |
| 2 | `STOP_MOW` | smallint | NO |  | YES |
| 3 | `START_MOW` | smallint | NO |  |  |
| 4 | `DBID` | smallint | NO |  |  |
| 5 | `TYPE` | char(1) | NO | `('M')` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
