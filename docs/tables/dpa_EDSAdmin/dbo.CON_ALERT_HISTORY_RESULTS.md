# Table: `dbo.CON_ALERT_HISTORY_RESULTS`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `HISTORYID` | bigint | NO |  | YES |
| 2 | `PARAMETERNAME` | varchar(425) | NO |  | YES |
| 3 | `LEVELNAME` | varchar(10) | NO |  |  |
| 4 | `LEVELVALUE` | varchar(100) | YES |  |  |
| 5 | `DESCR` | varchar(4000) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
