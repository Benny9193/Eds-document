# Table: `archive.RequisitionChangeLog`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `archive`
**Approx rows:** 1936897

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionChangeId` | int | NO |  |  |
| 2 | `RequisitionId` | int | NO |  |  |
| 3 | `OrigSchoolId` | int | YES |  |  |
| 4 | `OrigUserId` | int | YES |  |  |
| 5 | `OrigBudgetId` | int | YES |  |  |
| 6 | `OrigBudgetAccountId` | int | YES |  |  |
| 7 | `OrigUserAccountId` | int | YES |  |  |
| 8 | `OrigCategoryId` | int | YES |  |  |
| 9 | `OrigShippingId` | int | YES |  |  |
| 10 | `OrigAttention` | varchar(50) | YES |  |  |
| 11 | `OrigAccountCode` | varchar(50) | YES |  |  |
| 12 | `OrigBidHeaderId` | int | YES |  |  |
| 13 | `NewSchoolId` | int | YES |  |  |
| 14 | `NewUserId` | int | YES |  |  |
| 15 | `NewBudgetId` | int | YES |  |  |
| 16 | `NewBudgetAccountId` | int | YES |  |  |
| 17 | `NewUserAccountId` | int | YES |  |  |
| 18 | `NewCategoryId` | int | YES |  |  |
| 19 | `NewShippingId` | int | YES |  |  |
| 20 | `NewAttention` | varchar(50) | YES |  |  |
| 21 | `NewAccountCode` | varchar(50) | YES |  |  |
| 22 | `NewBidHeaderId` | int | YES |  |  |
| 23 | `UserId` | int | YES |  |  |
| 24 | `SessionId` | int | YES |  |  |
| 25 | `ChangeDate` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
