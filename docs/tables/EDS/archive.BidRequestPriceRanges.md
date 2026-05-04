# Table: `archive.BidRequestPriceRanges`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `archive`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidRequestPriceRangeId` | int | NO |  |  |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `BidRequestManufacturerId` | int | YES |  |  |
| 4 | `BidRequestProductLineId` | int | YES |  |  |
| 5 | `RangeBase` | money | YES |  |  |
| 6 | `RangeWeight` | decimal(9,5) | YES |  |  |
| 7 | `BidRequestMSRPOptionId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
