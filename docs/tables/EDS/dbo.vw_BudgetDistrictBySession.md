# View: `dbo.vw_BudgetDistrictBySession`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SessionId` | int | NO |  |  |
| 2 | `DistrictName` | varchar(50) | YES |  |  |
| 3 | `BudgetName` | varchar(30) | YES |  |  |
| 4 | `BudgetId` | int | YES |  |  |
| 5 | `StateName` | varchar(50) | YES |  |  |
| 6 | `CountyName` | varchar(50) | YES |  |  |
| 7 | `DistrictId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Budgets` | USER_TABLE |
| `Counties` | USER_TABLE |
| `District` | USER_TABLE |
| `SessionTable` | USER_TABLE |
| `States` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_BudgetDistrictBySession] as
select SessionTable.SessionId, District.Name DistrictName, Budgets.Name BudgetName, Budgets.BudgetId, States.Name StateName, Counties.Name CountyName, District.DistrictId
  from SessionTable with (nolock)
  left outer join District on District.DistrictId = SessionTable.DistrictId
  left outer join Budgets on Budgets.BudgetId = SessionTable.BudgetId
  left outer join States on States.code = District.State
  left outer join Counties on Counties.Name = District.County
```
