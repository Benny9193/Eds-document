# View: `dbo.BidMgrBidTradeLowBidder`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `BidTradeId` | int | NO |  |  |
| 3 | `CountyId` | int | NO |  |  |
| 4 | `BidImportId` | int | NO |  |  |
| 5 | `CountyTotalUsedInAward` | money | YES |  |  |
| 6 | `VendorId` | int | YES |  |  |
| 7 | `VendorName` | varchar(50) | YES |  |  |
| 8 | `CountyName` | varchar(50) | NO |  |  |
| 9 | `VendorCode` | varchar(16) | YES |  |  |
| 10 | `State` | char(2) | NO |  |  |
| 11 | `Active` | tinyint | YES |  |  |
| 12 | `Comments` | varchar(1024) | YES |  |  |
| 13 | `ActiveCounty` | tinyint | YES |  |  |
| 14 | `BidImportCountyId` | int | NO |  |  |
| 15 | `ActiveBidAndCounty` | tinyint | YES |  |  |
| 16 | `CommentsCounty` | varchar(4096) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.BidImportCounties`](dbo.BidImportCounties.md) | USER_TABLE |
| [`dbo.BidImports`](dbo.BidImports.md) | USER_TABLE |
| [`dbo.BidMgrBidTradeCountyTotals`](dbo.BidMgrBidTradeCountyTotals.md) | VIEW |
| [`dbo.BidTradeCounties`](dbo.BidTradeCounties.md) | USER_TABLE |
| [`dbo.Vendors`](dbo.Vendors.md) | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_BidTradesVendors`](dbo.vw_BidTradesVendors.md) | VIEW |

## Definition

```sql
create   view  [dbo].[BidMgrBidTradeLowBidder]
AS
SELECT A.BidHeaderId, A.BidTradeId, A.CountyId, A.BidImportId, A.CountyTotalUsedInAward, B.VendorId, V.Name AS VendorName, A.Name AS CountyName, V.Code VendorCode, A.State, B.Active, B.Comments, bic.Active ActiveCounty, bic.BidImportCountyId,
       B.Active & bic.Active ActiveBidAndCounty, bic.Comments CommentsCounty
FROM dbo.BidMgrBidTradeCountyTotals AS A 
JOIN dbo.BidImports AS B ON B.BidImportId = A.BidImportId  --and b.Active = 1  -- note: the filter on active will be removed soon
join dbo.BidTradeCounties btc on btc.BidTradeId = a.BidTradeId
                             and btc.CountyId = a.CountyId
join dbo.BidImportCounties bic on bic.BidImportId = B.BidImportId
                              and bic.BidTradeCountyId = btc.BidTradeCountyId
JOIN dbo.Vendors AS V ON V.VendorId = B.VendorId
```
