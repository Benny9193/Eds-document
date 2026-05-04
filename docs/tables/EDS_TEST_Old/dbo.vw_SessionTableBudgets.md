# View: `dbo.vw_SessionTableBudgets`

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
| `SessionTable` | USER_TABLE |
| `Users` | USER_TABLE |
| [`dbo.Budgets`](dbo.Budgets.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_SessionTableBudgets] as
SELECT SessionTable.SessionId, Budgets.BudgetId, Budgets.Name, Budgets.EndDate    
  FROM SessionTable with (nolock)
  left outer join Users on Users.UserId = SessionTable.UserId
  join dbo.Budgets on Budgets.DistrictId = SessionTable.DistrictId
                  and Budgets.Active = 1
                  and GETDATE() between DATEADD(year,case SessionTable.ApprovalLevel 
                                               when 9 then -5 
                                               when 8 then -5 
                                               when 5 then -2 
                                               else 0 
                                             end,case when ISNULL(Users.AllowEarlyAccess,0) = 1 or isnull(SessionTable.ApprovalLevel,0) > 1 then coalesce(Budgets.EarlyAccess,Budgets.VisibleFrom) else Budgets.VisibleFrom end)
                  and dateadd(year,case SessionTable.ApprovalLevel 
                               when 9 then 5
                               when 8 then 5
                               when 5 then 2
                               else 0
                             end, case isnull(SessionTable.AllowIncidentals,0) 
									when 0 then Budgets.VisibleUntil 
									else Budgets.EndDate 
								  end)
 group by SessionTable.SessionId, Budgets.BudgetId, Budgets.Name, Budgets.EndDate
--ORDER BY Budgets.EndDate, Budgets.Name
```
