# Function: table-valued: `dbo.uf_AwardLetter1`

_Generated on 2026-05-04T14:49:07.343Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_AwardLetter1` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2008-05-29 22:51:44 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRSId` | IN | int |  |
| 2 | `@pCategoryId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.BidHeaders` | USER_TABLE |  |
| `dbo.Bids` | USER_TABLE |  |
| `dbo.uf_DistrictSummary1` | SQL_TABLE_VALUED_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
/* select * from dbo.uf_AwardLetter1(36718,44) order by vendorId */


CREATE    function dbo.uf_AwardLetter1 (@pRSId int, @pCategoryId int)
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
BidHeaderId	int null)
AS
begin
  insert @BidsTable (RSId, DistrictId, CategoryId, PricePlanId, VendorId, ItemsBid, 
                     AmountBid, BidDate, BidAwardDate, BidHeaderId, ItemsAwarded, AmountAwarded)
    select @pRSId, ds.DistrictId, ds.CategoryId, ds.PricePlanId, ds.VendorId, Bids.ItemsBid, 
           Bids.AmountBid, BidHeaders.BidDate, BidHeaders.BidAwardDate, BidHeaders.BidHeaderId, case when count(ds.ItemCode) > Bids.ItemsBid then Bids.ItemsBid else count(ds.ItemCode) end, ds.VendorTotal
      from dbo.uf_DistrictSummary1(@pRSId, @pCategoryId) ds
      join dbo.BidHeaders on BidHeaders.BidHeaderId = ds.BidHeaderId
      join dbo.Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
                   and Bids.VendorId = ds.VendorId
                   and Bids.Active = 1
     group by ds.DistrictId, ds.CategoryId, ds.PricePlanId, ds.VendorId, Bids.ItemsBid, 
              Bids.AmountBid, BidHeaders.BidDate, BidHeaders.BidAwardDate, BidHeaders.BidHeaderId, ds.VendorTotal

  insert @BidsTable (RSId, DistrictId, CategoryId, PricePlanId, VendorId, ItemsBid, AmountBid, BidDate, BidAwardDate, BidHeaderId)
    select @pRSId, ds.DistrictId, ds.CategoryId, ds.PricePlanId, Bids.VendorId, Bids.ItemsBid, 
                    Bids.AmountBid, BidHeaders.BidDate, BidHeaders.BidAwardDate, BidHeaders.BidHeaderId
      from dbo.uf_DistrictSummary1(@pRSId, @pCategoryId) ds
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
         TotalItemsAwarded = ss.TotalItemsAwarded, --case when ss.TotalItemsAwarded > ss.TotalItemsBid then ss.TotalItemsBid else ss.TotalItemsAwarded end,
         TotalAmountBid = ss.TotalAmountBid,
         TotalAmountAwarded = ss.TotalAmountAwarded
    from @BidsTable bt
    join (
      select RSId, CategoryId, sum(ItemsBid) TotalItemsBid, sum(ItemsAwarded) TotalItemsAwarded, 
             sum(AmountBid) TotalAmountBid, sum(AmountAwarded) TotalAmountAwarded
        from @BidsTable
       group by RSId, CategoryId
         ) ss on ss.RSId = bt.RSId and ss.CategoryId = bt.CategoryId

  return
end
```
