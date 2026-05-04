# View: `dbo.vw_UsedAccountData`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BudgetId` | int | NO |  |  |
| 2 | `BudgetName` | varchar(30) | YES |  |  |
| 3 | `SchoolId` | int | NO |  |  |
| 4 | `SchoolName` | varchar(50) | YES |  |  |
| 5 | `UserId` | int | NO |  |  |
| 6 | `CometId` | int | YES |  |  |
| 7 | `UserAttention` | varchar(50) | YES |  |  |
| 8 | `RequisitionId` | int | NO |  |  |
| 9 | `Attention` | varchar(50) | YES |  |  |
| 10 | `TotalRequisitionCost` | money | YES |  |  |
| 11 | `CategoryId` | int | NO |  |  |
| 12 | `CategoryName` | varchar(50) | YES |  |  |
| 13 | `UserAccountId` | int | YES |  |  |
| 14 | `UseUserAllocations` | tinyint | YES |  |  |
| 15 | `AllocationAmount` | money | YES |  |  |
| 16 | `AllocationAvailable` | money | YES |  |  |
| 17 | `AccountId` | int | YES |  |  |
| 18 | `Code` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Accounts` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Category` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `School` | USER_TABLE |
| `UserAccounts` | USER_TABLE |
| `Users` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_UsedAccountData] as
select Budgets.BudgetId, Budgets.Name as BudgetName,
       School.SchoolId, School.Name as SchoolName,
       Users.UserId, Users.CometId, Users.Attention as UserAttention,
       Requisitions.RequisitionId, Requisitions.Attention, Requisitions.TotalRequisitionCost,
       Category.CategoryId, Category.Name as CategoryName,
       UserAccounts.UserAccountId, UserAccounts.UseAllocations as UseUserAllocations, UserAccounts.AllocationAmount, UserAccounts.AllocationAvailable,
       Accounts.AccountId, Accounts.Code
  from Requisitions with (nolock)
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join School on School.SchoolId = Requisitions.SchoolId
  join Users on Users.UserId = Requisitions.UserId
  join Category on Category.CategoryId = Requisitions.CategoryId
  left outer join UserAccounts on UserAccounts.UserAccountId = Requisitions.UserAccountId
  left outer join Accounts on Accounts.AccountId = UserAccounts.AccountId
```
