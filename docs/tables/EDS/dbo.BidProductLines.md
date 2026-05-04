# Table: `dbo.BidProductLines`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 287890

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Finer-grained discounts under a `BidManufacturers` row (~288K rows). Per-product-line (and per-`MSRPOptionId`) discount rate within the manufacturer's bid participation. Resolves the actual rate to apply when an item maps to a specific product line.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidProductLineId` | int | NO |  | YES |
| 2 | `BMAId` | int | NO |  |  |
| 3 | `ManufacturerProductLineId` | int | NO |  |  |
| 4 | `MSRPOptionId` | int | NO |  |  |
| 5 | `DiscountRate` | decimal(9,5) | YES |  |  |
| 6 | `Modified` | datetime | NO | `(getdate())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
