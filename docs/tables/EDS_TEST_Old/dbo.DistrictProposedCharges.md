# Table: `dbo.DistrictProposedCharges`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 10309

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` |  |
| 2 | `DistrictId` | int | NO |  |  |
| 3 | `BudgetId` | int | NO |  |  |
| 4 | `ChargeTypeId` | int | NO |  |  |
| 5 | `DateUpdated` | datetime | YES |  |  |
| 6 | `DateApplied` | datetime | YES |  |  |
| 7 | `Amount` | money | YES |  |  |
| 8 | `PreviousAmount` | money | YES |  |  |
| 9 | `PreviousBudgetId` | int | YES |  |  |
| 10 | `ChangePercentage` | decimal(11,5) | YES |  |  |
| 11 | `Action` | char(1) | YES |  |  |
| 12 | `Frequency` | int | YES |  |  |
| 13 | `FrequencyData` | varchar(50) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
