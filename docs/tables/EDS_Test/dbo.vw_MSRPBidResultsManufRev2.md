# View: `dbo.vw_MSRPBidResultsManufRev2`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | NO |  |  |
| 2 | `BidImportId` | int | NO |  |  |
| 3 | `WriteInFlag` | tinyint | NO |  |  |
| 4 | `ManufacturerName` | varchar(100) | NO |  |  |
| 5 | `Active` | int | NO |  |  |
| 6 | `AuthorizationLetter` | tinyint | NO |  |  |
| 7 | `SubmittedExcel` | tinyint | NO |  |  |
| 8 | `ProductCatalog` | tinyint | NO |  |  |
| 9 | `TotalAward` | tinyint | NO |  |  |
| 10 | `VendorPriceFile` | tinyint | NO |  |  |
| 11 | `TotalAwardString` | varchar(20) | YES |  |  |
| 12 | `BidMSRPResultsId` | int | NO |  |  |
| 13 | `BidRequestManufacturerId` | int | YES |  |  |
| 14 | `ManufacturerId` | int | YES |  |  |
| 15 | `PriceListTypeId` | int | NO |  |  |
| 16 | `WriteInManufacturer` | varchar(100) | YES |  |  |
| 17 | `VendorName` | varchar(50) | YES |  |  |
| 18 | `ActiveBidImport` | tinyint | YES |  |  |
| 19 | `ActiveBidMSRPResults` | tinyint | YES |  |  |
| 20 | `TotalAwardDiscount` | decimal(9,5) | YES |  |  |
| 21 | `ExcelFileApproved` | tinyint | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidMSRPResults` | USER_TABLE |
| [`dbo.BidImports`](dbo.BidImports.md) | USER_TABLE |
| [`dbo.Manufacturers`](dbo.Manufacturers.md) | USER_TABLE |
| [`dbo.Vendors`](dbo.Vendors.md) | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.BidMgrMSRP2VendorReportView`](dbo.BidMgrMSRP2VendorReportView.md) | VIEW |
| [`dbo.BidMgrMSRP2VendorReportViewTemp`](dbo.BidMgrMSRP2VendorReportViewTemp.md) | VIEW |

## Definition

```sql
create   view  [dbo].[vw_MSRPBidResultsManufRev2]
AS
SELECT BR.BidHeaderId, BR.BidImportId,  
       Isnull(BR.WriteInFlag,0) WriteInFlag, 
       --Case When Isnull(BR.WriteInFlag,0)=1 Then BR.WriteInManufacturer Else MANUF.Name End ManufOrWriteIn,
       Case When Isnull(BR.WriteInFlag,0)=1 and Isnull(MANUF.Name,'')='' 
       Then '<Unresolved Write-In>' Else Isnull(MANUF.Name,'') End ManufacturerName,
       Case When Isnull(BR.Active,0)=1 AND Isnull(BI.Active,0)=1 Then 1 Else 0 End Active, 
       Isnull(BR.AuthorizationLetter,0) AuthorizationLetter, 
       Isnull(BR.SubmittedExcel,0) SubmittedExcel, Isnull(BR.ProductCatalog,0) ProductCatalog, 
       Isnull(BR.TotalAward,0) TotalAward, Isnull(BR.VendorPriceFile,0) VendorPriceFile, BR.TotalAwardString, 
       BR.BidMSRPResultsId,
       BR.BidRequestManufacturerId,
       BR.ManufacturerId,
       Isnull(PriceListTypeId,0) PriceListTypeId,
       BR.WriteInManufacturer,
       VEN.Name VendorName,
       BI.Active ActiveBidImport,
       BR.Active ActiveBidMSRPResults,
       BR.TotalAwardDiscount,
       Isnull(BR.ExcelFileApproved,0) ExcelFileApproved
FROM BidMSRPResults BR
LEFT JOIN dbo.Manufacturers MANUF ON MANUF.ManufacturerId = BR.ManufacturerId 
LEFT JOIN dbo.BidImports BI ON BI.BidImportId = BR.BidImportId
LEFT JOIN dbo.Vendors VEN ON VEN.VendorId = BI.VendorId
--  WHERE BR.bidheaderid = 5932
```
