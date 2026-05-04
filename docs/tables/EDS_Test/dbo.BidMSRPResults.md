# Table: `dbo.BidMSRPResults`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 40980

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidMSRPResultsId` | int | NO |  | YES |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `BidHeaderId` | int | NO |  |  |
| 4 | `BidImportId` | int | NO |  |  |
| 5 | `ManufacturerId` | int | YES |  |  |
| 6 | `DiscountRate` | decimal(9,5) | YES |  |  |
| 7 | `Modified` | datetime | NO | `(getdate())` |  |
| 8 | `DiscountRateString` | char(10) | YES |  |  |
| 9 | `WriteInFlag` | tinyint | YES |  |  |
| 10 | `WriteInManufacturer` | varchar(100) | YES |  |  |
| 11 | `VendorNotes` | varchar(1000) | YES |  |  |
| 12 | `BidRequestManufacturerId` | int | YES |  |  |
| 13 | `WinningBidOverride` | tinyint | YES |  |  |
| 14 | `PriceListTypeId` | int | YES |  |  |
| 15 | `AuthorizationLetter` | tinyint | YES |  |  |
| 16 | `SubmittedExcel` | tinyint | YES |  |  |
| 17 | `ProductCatalog` | tinyint | YES |  |  |
| 18 | `TotalAward` | tinyint | YES |  |  |
| 19 | `VendorPriceFile` | tinyint | YES |  |  |
| 20 | `TotalAwardDiscount` | decimal(9,5) | YES |  |  |
| 21 | `TotalAwardString` | varchar(20) | YES |  |  |
| 22 | `ExcelFileApproved` | tinyint | YES |  |  |
| 23 | `BidHeaderKey` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_BidHeaderManufacturer_Results` | no | NONCLUSTERED | `BidHeaderId`, `ManufacturerId` | `BidMSRPResultsId`, `Active`, `BidImportId`, `WinningBidOverride`, `TotalAward` |
| `SKI_BidImportActive_BidHeader` | no | NONCLUSTERED | `Active`, `BidImportId` | `BidMSRPResultsId`, `BidHeaderId` |
