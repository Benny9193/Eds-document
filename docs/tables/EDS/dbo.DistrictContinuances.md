# Table: `dbo.DistrictContinuances`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 14461

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `DistrictId` | int | NO |  |  |
| 3 | `BudgetId` | int | NO |  |  |
| 4 | `Email` | varchar(255) | YES |  |  |
| 5 | `Status` | char(1) | YES | `('P')` |  |
| 6 | `SignedBy` | varchar(255) | YES |  |  |
| 7 | `Comments` | varchar(4096) | YES |  |  |
| 8 | `Sent` | datetime | NO | `(getdate())` |  |
| 9 | `Received` | datetime | YES |  |  |
| 10 | `SavingsBudgetId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
