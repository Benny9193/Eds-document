# View: `dbo.vw_FA_BudgetsView`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SessionId` | int | NO |  |  |
| 2 | `BudgetId` | int | NO |  |  |
| 3 | `Name` | varchar(30) | YES |  |  |
| 4 | `EndDate` | datetime | YES |  |  |
| 5 | `AnnualCutoff` | datetime | YES |  |  |
| 6 | `CurrentBudget` | int | NO |  |  |
| 7 | `AllowEdit` | int | NO |  |  |
| 8 | `EditFrom` | datetime | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Budgets` | USER_TABLE |
| `SessionTable` | USER_TABLE |
| `Users` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_FA_ALLBudgetAccounts`](dbo.vw_FA_ALLBudgetAccounts.md) | VIEW |
| [`dbo.vw_FA_BudgetAccounts`](dbo.vw_FA_BudgetAccounts.md) | VIEW |

## Definition

```sql
CREATE     view  [dbo].[vw_FA_BudgetsView] as
select SessionTable.SessionId, Budgets.BudgetId, Budgets.Name, Budgets.EndDate, Budgets.AnnualCutoff, CASE WHEN GETDATE() BETWEEN Budgets.VisibleFrom AND Budgets.VisibleUntil THEN 1 ELSE 0 END AS CurrentBudget
            ,CASE 
                  WHEN GETDATE() BETWEEN Budgets.EditFrom AND Budgets.EditUntil THEN 1
				  when Users.AllowEarlyAccess = 1 and getdate() between Budgets.EarlyAccess and Budgets.EditUntil then 1
                  ELSE 0
            END AS AllowEdit,
			case
				when Users.AllowEarlyAccess = 1 and getdate() between Budgets.EarlyAccess and Budgets.EditUntil then Budgets.EarlyAccess
				when getdate() between Budgets.EditFrom AND Budgets.EditUntil THEN Budgets.EditFrom
				else null
			end EditFrom
  from SessionTable with (nolock)
  join Users on Users.UserId = SessionTable.UserId
  join Budgets on Budgets.DistrictId = SessionTable.DistrictId
              and getdate() between case when isnull(SessionTable.CSRepID,0) > 0 AND ISNULL(SessionTable.ApprovalLevel,0) > 2 then dateadd(year,-99,Budgets.VisibleFrom) else case when isnull(Users.AllowEarlyAccess,0) = 1 or isnull(SessionTable.ApprovalLevel,0) > 1 then coalesce(Budgets.EarlyAccess,Budgets.VisibleFrom) else Budgets.VisibleFrom end end
                                and case when isnull(SessionTable.CSRepID,0) > 0 AND ISNULL(SessionTable.ApprovalLevel,0) > 2 then dateadd(year,2,Budgets.VisibleUntil) else Budgets.VisibleUntil end
/* Change below to above DCH 10/6/2014 adding Early Access                             
              and Budgets.VisibleFrom <= case when isnull(SessionTable.CSRepID,0) > 0 AND ISNULL(SessionTable.ApprovalLevel,0) > 2 then dateadd(year,99,getdate()) else getdate() end
              and Budgets.VisibleUntil >= case when isnull(SessionTable.CSRepID,0) > 0 AND ISNULL(SessionTable.ApprovalLevel,0) > 2  then dateadd(year,-2,getdate()) else getdate() end */
              and Budgets.Active = 1              
 where SessionTable.SessionEnd is null
```
