# Table: `dbo.Budgets`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 15575

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BudgetId` | int | NO |  | YES |
| 2 | `DistrictId` | int | YES |  |  |
| 3 | `Active` | tinyint | YES |  |  |
| 4 | `Name` | varchar(30) | YES |  |  |
| 5 | `StartDate` | datetime | YES |  |  |
| 6 | `EndDate` | datetime | YES |  |  |
| 7 | `VisibleFrom` | datetime | YES |  |  |
| 8 | `VisibleUntil` | datetime | YES |  |  |
| 9 | `AnnualCutoff` | datetime | YES |  |  |
| 10 | `EditFrom` | datetime | YES |  |  |
| 11 | `EditUntil` | datetime | YES |  |  |
| 12 | `EarlyAccess` | datetime | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_Budgets_District` | `DistrictId` | [`dbo.District.DistrictId`](dbo.District.md) | NO_ACTION | CASCADE |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.BudgetAccounts`](dbo.BudgetAccounts.md) | `BudgetId` | `BudgetId` | NO_ACTION | NO_ACTION |
| [`dbo.Requisitions`](dbo.Requisitions.md) | `BudgetId` | `BudgetId` | NO_ACTION | NO_ACTION |
| [`dbo.UserAccounts`](dbo.UserAccounts.md) | `BudgetId` | `BudgetId` | NO_ACTION | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `_dta_index_Budgets_7_2030682332__K3_K2_K1_4_5_6` | no | NONCLUSTERED | `Active`, `DistrictId`, `BudgetId` | `Name`, `StartDate`, `EndDate` |
| `SK_BudgetDistrict` | no | NONCLUSTERED | `BudgetId`, `DistrictId` | `Active`, `Name`, `StartDate`, `EndDate`, `VisibleFrom`, `VisibleUntil`, `AnnualCutoff`, `EditFrom`, `EditUntil`, `EarlyAccess` |
| `SK_District` | no | NONCLUSTERED | `DistrictId` |  |
| `SK_DistrictDate` | no | NONCLUSTERED | `DistrictId`, `EndDate`, `StartDate` |  |
| `SKI_Active_BudgetDistrictNameFromUntil` | no | NONCLUSTERED | `Active` | `BudgetId`, `DistrictId`, `Name`, `VisibleFrom`, `VisibleUntil` |
