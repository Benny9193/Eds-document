# View: `dbo.BidMgrMSRP2VendorReportView`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

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
| 37 | `FakeRecord` | int | NO |  |  |
| 38 | `VendorALLWinner` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `PriceListTypes` | USER_TABLE |
| [`dbo.BidMgrMSRPVendorBidsView`](dbo.BidMgrMSRPVendorBidsView.md) | VIEW |
| [`dbo.vw_BidMSRPRankedManufacturerProductLinesOrdered`](dbo.vw_BidMSRPRankedManufacturerProductLinesOrdered.md) | VIEW |
| [`dbo.vw_MSRPBidResultsManufRev2`](dbo.vw_MSRPBidResultsManufRev2.md) | VIEW |
| [`dbo.vw_MSRPBidResultsProdLines`](dbo.vw_MSRPBidResultsProdLines.md) | VIEW |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_MSRPProductLineExceptions`](dbo.vw_MSRPProductLineExceptions.md) | VIEW |

## Definition

```sql
create   view  [dbo].[BidMgrMSRP2VendorReportView]
AS


-- proposed new version - to be tested 

SELECT VenBid.BidHeaderId, VenBid.BidImportId, VenBid.Active ActiveBidImport, VenBid.VendorsCode, VenBid.VendorsName, VenBid.VendorId,
       Manuf.WriteInFlag, Manuf.ManufacturerName, Manuf.Active ActiveManufBid,
       Manuf.AuthorizationLetter, Manuf.SubmittedExcel, Manuf.ProductCatalog, Manuf.TotalAward, 
       Manuf.VendorPriceFile, Manuf.TotalAwardString, Manuf.TotalAwardDiscount,
       Manuf.BidMSRPResultsId, Manuf.BidRequestManufacturerId,
       Manuf.ManufacturerId, Manuf.PriceListTypeId, Isnull(PLT.Name,'') PriceListType, Manuf.WriteInManufacturer,
       ProdLine.BidMSRPResultsProductLineId, ProdLine.Active ActiveProdLine, 
       RankedProdLine.ProductLineName ProdLineOrWriteIn, --ProdLine.ProdLineOrWriteIn, -- 4/25/14
       ProdLine.WriteInProductLineFlag, ProdLine.BidRequestProductLineId, ProdLine.BidRequestOptionId,
       ProdLine.MSRPOptionId, ProdLine.OptionName, ProdLine.WeightedDiscount, 
       --ProdLine.SortKey ProdLineSortKey,  -- 4/25/14 
       cast(
       cast(CASE WHEN ISNULL(UPPER(RTRIM(LTRIM(RankedProdLine.ProductLineName))),'')='ALL' THEN 0 ELSE 1 END as CHAR(1)) + 
       ISNULL(ltrim(rtrim(upper( RankedProdLine.ProductLineName ))),'') + 
       isnull(ltrim(rtrim(upper(  ProdLine.OptionName  ))),'') as varchar(512)) as ProdLineSortKey,
       RankedProdLine.ManufacturerProductLineId,  -- ProdLine.ManufacturerProductLineId,  -- 5/2/14
       CASE WHEN Isnull(VenBid.Active,0)=1 AND Isnull(Manuf.Active,0)=1 AND Isnull(ProdLine.Active,0)=1 Then 1 Else 0 End AllActive,
       CASE WHEN Manuf.BidMSRPResultsId =
       (SELECT TOP 1 WINNER.BIDMSRPRESULTSID
        FROM dbo.vw_BidMSRPRankedManufacturerProductLinesOrdered WINNER
        WHERE WINNER.BIDHEADERID = VenBid.BidHeaderId 
          AND WINNER.ManufacturerId = Manuf.ManufacturerId AND WINNER.ManufacturerId is not null AND Manuf.ManufacturerId is not null  -- added 12/17/14 kjm
          --AND WINNER.MANUFACTURERPRODUCTLINEID = ProdLine.ManufacturerProductLineId      -- 4/25/14
          AND WINNER.MANUFACTURERPRODUCTLINEID = RankedProdLine.ManufacturerProductLineId  -- 4/25/14
          --AND WINNER.MSRPOPTIONID = ProdLine.MSRPOptionId
          AND WINNER.OptionName = ProdLine.OptionName
          AND WINNER.BidMSRPResultsProductLineId IS NOT NULL  -- ADDED 12/23/13
          AND WINNER.AllActive = 1   -- ADDED 2/12/14
        ORDER BY WINNER.SORTKEY  
       ) THEN 1 ELSE 0 END AS WinningBidFlag,
       --CASE WHEN ISNULL(UPPER(RTRIM(LTRIM(ProdLine.ProdLineOrWriteIn))),'')='ALL' THEN 1 ELSE 0 END AllProductLine     -- 4/25/14
       CASE WHEN ISNULL(UPPER(RTRIM(LTRIM(RankedProdLine.ProductLineName))),'')='ALL' THEN 1 ELSE 0 END AllProductLine,   -- 4/25/14

       CASE WHEN ISNULL(UPPER(RTRIM(LTRIM(RankedProdLine.ProductLineName))),'') <> ISNULL(UPPER(RTRIM(LTRIM(ProdLine.ProdLineOrWriteIn))),'') THEN 1 ELSE 0 END FakeRecord, -- added 4/30/14
       CASE WHEN VenBid.VendorId =
       (SELECT TOP 1 WINNER.VendorId
        FROM dbo.vw_BidMSRPRankedManufacturerProductLinesOrdered WINNER
        WHERE WINNER.BIDHEADERID = VenBid.BidHeaderId 
          AND WINNER.ManufacturerId = Manuf.ManufacturerId
          AND WINNER.AllFlag = 1
          AND WINNER.OptionName = ProdLine.OptionName
          AND WINNER.BidMSRPResultsProductLineId IS NOT NULL  
          AND WINNER.AllActive = 1   
        ORDER BY WINNER.SORTKEY  
       ) THEN 1 ELSE 0 END AS VendorALLWinner  -- added 4/30/14

FROM dbo.BidMgrMSRPVendorBidsView VenBid
JOIN dbo.vw_MSRPBidResultsManufRev2 Manuf ON Manuf.BidImportId = VenBid.BidImportId
JOIN dbo.vw_BidMSRPRankedManufacturerProductLinesOrdered RankedProdLine ON RankedProdLine.BidMSRPResultsId = Manuf.BidMSRPResultsId -- added 4/25/14
JOIN dbo.vw_MSRPBidResultsProdLines ProdLine ON ProdLine.BidMSRPResultsProductLineId = RankedProdLine.BidMSRPResultsProductLineId   -- changed 4/25/14
LEFT OUTER JOIN PriceListTypes PLT on PLT.PriceListTypeId = Manuf.PriceListTypeId
--where VenBid.BidHeaderId=5946
--order by BidHeaderId, VendorsName, BidImportId, ManufacturerName, ManufacturerId, ProdLineSortKey, ProdLineOrWriteIn, OptionName, BidMSRPResultsProductLineId, MSRPOptionId

/*


-- original version 
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
        CASE WHEN ISNULL(UPPER(RTRIM(LTRIM(ProdLine.ProdLineOrWriteIn))),'')='ALL' THEN 1 ELSE 0 END AllProductLine
FROM dbo.BidMgrMSRPVendorBidsView VenBid
JOIN dbo.vw_MSRPBidResultsManufRev2 Manuf ON Manuf.BidImportId = VenBid.BidImportId
JOIN dbo.vw_MSRPBidResultsProdLines ProdLine ON ProdLine.BidMSRPResultsId = Manuf.BidMSRPResultsId
LEFT OUTER JOIN PriceListTypes PLT on PLT.PriceListTypeId = Manuf.PriceListTypeId
--where VenBid.BidHeaderId=5942


*/
```
