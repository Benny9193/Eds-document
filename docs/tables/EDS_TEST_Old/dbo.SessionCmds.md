# Table: `dbo.SessionCmds`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SessionCmdId` | int | NO |  | YES |
| 2 | `SessionId` | int | NO |  |  |
| 3 | `EventDate` | datetime | YES | `(getdate())` |  |
| 4 | `Command` | varchar(4096) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
