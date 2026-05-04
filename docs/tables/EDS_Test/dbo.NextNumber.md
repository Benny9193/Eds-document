# Table: `dbo.NextNumber`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 24209

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NextNumberId` | int | NO |  | YES |
| 2 | `DistrictId` | int | YES |  |  |
| 3 | `SchoolId` | int | YES |  |  |
| 4 | `BudgetId` | int | YES |  |  |
| 5 | `IdType` | char(1) | YES |  |  |
| 6 | `Prefix` | varchar(20) | YES |  |  |
| 7 | `Suffix` | varchar(20) | YES |  |  |
| 8 | `NextNumber` | int | YES |  |  |
| 9 | `SuppressLZ` | tinyint | YES |  |  |
| 10 | `NumberLength` | tinyint | YES |  |  |
| 11 | `FFMessage` | varchar(4096) | YES |  |  |
| 12 | `EndNumber` | int | YES |  |  |
| 13 | `ActualNumber` | tinyint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `_dta_index_NextNumber_7_1182679311__K4_K5_3_11` | no | NONCLUSTERED | `BudgetId`, `IdType` | `SchoolId`, `FFMessage` |
| `IX_NextNumber_Composite` | YES | NONCLUSTERED | `DistrictId`, `SchoolId`, `BudgetId`, `IdType` | `Prefix`, `Suffix`, `NextNumber` |
| `SK_BIS` | YES | NONCLUSTERED | `BudgetId`, `IdType`, `SchoolId` |  |
| `SK_IDType` | no | NONCLUSTERED | `IdType` |  |
