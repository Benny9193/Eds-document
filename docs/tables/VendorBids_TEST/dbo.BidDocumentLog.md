# Table: `dbo.BidDocumentLog`

**Database:** `VendorBids_TEST` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 26

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidDocumentLogId` | int | NO |  | YES |
| 2 | `reguserid` | int | NO |  |  |
| 3 | `calendarid` | int | NO |  |  |
| 4 | `BidDocumentId` | int | NO |  |  |
| 5 | `downloaded` | datetime | YES | `(getdate())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
