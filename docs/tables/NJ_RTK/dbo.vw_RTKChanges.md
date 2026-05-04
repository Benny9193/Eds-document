# View: `dbo.vw_RTKChanges`

**Database:** `NJ_RTK` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ProductAction` | varchar(3) | NO |  |  |
| 2 | `SubstanceAction` | varchar(3) | NO |  |  |
| 3 | `FacilityNumber` | varchar(50) | YES |  |  |
| 4 | `Name` | varchar(4096) | YES |  |  |
| 5 | `ContainerCode` | char(2) | YES |  |  |
| 6 | `Container` | varchar(30) | YES |  |  |
| 7 | `EmployeesExposed` | int | YES |  |  |
| 8 | `Location` | varchar(4096) | YES |  |  |
| 9 | `Manufacturer` | varchar(4096) | YES |  |  |
| 10 | `msdsid` | int | YES |  |  |
| 11 | `PurposeId` | varchar(30) | YES |  |  |
| 12 | `Purpose` | varchar(50) | YES |  |  |
| 13 | `Quantity` | int | YES |  |  |
| 14 | `InventoryCode` | char(2) | YES |  |  |
| 15 | `InventoryDesc` | varchar(25) | YES |  |  |
| 16 | `UOMCode` | char(1) | YES |  |  |
| 17 | `UOM` | varchar(20) | YES |  |  |
| 18 | `SubstanceNumber` | char(4) | YES |  |  |
| 19 | `MixturePercentCode` | char(2) | YES |  |  |
| 20 | `MixtureDesc` | varchar(12) | YES |  |  |
| 21 | `HazardousChemicalName` | varchar(50) | YES |  |  |
| 22 | `CasNumber` | varchar(11) | NO |  |  |
| 23 | `DOTNumber` | char(4) | YES |  |  |
| 24 | `SpecialHHCode` | varchar(36) | YES |  |  |
| 25 | `Year` | int | YES |  |  |
| 26 | `SortKey` | varchar(81) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Facilities` | USER_TABLE |
| `dbo.Category` | unresolved |
| `dbo.DistrictCategories` | unresolved |
| `dbo.uf_SanitizeData` | SQL_SCALAR_FUNCTION |
| `dbo.vw_RTKInfo` | unresolved |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE view [dbo].[vw_RTKChanges] as
select *, cast(FacilityNumber as CHAR(15)) + case ProductAction when 'Delete' then '1' when 'Change' then '2' when 'Add' then '3' else '4' end + case SubstanceAction when 'Delete' then '1' when 'Change' then '2' when 'Add' then '3' else '4' end + cast(Name as CHAR(60)) + cast(SubstanceNumber as CHAR(4)) SortKey
  from (
select 'Add' ProductAction, 
       'Add' SubstanceAction, 
       Facilities.FacilityNumber, dbo.uf_SanitizeData(isnull(ri.AlternateDesc,'')) Name, 
       ri.ContainerCode, ri.ContainerDesc Container, ri.ProductExposedEmployees EmployeesExposed, 
       dbo.uf_SanitizeData(case when isnull(rtrim(ltrim(ri.ProductLocation)),'') = '' then coalesce(dc.RTKLocation, Category.RTKLocation, 'Facility Wide') else rtrim(ltrim(ri.ProductLocation)) end) Location, 
       dbo.uf_SanitizeData(case when isnull(rtrim(ltrim(ri.Manufacturer)),'') = '' then 'See Product SDS/MSDS' else rtrim(ltrim(ri.Manufacturer)) end + ' (' + CAST(ri.msdsid as varchar) + ')') Manufacturer, 
       ri.msdsid,
       cast(ri.RTK_PurposeID as varchar) PurposeId, ri.Purpose Purpose, ri.Quantity Quantity, ri.InventoryCode, ri.InventoryDesc, ri.UOMCode, ri.UOM, 
       ri.SubstanceNo SubstanceNumber, 
       ri.MixturePercentCode MixturePercentCode, ri.MixtureDesc, 
       ri.CASChemicalName HazardousChemicalName, ri.CASRegNo CasNumber, ri.DOT_Id DOTNumber, ri.SpecHazCodes SpecialHHCode, ri.Year
  from EDS.dbo.vw_RTKInfo ri
  join EDS.dbo.Category on Category.CategoryId = ri.CategoryId
  left outer join eds.dbo.DistrictCategories dc on dc.DistrictId = ri.DistrictId
                                               and dc.CategoryId = ri.CategoryId
  join Facilities on Facilities.FacilityNumber = ri.NJEIN
-- where ri.Year = 2013
) ss
--order by FacilityNumber, case ProductAction when 'Delete' then 1 when 'Change' then 2 when 'Add' then 3 else 4 end, case SubstanceAction when 'Delete' then 1 when 'Change' then 2 when 'Add' then 3 else 4 end, Name, SubstanceNumber
```
