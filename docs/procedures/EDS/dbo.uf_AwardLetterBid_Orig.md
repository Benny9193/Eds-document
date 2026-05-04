# Function: table-valued: `dbo.uf_AwardLetterBid_Orig`

_Generated on 2026-05-04T13:43:18.952Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_AwardLetterBid_Orig` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2011-02-25 11:05:29 |
| Modified | 2011-02-25 11:05:29 |
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
| `Detail` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |
| `dbo.BidHeaders` | USER_TABLE |  |
| `dbo.Bids` | USER_TABLE |  |
| `dbo.uf_DistrictSummaryBid` | SQL_TABLE_VALUED_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
/* select * from dbo.uf_AwardLetter1(36718,44) order by vendorId */


create  function [dbo].[uf_AwardLetterBid_Orig] (@pRSId int, @pCategoryId int, @pBidHeaderId int)
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
VendorName	varchar(50) null)
AS
begin
  insert @BidsTable (RSId, DistrictId, CategoryId, PricePlanId, VendorId, ItemsBid, 
                     AmountBid, BidDate, BidAwardDate, BidHeaderId, ItemsAwarded, AmountAwarded)
    select @pRSId, ds.DistrictId, ds.CategoryId, ds.PricePlanId, ds.VendorId, Bids.ItemsBid, 
           Bids.AmountBid, BidHeaders.BidDate, BidHeaders.BidAwardDate, BidHeaders.BidHeaderId, case Bids.VendorId when 7691 then count(ds.ItemCode) else case when count(ds.ItemCode) > Bids.ItemsBid then (select count(*) from (select det.ItemId from Detail as det join Requisitions as req on req.RequisitionId = det.RequisitionId and req.BidHeaderId = @pBidHeaderId and req.CategoryId = @pCategoryId join ReportSessionLinks as rsl on rsl.rsId = @pRSId and rsl.intId = req.RequisitionId where isnull(det.BidItemId,0) != 0 group by det.ItemId) ss) else count(ds.ItemCode) end end, ds.VendorTotal
      from dbo.uf_DistrictSummaryBid(@pRSId, @pCategoryId, @pBidHeaderId) ds
      join dbo.BidHeaders on BidHeaders.BidHeaderId = ds.BidHeaderId
      join dbo.Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
                   and Bids.VendorId = ds.VendorId
                   and Bids.Active = 1
     group by ds.DistrictId, ds.CategoryId, ds.PricePlanId, ds.VendorId, Bids.ItemsBid, 
              Bids.AmountBid, BidHeaders.BidDate, BidHeaders.BidAwardDate, BidHeaders.BidHeaderId, ds.VendorTotal, Bids.vendorId

  insert @BidsTable (RSId, DistrictId, CategoryId, PricePlanId, VendorId, ItemsBid, AmountBid, BidDate, BidAwardDate, BidHeaderId)
    select @pRSId, ds.DistrictId, ds.CategoryId, ds.PricePlanId, Bids.VendorId, Bids.ItemsBid, 
                    Bids.AmountBid, BidHeaders.BidDate, BidHeaders.BidAwardDate, BidHeaders.BidHeaderId
      from dbo.uf_DistrictSummaryBid(@pRSId, @pCategoryId, @pBidHeaderId) ds
      join dbo.BidHeaders on BidHeaders.BidHeaderId = ds.BidHeaderId
      join dbo.Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
                   and Bids.Active = 1
      left outer join @BidsTable bt on bt.VendorId = Bids.VendorId
                                   and bt.BidHeaderId = Bids.BidHeaderId
                                   and bt.BidHeaderId = ds.BidHeaderId
     where bt.RSid is null
       and ds.PricePlanId is not null
     group by ds.DistrictId, ds.CategoryId, ds.PricePlanId, Bids.VendorId, Bids.ItemsBid, 
                    Bids.AmountBid, BidHeaders.BidDate, BidHeaders.BidAwardDate, BidHeaders.BidHeaderId
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
