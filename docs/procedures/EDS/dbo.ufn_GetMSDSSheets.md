# Function: table-valued: `dbo.ufn_GetMSDSSheets`

_Generated on 2026-05-04T13:04:00.673Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `ufn_GetMSDSSheets` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2017-01-25 06:32:42 |
| Modified | 2017-03-02 08:31:25 |
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
CREATE function [dbo].[ufn_GetMSDSSheets] ()
returns @SDS table(Id int identity(1,1) not null primary key, MSDSId int, Counter int, ItemDescription varchar(512), ItemList varchar(1024), Lacey int, Kearny int, Seq int)
as
begin
declare @MSDSId int, @Counter int, @Lacey int, @Kearny int
declare @ItemList varchar(max), @ItemDesc varchar(max)
--declare @SDS table(MSDSId int, Counter int, ItemDescription varchar(512), ItemList varchar(1024))

declare ic cursor for
select wl.MSDSId, Counter, 
   case 
     when (select count(*) 
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
            where Employers.EIN = '43946400'
              and master.dbo.ufn_RegExReplace(ReportProducts.Manufacturer,'(?:.{0,}\(){1,}(?<msds>[0-9]{1,})(?:\).*){1,}','${msds}',1) = cast(wl.MSDSId as varchar(20))) > 1 then 1
     else 0
   end Lacey,
   case 
     when (select count(*) 
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
            where Employers.EIN = '43996800'
              and master.dbo.ufn_RegExReplace(ReportProducts.Manufacturer,'(?:.{0,}\(){1,}(?<msds>[0-9]{1,})(?:\).*){1,}','${msds}',1) = cast(wl.MSDSId as varchar(20))) > 1 then 1
     else 0
   end Kearny
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
/* order by 
   case 
     when (select count(*) 
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
            where Employers.EIN = '43946400'
              and master.dbo.ufn_RegExReplace(ReportProducts.Manufacturer,'(?:.{0,}\(){1,}(?<msds>[0-9]{1,})(?:\).*){1,}','${msds}',1) = cast(wl.MSDSId as varchar(20))) > 1 then 0 
     else 1 
   end, wl.Counter desc
*/
open ic

fetch next from ic into @MSDSId, @Counter, @Lacey, @Kearny

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

  insert @SDS (MSDSId, Counter, ItemDescription, ItemList, Lacey, Kearny)
    select @MSDSId, @Counter, @ItemDesc, @ItemList, @Lacey, @Kearny
/*
  print @MSDSId  
  print @Counter
  print @ItemDesc
  print @ItemList
  print ''
*/  
  fetch next from ic into @MSDSId, @Counter, @Lacey, @Kearny
end
close ic
deallocate ic

  Update sds
     set Seq = seq.seq
    from @SDS sds
    join (select id, row_number() over (order by Lacey desc, Kearny desc, ItemDescription) Seq from @SDS) seq on seq.id = sds.id
--select * from @SDS order by Counter Desc
  return
end
```
