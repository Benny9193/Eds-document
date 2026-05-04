# Table: `dbo.CONV`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | smallint | NO |  | YES |
| 2 | `NAME` | varchar(100) | NO |  |  |
| 3 | `UUID` | varchar(100) | NO |  |  |
| 4 | `SERVER_TYPE` | varchar(10) | NO |  |  |
| 5 | `VERSION` | varchar(50) | NO |  |  |
| 6 | `USERNAME` | varchar(100) | YES |  |  |
| 7 | `PASSWORD` | varchar(1000) | YES |  |  |
| 8 | `SERVER` | varchar(100) | NO |  |  |
| 9 | `PORT` | varchar(10) | YES |  |  |
| 10 | `IGNORE_CERT` | char(1) | NO |  |  |
| 11 | `ENABLED` | char(1) | NO |  |  |
| 12 | `COMMAND` | varchar(10) | NO | `('STOP')` |  |
| 13 | `STATUS` | varchar(10) | NO | `('STOPPED')` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
