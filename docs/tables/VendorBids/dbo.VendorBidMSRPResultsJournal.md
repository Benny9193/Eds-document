# Table: `dbo.VendorBidMSRPResultsJournal`

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 141023

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorBidMSRPResultsJournalId` | int | NO |  | YES |
| 2 | `VendorBidMSRPResultsId` | int | NO |  |  |
| 3 | `SessionId` | int | YES |  |  |
| 4 | `Modified` | datetime | YES | `(getdate())` |  |
| 5 | `WeightedDiscount` | varbinary(255) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
