# Table: `dbo.Calendars`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 282

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CalendarId` | int | NO |  | YES |
| 2 | `Active` | tinyint | NO |  |  |
| 3 | `BudgetYear` | int | NO |  |  |
| 4 | `ScheduleId` | int | NO |  |  |
| 5 | `CalendarTypeId` | int | NO |  |  |
| 6 | `Description` | varchar(50) | NO |  |  |
| 7 | `HeaderText` | varchar(8000) | YES |  |  |
| 8 | `FooterText` | varchar(8000) | YES |  |  |
| 9 | `HeaderTextHTML` | varchar(4096) | YES |  |  |
| 10 | `FooterTextHTML` | varchar(4096) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
