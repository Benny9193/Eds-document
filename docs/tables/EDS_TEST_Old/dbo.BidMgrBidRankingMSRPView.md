# View: `dbo.BidMgrBidRankingMSRPView`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ActiveBid` | int | NO |  |  |
| 2 | `VendorName` | varchar(50) | YES |  |  |
| 3 | `DiscountRate` | decimal(9,5) | YES |  |  |
| 4 | `DiscountRateString` | char(10) | YES |  |  |
| 5 | `ManufacturerId` | int | NO |  |  |
| 6 | `ManufacturerName` | varchar(100) | NO |  |  |
| 7 | `WriteInFlag` | tinyint | YES |  |  |
| 8 | `WriteInManufacturer` | varchar(100) | NO |  |  |
| 9 | `BidHeaderId` | int | NO |  |  |
| 10 | `BidImportId` | int | NO |  |  |
| 11 | `BidMSRPResultsId` | int | NO |  |  |
| 12 | `WinningBidFlag` | int | NO |  |  |
| 13 | `TieBid` | int | NO |  |  |
| 14 | `VendorNotes` | varchar(1000) | YES |  |  |
| 15 | `VendorId` | int | NO |  |  |
| 16 | `VendorCode` | varchar(16) | YES |  |  |
| 17 | `WinningBidOverride` | tinyint | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.BidImports`](dbo.BidImports.md) | USER_TABLE |
| [`dbo.BidMgrBidResultsMSRPView`](dbo.BidMgrBidResultsMSRPView.md) | VIEW |
| [`dbo.BidMSRPResults`](dbo.BidMSRPResults.md) | USER_TABLE |
| [`dbo.Manufacturers`](dbo.Manufacturers.md) | USER_TABLE |
| [`dbo.Vendors`](dbo.Vendors.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[BidMgrBidRankingMSRPView]
AS
SELECT Case When Isnull(BidMSRPResults.Active,0)=0 or Isnull(BidImports.Active,0)=0 Then 0 Else 1 End ActiveBid,
       Vendors.[Name] VendorName, BidMSRPResults.DiscountRate,
        --BidMSRPResults.Weight, 
       BidMSRPResults.DiscountRateString, 
       Isnull(BidMSRPResults.ManufacturerId,0) ManufacturerId, 
       Isnull(Manufacturers.Name,'** Missing Manufacturer / Unresolved Write-In **') ManufacturerName,
       BidMSRPResults.WriteInFlag, Isnull(BidMSRPResults.WriteInManufacturer,'') WriteInManufacturer, 
       BidMSRPResults.BidHeaderId, BidMSRPResults.BidImportId, 
       BidMSRPResults.BidMSRPResultsId,
       BidMgrBidResultsMSRPView.WinningBidFlag,
       CASE WHEN 
       (select count(*) From dbo.BidMgrBidResultsMSRPView BRView2
        where BRView2.BidHeaderId=dbo.BidMSRPResults.BidHeaderId and Isnull(BRView2.ManufacturerId,0) <> 0 and Isnull(BRView2.ManufacturerId,0) = dbo.BidMSRPResults.ManufacturerId
              and BRView2.WinningBidFlag=1
       ) > 1
       AND  
       BidMgrBidResultsMSRPView.WinningBidFlag = 1
       THEN 1
       ELSE 0
       END TieBid,
       BidMSRPResults.VendorNotes,
       Vendors.VendorId,
       Vendors.Code VendorCode,
       BidMgrBidResultsMSRPView.WinningBidOverride -- added 3/21/13 kjm
FROM dbo.BidMSRPResults
JOIN dbo.BidMgrBidResultsMSRPView ON BidMgrBidResultsMSRPView.BidHeaderId=dbo.BidMSRPResults.BidHeaderId 
                                     and BidMgrBidResultsMSRPView.BidMSRPResultsId = dbo.BidMSRPResults.BidMSRPResultsId 
JOIN dbo.BidImports ON BidImports.BidImportId = BidMSRPResults.BidImportId
JOIN dbo.Vendors ON Vendors.VendorId = BidImports.VendorId
LEFT OUTER JOIN dbo.Manufacturers ON Manufacturers.ManufacturerId = BidMSRPResults.ManufacturerId -- left join for unresolved write-ins
where --Isnull(BidMSRPResults.Active,0)=1 and 
      NOT ( Isnull(BidMSRPResults.DiscountRate,0)=0 and Isnull(BidMSRPResults.DiscountRateString,'') = '' )  -- for clarion code
--order by Isnull(BidMSRPResults.Active,0) desc, BidMSRPResults.BidHeaderId, BidMSRPResults.ManufacturerId, BidMSRPResults.DiscountRate desc

/*
SELECT Vendors.[Name] VendorName, BidMSRPResults.DiscountRate, BidMSRPResults.Weight, BidMSRPResults.DiscountRateString, BidMSRPResults.WriteInFlag, BidMSRPResults.WriteInManufacturer, 
       BidMSRPResults.BidHeaderId, BidMSRPResults.BidImportId, BidMSRPResults.ManufacturerId, BidMSRPResults.BidMSRPResultsId,
       (Case When 
       Isnull(
       (SELECT Max(Isnull(BR.DiscountRate,0)) FROM dbo.BidMSRPResults BR
        where BR.Active=1 and BR.BidHeaderId=dbo.BidMSRPResults.BidHeaderId and Isnull(BR.ManufacturerId,0) <> 0 and Isnull(BR.ManufacturerId,0) = dbo.BidMSRPResults.ManufacturerId
              and NOT ( Isnull(BR.DiscountRate,0)=0 and Isnull(BR.DiscountRateString,'') = '' )  -- for clarion code
       ),-1) = Isnull(dbo.BidMSRPResults.DiscountRate,0) Then 1 Else 0 End) WinningBidFlag
FROM dbo.BidMSRPResults
JOIN dbo.BidImports ON BidImports.BidImportId = BidMSRPResults.BidImportId
JOIN dbo.Vendors ON Vendors.VendorId = BidImports.VendorId
where Isnull(BidMSRPResults.Active,0)=1 
      and NOT ( Isnull(BidMSRPResults.DiscountRate,0)=0 and Isnull(BidMSRPResults.DiscountRateString,'') = '' )  -- for clarion code
--      and BidMSRPResults.BidHeaderId = 4932
--order by BidMSRPResults.BidHeaderId, BidMSRPResults.ManufacturerId, BidMSRPResults.DiscountRate desc
*/
```
