# Table: `dbo.BidProductLinePrices`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1332652

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Manufacturer product-line discount tiers offered by a vendor on a bid (~1.3M rows). `RangeBase` is the dollar floor for the tier; `DiscountRate` is the percent off list. Joins a `BidProductLines` row to its tiered pricing structure.

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
