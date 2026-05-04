# Table: `dbo.Bids`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 147225

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Vendor bid response header (~147K rows). One row per (bid, vendor) submission, indicating intent to respond and submission status. Line-by-line responses are in `BidResults`.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidId` | int | NO |  | YES |
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

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `_dta_index_Bids_7_1785109450__K1_K11_K2_K19_K21` | no | NONCLUSTERED | `BidId`, `VendorId`, `Active`, `BidHeaderId`, `BidImportId` |  |
| `_dta_index_Bids_9_512056910__K1_K2_K19_K11_K12` | no | NONCLUSTERED | `BidId`, `Active`, `BidHeaderId`, `VendorId`, `BidDiscountRate` |  |
| `_dta_index_Bids_9_512056910__K19_K2_K1_K11` | no | NONCLUSTERED | `BidHeaderId`, `Active`, `BidId`, `VendorId` |  |
| `SK_ActiveHeaders` | no | NONCLUSTERED | `BidHeaderId`, `Active` |  |
| `SK_BidHeader` | no | NONCLUSTERED | `BidHeaderId` |  |
| `SK_BidHeaderActiveBidVendor` | YES | NONCLUSTERED | `BidId`, `BidHeaderId`, `VendorId`, `Active` |  |
| `SK_BidImport` | no | NONCLUSTERED | `BidImportId`, `VendorId` | `BidId` |
| `SK_Vendor` | no | NONCLUSTERED | `VendorId` | `BidId`, `BidImportId` |
| `SKI_Active_BidVendorBidDiscountRateBidHeader` | no | NONCLUSTERED | `Active` | `BidId`, `VendorId`, `BidDiscountRate`, `BidHeaderId` |
| `SKI_Active_VendorBidheaderidBidImportid` | no | NONCLUSTERED | `Active` | `VendorId`, `BidHeaderId`, `BidImportId` |
| `SKI_ActiveVendor_BidImport` | no | NONCLUSTERED | `Active`, `VendorId` | `BidHeaderId`, `BidImportId` |
| `SKI_BidheaderActive_Bidid` | no | NONCLUSTERED | `BidHeaderId`, `Active`, `DateModified` | `BidId` |
| `SKI_BidHeaderVendorActive_Bid` | no | NONCLUSTERED | `BidHeaderId`, `VendorId`, `Active` | `BidId`, `BidImportId`, `AdditionalHandlingAmount`, `FreeHandlingAmount`, `FreeHandlingStart`, `FreeHandlingEnd` |
