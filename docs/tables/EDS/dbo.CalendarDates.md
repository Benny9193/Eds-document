# Table: `dbo.CalendarDates`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 2261

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Named-calendar date set (~2.3K rows). Each `CalendarId` can hold up to four meaningful dates (`Date1`–`Date4`) with a description — used for budget cycles, bid windows, and other scheduling lookups.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CalendarDateId` | int | NO |  | YES |
| 2 | `CalendarId` | int | NO |  |  |
| 3 | `Description` | varchar(50) | YES |  |  |
| 4 | `Date1` | datetime | NO |  |  |
| 5 | `Date2` | datetime | YES |  |  |
| 6 | `Date3` | datetime | YES |  |  |
| 7 | `Date4` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
