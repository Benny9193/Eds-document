# Table: `dbo.VendorBidMSRPResults`

**Database:** `VendorBids_TEST` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 138158

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorBidMSRPResultsId` | int | NO |  | YES |
| 2 | `VendorBidId` | int | NO |  |  |
| 3 | `BidRequestManufacturerId` | int | YES |  |  |
| 4 | `ManufacturerName` | varchar(100) | YES |  |  |
| 5 | `WriteInManufacturer` | tinyint | YES |  |  |
| 6 | `PriceListType` | int | YES |  |  |
| 7 | `TotalAwardDiscount` | varbinary(255) | YES |  |  |
| 8 | `BidRequestProductLineId` | int | YES |  |  |
| 9 | `ProductLineName` | varchar(100) | YES |  |  |
| 10 | `WriteInProductLine` | tinyint | YES |  |  |
| 11 | `BidRequestOptionId` | int | YES |  |  |
| 12 | `OptionName` | varchar(100) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
