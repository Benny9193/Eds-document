# View: `dbo.InstructionBookCalendar`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `IBTypeId` | int | NO |  |  |
| 2 | `StateId` | int | YES |  |  |
| 3 | `GroupId` | int | NO |  |  |
| 4 | `IBYear` | int | NO |  |  |
| 5 | `EventDescription` | varchar(50) | YES |  |  |
| 6 | `EventDate` | datetime | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `CalendarDates` | USER_TABLE |
| `CalendarIB` | USER_TABLE |
| `Calendars` | USER_TABLE |
| `Control` | USER_TABLE |
| `InstructionBookTypes` | USER_TABLE |
| `ScheduleTypes` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[InstructionBookCalendar] as
select InstructionBookTypes.IBTypeId, ScheduleTypes.StateId, ScheduleTypes.ScheduleId GroupId, Calendars.BudgetYear IBYear, CalendarDates.Description EventDescription, CalendarDates.Date1 EventDate
  from InstructionBookTypes
  join CalendarIB on CalendarIB.IBTypeId = InstructionBookTypes.IBTypeId
  join ScheduleTypes on ScheduleTypes.ScheduleId = CalendarIB.ScheduleId
  join Calendars on Calendars.CalendarId = CalendarIB.CalendarId
                and Calendars.BudgetYear = (select top 1 Control.ControlYear from Control with (nolock))
  join CalendarDates on CalendarDates.CalendarId = Calendars.CalendarId
```
