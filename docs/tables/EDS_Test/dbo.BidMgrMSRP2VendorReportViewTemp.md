# View: `dbo.BidMgrMSRP2VendorReportViewTemp`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `BidImportId` | int | NO |  |  |
| 3 | `ActiveBidImport` | tinyint | YES |  |  |
| 4 | `VendorsCode` | varchar(16) | YES |  |  |
| 5 | `VendorsName` | varchar(50) | YES |  |  |
| 6 | `VendorId` | int | YES |  |  |
| 7 | `WriteInFlag` | tinyint | NO |  |  |
| 8 | `ManufacturerName` | varchar(100) | NO |  |  |
| 9 | `ActiveManufBid` | int | NO |  |  |
| 10 | `AuthorizationLetter` | tinyint | NO |  |  |
| 11 | `SubmittedExcel` | tinyint | NO |  |  |
| 12 | `ProductCatalog` | tinyint | NO |  |  |
| 13 | `TotalAward` | tinyint | NO |  |  |
| 14 | `VendorPriceFile` | tinyint | NO |  |  |
| 15 | `TotalAwardString` | varchar(20) | YES |  |  |
| 16 | `TotalAwardDiscount` | decimal(9,5) | YES |  |  |
| 17 | `BidMSRPResultsId` | int | NO |  |  |
| 18 | `BidRequestManufacturerId` | int | YES |  |  |
| 19 | `ManufacturerId` | int | YES |  |  |
| 20 | `PriceListTypeId` | int | NO |  |  |
| 21 | `PriceListType` | varchar(50) | NO |  |  |
| 22 | `WriteInManufacturer` | varchar(100) | YES |  |  |
| 23 | `BidMSRPResultsProductLineId` | int | NO |  |  |
| 24 | `ActiveProdLine` | tinyint | YES |  |  |
| 25 | `ProdLineOrWriteIn` | varchar(100) | NO |  |  |
| 26 | `WriteInProductLineFlag` | tinyint | YES |  |  |
| 27 | `BidRequestProductLineId` | int | YES |  |  |
| 28 | `BidRequestOptionId` | int | YES |  |  |
| 29 | `MSRPOptionId` | int | YES |  |  |
| 30 | `OptionName` | varchar(50) | YES |  |  |
| 31 | `WeightedDiscount` | decimal(9,5) | YES |  |  |
| 32 | `ProdLineSortKey` | varchar(512) | YES |  |  |
| 33 | `ManufacturerProductLineId` | int | NO |  |  |
| 34 | `AllActive` | int | NO |  |  |
| 35 | `WinningBidFlag` | int | NO |  |  |
| 36 | `AllProductLine` | int | NO |  |  |
| 37 | `TotalAwardManufacturerWeight` | decimal(38,6) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `PriceListTypes` | USER_TABLE |
| [`dbo.BidMgrMSRPVendorBidsView`](dbo.BidMgrMSRPVendorBidsView.md) | VIEW |
| [`dbo.vw_BidMSRPRankedManufacturerProductLinesOrdered`](dbo.vw_BidMSRPRankedManufacturerProductLinesOrdered.md) | VIEW |
| [`dbo.vw_MSRPBidResultsManufRev2`](dbo.vw_MSRPBidResultsManufRev2.md) | VIEW |
| [`dbo.vw_MSRPBidResultsProdLines`](dbo.vw_MSRPBidResultsProdLines.md) | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[BidMgrMSRP2VendorReportViewTemp]
AS
SELECT VenBid.BidHeaderId, VenBid.BidImportId, VenBid.Active ActiveBidImport, VenBid.VendorsCode, VenBid.VendorsName, VenBid.VendorId,
       Manuf.WriteInFlag, Manuf.ManufacturerName, Manuf.Active ActiveManufBid,
       Manuf.AuthorizationLetter, Manuf.SubmittedExcel, Manuf.ProductCatalog, Manuf.TotalAward, 
       Manuf.VendorPriceFile, Manuf.TotalAwardString, Manuf.TotalAwardDiscount,
       Manuf.BidMSRPResultsId, Manuf.BidRequestManufacturerId,
       Manuf.ManufacturerId, Manuf.PriceListTypeId, Isnull(PLT.Name,'') PriceListType, Manuf.WriteInManufacturer,
       ProdLine.BidMSRPResultsProductLineId, ProdLine.Active ActiveProdLine, ProdLine.ProdLineOrWriteIn, 
       ProdLine.WriteInProductLineFlag, ProdLine.BidRequestProductLineId, ProdLine.BidRequestOptionId,
       ProdLine.MSRPOptionId, ProdLine.OptionName, ProdLine.WeightedDiscount, ProdLine.SortKey ProdLineSortKey, 
       ProdLine.ManufacturerProductLineId,
       CASE WHEN Isnull(VenBid.Active,0)=1 AND Isnull(Manuf.Active,0)=1 AND Isnull(ProdLine.Active,0)=1 Then 1 Else 0 End AllActive,
       CASE WHEN Manuf.BidMSRPResultsId =
       (SELECT TOP 1 WINNER.BIDMSRPRESULTSID
        FROM dbo.vw_BidMSRPRankedManufacturerProductLinesOrdered WINNER
        WHERE WINNER.BIDHEADERID = VenBid.BidHeaderId 
          AND WINNER.MANUFACTURERPRODUCTLINEID = ProdLine.ManufacturerProductLineId 
          --AND WINNER.MSRPOPTIONID = ProdLine.MSRPOptionId
          AND WINNER.OptionName = ProdLine.OptionName
          AND WINNER.BidMSRPResultsProductLineId IS NOT NULL  -- ADDED 12/23/13
          AND WINNER.AllActive = 1   -- ADDED 2/12/14
        ORDER BY WINNER.SORTKEY  
        ) THEN 1 ELSE 0 END AS WinningBidFlag,
        CASE WHEN ISNULL(UPPER(RTRIM(LTRIM(ProdLine.ProdLineOrWriteIn))),'')='ALL' THEN 1 ELSE 0 END AllProductLine,
        (SELECT WINNER.TotalAwardManufacturerWeight
        FROM dbo.vw_BidMSRPRankedManufacturerProductLinesOrdered WINNER
        WHERE WINNER.BIDHEADERID = VenBid.BidHeaderId 
          AND WINNER.MANUFACTURERPRODUCTLINEID = ProdLine.ManufacturerProductLineId 
          --AND WINNER.MSRPOPTIONID = ProdLine.MSRPOptionId
          AND WINNER.OptionName = ProdLine.OptionName
          AND WINNER.BidMSRPResultsProductLineId IS NOT NULL  -- ADDED 12/23/13
          AND WINNER.AllActive = 1   -- ADDED 2/12/14
          AND Winner.BidMSRPResultsId = Manuf.BidMSRPResultsId
        --ORDER BY WINNER.SORTKEY  
        ) TotalAwardManufacturerWeight
FROM dbo.BidMgrMSRPVendorBidsView VenBid
JOIN dbo.vw_MSRPBidResultsManufRev2 Manuf ON Manuf.BidImportId = VenBid.BidImportId
JOIN dbo.vw_MSRPBidResultsProdLines ProdLine ON ProdLine.BidMSRPResultsId = Manuf.BidMSRPResultsId
LEFT OUTER JOIN PriceListTypes PLT on PLT.PriceListTypeId = Manuf.PriceListTypeId

--where VenBid.BidHeaderId=5942
```
