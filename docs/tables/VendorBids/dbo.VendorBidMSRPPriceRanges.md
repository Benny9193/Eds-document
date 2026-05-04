# Table: `dbo.VendorBidMSRPPriceRanges`

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 537578

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorBidMSRPPriceRangeId` | int | NO |  | YES |
| 2 | `VendorBidMSRPResultsJournalId` | int | YES |  |  |
| 3 | `BidRequestPriceRangeId` | int | YES |  |  |
| 4 | `PriceRangeLow` | money | YES |  |  |
| 5 | `PriceRangeWeight` | decimal(9,5) | YES |  |  |
| 6 | `PriceRangeDiscount` | varbinary(255) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
