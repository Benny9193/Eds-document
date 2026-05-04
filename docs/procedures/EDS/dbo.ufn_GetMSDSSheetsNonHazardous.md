# Function: table-valued: `dbo.ufn_GetMSDSSheetsNonHazardous`

_Generated on 2026-05-04T13:43:19.135Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `ufn_GetMSDSSheetsNonHazardous` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2017-04-19 15:26:11 |
| Modified | 2017-04-19 15:59:23 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pDistrictId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `MSDS` | USER_TABLE |  |
| `RTK_Items` | USER_TABLE |  |
| `RTK_ReportItems` | USER_TABLE |  |
| `RTK_Sites` | USER_TABLE |  |
| `vw_DMSSDSDocuments` | VIEW |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function [dbo].[ufn_GetMSDSSheetsNonHazardous] (@pDistrictId int)
returns @SDS table(Id int identity(1,1) not null primary key, MSDSId int, Counter int, ItemDescription varchar(512), ItemList varchar(1024), Seq int)
as
begin
declare @MSDSId int, @Counter int
declare @ItemList varchar(max), @ItemDesc varchar(max)
--declare @SDS table(MSDSId int, Counter int, ItemDescription varchar(512), ItemList varchar(1024))

declare ic cursor for
select MSDS.MSDSId, count(*) Counter
  from MSDS
  join RTK_Items on RTK_Items.MSDSId = MSDS.MSDSId
  join RTK_ReportItems ri on ri.RTK_ItemsId = RTK_Items.RTK_ItemsId
                         and ri.Year >= 2015
  join RTK_Sites on RTK_Sites.RTK_SitesId = ri.RTK_SitesId
                and RTK_Sites.DistrictId = @pDistrictId
                and RTK_Sites.Active = 1
 where not exists(select MSDSId from vw_DMSSDSDocuments sds where sds.MSDSId = cast(MSDS.MSDSId as varchar))
 group by MSDS.MSDSId
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

  Update sds
     set Seq = seq.seq
    from @SDS sds
    join (select id, row_number() over (order by ItemDescription) Seq from @SDS) seq on seq.id = sds.id
--select * from @SDS order by Counter Desc
  return
end
```
