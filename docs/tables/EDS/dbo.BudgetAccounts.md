# Table: `dbo.BudgetAccounts`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1419612

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

District budget accounts / charge codes (~1.4M rows). Hierarchical (often fund-function-object), district-scoped. Requisition lines distribute against rows here.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BudgetAccountId` | int | NO |  | YES |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `BudgetId` | int | YES |  |  |
| 4 | `AccountId` | int | YES |  |  |
| 5 | `BudgetAmount` | money | YES |  |  |
| 6 | `AmountAvailable` | money | YES |  |  |
| 7 | `UseAllocations` | tinyint | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_BudgetAccounts_Accounts` | `AccountId` | [`dbo.Accounts.AccountId`](dbo.Accounts.md) | NO_ACTION | NO_ACTION |
| `FK_BudgetAccounts_Budgets` | `BudgetId` | [`dbo.Budgets.BudgetId`](dbo.Budgets.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.UserAccounts`](dbo.UserAccounts.md) | `BudgetAccountId` | `BudgetAccountId` | NO_ACTION | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `_dta_index_BudgetAccounts_7_11199140__K1_4` | no | NONCLUSTERED | `BudgetAccountId` | `AccountId` |
| `SK_ActiveAccount` | no | NONCLUSTERED | `Active`, `AccountId` |  |
| `SK_BAUseAllocations` | no | NONCLUSTERED | `UseAllocations`, `BudgetAccountId` |  |
| `SK_Budget` | no | NONCLUSTERED | `BudgetId`, `Active` |  |
| `SK_UseAllocationsBA` | no | NONCLUSTERED | `UseAllocations`, `BudgetAccountId` |  |
| `SKI_Account_BudgetaccountActive` | no | NONCLUSTERED | `AccountId` | `BudgetAccountId`, `Active` |
