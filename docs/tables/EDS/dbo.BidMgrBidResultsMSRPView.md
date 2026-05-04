# View: `dbo.BidMgrBidResultsMSRPView`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ManufacturerName` | varchar(100) | NO |  |  |
| 2 | `ActiveBid` | int | NO |  |  |
| 3 | `BidHeaderId` | int | NO |  |  |
| 4 | `BidImportId` | int | NO |  |  |
| 5 | `ManufacturerId` | int | YES |  |  |
| 6 | `DiscountRate` | decimal(9,5) | YES |  |  |
| 7 | `DiscountRateString` | char(10) | YES |  |  |
| 8 | `WriteInFlag` | tinyint | YES |  |  |
| 9 | `WriteInManufacturer` | varchar(100) | YES |  |  |
| 10 | `Modified` | datetime | NO |  |  |
| 11 | `BidMSRPResultsId` | int | NO |  |  |
| 12 | `WinningBidFlag` | int | NO |  |  |
| 13 | `BidRequestManufacturerId` | int | YES |  |  |
| 14 | `WinningBidOverride` | tinyint | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.BidImports`](dbo.BidImports.md) | USER_TABLE |
| [`dbo.BidMSRPResults`](dbo.BidMSRPResults.md) | USER_TABLE |
| [`dbo.BidRequestManufacturer`](dbo.BidRequestManufacturer.md) | USER_TABLE |
| [`dbo.Manufacturers`](dbo.Manufacturers.md) | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.BidMgrBidRankingMSRPView`](dbo.BidMgrBidRankingMSRPView.md) | VIEW |

## Definition

```sql
create   view  [dbo].[BidMgrBidResultsMSRPView]
AS

SELECT Isnull(dbo.Manufacturers.Name,'') ManufacturerName, 
       Case When Isnull(dbo.BidMSRPResults.Active,0)=1 and Isnull(BidImports.Active,0)=1 Then 1 Else 0 End ActiveBid, 
       dbo.BidMSRPResults.BidHeaderId, dbo.BidMSRPResults.BidImportId, 
       dbo.BidMSRPResults.ManufacturerId, dbo.BidMSRPResults.DiscountRate, dbo.BidMSRPResults.DiscountRateString, 
       dbo.BidMSRPResults.WriteInFlag, dbo.BidMSRPResults.WriteInManufacturer,
       --Isnull(dbo.BidMSRPResults.[Weight],0) [Weight], 
       dbo.BidMSRPResults.Modified, dbo.BidMSRPResults.BidMSRPResultsId,
       -- note: may need to consider "Weight" when finding the winning bid 
       (Case 
        When (SELECT Count(*) 
              FROM dbo.BidMSRPResults BR
              JOIN dbo.BidImports BI ON BI.BidImportId = BR.BidImportId
              where Isnull(BR.Active,0)=1 and Isnull(BI.Active,0)=1
                    and BR.BidHeaderId=dbo.BidMSRPResults.BidHeaderId 
                    and Isnull(BR.ManufacturerId,0) <> 0 and Isnull(BR.ManufacturerId,0) = dbo.BidMSRPResults.ManufacturerId
                    and Isnull(BR.WinningBidOverride,0) = 1
              ) = 0 and
              Isnull(BidMSRPResults.Active,0)=1 and
              Isnull(BidImports.Active,0)=1 and 
              Isnull(
             (SELECT Max(Isnull(BR.DiscountRate,0)) 
              FROM dbo.BidMSRPResults BR
              JOIN dbo.BidImports BI ON BI.BidImportId = BR.BidImportId
              where Isnull(BR.Active,0)=1 and Isnull(BI.Active,0)=1
                    and BR.BidHeaderId=dbo.BidMSRPResults.BidHeaderId 
                    and Isnull(BR.ManufacturerId,0) <> 0 and Isnull(BR.ManufacturerId,0) = dbo.BidMSRPResults.ManufacturerId
                    and NOT ( Isnull(BR.DiscountRate,0)=0 and Isnull(BR.DiscountRateString,'') = '' )  -- for clarion code
             ),-1) = Isnull(dbo.BidMSRPResults.DiscountRate,0) 
        Then 1 
        Else 
          Case When Isnull(WinningBidOverride,0)=1 and Isnull(dbo.BidMSRPResults.Active,0)=1 and Isnull(BidImports.Active,0)=1 Then 1 Else 0 End
        End
       ) WinningBidFlag,
       dbo.BidMSRPResults.BidRequestManufacturerId,
       Isnull(dbo.BidMSRPResults.WinningBidOverride,0) WinningBidOverride
FROM dbo.BidMSRPResults
JOIN dbo.BidImports ON BidImports.BidImportId = BidMSRPResults.BidImportId
left JOIN dbo.Manufacturers ON dbo.BidMSRPResults.ManufacturerId = dbo.Manufacturers.ManufacturerId
left JOIN dbo.BidRequestManufacturer ON BidRequestManufacturer.BidRequestManufacturerId = BidMSRPResults.BidRequestManufacturerId
where isnull(BidRequestManufacturer.Active,1) = 1  -- note: remove deactivated bid requests


/*
SELECT Isnull(dbo.Manufacturers.Name,'') ManufacturerName, 
       Case When Isnull(dbo.BidMSRPResults.Active,0)=1 and Isnull(BidImports.Active,0)=1 Then 1 Else 0 End ActiveBid, 
       dbo.BidMSRPResults.BidHeaderId, dbo.BidMSRPResults.BidImportId, 
       dbo.BidMSRPResults.ManufacturerId, dbo.BidMSRPResults.DiscountRate, dbo.BidMSRPResults.DiscountRateString, 
       dbo.BidMSRPResults.WriteInFlag, dbo.BidMSRPResults.WriteInManufacturer,
       Isnull(dbo.BidMSRPResults.[Weight],0) [Weight], dbo.BidMSRPResults.Modified, dbo.BidMSRPResults.BidMSRPResultsId,
       -- note: may need to consider "Weight" when finding the winning bid 
       (Case When 
       Isnull(BidMSRPResults.Active,0)=1 and
       Isnull(BidImports.Active,0)=1 and 
       Isnull(
       (SELECT Max(Isnull(BR.DiscountRate,0)) 
        FROM dbo.BidMSRPResults BR
        JOIN dbo.BidImports BI ON BI.BidImportId = BR.BidImportId
        where BR.Active=1 and BI.Active=1
              and BR.BidHeaderId=dbo.BidMSRPResults.BidHeaderId 
              and Isnull(BR.ManufacturerId,0) <> 0 and Isnull(BR.ManufacturerId,0) = dbo.BidMSRPResults.ManufacturerId
              and NOT ( Isnull(BR.DiscountRate,0)=0 and Isnull(BR.DiscountRateString,'') = '' )  -- for clarion code
       ),-1) = Isnull(dbo.BidMSRPResults.DiscountRate,0) Then 1 Else 0 End) WinningBidFlag,
       dbo.BidMSRPResults.BidRequestManufacturerId
FROM dbo.BidMSRPResults
JOIN dbo.BidImports ON BidImports.BidImportId = BidMSRPResults.BidImportId
left JOIN dbo.Manufacturers ON dbo.BidMSRPResults.ManufacturerId = dbo.Manufacturers.ManufacturerId
left JOIN dbo.BidRequestManufacturer ON BidRequestManufacturer.BidRequestManufacturerId = BidMSRPResults.BidRequestManufacturerId
where isnull(BidRequestManufacturer.Active,1) = 1  -- note: remove deactivated bid requests
*/
```
