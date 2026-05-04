# Table: `dbo.BidScheduleCats`

**Database:** `VendorBids_TEST` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 3040

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BSCId` | int | NO |  | YES |
| 2 | `BidScheduleId` | int | YES |  |  |
| 3 | `CategoryId` | int | YES |  |  |
| 4 | `CategoryName` | varchar(50) | YES |  |  |
| 5 | `Description` | varchar(255) | YES |  |  |
| 6 | `Active` | tinyint | YES | `((1))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
