# Procedure: `dbo.sp_BidCompareDiscount`

_Generated on 2026-05-04T14:49:07.214Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_BidCompareDiscount` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2004-09-07 14:40:30 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBidOld` | IN | int |  |
| 2 | `@pBidNew` | IN | int |  |
| 3 | `@pDiscountRate` | IN | varchar(255) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Awards` | USER_TABLE |  |
| `AwardsCatalogList` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `BidRequestItems` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `Catalog` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `dbo.uf_ItemDescription` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_SetSortSeq` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
/*
Z2 This vs Last Year Cascade vs SS Catalog less 20% this year

Order Book Z2

select * from PricePlans

select * 
  from BidHeaders 
  join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId 
 where PricePlanId = 9
 order by BidHeaders.BidHeaderId

sp_BidCompareDiscount 366, 921, '20'
sp_BidCompareDiscount 371, 961, '0'

Update BidImports
   set Active = 1
 where BidImportId in (4003, 4004)

select * from Vendors where VendorId = 21

*/
CREATE procedure dbo.sp_BidCompareDiscount @pBidOld int, @pBidNew int, @pDiscountRate varchar(255) as

declare @DiscountRate decimal(9,5)

select @DiscountRate = convert(decimal(9,5),@pDiscountRate)

select bh1.BidHeaderId,
       i1.ItemId,
       i1.ItemCode,
       dbo.uf_ItemDescription(i1.ItemId) Description,
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
                         and BidHeaders.BidHeaderId = bh1.BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where Items.ItemId = I1.ItemId
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
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
                           and BidHeaders.BidHeaderId = bh1.BidHeaderId
           where Items.ItemId = I1.ItemId
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
) BidPrice,
       
   (select top 1 CatalogPrice
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CrossRefId from BidHeaders join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 join CrossRefs on CrossRefs.ItemId = Items.ItemId and CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.CrossRefId end CrossRefId, 
               Bids.VendorId VendorId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CatalogId from BidHeaders join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 join CrossRefs on CrossRefs.ItemId = Items.ItemId and CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogId end CatalogId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CatalogPrice from BidHeaders join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 join CrossRefs on CrossRefs.ItemId = Items.ItemId and CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogPrice end CatalogPrice, 
               BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.Page from BidHeaders join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 join CrossRefs on CrossRefs.ItemId = Items.ItemId and CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.Page end CatalogPage, 
               BidHeaders.PricePlanId, Awards.AwardId, 
               case isnull(BidItems.VendorItemCode,'') when '' then (select top 1 CrossRefs.VendorItemCode from BidHeaders join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 join CrossRefs on CrossRefs.ItemId = Items.ItemId and CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.VendorItemCode end VendorItemCode, 
               BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock)
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = bh1.BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where Items.ItemId = I1.ItemId
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
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
                           and BidHeaders.BidHeaderId = bh1.BidHeaderId
           where Items.ItemId = I1.ItemId
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
) CatalogPrice,
       
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
                         and BidHeaders.BidHeaderId = bh1.BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where Items.ItemId = I1.ItemId
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
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
                           and BidHeaders.BidHeaderId = bh1.BidHeaderId
           where Items.ItemId = I1.ItemId
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
) GrossPrice,
       
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
                         and BidHeaders.BidHeaderId = bh1.BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where Items.ItemId = I1.ItemId
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
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
                           and BidHeaders.BidHeaderId = bh1.BidHeaderId
           where Items.ItemId = I1.ItemId
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
) DiscountRate,

   (select top 1 VendorItemCode
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CrossRefId from BidHeaders join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 join CrossRefs on CrossRefs.ItemId = Items.ItemId and CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.CrossRefId end CrossRefId, 
               Bids.VendorId VendorId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CatalogId from BidHeaders join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 join CrossRefs on CrossRefs.ItemId = Items.ItemId and CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogId end CatalogId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CatalogPrice from BidHeaders join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 join CrossRefs on CrossRefs.ItemId = Items.ItemId and CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogPrice end CatalogPrice, 
               BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.Page from BidHeaders join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 join CrossRefs on CrossRefs.ItemId = Items.ItemId and CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.Page end CatalogPage, 
               BidHeaders.PricePlanId, Awards.AwardId, 
               case isnull(BidItems.VendorItemCode,'') when '' then (select top 1 CrossRefs.VendorItemCode from BidHeaders join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 join CrossRefs on CrossRefs.ItemId = Items.ItemId and CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.VendorItemCode end VendorItemCode, 
               BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock)
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = bh1.BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where Items.ItemId = I1.ItemId
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
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
                           and BidHeaders.BidHeaderId = bh1.BidHeaderId
           where Items.ItemId = I1.ItemId
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
) VendorItemCode,
       
   (select top 1 Alternate
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
                         and BidHeaders.BidHeaderId = bh1.BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where Items.ItemId = I1.ItemId
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
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
                           and BidHeaders.BidHeaderId = bh1.BidHeaderId
           where Items.ItemId = I1.ItemId
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
) Alternate,
       
   (select top 1 BidItemId
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
                         and BidHeaders.BidHeaderId = bh1.BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where Items.ItemId = I1.ItemId
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
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
                           and BidHeaders.BidHeaderId = bh1.BidHeaderId
           where Items.ItemId = I1.ItemId
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
) BidItemId,
  BRI.BidRequest
  into #BidComp
  from BidHeaders bh1
  join BidRequestItems BRI on bri.BidHeaderId = bh1.BidHeaderId
                          and bri.active = 1
  join Items I1 on I1.ItemId = BRI.ItemId
 where bh1.BidHeaderId in (@pBidOld, @pBidNew)

Update #BidComp
   set BidPrice = round(BidPrice - ((BidPrice * @DiscountRate) / 100),2),
       DiscountRate = @DiscountRate
 where BidHeaderId = @pBidNew

select bn.ItemCode, bn.Description, isnull(bo.BidPrice,0) OldPrice, isnull(bn.BidPrice,0) NewPrice, isnull(bn.BidPrice,0) - isnull(bo.BidPrice,0) Diff, isnull(bn.BidRequest,0) BidRequest, isnull(bn.BidRequest,0) * (isnull(bn.BidPrice,0) - isnull(bo.BidPrice,0)) Extended, bo.BidHeaderId OldBid, bn.BidheaderId NewBid, bn.DiscountRate
  from #BidComp bn
  left outer join #BidComp bo on bo.BidHeaderId = @pBidOld
                             and bo.ItemId = bn.ItemId
 where bn.BidHeaderId = @pBidNew
   and isnull(bo.BidPrice,0) != 0
   and isnull(bn.BidPrice,0) != 0
 order by dbo.uf_SetSortSeq(bn.ItemCode)

drop table #BidComp
```
