# Table: `archive.Bids`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `archive`
**Approx rows:** 172256

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidId` | int | NO |  |  |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `CoopId` | int | YES |  |  |
| 4 | `ClosingDate` | datetime | YES |  |  |
| 5 | `OpeningDate` | datetime | YES |  |  |
| 6 | `EffectiveFrom` | datetime | YES |  |  |
| 7 | `EffectiveUntil` | datetime | YES |  |  |
| 8 | `Name` | varchar(255) | YES |  |  |
| 9 | `PricePlanId` | int | YES |  |  |
| 10 | `CategoryId` | int | YES |  |  |
| 11 | `VendorId` | int | YES |  |  |
| 12 | `BidDiscountRate` | decimal(8,5) | YES |  |  |
| 13 | `VendorBidNumber` | varchar(50) | YES |  |  |
| 14 | `DistrictId` | int | YES |  |  |
| 15 | `ItemsBid` | int | YES |  |  |
| 16 | `AmountBid` | money | YES |  |  |
| 17 | `CatalogId` | int | YES |  |  |
| 18 | `Description` | varchar(511) | YES |  |  |
| 19 | `BidHeaderId` | int | YES |  |  |
| 20 | `UseGrossPrices` | int | YES |  |  |
| 21 | `BidImportId` | int | YES |  |  |
| 22 | `DateModified` | datetime | YES |  |  |
| 23 | `AdditionalHandlingAmount` | money | YES |  |  |
| 24 | `FreeHandlingAmount` | money | YES |  |  |
| 25 | `FreeHandlingStart` | datetime | YES |  |  |
| 26 | `FreeHandlingEnd` | datetime | YES |  |  |
| 27 | `WebsiteLink` | varchar(255) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
