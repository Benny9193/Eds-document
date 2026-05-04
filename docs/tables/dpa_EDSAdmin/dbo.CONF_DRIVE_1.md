# Table: `dbo.CONF_DRIVE_1`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 7

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | bigint | NO |  | YES |
| 2 | `NAME` | varchar(32) | NO |  |  |
| 3 | `PATH` | varchar(500) | NO |  |  |
| 4 | `LEVELS` | tinyint | NO |  |  |
| 5 | `CUSTOM` | char(1) | NO | `('Y')` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
