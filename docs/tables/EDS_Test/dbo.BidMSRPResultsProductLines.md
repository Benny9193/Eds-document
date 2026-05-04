# Table: `dbo.BidMSRPResultsProductLines`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 110442

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidMSRPResultsProductLineId` | int | NO |  | YES |
| 2 | `BidMSRPResultsId` | int | NO |  |  |
| 3 | `Active` | tinyint | YES |  |  |
| 4 | `BidRequestProductLineId` | int | YES |  |  |
| 5 | `WriteInProductLineName` | varchar(100) | YES |  |  |
| 6 | `BidRequestOptionId` | int | YES |  |  |
| 7 | `MSRPOptionId` | int | YES |  |  |
| 8 | `OptionName` | varchar(50) | YES |  |  |
| 9 | `WriteInProductLineFlag` | tinyint | YES |  |  |
| 10 | `Weight` | decimal(9,5) | YES |  |  |
| 11 | `Modified` | datetime | YES |  |  |
| 12 | `WeightedDiscount` | decimal(9,5) | YES |  |  |
| 13 | `ManufacturerProductLineId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_BidResults_` | no | NONCLUSTERED | `BidMSRPResultsId` | `BidMSRPResultsProductLineId`, `Active`, `MSRPOptionId`, `ManufacturerProductLineId`, `OptionName` |
