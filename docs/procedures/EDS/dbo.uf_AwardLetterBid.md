# Function: table-valued: `dbo.uf_AwardLetterBid`

_Generated on 2026-05-04T13:04:24.215Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_AwardLetterBid` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2008-06-06 14:04:15 |
| Modified | 2024-07-25 13:09:39 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRSId` | IN | int |  |
| 2 | `@pCategoryId` | IN | int |  |
| 3 | `@pBidHeaderId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `DistrictPP` | USER_TABLE |  |
| `PPCategory` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `utv_BidsList` | unresolved |  |
| `Vendors` | USER_TABLE |  |
| `dbo.BidHeaders` | USER_TABLE |  |
| `dbo.BidImports` | USER_TABLE |  |
| `dbo.Bids` | USER_TABLE |  |
| `dbo.uf_DistrictSummaryBid` | SQL_TABLE_VALUED_FUNCTION |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.rs_DistrictSummaryAwardLetter` | VIEW |

## Definition

```sql
/* select * from dbo.uf_AwardLetter1(36718,44) order by vendorId */

--select * from dbo.uf_AwardLetterBidTest(5408843,51,9275)
CREATE   function [dbo].[uf_AwardLetterBid] (@pRSId int, @pCategoryId int, @pBidHeaderId int)
returns @BidsTable table (
RSId		int null,
DistrictId	int null,
CategoryId	int null,
PricePlanId     int null,
VendorId	int null,
ItemsBid	int null,
AmountBid	money null,
ItemsAwarded	int null,
AmountAwarded	money null,
AwardId		int null,
BidDate		datetime null,
BidAwardDate	datetime null,
TotalItemsAwarded int null,
TotalItemsBid   int null,
TotalAmountBid  money null,
TotalAmountAwarded money null,
BidHeaderId	int null,
VendorCode	varchar(20) null,
VendorName	varchar(50) null,
BudgetName  varchar(50) null)
AS
begin
declare @BidsList utv_BidsList

  insert @BidsList(RequisitionId, BidHeaderId)
    select Requisitions.RequisitionId, Requisitions.BidHeaderId
	  from Requisitions
	  join ReportSessionLinks rsl on rsl.IntId = Requisitions.RequisitionId
	                             and rsl.RSId = @pRSId

  while @@ROWCOUNT != 0
  begin
		-- Add Parent PreBids
		insert @BidsList (RequisitionId, BidHeaderId)
		  select Requisitions.RequisitionId, BidHeaders.BidHeaderId
			from Requisitions with (nolock)
			join @BidsList bl on bl.RequisitionId = Requisitions.RequisitionId
			join Budgets on Budgets.BudgetId = Requisitions.BudgetId
			join Category on Category.CategoryId = Requisitions.CategoryId
			join BidHeaders on BidHeaders.CategoryId = Requisitions.CategoryId
						   and BidHeaders.Active = 1
						   and BidHeaders.ParentBidHeaderId = bl.BidHeaderId
 						   and isnull(BidHeaders.DistrictId,0) = case isnull(BidHeaders.BidType,1) when 2 then Budgets.DistrictId else isnull(BidHeaders.DistrictId,0) end
						   and getdate() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
			join PPCategory on PPCategory.PricePlanId = BidHeaders.PricePlanId
						   and PPCategory.CategoryId = BidHeaders.CategoryId
			join DistrictPP on DistrictPP.PricePlanId = BidHeaders.PricePlanId
						   and DistrictPP.DistrictId = Budgets.DistrictId
			left outer join @BidsList ble on ble.RequisitionId = Requisitions.RequisitionId
										 and ble.BidHeaderId = BidHeaders.BidHeaderId
		   where ble.BidHeaderId is null
		   group by Requisitions.RequisitionId, BidHeaders.BidHeaderId
  end

  insert @BidsTable (RSId, DistrictId, CategoryId, PricePlanId, VendorId, ItemsBid, 
                     AmountBid, BidDate, BidAwardDate, BidHeaderId, ItemsAwarded, AmountAwarded, BudgetName)
    select @pRSId, ds.DistrictId, ds.CategoryId, ds.PricePlanId, ds.VendorId, Bids.ItemsBid, 
           Bids.AmountBid, BidHeaders.BidDate, BidHeaders.BidAwardDate, BidHeaders.BidHeaderId, 
		   case Bids.VendorId 
		     when 7691 then count(ds.ItemCode) 
			 else case 
			        when count(ds.ItemCode) > Bids.ItemsBid then 
/*					    (select count(*) 
						   from (select det.ItemId 
						           from Detail as det 
								   join Requisitions as req on req.RequisitionId = det.RequisitionId 
														   and req.CategoryId = @pCategoryId 
								   join ReportSessionLinks as rsl on rsl.rsId = @pRSId 
								                                 and rsl.intId = req.RequisitionId 
								   outer apply (select Bids.BidHeaderId from BidItems bi join Bids b on b.BidId = bi.BidId where bi.BidItemId = Detail.BidItemId) bh
								  where ISNULL(det.VendorId,0) = ds.VendorId 
								    and req.BidHeaderId = @pBidHeaderId 
								  group by det.ItemId) ss) 
*/
					    (select count(*) 
						   from (select det.ItemId 
						           from Detail as det 
								   join Requisitions as req on req.RequisitionId = det.RequisitionId 
														   and req.CategoryId = @pCategoryId 
								   join @BidsList bl on bl.RequisitionId = req.RequisitionId 
 								                    and bl.BidHeaderId = @pBidHeaderId 
								  where ISNULL(det.VendorId,0) = ds.VendorId 
								  group by det.ItemId) ss) 
					else count(ds.ItemCode) 
				  end 
		   end, 
		   ds.VendorTotal,
		   Budgets.Name
      from dbo.uf_DistrictSummaryBid(@pRSId, @pCategoryId, @pBidHeaderId) ds
      join dbo.BidHeaders on BidHeaders.BidHeaderId = ds.BidHeaderId
      join dbo.Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
                   and Bids.VendorId = ds.VendorId
                   and Bids.Active = 1
	  join Budgets on Budgets.BudgetId = ds.BudgetId
     group by ds.DistrictId, ds.CategoryId, ds.PricePlanId, ds.VendorId, Bids.ItemsBid, 
              Bids.AmountBid, BidHeaders.BidDate, BidHeaders.BidAwardDate, BidHeaders.BidHeaderId, ds.VendorTotal, Bids.vendorId, Budgets.Name

  insert @BidsTable (RSId, DistrictId, CategoryId, PricePlanId, VendorId, ItemsBid, AmountBid, BidDate, BidAwardDate, BidHeaderId, BudgetName)
    select @pRSId, ds.DistrictId, ds.CategoryId, ds.PricePlanId, BidImports.VendorId, BidImports.ItemsBid, 
                    BidImports.AmountBid, BidHeaders.BidDate, BidHeaders.BidAwardDate, BidHeaders.BidHeaderId, Budgets.Name
      from dbo.uf_DistrictSummaryBid(@pRSId, @pCategoryId, @pBidHeaderId) ds
      join dbo.BidHeaders on BidHeaders.BidHeaderId = ds.BidHeaderId
      join dbo.BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
--                         and BidImports.Active = 1
	  join Budgets on Budgets.BudgetId = ds.BudgetId
      left outer join @BidsTable bt on bt.VendorId = BidImports.VendorId
                                   and bt.BidHeaderId = BidImports.BidHeaderId
                                   and bt.BidHeaderId = ds.BidHeaderId
     where bt.RSid is null
       and ds.PricePlanId is not null
     group by ds.DistrictId, ds.CategoryId, ds.PricePlanId, BidImports.VendorId, BidImports.ItemsBid, 
                    BidImports.AmountBid, BidHeaders.BidDate, BidHeaders.BidAwardDate, BidHeaders.BidHeaderId, Budgets.Name
/*
  update @BidsTable
     set ItemsAwarded = ss.ItemsAwarded,
         AmountAwarded = ss.AmountAwarded
    from @BidsTable bt
    join (
      Select ds.DistrictId, ds.VendorId, ds.BidHeaderId, 
             count(ds.ItemCode) ItemsAwarded, 
             ds.VendorTotal AmountAwarded
             from uf_DistrictSummary1(@pRSId,@pCategoryId) ds
       group by ds.DistrictId, ds.BidHeaderId, ds.VendorId, ds.VendorTotal
          ) ss on ss.DistrictId = bt.DistrictId
              and ss.BidHeaderId = bt.BidHeaderId
              and ss.VendorId = bt.VendorId
*/
  update @BidsTable
     set TotalItemsBid = ss.TotalItemsBid,
         TotalItemsAwarded = ss.TotalItemsAwarded,
         TotalAmountBid = ss.TotalAmountBid,
         TotalAmountAwarded = ss.TotalAmountAwarded
    from @BidsTable bt
    join (
      select RSId, CategoryId, sum(ItemsBid) TotalItemsBid, sum(ItemsAwarded) TotalItemsAwarded, 
             sum(AmountBid) TotalAmountBid, sum(AmountAwarded) TotalAmountAwarded
        from @BidsTable
       group by RSId, CategoryId
         ) ss on ss.RSId = bt.RSId and ss.CategoryId = bt.CategoryId

  update @BidsTable
     set VendorCode = Vendors.Code,
         VendorName = Vendors.Name
    from @BidsTable bt
    join Vendors on Vendors.VendorId = bt.VendorId

  return
end
```
