# Table: `dbo.BidResultsChangeLog`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 238978

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BRChangeLogId` | int | NO |  | YES |
| 2 | `ChangeDate` | datetime | YES |  |  |
| 3 | `BidResultsId` | int | YES |  |  |
| 4 | `SessionId` | int | YES |  |  |
| 5 | `UserId` | int | YES |  |  |
| 6 | `Reason` | varchar(4096) | YES |  |  |
| 7 | `RequisitionId` | int | YES |  |  |
| 8 | `DetailId` | int | YES |  |  |
| 9 | `ItemId` | int | YES |  |  |
| 10 | `BidType` | char(1) | YES |  |  |
| 11 | `NetPrice` | money | YES |  |  |
| 12 | `VOMId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
