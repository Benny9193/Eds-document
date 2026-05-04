# View: `dbo.vw_DistrictBudgetPP`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `selected` | int | NO |  |  |
| 2 | `BudgetId` | int | NO |  |  |
| 3 | `BudgetName` | varchar(30) | NO |  |  |
| 4 | `DistrictId` | int | NO |  |  |
| 5 | `DistrictName` | varchar(50) | NO |  |  |
| 6 | `DistrictCode` | varchar(4) | NO |  |  |
| 7 | `PricePlanId` | int | NO |  |  |
| 8 | `PricePlanCode` | varchar(20) | NO |  |  |
| 9 | `BudgetsFilterId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Budgets` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictPP` | USER_TABLE |
| `PricePlans` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_DistrictBudgetPP] as
select 0 selected, Budgets.BudgetId, isnull(Budgets.Name,'') BudgetName, District.DistrictId, isnull(District.Name,'') DistrictName, isnull(District.DistrictCode,'') DistrictCode, PricePlans.PricePlanId, isnull(PricePlans.Code,'') PricePlanCode, cast(substring(Budgets.Name,1,4) as int) BudgetsFilterId
  from Budgets with (nolock)
  join District on District.DistrictId = Budgets.DistrictId
               and District.Active = 1
               and isnull(District.State,'') != ''
  join DistrictPP on DistrictPP.DistrictId = District.DistrictId
  join PricePlans on PricePlans.PricePlanId = DistrictPP.PricePlanId
                 and PricePlans.Active = 1
 where Budgets.Active = 1
   and ISNUMERIC(substring(Budgets.Name,1,4)) = 1
   and CAST(substring(Budgets.Name,1,4) as int) > YEAR(getdate()) - 2
union (
select 0 selected, Budgets.BudgetId, isnull(Budgets.Name,'') BudgetName, District.DistrictId, isnull(District.Name,'') DistrictName, isnull(District.DistrictCode,'') DistrictCode, 99999 PricePlanId, ' < All >' PricePlanCode, cast(substring(Budgets.Name,1,4) as int) BudgetsFilterId
  from Budgets with (nolock)
  join District on District.DistrictId = Budgets.DistrictId
               and District.Active = 1
               and isnull(District.State,'') != ''
 where Budgets.Active = 1
   and ISNUMERIC(substring(Budgets.Name,1,4)) = 1
   and CAST(substring(Budgets.Name,1,4) as int) > YEAR(getdate()) - 2
)
```
