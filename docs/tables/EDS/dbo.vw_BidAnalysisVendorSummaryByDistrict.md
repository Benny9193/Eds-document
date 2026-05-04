# View: `dbo.vw_BidAnalysisVendorSummaryByDistrict`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `BidImportId` | int | NO |  |  |
| 3 | `ItemsBid` | int | YES |  |  |
| 4 | `AmountBid` | money | YES |  |  |
| 5 | `VendorsCode` | varchar(16) | YES |  |  |
| 6 | `VendorsName` | varchar(50) | YES |  |  |
| 7 | `CalculatedAmount` | money | YES |  |  |
| 8 | `ItemsWon` | int | NO |  |  |
| 9 | `POCount` | int | NO |  |  |
| 10 | `POTotal` | money | NO |  |  |
| 11 | `AvgPO` | money | NO |  |  |
| 12 | `DistrictId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaderDetail` | USER_TABLE |
| `BidHeaders` | USER_TABLE |
| `BidImports` | USER_TABLE |
| `BidRequestItems` | USER_TABLE |
| `BidResults` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Detail` | USER_TABLE |
| `DistrictPP` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `vw_LowestPrice` | VIEW |
| [`dbo.BidImports`](dbo.BidImports.md) | USER_TABLE |
| [`dbo.Vendors`](dbo.Vendors.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_BidAnalysisVendorSummaryByDistrict] as
-- First select is of "NO BID" items.  
SELECT BidHeaders.BidHeaderId, 0 BidImportId, 0 ItemsBid, 0 AmountBid, '0000' VendorsCode,  
       '** No Bid **' VendorsName, 0 CalculatedAmount, isnull(DistNoBidList.NoBidItems,0) ItemsWon, 0 POCount, 0 POTotal, 0 AvgPO, DistList.DistrictId 
  FROM BidHeaders with (nolock)
  JOIN
  (select BH.BidHeaderId, B.DistrictId
   FROM BidHeaders BH WITH (nolock)
   JOIN BidRequestItems BRI on BRI.BidHeaderId = BH.BidHeaderId and BRI.Active = 1
   JOIN BidHeaderDetail BHD ON BHD.BidRequestItemId = BRI.BidRequestItemId and BHD.BidHeaderId = BH.BidHeaderId
   JOIN Detail D ON D.DetailId  = BHD.DetailId
   JOIN Requisitions R on R.RequisitionId = D.RequisitionId 
   JOIN Budgets B on B.BudgetId = R.BudgetId 
   JOIN DistrictPP DPP on DPP.DistrictId = B.DistrictId and DPP.PricePlanId = BH.PricePlanId 
   group by BH.BidHeaderId, B.DistrictId
  ) DistList ON DistList.BidHeaderId = BidHeaders.BidHeaderId
  LEFT OUTER JOIN 
  (SELECT BH.BidHeaderId, B.DistrictId, COUNT(*) NoBidItems 
   FROM BidHeaders BH with (nolock)
   JOIN BidRequestItems BRI on BRI.BidHeaderId = BH.BidHeaderId and BRI.Active = 1
   LEFT OUTER JOIN vw_LowestPrice as vlp on vlp.BidHeaderId = BH.BidHeaderId and vlp.BidRequestItemId = BRI.BidRequestItemId
   JOIN BidHeaderDetail BHD ON BHD.BidRequestItemId = BRI.BidRequestItemId and BHD.BidHeaderId = BH.BidHeaderId
   JOIN Detail D ON D.DetailId  = BHD.DetailId
   JOIN Requisitions R on R.RequisitionId = D.RequisitionId 
   JOIN Budgets B on B.BudgetId = R.BudgetId 
   JOIN DistrictPP DPP on DPP.DistrictId = B.DistrictId and DPP.PricePlanId = BH.PricePlanId 
   Where vlp.BidRequestItemId is null --and BH.BidHeaderId=3136
   group by BH.BidHeaderId, B.DistrictId
 ) DistNoBidList ON DistNoBidList.BidHeaderId = BidHeaders.BidHeaderId and DistNoBidList.DistrictId = DistList.DistrictId
group by BidHeaders.BidHeaderId, DistList.DistrictId, DistNoBidList.NoBidItems

Union 
(
-- Second select is summary for all vendors
SELECT BidHeaders.BidHeaderId, BidImports.BIDIMPORTID, BidImports.ItemsBid, BidImports.AmountBid, V.Code VendorsCode, V.Name VendorsName, 
       (SELECT SUM(BidResults.QuantityBid * BidResults.UnitPrice) 
          from BidResults with (nolock)
         Where BidResults.BidImportId = BidImports.BidImportId ) As CalculatedAmount, 
       isnull(POInfo.ItemsWon,0) ItemsWon,
       isnull(POInfo.POCount,0) POCount, isnull(POInfo.POTotal,0) POTotal, isnull(POInfo.AvgPO,0) AvgPO, 
       DistList.DistrictId 
  FROM BidHeaders with (nolock)
  JOIN dbo.BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId 
  JOIN dbo.Vendors V ON V.VendorId = BidImports.VendorId 
  JOIN
  (select BH.BidHeaderId, B.DistrictId
   FROM BidHeaders BH WITH (nolock)
   JOIN BidRequestItems BRI on BRI.BidHeaderId = BH.BidHeaderId and BRI.Active = 1
   JOIN BidHeaderDetail BHD ON BHD.BidRequestItemId = BRI.BidRequestItemId and BHD.BidHeaderId = BH.BidHeaderId
   JOIN Detail D ON D.DetailId  = BHD.DetailId
   JOIN Requisitions R on R.RequisitionId = D.RequisitionId 
   JOIN Budgets B on B.BudgetId = R.BudgetId 
   JOIN DistrictPP DPP on DPP.DistrictId = B.DistrictId and DPP.PricePlanId = BH.PricePlanId 
   group by BH.BidHeaderId, B.DistrictId
  ) DistList ON DistList.BidHeaderId = BidHeaders.BidHeaderId
  LEFT OUTER JOIN 
      (SELECT BidHeaders.BidHeaderId, BidResults.BidImportId, 
             COUNT(Distinct BidRequestItems.BidRequestItemId) ItemsWon,
             COUNT(Distinct Requisitions.RequisitionId) POCount, 
             SUM( Detail.Quantity * BidResults.UnitPrice ) POTotal, 
             SUM( Detail.Quantity * BidResults.UnitPrice ) / COUNT(Distinct Requisitions.RequisitionId) AvgPO,
               Budgets.DistrictId BudgetsDistrictId
        From BidResults with (nolock)
        join BidImports on BidImports.BidImportId = BidResults.BidImportId
                       and BidImports.Active = 1
        join BidHeaders on BidHeaders.BidHeaderId = BidImports.BidHeaderId
        JOIN BidRequestItems ON BidRequestItems.BidHeaderId = BidHeaders.BidHeaderId
                            and BidRequestItems.BidRequestItemId = BidResults.BidRequestItemId
                            and BidRequestItems.Active = 1 
        JOIN BidHeaderDetail ON BidHeaderDetail.BidRequestItemId = BidRequestItems.BidRequestItemId 
                            and BidHeaderDetail.BidHeaderId = BidHeaders.BidHeaderId
        join vw_LowestPrice as vlp on vlp.BidHeaderId = BidHeaders.BidHeaderId
                                  and vlp.BidRequestItemId = BidResults.BidRequestItemId
                                  and vlp.BidResultsId = BidResults.BidResultsId
        JOIN Detail ON Detail.DetailId  = BidHeaderDetail.DetailId
        JOIN Requisitions on Requisitions.RequisitionId = Detail.RequisitionId 
        JOIN Budgets on Budgets.BudgetId = Requisitions.BudgetId 
        JOIN DistrictPP on DistrictPP.DistrictId = Budgets.DistrictId 
                       and DistrictPP.PricePlanId = BidHeaders.PricePlanId 
       group by BidHeaders.BidHeaderId, BidResults.BidImportId, Budgets.DistrictId 
      ) POInfo on POInfo.BidHeaderId = BidHeaders.BidHeaderId 
          and POInfo.BidImportId = BidImports.BidImportId 
          and POInfo.BudgetsDistrictId = DistList.DistrictId 
) 
--where BidHeaderId = 3136 
--ORDER BY DistrictId, BidImportId
```
