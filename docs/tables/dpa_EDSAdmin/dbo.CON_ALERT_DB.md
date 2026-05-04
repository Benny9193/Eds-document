# Table: `dbo.CON_ALERT_DB`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ALERTID` | smallint | NO |  | YES |
| 2 | `DBID` | smallint | NO |  | YES |
| 3 | `BROKEN` | char(1) | NO | `('N')` |  |
| 4 | `LASTRUN` | smalldatetime | YES |  |  |
| 5 | `LASTCHANGE` | smalldatetime | YES |  |  |
| 6 | `VALUE` | varchar(100) | YES |  |  |
| 7 | `DESCR` | varchar(4000) | YES |  |  |
| 8 | `CURRLEVELNAME` | varchar(10) | YES |  |  |
| 9 | `LINK_TYPE` | char(1) | NO | `('E')` |  |
| 10 | `ACKID` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
