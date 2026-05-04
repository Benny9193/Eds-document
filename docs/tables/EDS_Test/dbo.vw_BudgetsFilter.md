# View: `dbo.vw_BudgetsFilter`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BudgetName` | varchar(9) | YES |  |  |
| 2 | `BudgetFilterId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Budgets` | USER_TABLE |
| `District` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_BudgetsFilter] as
  select substring(Budgets.Name,1,4) + '-' + cast(CAST(substring(Budgets.Name,1,4) as int) + 1 as CHAR(4)) BudgetName, CAST(substring(Budgets.Name,1,4) as int) as BudgetFilterId
    from Budgets with (nolock)
    join District on District.DistrictId = Budgets.DistrictId
                 and District.Active = 1
                 and isnull(rtrim(District.State),'') != ''
                 and ISNULL(rtrim(District.DistrictCode),'') != ''
   where Budgets.Active = 1
     and ISNUMERIC(substring(Budgets.Name,1,4)) = 1
     and CAST(substring(Budgets.Name,1,4) as int) > YEAR(getdate()) - 6
   group by substring(Budgets.Name,1,4) + '-' + cast(CAST(substring(Budgets.Name,1,4) as int) + 1 as CHAR(4)), CAST(substring(Budgets.Name,1,4) as int)
```
