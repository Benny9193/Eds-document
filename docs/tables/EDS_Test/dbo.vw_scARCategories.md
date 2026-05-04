# View: `dbo.vw_scARCategories`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SessionId` | int | NO |  |  |
| 2 | `DistrictId` | int | NO |  |  |
| 3 | `BudgetId` | int | NO |  |  |
| 4 | `CategoryId` | int | NO |  |  |
| 5 | `Name` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Budgets` | USER_TABLE |
| `Category` | USER_TABLE |
| `District` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `SessionTable` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_scARCategories] as
select SessionTable.SessionId, District.DistrictId, Budgets.BudgetId, Category.CategoryId, Category.Name
  from SessionTable with (nolock)
  join Budgets on Budgets.BudgetId = SessionTable.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
  join Requisitions on Requisitions.BudgetId = Budgets.BudgetId
  join Category on Category.CategoryId = Requisitions.CategoryId
  group by SessionTable.SessionId, District.DistrictId, Budgets.BudgetId, Category.CategoryId, Category.Name
```
