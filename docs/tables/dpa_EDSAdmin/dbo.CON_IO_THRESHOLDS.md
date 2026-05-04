# Table: `dbo.CON_IO_THRESHOLDS`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DBID` | smallint | NO |  | YES |
| 2 | `TYPE` | char(1) | NO |  | YES |
| 3 | `ID` | bigint | NO |  | YES |
| 4 | `READ_WARNING` | int | YES |  |  |
| 5 | `READ_CRITICAL` | int | YES |  |  |
| 6 | `WRITE_WARNING` | int | YES |  |  |
| 7 | `WRITE_CRITICAL` | int | YES |  |  |
| 8 | `TAKE_FROM` | char(1) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
