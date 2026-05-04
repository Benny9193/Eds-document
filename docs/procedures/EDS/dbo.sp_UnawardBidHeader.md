# Procedure: `dbo.sp_UnawardBidHeader`

_Generated on 2026-05-04T13:07:57.534Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_UnawardBidHeader` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2004-02-24 00:24:39 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBidHeaderId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Awards` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE   Procedure dbo.sp_UnawardBidHeader @pBidHeaderId int as

/*      select BidItems.AwardId, Bids.BidHeaderId, Bids.BidId
        into #DeleteItems
        from BidItems
        join Bids on Bids.BidId = BidItems.BidId
       where Bids.BidHeaderId = @pBidHeaderId
       group by BidItems.AwardId, Bids.BidHeaderId, Bids.BidId

      insert #DeleteItems (AwardId, BidHeaderId, BidId)
        select Awards.AwardId, Bids.BidHeaderId, Bids.BidId
          from BidHeaders
          join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
          join #DeleteItems dih on dih.BidHeaderId = BidHeaders.BidHeaderId
          left outer join Awards on Awards.BidId = Bids.BidId
          left outer join #DeleteItems di on di.BidId = Bids.BidId
         where di.BidId is null
         group by Awards.AwardId, Bids.BidHeaderId, Bids.BidId

      Update Detail
         set BidItemId = null,
             BidPrice = Items.ListPrice,
             GrossPrice = Items.ListPrice,
             DiscountRate = 0,
             AwardId = null,
             VendorId = Items.VendorId,
             Alternate = null,
             BidHeaderId = BidHeaders.BidHeaderId,
             ItemMustBeBid = 1
        from Detail
        join Items on Items.ItemId = Detail.ItemId
        join BidHeaderDetail on BidHeaderDetail.DetailId = Detail.DetailId
        join BidHeaders on BidHeaders.BidHeaderId = BidHeaderDetail.BidHeaderId
                       and BidHeaders.BidHeaderId = @pBidHeaderId
        join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
                 and Bids.Active = 1
        join BidItems on BidItems.BidId = Bids.BidId
                     and BidItems.ItemId = Detail.ItemId
*/
/*      
      Delete BidItems
        from BidItems
        join (select BidId from #DeleteItems group by BidId) ss on ss.BidId = BidItems.BidId
*/
/*
      Delete OrderBookDetail
        from OrderBooks
        join OrderBookDetail on OrderBookDetail.OrderBookId = OrderBooks.OrderBookId
       where OrderBooks.OrderBookId = @pOrderBookId

      Delete OrderBooks
       where OrderBookId = @pOrderBookId
*/
      Update Awards
         set Active = 0
        from Awards
       where BidHeaderId = @pBidHeaderId
/*        join (select AwardId from #DeleteItems group by AwardId) ss on ss.AwardId = Awards.AwardId
*/

/*
      Delete Awards
        from Awards
        join (select AwardId from #DeleteItems group by AwardId) ss on ss.AwardId = Awards.AwardId
*/
      Update Bids
         set Active = 0
        from Bids
       where BidHeaderId = @pBidHeaderId
/*        join (select BidId from #DeleteItems group by BidId) ss on ss.BidId = Bids.BidId
*/
/*
      Delete Bids
        from Bids
        join (select BidId from #DeleteItems group by BidId) ss on ss.BidId = Bids.BidId
*/
/*      drop table #DeleteItems
*/
```
