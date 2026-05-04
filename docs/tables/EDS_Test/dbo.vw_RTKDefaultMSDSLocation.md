# View: `dbo.vw_RTKDefaultMSDSLocation`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RTKLocation` | varchar(50) | YES |  |  |
| 2 | `DistrictId` | int | YES |  |  |
| 3 | `MSDSId` | int | NO |  |  |
| 4 | `FacilityNumber` | varchar(20) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Category` | USER_TABLE |
| `DistrictCategories` | USER_TABLE |
| `MSDS` | USER_TABLE |
| `RTK_Items` | USER_TABLE |
| `RTK_ReportItems` | USER_TABLE |
| `RTK_Sites` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_RTKDefaultMSDSLocation] 
as
select case (
	select COUNT(*)
	  from (
	    select rri.DistrictId, ri.CategoryId
	      from RTK_ReportItems rri
	      join RTK_Items ri on ri.RTK_ItemsId = rri.RTK_ItemsId
	                       and ri.MSDSId = MSDS.MSDSId
	     where rri.Year > year(DATEADD(year,-7,getdate()))
	       and rri.DistrictId = coalesce(s1.DistrictId,DistrictCategories.DistrictId)
	       and rri.RTK_SitesId = RTK_Sites.RTK_SitesId
	     group by rri.DistrictId, ri.CategoryId) s1) 
	     when 1 then coalesce(DistrictCategories.RTKLocation,Category.RTKLocation,'Facility Wide')
	     else 'Facility Wide'
	   end RTKLocation, coalesce(s1.DistrictId,DistrictCategories.DistrictId) DistrictId, MSDS.MSDSId, RTK_Sites.NJEIN FacilityNumber
  from MSDS
  left outer join (
  	    select rri.DistrictId, ri.CategoryId, ri.MSDSId, rri.RTK_SitesId
	      from RTK_ReportItems rri
	      join RTK_Items ri on ri.RTK_ItemsId = rri.RTK_ItemsId
	     where cast(rri.Year as int) > year(DATEADD(year,-7,getdate()))
	     group by rri.DistrictId, ri.CategoryId, ri.MSDSId, rri.RTK_SitesId) s1 on s1.MSDSId = MSDS.MSDSId 
  left outer join Category on Category.CategoryId = s1.CategoryId
  left outer join DistrictCategories on DistrictCategories.CategoryId = s1.CategoryId
                                    and DistrictCategories.DistrictId = coalesce(s1.DistrictId,DistrictCategories.DistrictId)
  left outer join RTK_Sites on RTK_Sites.RTK_SitesId = s1.RTK_SitesId
```
