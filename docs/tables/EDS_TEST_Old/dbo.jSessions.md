# Table: `dbo.jSessions`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `jSessionId` | int | NO |  | YES |
| 2 | `SessionId` | int | NO |  |  |
| 3 | `jSession` | varchar(255) | NO |  |  |
| 4 | `StartTime` | datetime | NO | `(getdate())` |  |
| 5 | `EndTime` | datetime | YES |  |  |
| 6 | `IPAddress` | varchar(50) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
