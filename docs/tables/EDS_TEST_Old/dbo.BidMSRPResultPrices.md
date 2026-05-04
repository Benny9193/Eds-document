# Table: `dbo.BidMSRPResultPrices`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 389934

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidMSRPResultPricesId` | int | NO |  | YES |
| 2 | `BidMSRPResultsId` | int | NO |  |  |
| 3 | `BidMSRPResultsProductLineId` | int | YES |  |  |
| 4 | `Active` | tinyint | YES |  |  |
| 5 | `BidRequestPriceRangeId` | int | NO |  |  |
| 6 | `RangeBase` | money | YES |  |  |
| 7 | `RangeWeight` | decimal(9,5) | YES |  |  |
| 8 | `RangeValue` | decimal(9,5) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_ProductLine_` | no | NONCLUSTERED | `BidMSRPResultsProductLineId` | `BidMSRPResultPricesId`, `BidMSRPResultsId`, `RangeWeight` |
