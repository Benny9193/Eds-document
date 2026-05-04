# View: `dbo.vw_RTKChangesOrig`

**Database:** `NJ_RTK` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ProductAction` | varchar(6) | NO |  |  |
| 2 | `SubstanceAction` | varchar(6) | NO |  |  |
| 3 | `FacilityNumber` | varchar(50) | YES |  |  |
| 4 | `Name` | varchar(255) | YES |  |  |
| 5 | `ContainerCode` | char(2) | YES |  |  |
| 6 | `Container` | varchar(30) | YES |  |  |
| 7 | `EmployeesExposed` | varchar(1) | YES |  |  |
| 8 | `Location` | varchar(50) | YES |  |  |
| 9 | `Manufacturer` | varchar(50) | YES |  |  |
| 10 | `PurposeId` | varchar(30) | YES |  |  |
| 11 | `Purpose` | varchar(50) | YES |  |  |
| 12 | `Quantity` | int | YES |  |  |
| 13 | `InventoryCode` | char(2) | YES |  |  |
| 14 | `InventoryDesc` | varchar(25) | YES |  |  |
| 15 | `UOMCode` | char(1) | YES |  |  |
| 16 | `UOM` | varchar(20) | YES |  |  |
| 17 | `SubstanceNumber` | varchar(50) | YES |  |  |
| 18 | `MixturePercentCode` | char(2) | YES |  |  |
| 19 | `MixtureDesc` | varchar(12) | YES |  |  |
| 20 | `HazardousChemicalName` | varchar(50) | YES |  |  |
| 21 | `CasNumber` | varchar(11) | YES |  |  |
| 22 | `DOTNumber` | char(4) | YES |  |  |
| 23 | `SpecialHHCode` | varchar(36) | YES |  |  |
| 24 | `SortKey` | varchar(81) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Facilities` | USER_TABLE |
| `ReportProducts` | USER_TABLE |
| `ReportSubstances` | USER_TABLE |
| `ReportSurveys` | USER_TABLE |
| `dbo.vw_RTKInfo` | unresolved |

## Used by

_No other objects reference this view._

## Definition

```sql
create view [dbo].[vw_RTKChangesOrig] as
select *, cast(FacilityNumber as CHAR(15)) + case ProductAction when 'Delete' then '1' when 'Change' then '2' when 'Add' then '3' else '4' end + case SubstanceAction when 'Delete' then '1' when 'Change' then '2' when 'Add' then '3' else '4' end + cast(Name as CHAR(60)) + cast(SubstanceNumber as CHAR(4)) SortKey
  from (
select case when ReportProducts.Id is null then 'Add' else 'Change' end ProductAction, 
       case when ReportSubstances.Id is null then 'Add' else 'Change' end SubstanceAction, 
       Facilities.FacilityNumber, ri.AlternateDesc Name, 
       ri.ContainerCode, ri.ContainerDesc Container, ri.ProductExposedEmployees EmployeesExposed, ri.ProductLocation Location, ri.Manufacturer Manufacturer, 
       cast(ri.RTK_PurposeID as varchar) PurposeId, ri.Purpose Purpose, ri.Quantity Quantity, ri.InventoryCode, ri.InventoryDesc, ri.UOMCode, ri.UOM, 
       ri.SubstanceNo SubstanceNumber, 
       ri.MixturePercentCode MixturePercentCode, ri.MixtureDesc, 
       ri.CASChemicalName HazardousChemicalName, ri.CASRegNo CasNumber, ri.DOT_Id DOTNumber, ri.SpecHazCodes SpecialHHCode
  from EDS.dbo.vw_RTKInfo ri
  join Facilities on Facilities.FacilityNumber = ri.NJEIN
  left outer join ReportSurveys on ReportSurveys.Id = 
    (select top 1 rs.Id
       from ReportSurveys rs
      where rs.FacilityId = Facilities.Id
      order by rs.RunDate desc)
  left outer join ReportProducts on ReportProducts.ReportSurveyId = ReportSurveys.Id
                                and ReportProducts.Name = ri.AlternateDesc
                                and isnull(ReportProducts.Manufacturer,'') = isnull(ri.Manufacturer,'')
  left outer join ReportSubstances on ReportSubstances.ReportProductId = ReportProducts.Id
                                  and ReportSubstances.SubstanceNumber = ri.SubstanceNo
 where ri.Year = 2013
   and ReportSubstances.Id is null
union all (
  select case when ri.DistrictId is null then 'Delete' else 'Error' end ProductAction, 
         case when ri.SubstanceNo is null then 'Delete' else 'Error' end SubstanceAction, 
         Facilities.FacilityNumber, ReportProducts.Name Name, 
         null ContainerCode, null Container, null EmployeesExposed, null Location, null Manufacturer, 
         null PurposeId, null Purpose, ri.Quantity, ri.InventoryCode, ri.InventoryDesc, ri.UOMCode, ri.UOM, 
         ReportSubstances.SubstanceNumber SubstanceNumber, 
         null MixturePercentCode, null MixtureDesc, 
         null HazardousChemicalName, null CasNumber, null DOTNumber, null SpecialHHCode
    from Facilities
    join ReportSurveys on ReportSurveys.Id = 
      (select top 1 rs.Id
         from ReportSurveys rs
        where rs.FacilityId = Facilities.Id
        order by rs.RunDate desc)
    join ReportProducts on ReportProducts.ReportSurveyId = ReportSurveys.Id
    left outer join ReportSubstances on ReportSubstances.ReportProductId = ReportProducts.Id
    left outer join eds.dbo.vw_rtkinfo ri on ri.Year = 2013
                                         and ri.NJEIN = Facilities.FacilityNumber
                                         and ri.AlternateDesc = ReportProducts.Name
                                         and isnull(ri.Manufacturer,'') = isnull(ReportProducts.Manufacturer,'')
                                         and ri.SubstanceNo = ReportSubstances.SubstanceNumber
  )
) ss
--order by FacilityNumber, case ProductAction when 'Delete' then 1 when 'Change' then 2 when 'Add' then 3 else 4 end, case SubstanceAction when 'Delete' then 1 when 'Change' then 2 when 'Add' then 3 else 4 end, Name, SubstanceNumber
```
