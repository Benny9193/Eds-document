# Table: `dbo.ManufacturerProductLines`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 14298

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Manufacturer product-line master (~14K rows). One row per (`ManufacturerId`, `Name`) with `Active` and `UseOptions` flags. Referenced from `BidProductLines.ManufacturerProductLineId`, `BidRequestProductLines`, `BidMSRPResultsProductLines`, and `PriceRanges` to resolve which product line a bid line covers.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ManufacturerProductLineId` | int | NO |  | YES |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `ManufacturerId` | int | NO |  |  |
| 4 | `Name` | varchar(100) | NO |  |  |
| 5 | `UseOptions` | tinyint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
