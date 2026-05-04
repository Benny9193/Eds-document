# Table: `dbo.CON_ALERT_DB_RESULTS`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ALERTID` | smallint | NO |  | YES |
| 2 | `DBID` | smallint | NO |  | YES |
| 3 | `NAME` | varchar(425) | NO |  | YES |
| 4 | `VALUE` | varchar(100) | NO |  |  |
| 5 | `STATUS` | varchar(10) | NO |  |  |
| 6 | `DESCR` | varchar(4000) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
