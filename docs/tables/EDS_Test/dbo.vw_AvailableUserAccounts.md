# View: `dbo.vw_AvailableUserAccounts`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `UserId` | int | NO |  |  |
| 2 | `BudgetId` | int | NO |  |  |
| 3 | `BudgetAccountId` | int | NO |  |  |
| 4 | `UseAllocations` | tinyint | YES |  |  |
| 5 | `BudgetAmount` | money | YES |  |  |
| 6 | `AmountAvailable` | money | YES |  |  |
| 7 | `AccountId` | int | NO |  |  |
| 8 | `Code` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Accounts` | USER_TABLE |
| `BudgetAccounts` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `UserAccounts` | USER_TABLE |
| `Users` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_AvailableUserAccounts] as
select Users.UserId, Budgets.BudgetId, BudgetAccounts.BudgetAccountId, BudgetAccounts.UseAllocations, BudgetAccounts.BudgetAmount, BudgetAccounts.AmountAvailable, Accounts.AccountId, Accounts.Code
  from Users with (nolock)
  join Budgets on Budgets.DistrictId = Users.DistrictId
  join BudgetAccounts on BudgetAccounts.BudgetId = Budgets.BudgetId
                     and BudgetAccounts.Active = 1
  join Accounts on Accounts.AccountId = BudgetAccounts.AccountId
               and Accounts.Active = 1
  left outer join UserAccounts on UserAccounts.AccountId = Accounts.AccountId
                              and UserAccounts.BudgetAccountId = BudgetAccounts.BudgetAccountId
                              and UserAccounts.Active = 1
                              and UserAccounts.UserId = Users.UserId
 where Users.Active = 1
   and UserAccounts.UserAccountId is null
```
