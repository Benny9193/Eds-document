# Table: `dbo.DistrictCharges`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 20788

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DistrictChargeId` | int | NO |  | YES |
| 2 | `DistrictId` | int | NO |  |  |
| 3 | `Active` | int | YES |  |  |
| 4 | `ChargeDate` | datetime | YES |  |  |
| 5 | `ChargeTypeId` | int | YES |  |  |
| 6 | `Amount` | money | YES |  |  |
| 7 | `DateUpdated` | datetime | YES |  |  |
| 8 | `Invoiced` | datetime | YES |  |  |
| 9 | `Frequency` | int | YES |  |  |
| 10 | `Repeats` | int | YES |  |  |
| 11 | `FrequencyData` | varchar(50) | YES |  |  |
| 12 | `BudgetId` | int | YES |  |  |
| 13 | `Comments` | varchar(512) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
