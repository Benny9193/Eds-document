# Function: table-valued: `dbo.uf_SearchDistrictDetail_Orig`

_Generated on 2026-05-04T13:07:57.714Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_SearchDistrictDetail_Orig` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2008-02-26 19:40:47 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRequisitionId` | IN | int |  |
| 2 | `@pHeadingId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Awards` | USER_TABLE |  |
| `AwardsCatalogList` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Catalog` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `Headings` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `Units` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |
| `dbo.BookTypes` | USER_TABLE |  |
| `dbo.Catalog` | USER_TABLE |  |
| `dbo.Category` | USER_TABLE |  |
| `dbo.Headings` | USER_TABLE |  |
| `dbo.Items` | USER_TABLE |  |
| `dbo.Keywords` | USER_TABLE |  |
| `dbo.Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--select * from dbo.uf_SearchItemsDetail(165939) order by Items_SortSeq
--select * from dbo.uf_SearchItemsDetail(165945) order by Items_SortSeq

create function dbo.uf_SearchDistrictDetail_Orig (@pRequisitionId int, @pHeadingId int) 
returns @LYDistrict table (
BidItems_BidItemId	int null,
Price			money null,
BidItems_Alternate	varchar(512) null,
BidItems_VendorItemCode	varchar(50) null,
ItemBidType		char(1) null,
PageNo			int null,
Items_ItemCode		varchar(50) null,
Items_Description	varchar(1024) null,
Items_HeadingId		int null,
Items_SortSeq		varchar(255) null,
DiscountRate		decimal(9,5) null,
Vendors_Name		varchar(50),
Units_Code		varchar(50),
DetailId		int null,
Quantity		int null,
ItemId			int null,
RequisitionId		int null,
CatalogId		int null,
BidHeaderId		int null,
SortSeq			varchar(255) null,
ItemMustBeBid		tinyint null
)
as
begin

  insert @LYDistrict (ItemId, BidHeaderId)
    select Items.ItemId, (select BidHeaderId from Requisitions with (nolock) where RequisitionId = @pRequisitionId)
      from Requisitions with (nolock)
      join Detail on Detail.RequisitionId = Requisitions.RequisitionId
      join Items on Items.ItemId = Detail.ItemId and Items.CategoryId = Requisitions.CategoryId and Items.Active = 1 left outer join Headings on Headings.HeadingId = Items.HeadingId and Headings.Active = 1 
     where Requisitions.BudgetId = 
      (select top 1 b1.BudgetId FROM Requisitions with (nolock) join Budgets on Budgets.BudgetId = Requisitions.BudgetId join Budgets b1 on b1.DistrictId = Budgets.DistrictId and b1.StartDate <= dateadd(year,-1,Budgets.StartDate) and b1.EndDate >= dateadd(Year,-1,Budgets.EndDate) and b1.Active = 1 WHERE Requisitions.RequisitionId = @pRequisitionId)
       and Requisitions.CategoryId =
      (select top 1 R.CategoryId FROM Requisitions R with (nolock) WHERE R.RequisitionId = @pRequisitionId)
       and isnull(Items.HeadingId,0) = case isnull(@pHeadingId,0) when -1 then isnull(Items.HeadingId,0) else isnull(@pHeadingId,0) end
     group by Items.ItemId, Requisitions.BidHeaderId

  update @LYDistrict
   set CatalogId = 
   (select top 1 CatalogId
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CrossRefId from BidHeaders join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 /*and Catalog.CatalogId = @pCatalogId */join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.ItemId = it.ItemId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.CrossRefId end CrossRefId, 
               Bids.VendorId VendorId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CatalogId from BidHeaders join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 /*and Catalog.CatalogId = @pCatalogId */join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.ItemId = it.ItemId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogId end CatalogId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CatalogPrice from BidHeaders join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 /*and Catalog.CatalogId = @pCatalogId */join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.ItemId = it.ItemId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogPrice end CatalogPrice, 
               BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.Page from BidHeaders join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 /*and Catalog.CatalogId = @pCatalogId */join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.ItemId = it.ItemId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.Page end CatalogPage, 
               BidHeaders.PricePlanId, Awards.AwardId, 
               case isnull(BidItems.VendorItemCode,'') when '' then (select top 1 CrossRefs.VendorItemCode from BidHeaders join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 /*and Catalog.CatalogId = @pCatalogId */join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.ItemId = it.ItemId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.VendorItemCode end VendorItemCode, 
               BidItems.Alternate, 0 ItemMustBeBid
          from Items
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = it.BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items
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
                           and BidHeaders.BidHeaderId = it.BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where items.itemid = it.itemid
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
       Items_ItemCode = (select Items.ItemCode from Items where items.itemid = it.itemid),
       Items_Description = (select case isnull(Category.AllowAddenda,0) 
             when 0 then ''
             else
               case isnull(Headings.HeadingId,0)
                 when 0 then ''
                 else 
                   ltrim(rtrim(isnull(Headings.Title,''))) +
                   case isnull(Keywords.KeywordId,0)
                     when 0 then ''
                     else
                       ' ' + ltrim(rtrim(isnull(Keywords.Keyword,'')))
                   end + char(13) + char(10)
                end 
           end +
           isnull(Items.Description,'') +   
           case Category.Type   
             when 2 then   
               case isnull(ParentCatalogId,0)   
                 when 0 then ''   
                 else char(13) + char(10) + 'Publisher: ' + isnull(Catalog.Name,'')  
               end +   
               case isnull(BookTypes.BookTypeId,0)   
                 when 0 then ''   
                 else char(13) + char(10) + 'Edition: ' + isnull(BookTypes.BookType,'')   
               end +   
               case isnull(Items.CopyrightYear,0)   
                 when 0 then ''   
                 else char(13) + char(10) + 'Copyright Year: ' + isnull(convert(varchar(32),Items.CopyrightYear,101),'None')
               end    
             else   
               case isnull(Category.AllowAddenda,0)   
                 when 0 then ''                         
                 else   
                   case isnull(Items.BrandName,'')  
                     when '' then ''  
                     else char(13) + char(10) + 'Brand Name: ' + isnull(Items.BrandName,'')  
                   end +  
                   case isnull(Items.ManufacturorNumber,'')  
                     when '' then ''  
                     else char(13) + char(10) + 'Manufacturer Number:' + isnull(Items.ManufacturorNumber,'')  
                   end +  
                   case isnull(Items.VendorId,0)  
                     when 0 then ''  
                     else char(13) + char(10) + 'Vendor: ' + isnull(Vendors.Name,'')  
                   end +  
                   case isnull(Items.VendorPartNumber,'')  
                     when '' then ''  
                     else char(13) + char(10) + 'Vendor Part Number: ' + isnull(Items.VendorPartNumber,'')  
                   end +  
                   case isnull(Items.ItemsPerUnit,'')  
                     when '' then ''
                     when '0' then ''  
                     else char(13) + char(10) + 'Items Per Unit: ' + isnull(Items.ItemsPerUnit,'')  
                   end +  
                   case isnull(Items.ExtraDetail,'')  
                     when '' then ''  
                     else char(13) + char(10) +   
                       case isnull(Category.ExtraTitle,'')  
                         when '' then 'Extra Information: '  
                         else isnull(Category.ExtraTitle,'')  
                       end + ' ' + 
                       isnull(Items.ExtraDetail,'')  
                   end  
               end   
           end  
      from dbo.Items 
      join dbo.Category on Category.CategoryId = Items.CategoryId  
      left outer join dbo.Catalog on Catalog.CatalogId = ParentCatalogId  
      left outer join dbo.Headings on Headings.HeadingId = Items.HeadingId  
      left outer join dbo.BookTypes on BookTypes.BookTypeId = Items.EditionId  
      left outer join dbo.Keywords Keywords on Keywords.KeyWordId = Items.KeywordId  
      left outer join dbo.Vendors on Vendors.VendorId = Items.VendorId  
     where items.itemid = it.itemid
       and Items.Active = 1
),
       Units_Code = (select Units.Code from Items join Units on Units.UnitId = Items.UnitId where items.itemid = it.itemid),
       Price =
   isnull((select top 1 BidPrice
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, null CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = it.BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items
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
                           and BidHeaders.BidHeaderId = it.BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where items.itemid = it.itemid
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),0)
  from @LYDistrict it
  join Requisitions on Requisitions.RequisitionId = @pRequisitionId
--  left outer join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId

Update @LYDistrict
   set DiscountRate =
   (select top 1 DiscountRate
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, null CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = it.BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items
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
                           and BidHeaders.BidHeaderId = it.BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where items.itemid = it.itemid
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
       PageNo =
   (select top 1 CatalogPage
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CrossRefId from BidHeaders join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 /*and Catalog.CatalogId = @pCatalogId */join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.ItemId = it.ItemId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.CrossRefId end CrossRefId, 
               Bids.VendorId VendorId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CatalogId from BidHeaders join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 /*and Catalog.CatalogId = @pCatalogId */join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.ItemId = it.ItemId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogId end CatalogId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CatalogPrice from BidHeaders join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 /*and Catalog.CatalogId = @pCatalogId */join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.ItemId = it.ItemId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogPrice end CatalogPrice, 
               BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.Page from BidHeaders join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 /*and Catalog.CatalogId = @pCatalogId */join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.ItemId = it.ItemId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.Page end CatalogPage, 
               BidHeaders.PricePlanId, Awards.AwardId, 
               case isnull(BidItems.VendorItemCode,'') when '' then (select top 1 CrossRefs.VendorItemCode from BidHeaders join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 /*and Catalog.CatalogId = @pCatalogId */join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.ItemId = it.ItemId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.VendorItemCode end VendorItemCode, 
               BidItems.Alternate, 0 ItemMustBeBid
          from Items
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = it.BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, case isnumeric(CrossRefs.Page) when 1 then convert(int,Crossrefs.Page) else 0 end CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items
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
                           and BidHeaders.BidHeaderId = it.BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, case isnumeric(CrossRefs.Page) when 1 then convert(int,Crossrefs.Page) else 0 end CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where items.itemid = it.itemid
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
       Vendors_Name =
   (select top 1 Vendors_Name
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, null CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid, Vendors.Name Vendors_Name
          from Items
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join Vendors on Vendors.VendorId = Awards.VendorId
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = it.BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid, Vendors.Name Vendors_Name
            from Items
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
            join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
            join Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.Active = 1
            join Vendors on Vendors.VendorId = Awards.VendorId
            join Bids on Bids.BidId = Awards.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = it.BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid, 'Not Yet Bid' Vendors_Name
            from Items
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where items.itemid = it.itemid
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
       BidItems_VendorItemCode =
   (select top 1 VendorItemCode
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CrossRefId from BidHeaders join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 /*and Catalog.CatalogId = @pCatalogId */join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.ItemId = it.ItemId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.CrossRefId end CrossRefId, 
               Bids.VendorId VendorId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CatalogId from BidHeaders join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 /*and Catalog.CatalogId = @pCatalogId */join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.ItemId = it.ItemId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogId end CatalogId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CatalogPrice from BidHeaders join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 /*and Catalog.CatalogId = @pCatalogId */join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.ItemId = it.ItemId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogPrice end CatalogPrice, 
               BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.Page from BidHeaders join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 /*and Catalog.CatalogId = @pCatalogId */join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.ItemId = it.ItemId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.Page end CatalogPage, 
               BidHeaders.PricePlanId, Awards.AwardId, 
               case isnull(BidItems.VendorItemCode,'') when '' then (select top 1 CrossRefs.VendorItemCode from BidHeaders join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 /*and Catalog.CatalogId = @pCatalogId */join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.ItemId = it.ItemId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.VendorItemCode end VendorItemCode, 
               BidItems.Alternate, 0 ItemMustBeBid
          from Items
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = it.BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items
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
                           and BidHeaders.BidHeaderId = it.BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where items.itemid = it.itemid
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
       BidItems_Alternate =
   (select top 1 Alternate
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, null CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = it.BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items
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
                           and BidHeaders.BidHeaderId = it.BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where items.itemid = it.itemid
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
       BidItems_BidItemId =
   (select top 1 BidItemId
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, null CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = it.BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items
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
                           and BidHeaders.BidHeaderId = it.BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where items.itemid = it.itemid
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
       ItemMustBeBid =
   (select top 1 ItemMustBeBid
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, null CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = it.BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Bids.VendorId VendorId, CrossRefs.CatalogId, CrossRefs.CatalogPrice CatalogPrice, CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, CrossRefs.VendorItemCode, null Alternate, 0 ItemMustBeBid
            from Items
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
                           and BidHeaders.BidHeaderId = it.BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where items.itemid = it.itemid
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),
 SortSeq = (select SortSeq from Items where Items.ItemId = it.ItemId)
  from @LYDistrict it
  join Requisitions on Requisitions.RequisitionId = @pRequisitionId
--  left outer join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId

  update @LYDistrict
     set Quantity = Detail.Quantity,
         DetailId = Detail.DetailId
    from @LYDistrict lyd
    join Detail on Detail.RequisitionId = @pRequisitionId
               and Detail.ItemId = lyd.ItemId

return
end
```
