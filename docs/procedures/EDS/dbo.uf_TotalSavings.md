# Function: table-valued: `dbo.uf_TotalSavings`

_Generated on 2026-05-04T13:04:00.652Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_TotalSavings` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2007-07-05 12:09:22 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRSId` | IN | int |  |
| 2 | `@pBidHeaderId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Awards` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `Catalog` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.sp_ConvertTextbookReqs` | SQL_STORED_PROCEDURE |

## Definition

```sql
CREATE      function dbo.uf_TotalSavings (@pRSId int, @pBidHeaderId int)
returns @PODetailItems Table (
	[PODetailItemId] [int] IDENTITY (1, 1) NOT NULL ,
	[POId] [int] NULL ,
	[DetailId] [int] NULL ,
	[ItemId] [int] NULL ,
	[Quantity] [int] NULL ,
	[AwardId] int null,
	[BidId] int null,
	[BidItemId] [int] NULL ,
	[BidPrice] [money] NULL ,
	[GrossPrice] [money] NULL ,
        [CatalogPrice] money null ,
	[DiscountRate] [decimal](9, 5) NULL ,
	[VendorId] [int] NULL ,
        [VendorCode] char(4) null,
        [VendorName] varchar(50) null,
	[VendorItemCode] [varchar] (20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL ,
	[Alternate] [varchar] (512) COLLATE SQL_Latin1_General_CP1_CI_AS NULL ,
        [ItemCode] [varchar] (16),
        [RequisitionId] int null,
        [RSId] int null,
	[CatalogTotal] money null,
        [CatalogBidOnly] money null,
        [CombinedBidOnly] money null,
	[CombinedTotal] money null,
        [OverallSavings] money null,
        [VendorTotal] money null,
	[DistrictId] int null,
        [DistrictName] varchar(50) null,
        [RequestedQuantity] int null,
	[ItemDescription] varchar(512) null,
        [SchoolName] varchar(50) null,
        [Attention] varchar(50) null,
        [TextBookPercentage] decimal(9,5) null,
        [TextBookCharge] money null,
        [TotalTitles] int null,
        [TotalTitlesBid] int null,
	[TotalBooks] int null,
	[TotalBidBooks] int null,
        [TotalUsedBooks] int null,
	[ShippingPercentage] decimal(9,5) null
)
 AS
begin
/* Allocate Items to Vendor(s)
   Sort Items by Quantity in Descending Order 
   Deduct Items from those available by cost in Ascending Order */
declare @QuantityNeeded int,
	@QuantityAvailable int,
	@QuantityUsed int,
	@ReqId int,
	@DetailId int,
	@AwardId int,
	@BidId int,
	@BidItemId int,
	@ItemId int,
	@VendorId int,
	@ItemCode varchar(16),
	@RSId int,
	@CatalogTotal money,
	@CatalogBidOnly money,
	@CombinedBidOnly money,
	@CombinedTotal Money,
	@OverallSavings money,
	@VendorTotal money,
	@TotalTitles int,
	@TotalTitlesBid int

-- Get List of Items to Inspect in Order of Quantity and Grouped by Req, Item, Quantity
declare ItemCur cursor for
select Requisitions.RequisitionId, ItemId, ItemCode, sum(Quantity) Quantity, ReportSessionLinks.RSId RSId
  from Detail
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
  join School on School.SchoolId = Requisitions.SchoolId
  join ReportSessionLinks on ReportSessionLinks.IntId = Requisitions.RequisitionId
 where ReportSessionLinks.RSId = @pRSId
 group by Requisitions.RequisitionId, Detail.ItemId, Detail.ItemCode, ReportSessionLinks.RSId
 order by Quantity desc

open ItemCur

fetch next from ItemCur into @ReqId, @ItemId, @ItemCode, @QuantityNeeded, @RSId

while @@fetch_status = 0
begin
  -- Get Line Item Info
  select @DetailId = DetailId
    from Detail
   where RequisitionId = @ReqId
     and ItemId = @ItemId

  select @QuantityNeeded = Detail.Quantity - isnull((select sum(PODI.Quantity) 
                                                       from @PODetailItems podi
                                                      where podi.DetailId = Detail.DetailId),0)
    from Detail
   where Detail.DetailId = @DetailId

  while @QuantityNeeded > 0
  begin
    -- Get Qty Avail from Lowest Bid Item with Available Qty
    select top 1 @BidItemId = BidItems.BidItemId,
                 @BidId = Bids.BidId,
                 @AwardId = BidItems.AwardId,
                 @QuantityAvailable = BidItems.BidQuantity - isnull((select sum(podi.Quantity)
                                                                       from @PODetailItems podi
                                                                      group by podi.BidItemId
                                                                     having podi.BidItemId = BidItems.BidItemId),0)
/*      from BidItems 
      join Awards on Awards.AwardId = BidItems.AwardId
      join Bids on Bids.BidId = BidItems.BidId
      join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
      join School on School.DistrictId = Bids.DistrictId
      join Requisitions on Requisitions.SchoolId = School.SchoolId
*/
      from Detail
      join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
      join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId
      join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
               and Bids.Active = 1
      join BidItems on BidItems.BidId = Bids.BidId
                   and BidItems.ItemId = Detail.ItemId
      join Awards on Awards.BidId = Bids.BidId
      join Vendors on Vendors.VendorId = Bids.VendorId
     where BidHeaders.BidHeaderId = @pBidHeaderId
       and BidItems.ItemId = @ItemId
       and Requisitions.RequisitionId = @ReqId
       and (BidItems.BidQuantity - isnull((select sum(podi.Quantity)
                                             from @PODetailItems podi
                                            group by podi.BidItemId
                                           having podi.BidItemId = BidItems.BidItemId),0)) > 0
     order by Price Asc

    if @@rowcount = 0
    begin
      select @BidItemId = null,
             @AwardId = null,
             @QuantityAvailable = 0
    end

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
             @AwardId = null,
             @QuantityUsed = @QuantityNeeded
    end

    -- Distribute Appropriate Quantity for Item
    insert @PODetailItems (DetailId, AwardId, BidId, BidItemId, ItemId, Quantity, ItemCode, RSId, RequisitionId)
      Values (@DetailId, @AwardId, @BidId, @BidItemId, @ItemId, @QuantityUsed, @ItemCode, @RSId, @ReqId)

    select @QuantityNeeded = Detail.Quantity - isnull((select sum(PODI.Quantity) 
                                                         from @PODetailItems podi
                                                        where podi.DetailId = Detail.DetailId),0)
      from Detail
     where Detail.DetailId = @DetailId
  end

  fetch next from ItemCur into @ReqId, @ItemId, @ItemCode, @QuantityNeeded, @RSId
end

update @PODetailItems
   set VendorId = Bids.VendorId,
       VendorCode = Vendors.Code,
       VendorName = Vendors.Name,
       BidId = Bids.BidId,
       AwardId = Awards.AwardId
  from @PODetailItems podi1
  join BidItems on BidItems.BidItemId = podi1.BidItemId
  join Bids on Bids.BidId = BidItems.BidId
  join Awards on Awards.AwardId = BidItems.AwardId
  join Vendors on Vendors.VendorId = Bids.VendorId

Update @PODetailItems
   set VendorId = Vendors.VendorId,
       VendorCode = Vendors.Code,
       VendorName = Vendors.Name,
       AwardId = Awards.AwardId
  from @PODetailItems podi
  join Items on Items.ItemId = podi.ItemId
  join CrossRefs on CrossRefs.ItemId = Items.ItemId
                and CrossRefs.Active = 1
  join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
  join Vendors on Vendors.VendorId = Catalog.VendorId
              and Vendors.VendorId != 7853
  join Bids on Bids.VendorId = Catalog.VendorId
           and Bids.CategoryId = Catalog.CategoryId
           and Bids.Active = 1
  join Awards on Awards.BidId = Bids.BidId
             and Awards.Active = 1
 where podi.VendorId is null
   and isnull(CrossRefs.CatalogId,0) <> 0

update @PODetailItems
   set BidPrice = BidItems.Price,
       GrossPrice = BidItems.Price - round(BidItems.Price * isnull(Bids.BidDiscountRate / 100,0),2),
       DiscountRate = Bids.BidDiscountRate
  from @PODetailItems podi
  join BidItems on BidItems.BidItemId = podi.BidItemId
  join Bids on Bids.BidId = BidItems.BidId

update @PODetailItems
   set CatalogPrice = CrossRefs.CatalogPrice
  from @PODetailItems podi
  join Items on Items.ItemId = podi.ItemId
  join Category on Category.CategoryId = Items.CategoryId
  join CrossRefs on CrossRefs.ItemId = Items.ItemId
                and CrossRefs.Active = 1
  join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
--                and CrossRefs.CatalogId = Items.ParentCatalogId
 where Category.Type = 2

update @PODetailItems
   set BidPrice = CatalogPrice,
       GrossPrice = CatalogPrice,
       DiscountRate = 0
 where BidPrice is null

select @CatalogTotal = sum(Quantity * isnull(CatalogPrice,0))
  from @PODetailItems

select @CombinedTotal = sum(Quantity * isnull(BidPrice,0))
  from @PODetailItems podi

select @CatalogBidOnly = sum(Quantity * isnull(CatalogPrice,0))
  from @PODetailItems podi
 where ItemId in (select ItemId 
                    from @PODetailItems
                   where BidItemId is not null
                   group by ItemId)

select @CombinedBidOnly = sum(Quantity * BidPrice)
  from @PODetailItems podi
 where ItemId in (select ItemId 
                    from @PODetailItems
                   where BidItemId is not null
                   group by ItemId)

declare VendorCur cursor fast_forward read_only for
select VendorId from @PODetailItems group by VendorId

open VendorCur

fetch next from VendorCur into @VendorId

while @@fetch_status = 0
begin
  select @CatalogTotal = @CatalogTotal + round((sum(Quantity * CatalogPrice) * isnull(Vendors.ShippingPercentage,0) / 100),2),
         @CombinedTotal = @CombinedTotal + round((sum(Quantity * round(BidPrice,2)) * isnull(Vendors.ShippingPercentage,0) / 100),2)
    from @PODetailItems podi
    join Vendors on Vendors.VendorId = podi.VendorId
   where podi.VendorId = @VendorId
   group by podi.VendorId, Vendors.ShippingPercentage

  select @CatalogBidOnly = @CatalogBidOnly + round((sum(Quantity * CatalogPrice) * isnull(Vendors.ShippingPercentage,0) / 100),2),
         @CombinedBidOnly = @CombinedBidOnly + round((sum(Quantity * round(BidPrice,2)) * isnull(Vendors.ShippingPercentage,0) / 100),2)
    from @PODetailItems podi
    join Vendors on Vendors.VendorId = podi.VendorId
   where podi.VendorId = @VendorId
     and ItemId in (select ItemId 
                      from @PODetailItems
                     where VendorId = @VendorId
                       and BidItemId is not null
                     group by ItemId)
   group by podi.VendorId, Vendors.ShippingPercentage

  fetch next from VendorCur into @VendorId
end

close VendorCur
deallocate VendorCur

select @OverallSavings = @CatalogTotal - @CombinedTotal

select @QuantityNeeded = sum(Quantity)
  from @PODetailItems

select @QuantityUsed = sum(Quantity)
  from @PODetailItems
 where BidItemId is not null

select @QuantityAvailable = sum(Quantity)
  from @PODetailItems podi
  join (select ItemId 
          from @PODetailItems
         where BidItemId is not null
         group by ItemId) ss on ss.ItemId = podi.ItemId

select @TotalTitles = count(ItemId)
  from @PODetailItems
 group by ItemId

select @TotalTitlesBid = count(podi.ItemId)
  from @PODetailItems podi
  join (select ItemId 
          from @PODetailItems
         where BidItemId is not null
         group by ItemId) ss on ss.ItemId = podi.ItemId
 group by podi.ItemId

update @PODetailItems
   set CatalogTotal = @CatalogTotal,
       CombinedTotal = @CombinedTotal,
       CatalogBidOnly = @CatalogBidOnly,
       CombinedBidOnly = @CombinedBidOnly,
       OverallSavings = @OverallSavings,
       TotalBooks = @QuantityNeeded,
       TotalBidBooks = @QuantityAvailable,
       TotalUsedBooks = @QuantityUsed,
       TotalTitles = @TotalTitles,
       TotalTitlesBid = @TotalTitlesBid,
       VendorTotal = ss.VendorTotal + round((ss.VendorTotal * isnull(Vendors.ShippingPercentage,0) / 100),2),
       ShippingPercentage = isnull(Vendors.ShippingPercentage,0)
  from @PODetailItems podi1
  left outer join Vendors on Vendors.VendorId = podi1.VendorId
  left outer join (Select podi.VendorId, sum(Quantity * BidPrice) VendorTotal
                     from @PODetailItems podi 
                    group by podi.VendorId) ss on ss.VendorId = Vendors.VendorId
  left outer join BidItems on BidItems.BidItemId = podi1.BidItemId
  left outer join Bids on Bids.BidId = BidItems.BidId

close ItemCur
deallocate ItemCur

Update @PODetailItems
   set RequestedQuantity = ss.Quantity,
       ItemDescription = Detail.Description
  from @PODetailItems podi
  join Detail on Detail.DetailId = podi.DetailId
  join (select ItemId, sum(Quantity) Quantity from @PODetailItems group by ItemId) ss on ss.ItemId = podi.ItemId

Update @PODetailItems
   set DistrictName = District.Name,
       DistrictId = District.DistrictId,
       SchoolName = School.Name,
       Attention = Requisitions.Attention,
       TextbookPercentage = District.TextbookPercentage / 100,
       TextbookCharge = (District.TextbookPercentage * @OverallSavings) / 100
  from @PODetailItems podi
  join Requisitions on Requisitions.RequisitionId = podi.RequisitionId
  join School on School.SchoolId = Requisitions.SchoolId
  join District on District.DistrictId = School.DistrictId

return
end
```
