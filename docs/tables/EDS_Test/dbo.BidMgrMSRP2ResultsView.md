# View: `dbo.BidMgrMSRP2ResultsView`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `ManufacturerId` | int | YES |  |  |
| 3 | `ManufacturerName` | varchar(100) | NO |  |  |
| 4 | `ManufacturerProductLineId` | int | NO |  |  |
| 5 | `ProductLineName` | varchar(100) | NO |  |  |
| 6 | `MSRPOptionId` | int | NO |  |  |
| 7 | `OptionName` | varchar(50) | NO |  |  |
| 8 | `BidMSRPResultsId` | int | YES |  |  |
| 9 | `BidMSRPResultsProductLineId` | int | YES |  |  |
| 10 | `WriteInManufacturer` | varchar(100) | YES |  |  |
| 11 | `WriteInFlag` | tinyint | YES |  |  |
| 12 | `WinningBidOverride` | tinyint | YES |  |  |
| 13 | `DiscountRate` | decimal(38,6) | YES |  |  |
| 14 | `PriceListTypeId` | int | YES |  |  |
| 15 | `TotalAward` | tinyint | YES |  |  |
| 16 | `TotalAwardDiscount` | decimal(9,5) | YES |  |  |
| 17 | `ProductLineWeight` | decimal(9,5) | YES |  |  |
| 18 | `TotalAwardManufacturerWeight` | decimal(38,6) | YES |  |  |
| 19 | `TotalAwardProductLineWeight` | decimal(38,6) | YES |  |  |
| 20 | `SortKey` | varchar(15) | YES |  |  |
| 21 | `PriceListType` | varchar(50) | YES |  |  |
| 22 | `VendorId` | int | YES |  |  |
| 23 | `VendorName` | varchar(50) | YES |  |  |
| 24 | `PriceListWarning` | varchar(28) | NO |  |  |
| 25 | `WinningBidFlag` | int | NO |  |  |
| 26 | `AllFlag` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `vw_BidMSRPRankedManufacturerProductLinesOrdered` | VIEW |
| [`dbo.vw_BidMSRPRankedManufacturerProductLinesOrdered`](dbo.vw_BidMSRPRankedManufacturerProductLinesOrdered.md) | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[BidMgrMSRP2ResultsView]
AS
SELECT BidHeaderId, ManufacturerId, ManufacturerName, ManufacturerProductLineId, ProductLineName, MSRPOptionId, OptionName, 
       BidMSRPResultsId, BidMSRPResultsProductLineId, WriteInManufacturer, WriteInFlag, WinningBidOverride, DiscountRate, 
       PriceListTypeId, TotalAward, TotalAwardDiscount, ProductLineWeight, TotalAwardManufacturerWeight, 
       TotalAwardProductLineWeight, SortKey, PriceListType, VendorId, VendorName, PriceListWarning, 
       CASE WHEN A.BIDMSRPRESULTSID =
       (SELECT TOP 1 WINNER.BIDMSRPRESULTSID
        FROM [vw_BidMSRPRankedManufacturerProductLinesOrdered] WINNER
        WHERE WINNER.BIDHEADERID = A.BIDHEADERID 
          AND WINNER.MANUFACTURERPRODUCTLINEID = A.MANUFACTURERPRODUCTLINEID 
          AND WINNER.MSRPOPTIONID = A.MSRPOPTIONID
        ORDER BY WINNER.SORTKEY  
        ) THEN 1 ELSE 0 END AS WinningBidFlag,
        CASE WHEN Upper(Ltrim(Rtrim(A.ProductLineName)))='ALL' THEN 1 ELSE 0 END AllFlag
FROM dbo.vw_BidMSRPRankedManufacturerProductLinesOrdered AS A
--WHERE (BidHeaderId = 5942)
```
