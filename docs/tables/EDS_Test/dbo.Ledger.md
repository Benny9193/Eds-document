# Table: `dbo.Ledger`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `LedgerId` | int | NO |  | YES |
| 2 | `TransactionTypeId` | int | NO |  |  |
| 3 | `Amount` | money | YES |  |  |
| 4 | `TransactionDate` | datetime | NO |  |  |
| 5 | `DueDate` | datetime | YES |  |  |
| 6 | `DatePosted` | datetime | NO |  |  |
| 7 | `PostedBy` | int | YES |  |  |
| 8 | `DistrictId` | int | YES |  |  |
| 9 | `Credit` | tinyint | YES |  |  |
| 10 | `Comment` | varchar(4096) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
