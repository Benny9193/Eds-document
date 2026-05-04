# Table: `dbo.BatchBook`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 217611

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BatchBookId` | int | NO |  | YES |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `BatchId` | int | NO |  |  |
| 4 | `DistrictCode` | char(2) | YES |  |  |
| 5 | `Category` | char(1) | YES |  |  |
| 6 | `CometCode` | char(5) | YES |  |  |
| 7 | `AccountCode` | char(50) | YES |  |  |
| 8 | `DistrictId` | int | YES |  |  |
| 9 | `CategoryId` | int | YES |  |  |
| 10 | `UserId` | int | YES |  |  |
| 11 | `BudgetId` | int | YES |  |  |
| 12 | `AccountId` | int | YES |  |  |
| 13 | `BudgetAccountId` | int | YES |  |  |
| 14 | `UserAccountId` | int | YES |  |  |
| 15 | `Records` | int | YES |  |  |
| 16 | `InputAmount` | money | YES |  |  |
| 17 | `CalcAmount` | money | YES |  |  |
| 18 | `Errors` | int | YES |  |  |
| 19 | `DuplicateOk` | tinyint | YES |  |  |
| 20 | `DuplicateDetected` | tinyint | YES |  |  |
| 21 | `RequisitionId` | int | YES |  |  |
| 22 | `AmountOk` | tinyint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_Batch` | no | NONCLUSTERED | `BatchId` |  |
| `SK_DCCatCCBatch` | no | NONCLUSTERED | `DistrictCode`, `Category`, `CometCode`, `BatchId` |  |
| `SK_DCU` | no | NONCLUSTERED | `DistrictId`, `CategoryId`, `UserId`, `Active` |  |
| `SK_DistrictId` | no | NONCLUSTERED | `DistrictId`, `CategoryId` |  |
