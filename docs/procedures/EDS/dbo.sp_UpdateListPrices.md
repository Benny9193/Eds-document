# Procedure: `dbo.sp_UpdateListPrices`

_Generated on 2026-05-04T13:43:18.927Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_UpdateListPrices` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2009-09-16 16:26:16 |
| Modified | 2012-10-11 11:22:32 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pCategoryId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `BidsCatalogList` | USER_TABLE |  |
| `Catalog` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `Items` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_UpdateListPrices] @pCategoryId int
as
declare @IncreasePct float

	select @IncreasePct = .1

Update CrossRefs
   set GrossPrice = case isnull(xr1.DoNotDiscount,0) when 0 then round(xr1.GrossPrice - round(xr1.GrossPrice * (BidsCatalogList.DiscountRate / 100),2),2) else xr1.GrossPrice end + round(case isnull(xr1.DoNotDiscount,0) when 0 then round(xr1.GrossPrice - round(xr1.GrossPrice * (BidsCatalogList.DiscountRate / 100),2),2) else xr1.GrossPrice end * @IncreasePct,2),
       CatalogPrice = xr1.CatalogPrice + round(xr1.CatalogPrice * @IncreasePct,2),
       DateUpdated = GETDATE()
  from CrossRefs
  join CrossRefs xr1 on xr1.CrossRefId = 
    (select Top 1 CrossRefId
       from CrossRefs xr2 with (nolock)
       join BidsCatalogList bcl on bcl.CatalogId = xr2.CatalogId
       join Bids b on b.BidId = bcl.BidId
                  and b.Active = 1
                  and isnull(b.VendorId,0) not IN (0, 7691)
       join BidHeaders bh on bh.BidHeaderId = b.BidHeaderId
                         and bh.EffectiveFrom between DATEADD(year,-1,getdate()) and GETDATE()
                         and bh.EffectiveUntil between DATEADD(month,-6,getdate()) and dateadd(month,6,GETDATE())
                         and bh.Active = 1
      where xr2.ItemId = CrossRefs.ItemId
        and xr2.GrossPrice not between 9999 and 9999.99
      order by case isnull(xr2.DoNotDiscount,0) when 0 then xr2.GrossPrice - round(xr2.GrossPrice * (bcl.DiscountRate / 100),2) else xr2.GrossPrice end)
  join BidsCatalogList on BidsCatalogList.CatalogId =
    (select Top 1 bcl.BidCatalogId
       from CrossRefs xr2 with (nolock)
       join BidsCatalogList bcl on bcl.CatalogId = xr2.CatalogId
       join Bids b on b.BidId = bcl.BidId
                  and b.Active = 1
                  and isnull(b.VendorId,0) not IN (0, 7691)
       join BidHeaders bh on bh.BidHeaderId = b.BidHeaderId
                         and bh.EffectiveFrom between DATEADD(year,-1,getdate()) and GETDATE()
                         and bh.EffectiveUntil between DATEADD(month,-6,getdate()) and dateadd(month,6,GETDATE())
                         and bh.Active = 1
      where xr2.CrossRefId = xr1.CrossRefId)
  join Bids on Bids.BidId = BidsCatalogList.BidId
  join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
  join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
              and Catalog.Name = 'EDS'
              and Catalog.Active = 1
  join Items on Items.ItemId = CrossRefs.ItemId
            and Items.Active = 1
            and Items.CategoryId = @pCategoryId

/*
Update Items
   set ListPrice = CrossRefs.GrossPrice,
       ListPriceSource = CrossRefs.CrossRefId
  from Items
  join CrossRefs on CrossRefs.ItemId = Items.ItemId
  join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
              and Catalog.Name = 'EDS'
              and Catalog.Active = 1
 where Items.Active = 1
   and Items.CategoryId = @pCategoryId
   and isnull(CrossRefs.GrossPrice,0) != 0
   and isnull(Items.ListPrice,0) != CrossRefs.GrossPrice
*/   
Update CrossRefs
   set GrossPrice = round(BidItems.Price - round(BidItems.Price * (Bids.BidDiscountRate / 100),2),2) + round((BidItems.Price - round(BidItems.Price * (Bids.BidDiscountRate / 100),2)) * @IncreasePct,2),
       CatalogPrice = round(BidItems.Price - round(BidItems.Price * (Bids.BidDiscountRate / 100),2),2) + round((BidItems.Price - round(BidItems.Price * (Bids.BidDiscountRate / 100),2)) * @IncreasePct,2),
       DateUpdated = GETDATE()
  from CrossRefs
  join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
              and Catalog.Name = 'EDS'
              and Catalog.Active = 1
  join BidItems on BidItems.BidItemId = 
    (select Top 1 BidItemId
       from BidItems bi with (nolock)
       join Bids b on b.BidId = bi.BidId
                  and b.Active = 1
                  and isnull(b.VendorId,0) not IN (0, 7691)
       join BidHeaders bh on bh.BidHeaderId = b.BidHeaderId
                         and bh.EffectiveFrom between DATEADD(year,-1,getdate()) and GETDATE()
                         and bh.EffectiveUntil between DATEADD(month,-6,getdate()) and dateadd(month,6,GETDATE())
                         and bh.Active = 1
      where bi.ItemId = CrossRefs.ItemId
/*        and (isnull(CrossRefs.GrossPrice,0) = 0
             Or (select COUNT(*)
                   from BidRequestItems bri2 with (nolock)
                   join BidHeaders bh2 on bh2.BidHeaderId = bri2.BidHeaderId
                                      and bh2.EffectiveFrom between DATEADD(month,-18,getdate()) and dateadd(month,-6,GETDATE())
                                      and bh2.EffectiveUntil between DATEADD(month,-18,getdate()) and dateadd(month,-6,GETDATE())
--                                      and bh2.EffectiveFrom between CAST('11/01/2010' as datetime) and CAST('12/01/2011' as datetime)
--                                      and bh2.EffectiveUntil between CAST('11/01/2010' as datetime) and CAST('12/01/2012' as datetime)
                                      and bh2.Active = 1
                  where bri2.ItemId = bi.ItemId) = 
                (select count(*)
                   from BidHeaders bh3 with (nolock)
                  where bh3.CategoryId = bh.CategoryId
                    and bh3.BidType = 1
                    and bh3.EffectiveFrom between DATEADD(year,-1,getdate()) and GETDATE()
                    and bh3.EffectiveUntil between DATEADD(month,-6,getdate()) and dateadd(month,6,GETDATE())
--                    and bh3.EffectiveFrom between CAST('12/01/2011' as datetime) and CAST('12/01/2012' as datetime)
--                    and bh3.EffectiveUntil between CAST('12/01/2011' as datetime) and CAST('12/01/2012' as datetime)
                    and bh3.Active = 1))*/
      order by bh.BidHeaderId desc) 
  join Bids on Bids.BidId = BidItems.BidId
  join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
  join Items on Items.ItemId = CrossRefs.ItemId
            and Items.Active = 1
            and Items.CategoryId = @pCategoryId
            
Update Items
   set ListPrice = CrossRefs.GrossPrice,
       ListPriceSource = CrossRefs.CrossRefId
  from Items
  join CrossRefs on CrossRefs.ItemId = Items.ItemId
  join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
              and Catalog.Name = 'EDS'
              and Catalog.Active = 1
 where Items.Active = 1
   and Items.CategoryId = @pCategoryId
   and isnull(CrossRefs.GrossPrice,0) != 0
   and isnull(Items.ListPrice,0) != CrossRefs.GrossPrice

/*
Update Items
   set ListPrice = round(BidItems.Price - round(BidItems.Price * (Bids.BidDiscountRate / 100),2),2) + round((BidItems.Price - round(BidItems.Price * (Bids.BidDiscountRate / 100),2)) * @IncreasePct,2),
       ListPriceSource = BidItems.BidItemId
  from Items
  join BidItems on BidItems.BidItemId = 
    (select Top 1 BidItemId
       from BidItems bi with (nolock)
       join Bids b on b.BidId = bi.BidId
                  and b.Active = 1
                  and isnull(b.VendorId,0) not IN (0, 7691)
       join BidHeaders bh on bh.BidHeaderId = b.BidHeaderId
                         and bh.EffectiveFrom between CAST('11/01/2009' as datetime) and CAST('11/01/2010' as datetime)
                         and bh.EffectiveUntil between CAST('11/01/2009' as datetime) and CAST('11/01/2011' as datetime)
                         and bh.Active = 1
      where bi.ItemId = Items.ItemId
        and (select COUNT(*)
               from BidRequestItems bri2 with (nolock)
               join BidHeaders bh2 on bh2.BidHeaderId = bri2.BidHeaderId
                                  and bh2.EffectiveFrom between CAST('11/01/2009' as datetime) and CAST('11/01/2010' as datetime)
                                  and bh2.EffectiveUntil between CAST('11/01/2009' as datetime) and CAST('11/01/2011' as datetime)
                                  and bh2.Active = 1
              where bri2.ItemId = bi.ItemId) = 
            (select count(*)
               from BidHeaders bh3 with (nolock)
              where bh3.CategoryId = bh.CategoryId
                and bh3.BidType = 1
                and bh3.EffectiveFrom between CAST('11/01/2009' as datetime) and CAST('11/01/2010' as datetime)
                and bh3.EffectiveUntil between CAST('11/01/2009' as datetime) and CAST('11/01/2011' as datetime)
                and bh3.Active = 1)
      order by bh.BidHeaderId desc)
    --(select Top 1 BidItemId
    --   from BidItems bi with (nolock)
    --   join Bids b on b.BidId = bi.BidId
    --              and b.Active = 1
    --              and isnull(b.VendorId,0) not IN (0, 7691)
    --   join BidHeaders bh on bh.BidHeaderId = b.BidHeaderId
    --                     and bh.EffectiveFrom between CAST('11/01/2009' as datetime) and CAST('11/01/2010' as datetime)
    --                     and bh.EffectiveUntil between CAST('11/01/2009' as datetime) and CAST('11/01/2011' as datetime)
    --                     and bh.Active = 1
    --  where bi.ItemId = Items.ItemId
    --  order by bh.BidHeaderId desc)

  join Bids on Bids.BidId = BidItems.BidId
  join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
 where Items.Active = 1
   and Items.CategoryId = @pCategoryId
*/
```
