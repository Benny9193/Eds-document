# Table: `dbo.BidSchedule`

**Database:** `VendorBids_TEST` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1587

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidScheduleId` | int | NO |  | YES |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `CoopId` | int | YES |  |  |
| 4 | `CoopName` | varchar(50) | YES |  |  |
| 5 | `DateAdvertised` | datetime | YES |  |  |
| 6 | `DateAvailable` | datetime | YES |  |  |
| 7 | `OpeningDate` | datetime | YES |  |  |
| 8 | `State` | char(2) | YES |  |  |
| 9 | `ReceivedAt` | varchar(255) | YES |  |  |
| 10 | `DateModified` | datetime | NO | `(getdate())` |  |
| 11 | `Description` | varchar(1024) | YES |  |  |
| 12 | `CoopBid` | tinyint | YES |  |  |
| 13 | `EmailMessage` | varchar(8000) | YES |  |  |
| 14 | `EmailMessage2` | varchar(8000) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
