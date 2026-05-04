# Table: `dbo.BidResultChanges`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 18229521

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BRChangeId` | int | NO |  | YES |
| 2 | `BidResultsId` | int | YES |  |  |
| 3 | `ChangeDate` | datetime | YES |  |  |
| 4 | `PrevActive` | int | YES |  |  |
| 5 | `PrevUnitPrice` | money | YES |  |  |
| 6 | `NewActive` | int | YES |  |  |
| 7 | `NewUnitPrice` | money | YES |  |  |
| 8 | `PrevBidType` | char(1) | YES |  |  |
| 9 | `NewBidType` | char(1) | YES |  |  |
| 10 | `PrevComments` | varchar(1024) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
