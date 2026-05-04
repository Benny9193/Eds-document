# View: `dbo.vw_BidAnalysisVendorSummaryTest`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

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
| 8 | `ItemsWon` | int | YES |  |  |
| 9 | `POCount` | int | NO |  |  |
| 10 | `POTotal` | money | NO |  |  |
| 11 | `AvgPO` | money | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaderDetail` | USER_TABLE |
| `BidHeaders` | USER_TABLE |
| `BidRequestItems` | USER_TABLE |
| `BidResults` | USER_TABLE |
| `Detail` | USER_TABLE |
| `vw_LowestPrice` | VIEW |
| [`dbo.BidImports`](dbo.BidImports.md) | USER_TABLE |
| [`dbo.Vendors`](dbo.Vendors.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
--select Vendors.Name, sum(Amount), avg(Amount), count(*) from (Select VendorId, sum(Detail.Quantity * Detail.BidPrice) Amount from Detail join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId and Requisitions.BidHeaderId = 11054 where Detail.BidItemId is not null and exists(Select Approvals.ApprovalId from Approvals where Approvals.RequisitionId = Requisitions.RequisitionId and Approvals.StatusId in (6,35,45,49)) group by Detail.VendorId, Detail.RequisitionId) x join Vendors on Vendors.VendorId = x.VendorId group by Vendors.Name order by Vendors.Name
--select * from vw_BidAnalysisVendorSummary where BidHeaderId = 11054 order by VendorsName
--select * from vw_BidAnalysisVendorSummaryTest where BidHeaderId = 11054 order by VendorsName
CREATE     view  [dbo].[vw_BidAnalysisVendorSummaryTest] as
-- First select is of "NO BID" items.  
SELECT BidHeaders.BidHeaderId, 0 BidImportId, 0 ItemsBid, 0 AmountBid, '0000' VendorsCode, 
       '** No Bid **' VendorsName, 0 CalculatedAmount, count(*) ItemsWon, 0 POCount, 0 POTotal, 0 AvgPO 
  FROM BidHeaders with (nolock)
  join BidRequestItems A on A.BidHeaderId = BidHeaders.BidHeaderId
                        and A.Active = 1
--  JOIN Items I on I.ItemId = A.ItemId
  left outer join vw_LowestPrice as vlp on vlp.BidHeaderId = BidHeaders.BidHeaderId 
                                       and vlp.BidRequestItemId = A.BidRequestItemId
 Where vlp.BidRequestItemId is null 
 group by BidHeaders.BidHeaderId
UNION (
-- Second select is summary for all vendors
SELECT bh.BidHeaderId, BI.BIDIMPORTID, BI.ItemsBid, BI.AmountBid, V.Code VendorsCode, V.Name VendorsName, 
       (SELECT SUM(BidResults.QuantityBid * BidResults.UnitPrice) 
          from BidResults with (nolock)
         Where BidResults.BidImportId = BI.BidImportId ) As CalculatedAmount, 
       (Select count(*) 
          from BidResults with (nolock)
          join BidRequestItems ON BidRequestItems.BidHeaderId = bh.BidHeaderId 
                              AND BidRequestItems.Active=1
          join vw_LowestPrice as vlp on vlp.BidheaderId = bh.BidHeaderId 
                                    and vlp.BidRequestItemId = BidRequestItems.BidRequestItemId
                                    and vlp.BidResultsId = BidResults.BidResultsId 
         Where BidResults.BidImportId = BI.BidImportId 
       ) As ItemsWon, 
       isnull(POCount.POCount,0) POCount, isnull(case when bh.BidType = 1 then Requested.POTotal else Actual.POTotal end,0) POTotal, isnull(case when bh.BidType = 1 then Requested.POTotal else Actual.POTotal end / POCount.POCount,0) AvgPO 
  FROM BidHeaders bh with (nolock)
  join dbo.BidImports BI on BI.BidHeaderId = bh.BidHeaderId 
  JOIN dbo.Vendors V ON V.VendorId = BI.VendorId 
--  LEFT OUTER JOIN dbo.Catalog C ON C.CatalogId = BI.CatalogId
  outer apply (
      SELECT sum(Detail.Quantity * BidResults.UnitPrice) POTotal
        From BidRequestItems
        join vw_LowestPrice as vlp on vlp.BidHeaderId = BidRequestItems.BidHeaderId
                                  and vlp.BidRequestItemId = BidRequestItems.BidRequestItemId
		join BidResults on BidResults.BidRequestItemId = BidRequestItems.BidRequestItemId
                       and BidResults.BidResultsId = vlp.BidResultsId
					   and BidResults.BidImportId = bi.BidImportId
		join BidHeaderDetail on BidHeaderDetail.BidRequestItemId = BidRequestItems.BidRequestItemId
		JOIN Detail ON Detail.DetailId  = BidHeaderDetail.DetailId
	   where BidRequestItems.Active = 1
				) Actual
  outer apply (
      SELECT sum(BidRequestItems.BidRequest * BidResults.UnitPrice) POTotal
        From BidRequestItems
        join vw_LowestPrice as vlp on vlp.BidHeaderId = BidRequestItems.BidHeaderId
                                  and vlp.BidRequestItemId = BidRequestItems.BidRequestItemId
		join BidResults on BidResults.BidRequestItemId = BidRequestItems.BidRequestItemId
                       and BidResults.BidResultsId = vlp.BidResultsId
					   and BidResults.BidImportId = bi.BidImportId
	   where BidRequestItems.Active = 1
				) Requested
  outer apply (
		Select count(distinct BidHeaderDetail.RequisitionId) POCount 
		  From BidRequestItems
		  join vw_LowestPrice as vlp on vlp.BidHeaderId = BidRequestItems.BidHeaderId
									and vlp.BidRequestItemId = BidRequestItems.BidRequestItemId
		  join BidResults on BidResults.BidRequestItemId = BidRequestItems.BidRequestItemId
						 and BidResults.BidResultsId = vlp.BidResultsId
						 and BidResults.BidImportId = bi.BidImportId
		  left outer join BidHeaderDetail on BidHeaderDetail.BidRequestItemId = BidRequestItems.BidRequestItemId
		 where BidRequestItems.BidHeaderId = bh.BidHeaderId
		   and BidRequestItems.Active = 1
				 ) POCount
)
```
