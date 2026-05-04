# View: `dbo.vw_InstructionBookCalendar`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DistrictId` | int | NO |  |  |
| 2 | `UserId` | int | NO |  |  |
| 3 | `CalendarId` | int | NO |  |  |
| 4 | `HeaderText` | varchar(8000) | YES |  |  |
| 5 | `FooterText` | varchar(8000) | YES |  |  |
| 6 | `HeaderTextHTML` | varchar(4096) | YES |  |  |
| 7 | `FooterTextHTML` | varchar(4096) | NO |  |  |
| 8 | `CalendarTypeId` | int | NO |  |  |
| 9 | `DateCount` | int | NO |  |  |
| 10 | `Description` | varchar(50) | YES |  |  |
| 11 | `Date1` | datetime | NO |  |  |
| 12 | `Date2` | datetime | YES |  |  |
| 13 | `Date3` | datetime | YES |  |  |
| 14 | `Date4` | datetime | YES |  |  |
| 15 | `BookType` | varchar(50) | NO |  |  |
| 16 | `ScheduleGroup` | varchar(50) | NO |  |  |
| 17 | `CalendarName` | varchar(83) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `CalendarDates` | USER_TABLE |
| `CalendarIB` | USER_TABLE |
| `Calendars` | USER_TABLE |
| `CalendarTypes` | USER_TABLE |
| `Control` | USER_TABLE |
| `District` | USER_TABLE |
| `InstructionBookTypes` | USER_TABLE |
| `InstructionBookView` | VIEW |
| `ScheduleTypes` | USER_TABLE |
| `States` | USER_TABLE |
| `Users` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_InstructionBookCalendar] as
select District.DistrictId, Users.UserId, Calendars.CalendarId, Calendars.HeaderText, Calendars.FooterText, Calendars.HeaderTextHTML, isnull(Calendars.FooterTextHTML,'&nbsp;') FooterTextHTML, CalendarTypes.CalendarTypeId, CalendarTypes.DateCount, CalendarDates.Description, CalendarDates.Date1, CalendarDates.Date2, CalendarDates.Date3, CalendarDates.Date4, InstructionBookTypes.Description BookType, isnull(ScheduleTypes.Name,'') ScheduleGroup, case isnull(States.Name,'') when '' then '' else States.Name + ' ' end + 'Cooperative Requisition Calendar' CalendarName
  from InstructionBookView with (nolock)
  join District on District.DistrictId = InstructionBookView.DistrictId
               and District.Active = 1
               and ISNULL(District.SuppressPrintSchedule,0) != 1
  join CalendarIB on CalendarIB.ScheduleId = case ISNULL(District.ScheduleId,0) when 0 then case ISNULL(District.StateId,0) when 0 then 5 when 1 then 5 when 2 then 8 end /*when 2 then 1 when 4 then 3 */else District.ScheduleId end
                 and CalendarIB.IBTypeId = InstructionBookView.IBTypeId
  join Calendars on Calendars.CalendarId = CalendarIB.CalendarId
                and Calendars.BudgetYear = (select Top 1 Controlyear from Control with (nolock))
  join CalendarDates on CalendarDates.CalendarId = Calendars.CalendarId
  join CalendarTypes on CalendarTypes.CalendarTypeId = Calendars.CalendarTypeId
  join InstructionBookTypes on InstructionBookTypes.IBTypeId = case isnull(InstructionBookView.IBTypeId,0) when 0 then 1 else InstructionBookView.IBTypeId end
  join Users on Users.UserId = InstructionBookView.UserId
            and Users.Active = 1
  left outer join ScheduleTypes on ScheduleTypes.ScheduleId = CalendarIB.ScheduleId
  LEFT outer join States on States.StateId = District.StateId
union (
select District.DistrictId, 0 UserId, Calendars.CalendarId, Calendars.HeaderText, Calendars.FooterText, Calendars.HeaderTextHTML, isnull(Calendars.FooterTextHTML,'&nbsp;') FooterTextHTML, CalendarTypes.CalendarTypeId, CalendarTypes.DateCount, CalendarDates.Description, CalendarDates.Date1, CalendarDates.Date2, CalendarDates.Date3, CalendarDates.Date4, InstructionBookTypes.Description BookType, isnull(ScheduleTypes.Name,'') ScheduleGroup, case isnull(States.Name,'') when '' then '' else States.name + ' ' end + 'Cooperative Requisition Calendar' CalendarName
  from District 
  join CalendarIB on CalendarIB.ScheduleId = case ISNULL(District.ScheduleId,0) when 0 then case ISNULL(District.StateId,0) when 0 then 5 when 1 then 5 when 2 then 8 end /*when 2 then 1 when 4 then 3*/ else District.ScheduleId end
                 and CalendarIB.IBTypeId = 1
  join Calendars on Calendars.CalendarId = CalendarIB.CalendarId
                and Calendars.BudgetYear = (select Top 1 Controlyear from Control with (nolock))
  join CalendarDates on CalendarDates.CalendarId = Calendars.CalendarId
  join CalendarTypes on CalendarTypes.CalendarTypeId = Calendars.CalendarTypeId
  join InstructionBookTypes on InstructionBookTypes.IBTypeId = 1
  left outer join ScheduleTypes on ScheduleTypes.ScheduleId = CalendarIB.ScheduleId
  LEFT outer join States on States.StateId = District.StateId
 where District.Active = 1
   and ISNULL(District.SuppressPrintSchedule,0) != 1
--  and District.DistrictId = 575
)
```
