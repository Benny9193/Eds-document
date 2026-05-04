# Procedure: `dbo.sp_ShowDistribution`

_Generated on 2026-05-04T13:43:18.912Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_ShowDistribution` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-06-11 12:44:17 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRSId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidItems` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `PODetaillItems` | unresolved |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `School` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE  procedure sp_ShowDistribution @pRSId int AS

/* Allocate Items to Vendor(s)
   Sort Items by Quantity in Descending Order 
   Deduct Items from those available by cost in Ascending Order */
declare @QuantityNeeded int,
	@QuantityAvailable int,
	@QuantityUsed int,
	@ReqId int,
	@DetailId int,
	@BidItemId int,
	@ItemId int,
	@ItemCode varchar(16)

CREATE TABLE #PODetailItems (
	[PODetailItemId] [int] IDENTITY (1, 1) NOT NULL ,
	[POId] [int] NULL ,
	[DetailId] [int] NULL ,
	[ItemId] [int] NULL ,
	[Quantity] [int] NULL ,
	[BidItemId] [int] NULL ,
	[BidPrice] [money] NULL ,
	[GrossPrice] [money] NULL ,
	[DiscountRate] [decimal](9, 5) NULL ,
	[AwardId] [int] NULL ,
	[VendorId] [int] NULL ,
	[VendorItemCode] [varchar] (20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL ,
	[Alternate] [varchar] (512) COLLATE SQL_Latin1_General_CP1_CI_AS NULL ,
        [ItemCode] [varchar] (16)
)

-- Get List of Items to Inspect in Order of Quantity and Grouped by Req, Item, Quantity
declare ItemCur cursor for
select Requisitions.RequisitionId, ItemId, ItemCode, sum(Quantity) Quantity
  from Detail
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
  join School on School.SchoolId = Requisitions.SchoolId
  join ReportSessionLinks on ReportSessionLinks.IntId = Requisitions.RequisitionId
 where ReportSessionLinks.RSId = @pRSId
 group by Requisitions.RequisitionId, Detail.ItemId, Detail.ItemCode
 order by Quantity desc

open ItemCur

fetch next from ItemCur into @ReqId, @ItemId, @ItemCode, @QuantityNeeded

while @@fetch_status = 0
begin
  -- Get Line Item Info
  select @DetailId = DetailId
    from Detail
   where RequisitionId = @ReqId
     and ItemId = @ItemId

  select @QuantityNeeded = Detail.Quantity - (select sum(Quantity) 
                                                from #PODetailItems 
                                               where #PODetailItems.DetailId = Detail.DetailId)
    from Detail
   where RequisitionId = @ReqId
     and ItemId = @ItemId

  while @QuantityNeeded > 0
  begin
    -- Get Qty Avail from Lowest Bid Item with Available Qty
    select top 1 @BidItemId = BidItemId,
                 @QuantityAvailable = BidItems.BidQuantity - (select sum(podi.Quantity)
                                                                from #PODetailItems podi
                                                               group by podi.BidItemId
                                                              having podi.BidItemId = BidItems.BidItemId and sum(podi.Quantity) < BidItems.BidQuantity)
      from BidItems 
     where (BidItems.BidQuantity - (select sum(podi.Quantity)
                                      from #PODetailItems podi
                                     group by podi.BidItemId
                                    having podi.BidItemId = BidItems.BidItemId and sum(podi.Quantity) < BidItems.BidQuantity)) > 0
     order by Price Asc


    -- Check for Bid Items Available
    if @QuantityAvailable > 0
    begin
      -- Check Quantities
      if @QuantityNeeded > @QuantityAvailable
      begin
        select @QuantityUsed = @QuantityAvailable
      end
      else
      begin
        select @QuantityUsed = @QuantityNeeded
      end
    end
    else
    begin
      select @BidItemId = null,
             @QuantityUsed = @QuantityNeeded
    end

    -- Distribute Appropriate Quantity for Item
    insert PODetaillItems (DetailId, BidItemId, ItemId, Quantity)
      Values (@DetailId, @BidItemId, @ItemId, @QuantityUsed)
  end

  fetch next from ItemCur into @ReqId, @ItemId, @ItemCode, @QuantityNeeded
end

close ItemCur
deallocate ItemCur

select * from #PODetailItems

drop table #PODetailItems
```
