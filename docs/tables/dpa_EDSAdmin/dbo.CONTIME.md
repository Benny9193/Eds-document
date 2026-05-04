# Table: `dbo.CONTIME`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 268638

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ACTIVITY` | varchar(250) | NO |  | YES |
| 2 | `DBID` | bigint | NO |  | YES |
| 3 | `D` | datetime | NO |  | YES |
| 4 | `TIMING_INTERVAL` | numeric(25,5) | NO |  |  |
| 5 | `EXECS` | bigint | YES |  |  |
| 6 | `TOTALROWS` | bigint | YES |  |  |
| 7 | `TOTALTIME` | numeric(25,5) | YES |  |  |
| 8 | `AVGROWS` | numeric(25,5) | YES |  |  |
| 9 | `MINTIME` | numeric(25,5) | YES |  |  |
| 10 | `MAXTIME` | numeric(25,5) | YES |  |  |
| 11 | `AVGTIME` | numeric(25,5) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
