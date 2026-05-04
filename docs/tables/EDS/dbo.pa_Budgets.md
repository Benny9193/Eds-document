# View: `dbo.pa_Budgets`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SessionId` | int | YES |  |  |
| 2 | `BudgetId` | int | YES |  |  |
| 3 | `Name` | varchar(30) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Budgets` | USER_TABLE |
| `PendingApprovals` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[pa_Budgets] as
select PendingApprovals.SessionId, PendingApprovals.BudgetId, Budgets.Name
  from PendingApprovals with (nolock)
  join Budgets on Budgets.BudgetId = PendingApprovals.BudgetId
 group by PendingApprovals.SessionId, PendingApprovals.BudgetId, Budgets.Name
```
