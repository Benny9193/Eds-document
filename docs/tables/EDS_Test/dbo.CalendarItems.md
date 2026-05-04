# Table: `dbo.CalendarItems`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CalendarItemId` | int | NO |  | YES |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `LinkId` | int | YES |  |  |
| 4 | `LinkType` | char(1) | YES |  |  |
| 5 | `Description` | varchar(50) | YES |  |  |
| 6 | `ScheduledEventDate` | datetime | YES |  |  |
| 7 | `ActualEventDate` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
