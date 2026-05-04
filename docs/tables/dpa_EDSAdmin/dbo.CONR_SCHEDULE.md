# Table: `dbo.CONR_SCHEDULE`

**Database:** `dpa_EDSAdmin` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | smallint | NO |  | YES |
| 2 | `NAME` | varchar(50) | NO |  |  |
| 3 | `SUBJECT` | varchar(100) | YES |  |  |
| 4 | `TEXT` | varchar(4000) | YES |  |  |
| 5 | `METHOD` | char(1) | NO |  |  |
| 6 | `INCLUDE` | char(1) | NO |  |  |
| 7 | `FROM_CONTACT_ID` | smallint | YES |  |  |
| 8 | `ACTIVE` | char(1) | NO |  |  |
| 9 | `LASTRUN` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
