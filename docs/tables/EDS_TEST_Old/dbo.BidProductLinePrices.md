# Table: `dbo.BidProductLinePrices`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1231550

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidProductLinePriceId` | int | NO |  | YES |
| 2 | `BidProductLineId` | int | NO |  |  |
| 3 | `RangeBase` | money | YES |  |  |
| 4 | `DiscountRate` | decimal(9,5) | YES |  |  |
| 5 | `Modified` | datetime | NO | `(getdate())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_BidProductLinePrices` | no | NONCLUSTERED | `BidProductLineId`, `RangeBase` | `BidProductLinePriceId`, `DiscountRate` |
| `SKI_BidProductLinePricesDesc` | no | NONCLUSTERED | `BidProductLineId`, `RangeBase` | `BidProductLinePriceId`, `DiscountRate` |
