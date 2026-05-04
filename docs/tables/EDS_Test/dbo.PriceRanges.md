# Table: `dbo.PriceRanges`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 120619

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PriceRangeId` | int | NO |  | YES |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `CategoryId` | int | NO |  |  |
| 4 | `ManufacturerId` | int | YES |  |  |
| 5 | `ManufacturerProductLineId` | int | YES |  |  |
| 6 | `RangeBase` | money | YES |  |  |
| 7 | `RangeWeight` | decimal(9,5) | YES |  |  |
| 8 | `MSRPOptionId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
