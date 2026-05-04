# Table: `dbo.BidCalendar`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CalendarId` | int | NO |  | YES |
| 2 | `DateAvailable` | datetime | YES |  |  |
| 3 | `OpeningDate` | datetime | YES |  |  |
| 4 | `Description` | varchar(255) | YES |  |  |
| 5 | `CategoryName` | varchar(255) | YES |  |  |
| 6 | `CategoryId` | int | YES |  |  |
| 7 | `Comments` | varchar(4096) | YES |  |  |
| 8 | `Status` | varchar(255) | YES |  |  |
| 9 | `StateId` | int | YES |  |  |
| 10 | `PricePlanId` | int | YES |  |  |
| 11 | `TotalAwardMinimumDiscount` | decimal(9,5) | YES |  |  |
| 12 | `AllowTotalAward` | tinyint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
