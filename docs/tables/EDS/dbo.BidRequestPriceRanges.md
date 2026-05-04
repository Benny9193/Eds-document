# Table: `dbo.BidRequestPriceRanges`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1897760

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidRequestPriceRangeId` | int | NO |  | YES |
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

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_Lookups` | YES | NONCLUSTERED | `BidHeaderId`, `BidRequestManufacturerId`, `BidRequestProductLineId`, `BidRequestMSRPOptionId`, `RangeBase`, `BidRequestPriceRangeId` |  |
| `SKI_BidHeader_Etc` | no | NONCLUSTERED | `BidHeaderId` | `BidRequestPriceRangeId`, `BidRequestManufacturerId`, `BidRequestProductLineId`, `RangeBase`, `RangeWeight`, `BidRequestMSRPOptionId` |
| `SKI_BRPR` | no | NONCLUSTERED | `BidRequestProductLineId`, `BidRequestMSRPOptionId` | `BidRequestPriceRangeId` |
