# View: `dbo.vw_RequisitionsAccounts`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionId` | int | NO |  |  |
| 2 | `BudgetId` | int | YES |  |  |
| 3 | `UserId` | int | YES |  |  |
| 4 | `UserAccountId` | int | NO |  |  |
| 5 | `BudgetAccountId` | int | YES |  |  |
| 6 | `Code` | varchar(77) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Accounts`](dbo.Accounts.md) | USER_TABLE |
| [`dbo.BudgetAccounts`](dbo.BudgetAccounts.md) | USER_TABLE |
| [`dbo.Budgets`](dbo.Budgets.md) | USER_TABLE |
| [`dbo.Requisitions`](dbo.Requisitions.md) | USER_TABLE |
| `dbo.uf_lower` | SQL_SCALAR_FUNCTION |
| [`dbo.UserAccounts`](dbo.UserAccounts.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_RequisitionsAccounts] as
SELECT Requisitions.RequisitionId,
       UserAccounts.BudgetId,
       UserAccounts.UserId,
       UserAccounts.UserAccountId, 
       UserAccounts.BudgetAccountId,
       Accounts.Code + ' - ' + 
       case isnull(BudgetAccounts.UseAllocations,0) 
         when 0 then case isnull(UserAccounts.UseAllocations,0) 
                       when 0 then 'No Allocations' 
                       else cast(isnull(UserAccounts.AllocationAvailable,0) as varchar(24)) 
                     end 
         else case isnull(UserAccounts.UseAllocations,0) 
                when 0 then convert(varchar(24),isnull(BudgetAccounts.AmountAvailable,0)) 
                else cast(isnull(dbo.uf_lower(BudgetAccounts.AmountAvailable,UserAccounts.AllocationAvailable),0) as varchar(24)) 
              end 
       end as Code
  FROM dbo.Requisitions with (nolock) 
  join dbo.Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join dbo.UserAccounts on UserAccounts.BudgetId = Budgets.BudgetId
  JOIN dbo.BudgetAccounts on dbo.BudgetAccounts.BudgetAccountId = dbo.UserAccounts.BudgetAccountId 
  JOIN dbo.Accounts on Accounts.AccountId = UserAccounts.AccountId
 WHERE UserAccounts.Active = 1 
   AND Accounts.Active = 1 
   AND BudgetAccounts.Active = 1
```
