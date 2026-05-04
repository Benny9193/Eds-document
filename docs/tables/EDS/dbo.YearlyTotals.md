# Table: `dbo.YearlyTotals`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 10619

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BudgetId` | int | NO |  |  |
| 2 | `Name` | varchar(30) | YES |  |  |
| 3 | `DistrictId` | int | YES |  |  |
| 4 | `DistrictName` | varchar(189) | YES |  |  |
| 5 | `TotalBidCost` | money | YES |  |  |
| 6 | `TotalCatalogCost` | numeric(38,6) | YES |  |  |
| 7 | `TotalStateContractCost` | numeric(38,6) | YES |  |  |
| 8 | `StateContractDiscount` | decimal(13,9) | YES |  |  |
| 9 | `OverallSavings` | numeric(38,6) | YES |  |  |
| 10 | `OverallDiscount` | numeric(38,6) | YES |  |  |
| 11 | `IncludedCatalogCost` | numeric(38,6) | YES |  |  |
| 12 | `IncludedBidCost` | money | YES |  |  |
| 13 | `ExcludedCatalogCost` | numeric(38,6) | YES |  |  |
| 14 | `ExcludedBidCost` | money | YES |  |  |
| 15 | `IncludedSavings` | numeric(38,6) | YES |  |  |
| 16 | `ExcludedSavings` | numeric(38,6) | YES |  |  |
| 17 | `IncludedDiscount` | numeric(38,6) | YES |  |  |
| 18 | `ExcludedDiscount` | numeric(38,6) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
