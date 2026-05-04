# Table: `dbo.CON_SQL_FINGERPRINTER_ERROR`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ERROR_HASH` | bigint | NO |  | YES |
| 2 | `SQL_TEXT` | varchar(4000) | NO |  |  |
| 3 | `PIECE` | smallint | NO |  | YES |
| 4 | `COUNTER` | bigint | YES |  |  |
| 5 | `LASTSEEN` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
