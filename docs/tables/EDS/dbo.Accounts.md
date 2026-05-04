# Table: `dbo.Accounts`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 110644

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `AccountId` | int | NO |  | YES |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `DistrictId` | int | YES |  |  |
| 4 | `SchoolId` | int | YES |  |  |
| 5 | `Code` | varchar(50) | YES |  |  |
| 6 | `Description` | varchar(512) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_Accounts_District` | `DistrictId` | [`dbo.District.DistrictId`](dbo.District.md) | NO_ACTION | NO_ACTION |
| `FK_Accounts_School` | `SchoolId` | [`dbo.School.SchoolId`](dbo.School.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.BudgetAccounts`](dbo.BudgetAccounts.md) | `AccountId` | `AccountId` | NO_ACTION | NO_ACTION |
| [`dbo.UserAccounts`](dbo.UserAccounts.md) | `AccountId` | `AccountId` | NO_ACTION | CASCADE |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `_dta_index_Accounts_7_1035202788__K1_5` | no | NONCLUSTERED | `AccountId` | `Code` |
| `SK_AccountDistrict` | no | NONCLUSTERED | `DistrictId`, `Code` |  |
| `SK_ActiveCode` | no | NONCLUSTERED | `Active`, `Code` |  |
