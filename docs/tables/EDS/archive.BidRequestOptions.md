# Table: `archive.BidRequestOptions`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `archive`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidRequestOptionId` | int | NO |  |  |
| 2 | `BidHeaderId` | int | NO |  |  |
| 3 | `ManufacturerId` | int | YES |  |  |
| 4 | `ManufacturerProductLineId` | int | YES |  |  |
| 5 | `OptionId` | int | YES |  |  |
| 6 | `BidRequestManufacturerId` | int | YES |  |  |
| 7 | `BidRequestProductLineId` | int | YES |  |  |
| 8 | `Name` | varchar(50) | NO |  |  |
| 9 | `Weight` | decimal(9,5) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
