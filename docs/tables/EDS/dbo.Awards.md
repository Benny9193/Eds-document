# Table: `dbo.Awards`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 139138

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Bid award outcomes (~139K rows). Records which vendor's `BidResults` were chosen for each awarded line, including award date and award type. Awarded prices typically flow back into `CrossRefs` via a vendor catalog upload.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `AwardId` | int | NO |  | YES |
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

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `_dta_index_Awards_9_352056340__K2_K1_K3` | no | NONCLUSTERED | `Active`, `AwardId`, `BidId` |  |
| `SK_Bid` | no | NONCLUSTERED | `BidId` |  |
| `SK_BidActive` | no | NONCLUSTERED | `BidId`, `Active` |  |
| `SK_BidHeader` | no | NONCLUSTERED | `BidHeaderId` |  |
| `SK_VendorBidActive` | no | NONCLUSTERED | `VendorId`, `Active`, `BidHeaderId` |  |
