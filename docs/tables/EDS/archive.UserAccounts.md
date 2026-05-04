# Table: `archive.UserAccounts`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `archive`
**Approx rows:** 2704140

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `UserAccountId` | int | NO |  |  |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `AccountId` | int | YES |  |  |
| 4 | `BudgetId` | int | YES |  |  |
| 5 | `BudgetAccountId` | int | YES |  |  |
| 6 | `UserId` | int | YES |  |  |
| 7 | `AllocationAmount` | money | YES |  |  |
| 8 | `AllocationAvailable` | money | YES |  |  |
| 9 | `UseAllocations` | tinyint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
