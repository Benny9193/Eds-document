# Table: `dbo.CON_ALERT_DB_STATE`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ALERTID` | smallint | NO |  | YES |
| 2 | `DBID` | smallint | NO |  | YES |
| 3 | `NAME` | varchar(100) | NO |  | YES |
| 4 | `INDX` | smallint | NO | `((0))` | YES |
| 5 | `VALUE` | varchar(425) | NO |  |  |
| 6 | `STATE_DATE` | datetime | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
