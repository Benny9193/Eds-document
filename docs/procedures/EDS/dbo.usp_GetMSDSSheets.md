# Procedure: `dbo.usp_GetMSDSSheets`

_Generated on 2026-05-04T13:43:19.168Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_GetMSDSSheets` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2017-01-25 06:19:09 |
| Modified | 2017-01-25 06:28:50 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `MSDS` | USER_TABLE |  |
| `RTK_Items` | USER_TABLE |  |
| `dbo.ufn_RegExReplace` | unresolved | `master` |
| `dbo.Employers` | unresolved | `NJ_RTK` |
| `dbo.Facilities` | unresolved | `NJ_RTK` |
| `dbo.ReportProducts` | unresolved | `NJ_RTK` |
| `dbo.ReportSurveys` | unresolved | `NJ_RTK` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure usp_GetMSDSSheets
as
declare @MSDSId int, @Counter int
declare @ItemList varchar(max), @ItemDesc varchar(max)
declare @SDS table(MSDSId int, Counter int, ItemDescription varchar(512), ItemList varchar(1024))

declare ic cursor for
select wl.MSDSId, Counter
  from (
select master.dbo.ufn_RegExReplace(ReportProducts.Manufacturer,'(?:.{0,}\(){1,}(?<msds>[0-9]{1,})(?:\).*){1,}','${msds}',1) MSDSId, COUNT(*) Counter 
  from NJ_RTK.dbo.Employers
  join NJ_RTK.dbo.Facilities on Facilities.EmployerId = Employers.Id
  join NJ_RTK.dbo.ReportSurveys on ReportSurveys.FacilityId = Facilities.Id
                               and ReportSurveys.Id = 
    (select top 1 rs.Id
       from NJ_RTK.dbo.ReportSurveys rs
      where rs.FacilityId = Facilities.Id
      order by rs.RunDate desc)
  join NJ_RTK.dbo.ReportProducts on ReportProducts.ReportSurveyId = ReportSurveys.Id
  and isnumeric(master.dbo.ufn_RegExReplace(ReportProducts.Manufacturer,'(?:.{0,}\(){1,}(?<msds>[0-9]{1,})(?:\).*){1,}','${msds}',1)) = 1
 group by master.dbo.ufn_RegExReplace(ReportProducts.Manufacturer,'(?:.{0,}\(){1,}(?<msds>[0-9]{1,})(?:\).*){1,}','${msds}',1)
  ) wl
 order by wl.Counter desc

open ic

fetch next from ic into @MSDSId, @Counter

while @@FETCH_STATUS = 0
begin
  select @ItemList = null, @ItemDesc = null
  select @ItemDesc = coalesce(MSDS.AlternateDescription,(select top 1 RTK_Items.AlternateDesc from RTK_Items where RTK_Items.MSDSId = MSDS.MSDSId order by RTK_Items.ItemId),'')
    from MSDS
   where MSDS.MSDSId = @MSDSId
   
  select @ItemList = coalesce(@ItemList + ',','') + rtrim(RTK_Items.ItemCode)
    from RTK_Items 
   where RTK_Items.MSDSId = @MSDSId
   group by rtrim(RTK_Items.ItemCode)

  insert @SDS (MSDSId, Counter, ItemDescription, ItemList)
    select @MSDSId, @Counter, @ItemDesc, @ItemList
/*
  print @MSDSId  
  print @Counter
  print @ItemDesc
  print @ItemList
  print ''
*/  
  fetch next from ic into @MSDSId, @Counter
end
close ic
deallocate ic

select * from @SDS order by Counter Desc
```
