# Procedure: `dbo.sp_CreateOrderBookTest`

_Generated on 2026-05-04T13:04:24.107Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CreateOrderBookTest` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2021-06-01 13:11:48 |
| Modified | 2021-06-01 13:11:48 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBidHeaderId` | IN | int |  |
| 2 | `@pAwardId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Awards` | USER_TABLE |  |
| `AwardsCatalogList` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `BidImports` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `BidRequestItems` | USER_TABLE |  |
| `BidResults` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `BidsCatalogList` | USER_TABLE |  |
| `Catalog` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `OrderBookDetail` | USER_TABLE |  |
| `OrderBooks` | USER_TABLE |  |
| `PricePlans` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |
| `dbo.BidItems` | USER_TABLE |  |
| `dbo.Bids` | USER_TABLE |  |
| `dbo.Control` | USER_TABLE |  |
| `dbo.Headings` | USER_TABLE |  |
| `dbo.Items` | USER_TABLE |  |
| `dbo.OrderBookDetail` | USER_TABLE |  |
| `dbo.OrderBooks` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create   procedure [dbo].[sp_CreateOrderBookTest] @pBidHeaderId int, @pAwardId int as
declare @OrderBookId int,
	@ControlYear int,
	@OrderBookType char(1),
	@CategoryType int

--set NOCOUNT ON

select top 1 @ControlYear = isnull(ControlYear,year(getdate()))
  from dbo.Control
 
select @CategoryType = isnull(Category.Type,1)
  from BidHeaders with (nolock)
  join Category on Category.CategoryId = BidHeaders.CategoryId
 where BidHeaders.BidHeaderId = @pBidHeaderId
 
if @CategoryType in (3)
begin
  select CAST(null as int) [@OrderBookId]
  return
end

Update BidItems
set ItemBidType = case BidResults.ItemBidType when 'S' then 'As Specified' when 'C' then 'Compliant' when 'N' then 'Non-Compliant' end
  from BidResults
  join BidImports on BidImports.BidImportId = BidResults.BidImportId
  join Bids on Bids.BidHeaderId = BidImports.BidHeaderId
           and Bids.VendorId = BidImports.VendorId
  join BidItems on BidItems.BidId = Bids.BidId
               and BidItems.ItemId = BidResults.ItemId
 where BidItems.ItemBidType is null
   and Bids.BidHeaderId = @pBidHeaderId

Update BidItems
   set CrossRefId = 
    (select top 1 CrossRefs.CrossRefId
       from BidsCatalogList with (nolock)
       join Catalog on Catalog.CatalogId = BidsCatalogList.CatalogId
       join CrossRefs on CrossRefs.PackedCode = BidItems.PackedVendorItemCode  --case isnull(Catalog.ImportFormat,0) when 3 then substring(dbo.uf_PackCodeCatalog(BidItems.VendorItemCode, Bids.CatalogId),1,5) else dbo.uf_PackCodeCatalog(BidItems.VendorItemCode, BidsCatalogList.CatalogId) end
                     and isnull(CrossRefs.ManufacturorPartNumber,'') = case isnull(Catalog.ImportFormat,1) when 1 then isnull(CrossRefs.ManufacturorPartNumber,'') else BidItems.VendorItemCode end
                     and CrossRefs.CatalogId = BidsCatalogList.CatalogId
                     and CrossRefs.Active = 1
      where BidsCatalogList.BidId = Bids.BidId
      order by Catalog.CatalogYear desc, CrossRefs.CrossRefId desc)
  from BidItems
  join Bids on Bids.BidId = BidItems.BidId
 where isnull(BidItems.CrossRefId,0) = 0
   and Bids.BidHeaderId = @pBidHeaderId

select top 1 @OrderBookId = OrderBookId
  from OrderBooks with (nolock)
 where BidHeaderId = @pBidHeaderId
   and OrderBooks.Active = 1
 order by OrderBookId desc

if @@rowcount = 0
begin
  insert dbo.OrderBooks (PricePlanDescription, Category, CategoryId, PricePlanId, Type, AwardId, BidHeaderId, Active)
    select isnull(PricePlans.Code,'') + ' - ' + isnull(PricePlans.Description,''), isnull(Category.Name,''), Category.CategoryId, PricePlans.PricePlanId, 'O', @pAwardId, @pBidHeaderId, 1
      from BidHeaders with (nolock)
      join Category on Category.CategoryId = BidHeaders.CategoryId
      join PricePlans on PricePlans.PricePlanId = BidHeaders.PricePlanId
     where BidHeaders.BidHeaderId = @pBidHeaderId

  select @OrderBookId = Scope_Identity() --DCH 11/24/2015 @@identity
end

-- Add New Bid Items
insert dbo.OrderBookDetail (OrderBookId, ItemId, Active, Weight, BidItemId, CatalogPage)
  select @OrderBookId, BidItems.ItemId, 1, 0, BidItems.BidItemId, BidItems.PageNo
    from dbo.BidItems with (nolock)
    join dbo.Bids on Bids.BidId = BidItems.BidId
                 and Bids.BidHeaderId = @pBidHeaderId
                 and Bids.Active = 1
    left outer join OrderBookDetail on OrderBookDetail.ItemId = BidItems.ItemId
                                   and OrderBookDetail.OrderBookId = @OrderBookId
   where OrderBookDetail.OrderBookDetailId is null
   group by BidItems.ItemId, BidItems.BidItemId, BidItems.PageNo

-- Update Existing Items Weight, BidItemId and CrossRefId
Update dbo.OrderBookDetail
   set Weight = (select top 1 ((BidRequestItems.RequisitionCount * BidRequestItems.RequisitionCount) + BidRequestItems.BidRequest) from BidRequestItems with (nolock) where BidRequestItems.BidHeaderId = @pBidHeaderId and BidRequestItems.ItemId = OrderBookDetail.ItemId and BidRequestItems.Active = 1 order by BidRequestItems.ItemId desc),
       BidItemId = (select top 1 BidItems.BidItemId from BidItems with (nolock) join Bids on Bids.BidId = BidItems.BidId and Bids.BidHeaderId = @pBidHeaderId and Bids.Active = 1 where BidItems.ItemId = OrderBookDetail.ItemId order by BidItems.BidItemId desc),
       CrossRefId = (select top 1 BidItems.CrossRefId from BidItems with (nolock) join Bids on Bids.BidId = BidItems.BidId and Bids.BidHeaderId = @pBidHeaderId and Bids.Active = 1 where BidItems.ItemId = OrderBookDetail.ItemId order by BidItems.BidItemId desc)

  from OrderBookDetail
 where OrderBookDetail.OrderBookId = @OrderBookId

-- Add Any New Expand All Items
insert dbo.OrderBookDetail (OrderBookId, ItemId, Active, Weight, BidItemId)
  select @OrderBookId, I1.ItemId, 1, 0, null
    from dbo.OrderBookDetail with (nolock)
    join dbo.OrderBooks OrderBooks on OrderBooks.OrderBookId = OrderBookDetail.OrderBookId
    join dbo.Items on Items.ItemId = OrderBookDetail.ItemId
                  and Items.Active = 1
    join dbo.Headings on Headings.HeadingId = Items.HeadingId
                     and Headings.ExpandAll = 1
    join dbo.Items I1 on I1.HeadingId = Headings.HeadingId
                     and I1.Active = 1
    left outer join dbo.OrderBookDetail obd on obd.OrderBookId = OrderBooks.OrderBookId
                                           and obd.ItemId = I1.ItemId
   where OrderBooks.OrderBookId = @OrderBookId
     and obd.OrderBookDetailId is null
     -- DCH Added following Line 11/24/2015
     and I1.ItemId in (select CrossRefs.ItemId 
                         from CrossRefs 
                         join BidsCatalogList on BidsCatalogList.CatalogId = CrossRefs.CatalogId
                         join Bids on Bids.BidHeaderId = OrderBooks.BidHeaderId
                                  and Bids.Active = 1
                        group by CrossRefs.ItemId)
  group by I1.ItemId, Headings.HeadingId, OrderBookDetail.ItemId

-- Remove Duplicates if Any
delete OrderBookdetail
  from OrderBookDetail
 where OrderBookDetail.OrderBookId = @OrderBookId
   and OrderBookDetail.OrderBookDetailId != 
   (select top 1 obd.OrderBookDetailId 
      from OrderBookdetail obd  with (nolock)
     where obd.OrderBookId = OrderBookDetail.OrderBookId
       and obd.ItemId = OrderBookDetail.ItemId
     order by obd.OrderBookdetailId)

-- Refresh Weights
Update OrderBookDetail
   set Weight = (select max(Weight) MaxWeight
                   from dbo.OrderBookDetail obd with (nolock)
                   join Items on Items.ItemId = obd.ItemId
                   join dbo.Items I1 on I1.HeadingId = Items.HeadingId 
                  where obd.OrderBookId = OrderBookDetail.OrderBookId
                    and Items.ItemId = OrderBookDetail.ItemId)
 where OrderBookId = @OrderBookId

-- Get Book Type
select @OrderBookType = Type
  from OrderBooks with (nolock)
 where OrderBookId = @OrderBookId

if @OrderBookType != 'B'
begin
  -- Update Order Book Pricing
  Update OrderBookDetail
     set BidPrice = bp.BidPrice,
   GrossPrice = bp.GrossPrice,
   DiscountRate = bp.DiscountRate,
   CrossRefId = bp.CrossRefId,
   CatalogPage = bp.CatalogPage,
   VendorId = bp.VendorId,
   VendorItemCode = bp.VendorItemCode,
   AwardId = bp.AwardId,
   CatalogId = bp.CatalogId,
   Alternate = bp.Alternate
  from OrderBookDetail
  join OrderBooks on OrderBooks.OrderBookId = OrderBookDetail.OrderBookId
                 and OrderBooks.OrderBookId = @OrderBookId
  outer apply (select top 1 BidPrice, GrossPrice, DiscountRate, BidItemId, CrossRefId, VendorId, CatalogId, CatalogPrice, CatalogPage, PricePlanId, AwardId, VendorItemCode, Alternate
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, null CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock)
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = OrderBooks.BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where Items.ItemId = OrderBookDetail.ItemId
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(case isnull(CrossRefs.DoNotDiscount,0) when 0 then AwardsCatalogList.DiscountRate else 0 end,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, case isnull(CrossRefs.DoNotDiscount,0) when 0 then AwardsCatalogList.DiscountRate else 0 end DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items with (nolock)
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
            join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
            join Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.Active = 1
            join Bids on Bids.BidId = Awards.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = OrderBooks.BidHeaderId
           where Items.ItemId = OrderBookDetail.ItemId
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId) bp

end
else
begin
/*
  Update OrderBookDetail
     set BidPrice = 
   (select top 1 BidPrice
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, null CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock)
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = OrderBooks.BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where Items.ItemId = OrderBookDetail.ItemId
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(case isnull(CrossRefs.DoNotDiscount,0) when 0 then AwardsCatalogList.DiscountRate else 0 end,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, case isnull(CrossRefs.DoNotDiscount,0) when 0 then AwardsCatalogList.DiscountRate else 0 end DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items with (nolock)
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
            join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
            join Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.Active = 1
            join Bids on Bids.BidId = Awards.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = OrderBooks.BidHeaderId
           where Items.ItemId = OrderBookDetail.ItemId
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock)
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where Items.ItemId = OrderBookDetail.ItemId
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
   GrossPrice = 
   (select top 1 GrossPrice
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, null CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock)
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = OrderBooks.BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where Items.ItemId = OrderBookDetail.ItemId
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(case isnull(CrossRefs.DoNotDiscount,0) when 0 then AwardsCatalogList.DiscountRate else 0 end,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, case isnull(CrossRefs.DoNotDiscount,0) when 0 then AwardsCatalogList.DiscountRate else 0 end DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items with (nolock)
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
            join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
            join Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.Active = 1
            join Bids on Bids.BidId = Awards.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = OrderBooks.BidHeaderId
           where Items.ItemId = OrderBookDetail.ItemId
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock)
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where Items.ItemId = OrderBookDetail.ItemId
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
   DiscountRate = 
   (select top 1 DiscountRate
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, null CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock)
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = OrderBooks.BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where Items.ItemId = OrderBookDetail.ItemId
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(case isnull(CrossRefs.DoNotDiscount,0) when 0 then AwardsCatalogList.DiscountRate else 0 end,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, case isnull(CrossRefs.DoNotDiscount,0) when 0 then AwardsCatalogList.DiscountRate else 0 end DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items with (nolock)
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
            join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
            join Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.Active = 1
            join Bids on Bids.BidId = Awards.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = OrderBooks.BidHeaderId
           where Items.ItemId = OrderBookDetail.ItemId
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock)
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where Items.ItemId = OrderBookDetail.ItemId
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
   CatalogPage = 
   (select top 1 CatalogPage
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, null CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock)
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = OrderBooks.BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where Items.ItemId = OrderBookDetail.ItemId
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(case isnull(CrossRefs.DoNotDiscount,0) when 0 then AwardsCatalogList.DiscountRate else 0 end,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, case isnull(CrossRefs.DoNotDiscount,0) when 0 then AwardsCatalogList.DiscountRate else 0 end DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items with (nolock)
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
            join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
            join Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.Active = 1
            join Bids on Bids.BidId = Awards.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = OrderBooks.BidHeaderId
           where Items.ItemId = OrderBookDetail.ItemId
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock)
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where Items.ItemId = OrderBookDetail.ItemId
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
   CatalogYear = 
   (select top 1 CatalogYear
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, null CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock)
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = OrderBooks.BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where Items.ItemId = OrderBookDetail.ItemId
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(case isnull(CrossRefs.DoNotDiscount,0) when 0 then AwardsCatalogList.DiscountRate else 0 end,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, case isnull(CrossRefs.DoNotDiscount,0) when 0 then AwardsCatalogList.DiscountRate else 0 end DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items with (nolock)
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
            join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
            join Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.Active = 1
            join Bids on Bids.BidId = Awards.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = OrderBooks.BidHeaderId
           where Items.ItemId = OrderBookDetail.ItemId
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock)
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where Items.ItemId = OrderBookDetail.ItemId
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
   VendorId = 
   (select top 1 VendorId
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, null CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock)
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = OrderBooks.BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where Items.ItemId = OrderBookDetail.ItemId
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(case isnull(CrossRefs.DoNotDiscount,0) when 0 then AwardsCatalogList.DiscountRate else 0 end,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, case isnull(CrossRefs.DoNotDiscount,0) when 0 then AwardsCatalogList.DiscountRate else 0 end DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items with (nolock)
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
            join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
            join Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.Active = 1
            join Bids on Bids.BidId = Awards.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = OrderBooks.BidHeaderId
           where Items.ItemId = OrderBookDetail.ItemId
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock)
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where Items.ItemId = OrderBookDetail.ItemId
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
   VendorItemCode = 
   (select top 1 VendorItemCode
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, null CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock)
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = OrderBooks.BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where Items.ItemId = OrderBookDetail.ItemId
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(case isnull(CrossRefs.DoNotDiscount,0) when 0 then AwardsCatalogList.DiscountRate else 0 end,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, case isnull(CrossRefs.DoNotDiscount,0) when 0 then AwardsCatalogList.DiscountRate else 0 end DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items with (nolock)
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
            join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
            join Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.Active = 1
            join Bids on Bids.BidId = Awards.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = OrderBooks.BidHeaderId
           where Items.ItemId = OrderBookDetail.ItemId
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock)
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where Items.ItemId = OrderBookDetail.ItemId
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
   AwardId = 
   (select top 1 AwardId
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, null CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock)
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = OrderBooks.BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where Items.ItemId = OrderBookDetail.ItemId
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(case isnull(CrossRefs.DoNotDiscount,0) when 0 then AwardsCatalogList.DiscountRate else 0 end,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, case isnull(CrossRefs.DoNotDiscount,0) when 0 then AwardsCatalogList.DiscountRate else 0 end DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items with (nolock)
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
            join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
            join Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.Active = 1
            join Bids on Bids.BidId = Awards.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = OrderBooks.BidHeaderId
           where Items.ItemId = OrderBookDetail.ItemId
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock)
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where Items.ItemId = OrderBookDetail.ItemId
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
   CatalogId = 
   (select top 1 CatalogId
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, null CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock)
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1

          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = OrderBooks.BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where Items.ItemId = OrderBookDetail.ItemId
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(case isnull(CrossRefs.DoNotDiscount,0) when 0 then AwardsCatalogList.DiscountRate else 0 end,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, case isnull(CrossRefs.DoNotDiscount,0) when 0 then AwardsCatalogList.DiscountRate else 0 end DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items with (nolock)
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
            join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
            join Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.Active = 1
            join Bids on Bids.BidId = Awards.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = OrderBooks.BidHeaderId
           where Items.ItemId = OrderBookDetail.ItemId
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock)
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where Items.ItemId = OrderBookDetail.ItemId
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
)
  from OrderBookDetail
  join OrderBooks on OrderBooks.OrderBookId = OrderBookDetail.OrderBookId
                 and OrderBooks.OrderBookId = @OrderBookId
*/
  Update OrderBookDetail
     set BidPrice = 
   (select top 1 BidPrice
      from (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock)
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
                        and Catalog.Name = 'EDS'
           where Items.ItemId = OrderBookDetail.ItemId
             and Items.Active = 1
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
   GrossPrice = 
   (select top 1 GrossPrice
      from (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock)
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
                        and Catalog.Name = 'EDS'
           where Items.ItemId = OrderBookDetail.ItemId
             and Items.Active = 1
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
   CatalogPage = 
   (select top 1 CatalogPage
      from (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, case isnull(CrossRefs.CatalogYear,'') when Catalog.CatalogYear then CrossRefs.Page else '' end CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock)
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
                        and Catalog.Name = 'EDS'
                        and Catalog.CatalogYear = CrossRefs.CatalogYear
-- Above Line of Code Added 9/17/2004 DCH
           where Items.ItemId = OrderBookDetail.ItemId
             and Items.Active = 1
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
   CatalogYear = 
   (select top 1 CatalogYear
      from (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock)
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
                        and Catalog.Name = 'EDS'
           where Items.ItemId = OrderBookDetail.ItemId
             and Items.Active = 1
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
   VendorId = 
   (select top 1 VendorId
      from (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock)
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
                        and Catalog.Name = 'EDS'
           where Items.ItemId = OrderBookDetail.ItemId
             and Items.Active = 1
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
   VendorItemCode = 
   (select top 1 VendorItemCode
      from (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock)
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
                        and Catalog.Name = 'EDS'
           where Items.ItemId = OrderBookDetail.ItemId
             and Items.Active = 1
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
   AwardId = 
   (select top 1 AwardId
      from (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock)
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
                        and Catalog.Name = 'EDS'
           where Items.ItemId = OrderBookDetail.ItemId
             and Items.Active = 1
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
   CatalogId = 
   (select top 1 CatalogId
      from (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock)
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
                        and Catalog.Name = 'EDS'
                        and Catalog.CatalogYear = CrossRefs.CatalogYear
-- Above Line of Code Added 9/17/2004 DCH
           where Items.ItemId = OrderBookDetail.ItemId
             and Items.Active = 1
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
)
  from OrderBookDetail
  join OrderBooks on OrderBooks.OrderBookId = OrderBookDetail.OrderBookId
                 and OrderBooks.OrderBookId = @OrderBookId
end

-- Set Vendor Info
Update OrderBookDetail
   set VendorCode = Vendors.Code,
       VendorName = Vendors.Name
  from OrderBookDetail
  join Vendors on Vendors.VendorId = OrderBookDetail.VendorId
 where OrderBookDetail.OrderBookId = @OrderBookId

-- Set Vendor Info
Update OrderBookDetail
   set CatalogId = CrossRefs.CatalogId
  from OrderBookDetail
  join CrossRefs on CrossRefs.CrossRefId = OrderBookDetail.CrossRefId
 where OrderBookDetail.OrderBookId = @OrderBookId
   and OrderBookDetail.CatalogId is null

--exec dbo.sp_RebuildOBPricesSingle @OrderBookId

set NOCOUNT off

select @OrderBookId
```
