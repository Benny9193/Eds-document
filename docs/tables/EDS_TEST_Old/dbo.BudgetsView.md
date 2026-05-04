# View: `dbo.BudgetsView`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SessionId` | int | NO |  |  |
| 2 | `BudgetId` | int | NO |  |  |
| 3 | `Name` | varchar(30) | YES |  |  |
| 4 | `EndDate` | datetime | YES |  |  |

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
create   view  [dbo].[BudgetsView] as
select SessionTable.SessionId, Budgets.BudgetId, Budgets.Name, Budgets.EndDate
  from SessionTable with (nolock)
  left outer join Users on Users.UserId = SessionTable.UserId
  join Budgets on Budgets.DistrictId = SessionTable.DistrictId
              and GETDATE() between dateadd(year,case when isnull(SessionTable.ApprovalLevel,0) in (8,9) then -5 when isnull(Sessiontable.ApprovalLevel,0) = 5 then -2 else 0 end, case when ISNULL(Users.AllowEarlyAccess,0) = 1 or isnull(Users.ApprovalLevel,0) > 1 then coalesce(Budgets.EarlyAccess,Budgets.VisibleFrom) else Budgets.VisibleFrom end) and dateadd(year,case when isnull(SessionTable.ApprovalLevel,0) in (8,9) then 5 when isnull(Sessiontable.ApprovalLevel,0) = 5 then 2 else 0 end, Budgets.VisibleUntil)
              and Budgets.Active = 1              
 where SessionTable.SessionEnd is null
```
