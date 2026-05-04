# View: `dbo.vw_ARBudgets`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Tagged` | int | NO |  |  |
| 2 | `SessionId` | int | NO |  |  |
| 3 | `BudgetId` | int | NO |  |  |
| 4 | `BudgetName` | varchar(30) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Budgets` | USER_TABLE |
| `SessionTable` | USER_TABLE |
| `Users` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_ARBudgets] as 
select case when getdate() between case when ISNULL(Users.AllowEarlyAccess,0) = 1 or isnull(Users.ApprovalLevel,0) > 1 then coalesce(Budgets.EarlyAccess,Budgets.VisibleFrom) else Budgets.VisibleFrom end and Budgets.VisibleUntil then 1 else 0 end Tagged, SessionTable.SessionId, Budgets.BudgetId, isnull(Budgets.Name,'') BudgetName
  from Budgets with (nolock)
  join SessionTable on SessionTable.DistrictId = Budgets.DistrictId
  left outer join Users on Users.UserId = SessionTable.UserId
 where Budgets.Active = 1
   and getdate() between case when isnull(Users.ApprovalLevel,0) >= 5 then dateadd(year,-5,Budgets.VisibleFrom) when ISNULL(Users.AllowEarlyAccess,0) = 1 or isnull(Users.ApprovalLevel,0) > 1 then coalesce(Budgets.EarlyAccess,Budgets.VisibleFrom) else Budgets.VisibleFrom end and case when isnull(Users.ApprovalLevel,0) >= 5 then dateadd(year,5,Budgets.VisibleUntil) else Budgets.VisibleUntil end
/* DCH 10/6/14 EarlyAccess
select case when Budgets.VisibleFrom <= getdate() and Budgets.VisibleUntil >= getdate() then 1 else 0 end Tagged, SessionTable.SessionId, Budgets.BudgetId, isnull(Budgets.Name,'') BudgetName
  from Budgets with (nolock)
  join SessionTable on SessionTable.DistrictId = Budgets.DistrictId
  left outer join Users on Users.UserId = SessionTable.UserId
 where Budgets.Active = 1
   and Budgets.VisibleFrom >= case when isnull(SessionTable.ApprovalLevel,0) >= 5 then dateadd(year,-5,getdate()) else getdate() end
   and Budgets.VisibleUntil <= case when isnull(SessionTable.ApprovalLevel,0) >= 5 then DATEADD(year,5,getdate()) else GETDATE() end
*/
```
