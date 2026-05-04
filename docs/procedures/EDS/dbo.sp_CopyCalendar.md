# Procedure: `dbo.sp_CopyCalendar`

_Generated on 2026-05-04T13:07:57.395Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CopyCalendar` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-09-25 16:38:41 |
| Modified | 2017-11-27 13:28:21 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pOldYear` | IN | int |  |
| 2 | `@pNewYear` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Calendars` | USER_TABLE |  |
| `dbo.CalendarDates` | USER_TABLE | `EDS` |
| `dbo.CalendarIB` | USER_TABLE | `EDS` |
| `dbo.Calendars` | USER_TABLE | `EDS` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_CopyCalendar] @pOldYear int, @pNewYear int as
/****** Script for SelectTopNRows command from SSMS  ******/
INSERT INTO [EDS].[dbo].[Calendars]
           ([Active]
           ,[BudgetYear]
           ,[ScheduleId]
           ,[CalendarTypeId]
           ,[Description]
           ,[HeaderText]
           ,[FooterText])
SELECT [Active]
      ,@pNewYear
      ,[ScheduleId]
      ,[CalendarTypeId]
      ,[Description]
      ,[HeaderText]
      ,[FooterText]
  FROM [EDS].[dbo].[Calendars]
 where BudgetYear = @pOldYear

INSERT INTO [EDS].[dbo].[CalendarIB]
           ([CalendarId]
           ,[IBTypeId]
           ,[ScheduleId]
           ,[CalendarTypeId])
SELECT newcal.[CalendarId]
      ,cib.[IBTypeId]
      ,cib.[ScheduleId]
      ,cib.[CalendarTypeId]
  FROM [EDS].[dbo].[CalendarIB] cib
  join Calendars oldcal on oldcal.CalendarId = cib.CalendarId
                       and oldCal.BudgetYear = @pOldYear
                       and oldCal.Active = 1
  join Calendars newCal on newCal.BudgetYear = @pNewYear
                       and newCal.CalendarTypeId = oldCal.CalendarTypeId
                       and newCal.ScheduleId = oldCal.ScheduleId
                       and newCal.Active = 1
                       and newCal.Description = oldCal.Description
                        


 INSERT INTO [EDS].[dbo].[CalendarDates]
           ([CalendarId]
           ,[Description]
           ,[Date1]
           ,[Date2]
           ,[Date3]
           ,[Date4])
SELECT newCal.[CalendarId]
      ,cd.[Description]
      ,dateadd(week,(@pNewYear-@pOldYear)*52,[Date1])
      ,dateadd(week,(@pNewYear-@pOldYear)*52,[Date2])
      ,dateadd(week,(@pNewYear-@pOldYear)*52,[Date3])
      ,dateadd(week,(@pNewYear-@pOldYear)*52,[Date4])
  FROM [EDS].[dbo].[CalendarDates] cd
  join Calendars oldCal on oldCal.CalendarId = cd.CalendarId
                       and oldCal.BudgetYear = @pOldYear
                       and oldCal.Active = 1
  join Calendars newCal on newCal.BudgetYear = @pNewYear
                       and newCal.CalendarTypeId = oldCal.CalendarTypeId
                       and newCal.ScheduleId = oldCal.ScheduleId
                       and newCal.Active = 1
                       and newCal.Description = oldCal.Description

/*
declare @SourceCal int
select @SourceCal = 63
 INSERT INTO [EDS].[dbo].[CalendarDates]
           ([CalendarId]
           ,[Description]
           ,[Date1]
           ,[Date2]
           ,[Date3]
           ,[Date4])
SELECT newCal.[CalendarId]
      ,cd.[Description]
      ,[Date1]
      ,[Date2]
      ,[Date3]
      ,[Date4]
  FROM [EDS].[dbo].[CalendarDates] cd
  join Calendars oldCal on oldCal.CalendarId = cd.CalendarId
                       and oldCal.CalendarId = @SourceCal
  join Calendars newCal on NewCal.CalendarId in (67, 64, 68, 72, 74, 76) 

*/
```
