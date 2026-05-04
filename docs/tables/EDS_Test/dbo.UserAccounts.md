# Table: `dbo.UserAccounts`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 3318098

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `UserAccountId` | int | NO |  | YES |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `AccountId` | int | YES |  |  |
| 4 | `BudgetId` | int | YES |  |  |
| 5 | `BudgetAccountId` | int | YES |  |  |
| 6 | `UserId` | int | YES |  |  |
| 7 | `AllocationAmount` | money | YES |  |  |
| 8 | `AllocationAvailable` | money | YES |  |  |
| 9 | `UseAllocations` | tinyint | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_UserAccounts_Accounts` | `AccountId` | [`dbo.Accounts.AccountId`](dbo.Accounts.md) | NO_ACTION | CASCADE |
| `FK_UserAccounts_BudgetAccounts` | `BudgetAccountId` | [`dbo.BudgetAccounts.BudgetAccountId`](dbo.BudgetAccounts.md) | NO_ACTION | CASCADE |
| `FK_UserAccounts_Budgets` | `BudgetId` | [`dbo.Budgets.BudgetId`](dbo.Budgets.md) | NO_ACTION | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_BA` | no | NONCLUSTERED | `BudgetAccountId` |  |
| `SK_BudgetAccount` | no | NONCLUSTERED | `Active`, `BudgetAccountId` |  |
| `SK_UAUseAllocations` | no | NONCLUSTERED | `UseAllocations`, `UserAccountId` |  |
| `SK_User` | no | NONCLUSTERED | `UserId`, `Active` |  |
| `SK_UserAccount` | no | NONCLUSTERED | `AccountId`, `UserId` |  |
| `SKI_UserBudgetActive_Account` | no | NONCLUSTERED | `UserId`, `BudgetId`, `Active` | `AccountId` |
| `UserAccounts34` | no | NONCLUSTERED | `BudgetId`, `Active`, `AccountId`, `UserId` |  |
