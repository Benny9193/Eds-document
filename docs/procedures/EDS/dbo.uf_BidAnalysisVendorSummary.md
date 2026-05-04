# Function: inline table-valued: `dbo.uf_BidAnalysisVendorSummary`

_Generated on 2026-05-04T13:04:24.223Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_BidAnalysisVendorSummary` |
| Kind | Function (inline TVF) |
| sys.objects.type | `IF` (SQL_INLINE_TABLE_VALUED_FUNCTION) |
| Created | 2009-08-19 14:01:50 |
| Modified | 2011-11-28 09:46:32 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBidHeaderId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaderDetail` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `BidRequestItems` | USER_TABLE |  |
| `BidResults` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `DistrictPP` | USER_TABLE |  |
| `items` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `dbo.BidImports` | USER_TABLE |  |
| `dbo.Catalog` | USER_TABLE |  |
| `dbo.uf_LowestPrice` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_lowestpriceid` | SQL_SCALAR_FUNCTION |  |
| `dbo.Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE                       function [dbo].[uf_BidAnalysisVendorSummary](@pBidHeaderId int)
returns table
as
return(
-- First select is of "NO BID" items.  
SELECT 0 BidImportId, 0 ItemsBid, 0 AmountBid, '0000' VendorsCode, '** No Bid **' VendorsName, 0 CalculatedAmount, count(*) ItemsWon, 0 POCount, 0 POTotal, 0 AvgPO 
  FROM BidRequestItems A with (nolock)
  JOIN items I on A.ItemId = I.ItemId 
 Where A.BidHeaderId = @pBidHeaderId 
   AND A.Active = 1 
   and dbo.uf_LowestPrice(A.BidRequestItemId) is null 
UNION 
-- Second select is summary for all vendors
SELECT BI.BIDIMPORTID, BI.ItemsBid, BI.AmountBid, V.Code VendorsCode, V.Name VendorsName, 
       (SELECT SUM(BidResults.QuantityBid * BidResults.UnitPrice) 
          from BidResults with (nolock)
         Where BidResults.BidImportId = BI.BidImportId ) As CalculatedAmount, 
       (Select count(*) 
          from BidResults with (nolock)
          join BidRequestItems ON BidRequestItems.BidHeaderId = @pBidHeaderId 
                              AND BidRequestItems.Active = 1 
                              AND dbo.uf_lowestpriceid(BidRequestItems.BidRequestItemId) = BidResults.BidResultsId 
          join Items on Items.ItemId = BidResults.ItemId 
         Where BidResults.BidImportId = BI.BidImportId 
       ) As ItemsWon, 
       isnull(ss.POCount,0) POCount, isnull(ss.POTotal,0) POTotal, isnull(ss.AvgPO,0) AvgPO 
FROM dbo.BidImports BI with (nolock)
JOIN dbo.Vendors V ON V.VendorId = BI.VendorId 
LEFT OUTER JOIN dbo.Catalog C ON C.CatalogId = BI.CatalogId
LEFT OUTER JOIN 
( 
SELECT BidResults.BidImportId, 
       COUNT(Distinct Requisitions.RequisitionId) POCount, 
       Sum( Detail.Quantity * BidResults.UnitPrice ) POTotal, 
       Sum( Detail.Quantity * BidResults.UnitPrice ) / COUNT(Distinct Requisitions.RequisitionId) AvgPO 
  From BidResults with (nolock)
  JOIN BidRequestItems ON BidRequestItems.BidHeaderId = @pBidHeaderId 
                      and BidRequestItems.Active = 1 
                      and dbo.uf_lowestpriceid(BidRequestItems.BidRequestItemId) = BidResults.BidResultsId 
  JOIN BidHeaderDetail ON BidHeaderDetail.BidHeaderId = @pBidHeaderId 
                      and BidHeaderDetail.BidRequestItemId = BidRequestItems.BidRequestItemId 
  JOIN Detail ON BidHeaderDetail.DetailId = Detail.DetailId 
  JOIN BidHeaders ON BidHeaders.BidHeaderId = @pBidHeaderId 
  JOIN Requisitions on Requisitions.RequisitionId = Detail.RequisitionId 
  JOIN Budgets on Budgets.BudgetId = Requisitions.BudgetId 
  JOIN DistrictPP on DistrictPP.DistrictId = Budgets.DistrictId 
                 and DistrictPP.PricePlanId = BidHeaders.PricePlanId 
  JOIN Items on Items.ItemId = BidResults.ItemId 
 Where BidResults.BidHeaderId = @pBidHeaderId 
 group by BidResults.BidImportId 
) ss on ss.bidimportid = BI.BidImportId 
WHERE BI.BIDHEADERID = @pBidHeaderId 
--ORDER BY BI.BidImportId
)
```
