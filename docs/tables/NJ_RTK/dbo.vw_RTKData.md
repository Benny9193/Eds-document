# View: `dbo.vw_RTKData`

**Database:** `NJ_RTK` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `FacilityNumber` | varchar(50) | YES |  |  |
| 2 | `Name` | varchar(4096) | YES |  |  |
| 3 | `ContainerCode` | char(2) | YES |  |  |
| 4 | `Container` | varchar(30) | YES |  |  |
| 5 | `EmployeesExposed` | int | YES |  |  |
| 6 | `Location` | varchar(4096) | YES |  |  |
| 7 | `Manufacturer` | varchar(4096) | YES |  |  |
| 8 | `msdsid` | int | YES |  |  |
| 9 | `PurposeId` | varchar(30) | YES |  |  |
| 10 | `Purpose` | varchar(50) | YES |  |  |
| 11 | `Quantity` | int | YES |  |  |
| 12 | `InventoryCode` | char(2) | YES |  |  |
| 13 | `InventoryDesc` | varchar(25) | YES |  |  |
| 14 | `UOMCode` | char(1) | YES |  |  |
| 15 | `UOM` | varchar(20) | YES |  |  |
| 16 | `SubstanceNumber` | char(4) | YES |  |  |
| 17 | `MixturePercentCode` | char(2) | YES |  |  |
| 18 | `MixtureDesc` | varchar(12) | YES |  |  |
| 19 | `HazardousChemicalName` | varchar(50) | YES |  |  |
| 20 | `CasNumber` | varchar(11) | NO |  |  |
| 21 | `DOTNumber` | char(4) | YES |  |  |
| 22 | `SpecialHHCode` | varchar(36) | YES |  |  |
| 23 | `Year` | int | YES |  |  |
| 24 | `SortKey` | char(79) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Facilities` | USER_TABLE |
| `dbo.Category` | unresolved |
| `dbo.DistrictCategories` | unresolved |
| `dbo.uf_SanitizeData` | SQL_SCALAR_FUNCTION |
| `dbo.vw_RTKInfoAnnual` | unresolved |
| [`EDS.dbo.Category`](../EDS/dbo.Category.md) | cross-database |
| [`eds.dbo.DistrictCategories`](../eds/dbo.DistrictCategories.md) | cross-database |
| [`EDS.dbo.vw_RTKInfoAnnual`](../EDS/dbo.vw_RTKInfoAnnual.md) | cross-database |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE view [dbo].[vw_RTKData] as
select *, cast(FacilityNumber as CHAR(15)) + cast(Name as CHAR(60)) + cast(SubstanceNumber as CHAR(4)) SortKey
  from (
select Facilities.FacilityNumber, dbo.uf_SanitizeData(isnull(ri.AlternateDesc,'')) Name, 
       ri.ContainerCode, ri.ContainerDesc Container, ri.ProductExposedEmployees EmployeesExposed, 
       dbo.uf_SanitizeData(case when isnull(rtrim(ltrim(ri.ProductLocation)),'') = '' then coalesce(dc.RTKLocation, Category.RTKLocation, 'Facility Wide') else rtrim(ltrim(ri.ProductLocation)) end) Location, 
       dbo.uf_SanitizeData(case when isnull(rtrim(ltrim(ri.Manufacturer)),'') = '' then 'See Product SDS/MSDS' else rtrim(ltrim(ri.Manufacturer)) end + ' (' + CAST(ri.msdsid as varchar) + ')') Manufacturer, 
       ri.msdsid,
       cast(ri.RTK_PurposeID as varchar) PurposeId, ri.Purpose Purpose, ri.Quantity Quantity, ri.InventoryCode, ri.InventoryDesc, ri.UOMCode, ri.UOM, 
       ri.SubstanceNo SubstanceNumber, 
       ri.MixturePercentCode MixturePercentCode, ri.MixtureDesc, 
       ri.CASChemicalName HazardousChemicalName, ri.CASRegNo CasNumber, ri.DOT_Id DOTNumber, ri.SpecHazCodes SpecialHHCode, ri.Year
  from EDS.dbo.vw_RTKInfoAnnual ri
  left outer join EDS.dbo.Category on Category.CategoryId = ri.CategoryId
  left outer join eds.dbo.DistrictCategories dc on dc.DistrictId = ri.DistrictId
                                               and dc.CategoryId = ri.CategoryId
  join Facilities on Facilities.FacilityNumber = ri.NJEIN
-- where ri.Year = 2013
) ss
--order by FacilityNumber, case ProductAction when 'Delete' then 1 when 'Change' then 2 when 'Add' then 3 else 4 end, case SubstanceAction when 'Delete' then 1 when 'Change' then 2 when 'Add' then 3 else 4 end, Name, SubstanceNumber
```
