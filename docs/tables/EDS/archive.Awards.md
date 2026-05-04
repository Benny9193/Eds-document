# Table: `archive.Awards`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `archive`
**Approx rows:** 143977

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `AwardId` | int | NO |  |  |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `BidId` | int | YES |  |  |
| 4 | `VendorId` | int | YES |  |  |
| 5 | `PricePlanId` | int | YES |  |  |
| 6 | `CategoryId` | int | YES |  |  |
| 7 | `BidStartDate` | datetime | YES |  |  |
| 8 | `BidEndDate` | datetime | YES |  |  |
| 9 | `VendorBidNumber` | varchar(50) | YES |  |  |
| 10 | `Description` | varchar(511) | YES |  |  |
| 11 | `CatalogId` | int | YES |  |  |
| 12 | `DiscountRate` | decimal(9,5) | YES |  |  |
| 13 | `ItemsBid` | int | YES |  |  |
| 14 | `AmountBid` | money | YES |  |  |
| 15 | `BidDiscountRate` | decimal(9,5) | YES |  |  |
| 16 | `StateContractDiscount` | decimal(9,5) | YES |  |  |
| 17 | `UseGrossPrices` | int | YES |  |  |
| 18 | `BidHeaderId` | int | YES |  |  |
| 19 | `DateModified` | datetime | YES |  |  |
| 20 | `BidImportId` | int | YES |  |  |
| 21 | `rowguid` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
