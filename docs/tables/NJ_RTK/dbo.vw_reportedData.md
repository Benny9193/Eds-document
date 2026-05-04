# View: `dbo.vw_reportedData`

**Database:** `NJ_RTK` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `EIN` | varchar(50) | NO |  |  |
| 2 | `DistrictName` | varchar(50) | NO |  |  |
| 3 | `FacilityNumber` | varchar(50) | YES |  |  |
| 4 | `FacilityName` | varchar(50) | YES |  |  |
| 5 | `ProductName` | varchar(255) | YES |  |  |
| 6 | `Purpose` | varchar(100) | YES |  |  |
| 7 | `Manufacturer` | varchar(100) | YES |  |  |
| 8 | `Container` | varchar(50) | YES |  |  |
| 9 | `Quantity` | varchar(50) | YES |  |  |
| 10 | `SubstanceNumber` | varchar(50) | YES |  |  |
| 11 | `Mixture` | varchar(50) | YES |  |  |
| 12 | `RangeCode` | char(2) | YES |  |  |
| 13 | `MixtureCode` | char(2) | YES |  |  |
| 14 | `ContainerCode` | char(2) | YES |  |  |
| 15 | `UOMCode` | char(1) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Employers` | USER_TABLE |
| `Facilities` | USER_TABLE |
| `ReportProducts` | USER_TABLE |
| `ReportSubstances` | USER_TABLE |
| `ReportSurveys` | USER_TABLE |
| `dbo.RTK_ContainerCodes` | unresolved |
| `dbo.RTK_InventoryRangeCodes` | unresolved |
| `dbo.RTK_MixtureCodes` | unresolved |
| `dbo.RTK_UOMCodes` | unresolved |

## Used by

_No other objects reference this view._

## Definition

```sql
create view vw_reportedData as
select Employers.EIN, Employers.Name DistrictName, Facilities.FacilityNumber, Facilities.Name FacilityName, ReportProducts.Name ProductName, ReportProducts.Purpose, ReportProducts.Manufacturer, ReportProducts.Container, ReportProducts.Quantity, ReportSubstances.SubstanceNumber, ReportSubstances.Mixture, irc.RangeCode, mc.MixtureCode, cc.ContainerCode, uc.UOMCode
  from Employers
  join Facilities on Facilities.EmployerId = Employers.Id 
  join ReportSurveys on ReportSurveys.Id =
    (select top 1 rs.Id
       from ReportSurveys rs
      where rs.FacilityId = Facilities.Id
      order by rs.RunDate desc)
  left outer join ReportProducts on ReportProducts.ReportSurveyId = ReportSurveys.Id
  left outer join ReportSubstances on ReportSubstances.ReportProductId = ReportProducts.Id
  left outer join EDS.dbo.RTK_ContainerCodes cc on cc.ContainerDesc = case when ReportProducts.Container = 'Other' then 'Other (describe)' else ReportProducts.Container end
  left outer join EDS.dbo.RTK_MixtureCodes mc on mc.Description = ReportSubstances.Mixture
  left outer join EDS.dbo.RTK_InventoryRangeCodes irc on irc.Description = left(ReportProducts.Quantity,LEN(irc.Description))
  left outer join EDS.dbo.RTK_UOMCodes uc on uc.UOMCode = SUBSTRING(ReportProducts.Quantity,LEN(irc.Description) + 2,1)
-- order by Employers.EIN, Facilities.FacilityNumber
```
