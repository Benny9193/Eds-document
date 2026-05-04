# Table: `dbo.BidImports`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 55605

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidImportId` | int | NO |  | YES |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `Active` | tinyint | YES |  |  |
| 4 | `VendorId` | int | YES |  |  |
| 5 | `BidItemDiscountRate` | decimal(9,5) | YES |  |  |
| 6 | `CatalogId` | int | YES |  |  |
| 7 | `CatalogDiscountRate` | decimal(9,5) | YES |  |  |
| 8 | `VendorBidNumber` | varchar(50) | YES |  |  |
| 9 | `ItemsBid` | int | YES |  |  |
| 10 | `AmountBid` | money | YES |  |  |
| 11 | `MinimumOrder` | money | YES |  |  |
| 12 | `FreeDeliveryMinimum` | money | YES |  |  |
| 13 | `Status` | varchar(50) | YES |  |  |
| 14 | `Comments` | varchar(1024) | YES |  |  |
| 15 | `DateModified` | datetime | YES |  |  |
| 16 | `StateContractDiscount` | decimal(9,5) | YES |  |  |
| 17 | `AdditionalHandlingAmount` | money | YES |  |  |
| 18 | `FreeHandlingAmount` | money | YES |  |  |
| 19 | `FreeHandlingStart` | datetime | YES |  |  |
| 20 | `FreeHandlingEnd` | datetime | YES |  |  |
| 21 | `UseVendorContactInfo` | tinyint | YES |  |  |
| 22 | `ContactEmail` | varchar(255) | YES |  |  |
| 23 | `ContactName` | varchar(50) | YES |  |  |
| 24 | `ContactPhone` | varchar(20) | YES |  |  |
| 25 | `ContactFax` | varchar(20) | YES |  |  |
| 26 | `POVendorContactId` | int | YES |  |  |
| 27 | `VendorBidId` | int | YES |  |  |
| 28 | `BidVendorContactId` | int | YES |  |  |
| 29 | `WebsiteLink` | varchar(255) | YES |  |  |
| 30 | `CatalogDiscountComments` | varchar(512) | YES |  |  |
| 31 | `BidHeaderKey` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `_dta_index_BidImports_7_1640249494__K1_K4_K26_2_8` | no | NONCLUSTERED | `BidImportId`, `VendorId`, `POVendorContactId` | `BidHeaderId`, `VendorBidNumber` |
| `_dta_index_BidImports_7_475200793__K1` | no | NONCLUSTERED | `BidImportId` |  |
| `_dta_index_BidImports_7_475200793__K1_K3_K4_K2_5` | no | NONCLUSTERED | `BidImportId`, `Active`, `VendorId`, `BidHeaderId` | `BidItemDiscountRate` |
| `_dta_index_BidImports_7_475200793__K1_K4` | no | NONCLUSTERED | `BidImportId`, `VendorId` |  |
| `_dta_index_BidImports_7_475200793__K2_K1_K3_K4_5_9_10` | no | NONCLUSTERED | `BidHeaderId`, `BidImportId`, `Active`, `VendorId` | `BidItemDiscountRate`, `ItemsBid`, `AmountBid` |
| `_dta_index_BidImports_7_475200793__K2_K3_K4_K1_5` | no | NONCLUSTERED | `BidHeaderId`, `Active`, `VendorId`, `BidImportId` | `BidItemDiscountRate` |
| `_dta_index_BidImports_7_475200793__K3_K1_K2_K4_5_9_10` | no | NONCLUSTERED | `Active`, `BidImportId`, `BidHeaderId`, `VendorId` | `BidItemDiscountRate`, `ItemsBid`, `AmountBid` |
| `_dta_index_BidImports_7_475200793__K3_K2_K1_K4_5_9_10` | no | NONCLUSTERED | `Active`, `BidHeaderId`, `BidImportId`, `VendorId` | `BidItemDiscountRate`, `ItemsBid`, `AmountBid` |
| `SK_BidHeader` | no | NONCLUSTERED | `BidHeaderId` | `BidImportId`, `Active`, `VendorId` |
| `SK_Vendor` | no | NONCLUSTERED | `VendorId` | `BidImportId`, `BidHeaderId`, `VendorBidNumber` |
| `SKI_VendorImport_Header` | no | NONCLUSTERED | `VendorId`, `BidImportId` | `BidHeaderId`, `Active` |
