# Table: `dbo.VendorBidTMAnswersJournal`

**Database:** `VendorBids_TEST` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 671643

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorBidTMAnswerJournalId` | int | NO |  | YES |
| 2 | `VendorBidTMAnswerId` | int | NO |  |  |
| 3 | `SessionId` | int | NO |  |  |
| 4 | `datemodified` | datetime | YES | `(getdate())` |  |
| 5 | `BidAnswer` | varbinary(1024) | YES |  |  |
| 6 | `BidAnswerExtended` | varbinary(1024) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
