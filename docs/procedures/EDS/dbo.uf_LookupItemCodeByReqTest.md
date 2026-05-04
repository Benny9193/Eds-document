# Function: table-valued: `dbo.uf_LookupItemCodeByReqTest`

_Generated on 2026-05-04T13:43:19.027Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_LookupItemCodeByReqTest` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2012-03-08 21:13:04 |
| Modified | 2012-03-08 21:13:04 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRequisitionId` | IN | int |  |
| 2 | `@pItemCode` | IN | varchar(255) |  |
| 3 | `@pCatalogId` | IN | int |  |

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
| `DistrictCategories` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `Units` | USER_TABLE |  |
| `dbo.BookTypes` | USER_TABLE |  |
| `dbo.Catalog` | USER_TABLE |  |
| `dbo.Category` | USER_TABLE |  |
| `dbo.Headings` | USER_TABLE |  |
| `dbo.Items` | USER_TABLE |  |
| `dbo.Keywords` | USER_TABLE |  |
| `dbo.uf_PackCode` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_PackCodeCatalog` | SQL_SCALAR_FUNCTION |  |
| `dbo.Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create  function [dbo].[uf_LookupItemCodeByReqTest] (@pRequisitionId int, @pItemCode varchar(255), @pCatalogId int)
returns @ItemTable table (
ItemId		int null,
CrossRefId	int null,
CrossRefIdBid	int null,
BidPrice	money null,
GrossPrice	money null,
CatalogPrice	money null,
AwardId		int null,
VendorId	int null,
PricePlanId	int null,
CatalogId	int null,
VendorItemCode	varchar(50) null,
Alternate       varchar(1024) null,
BidItemId	int null,
ParentCatalogId int null,
ItemCode	varchar(50) null,
Description	varchar(1024) null,
UnitId		int null,
UnitCode	varchar(16) null,
PriceId		int null,
Page		varchar(16) null,
CatalogYear     char(02) null,
DiscountRate	decimal(9,5) null,
Name		varchar(255) null,
VendorName	varchar(255) null,
CategoryId	int null,
PackedItemCode	varchar(50) null,
PackedVendorItemCode varchar(50) null,
ItemCount	int null,
ItemMustBeBid	int null,
PriceType	int null,
ItemBidType		int null,
SortSeq		varchar(255) null,
StandardItem char(1) null
)
 
as
begin
declare @CrossRefId int,
	@CrossRefIdBid int,	
	@PricePlanId int,
	@DistrictId int,
	@CatalogId int,
	@ItemId int,
	@BidItemId int,
	@AwardId int,
	@CategoryId int,
	@ItemCount int,
	@BidHeaderId int,
	@ItemCode varchar(50),
	@DropSeq varchar(16)

  select @CategoryId = isnull(Requisitions.CategoryId,0),
         @BidHeaderId = isnull(Requisitions.BidHeaderId,0),
         @DistrictId = isnull(Budgets.DistrictId,0)
    from Requisitions with (nolock) 
    left outer join Budgets on Budgets.BudgetId = Requisitions.BudgetId
   where RequisitionId = @pRequisitionId

  Select @CatalogId = isnull(@pCatalogId,0)

  if @CatalogId != 0
  begin
    select @ItemCode = dbo.uf_PackCodeCatalog(@pItemCode, @CatalogId)

    insert @ItemTable ([ItemId] )
    select CD.ItemId 
      from (
        select Items.ItemId
          from Items with (nolock) 
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = @BidHeaderId
          join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
                        and CrossRefs.PackedCode = @ItemCode
                        and CrossRefs.Active = 1
                        and CrossRefs.CatalogId = @pCatalogId
         where Items.Active = 1
           and isnull(Items.DistrictId,0) = case isnull(Items.DistrictId,0) when 0 then 0 else @DistrictId end
        union (
          select Items.ItemId 
            from Items with (nolock) 
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join BidItems on BidItems.ItemId = Items.ItemId
                         and BidItems.PackedVendorItemCode = @ItemCode
            join Bids on Bids.BidId = BidItems.BidId
                     and Bids.Active = 1
            join Awards on Awards.BidId = Bids.BidId
                       and Awards.Active = 1
            join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId
            join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId
                        and Catalog.Active = 1
                        and Catalog.CatalogId = @pCatalogId
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = @BidHeaderId
            left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
           where Items.Active = 1
             and isnull(Items.DistrictId,0) = case isnull(Items.DistrictId,0) when 0 then 0 else @DistrictId end
              )
        union (
          select Items.ItemId 
            from Items with (nolock) 
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.PackedCode = @ItemCode
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
-- DCH Added Line Below 1/10/2005
                        and Catalog.CatalogId = @pCatalogId
            join AwardsCatalogList on AwardsCatalogList.CatalogId = Catalog.CatalogId
            join Awards on Awards.AwardId = AwardsCatalogList.AwardId
                       and Awards.Active = 1
            join Bids on Bids.BidId = Awards.BidId
                     and Bids.Active = 1
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where Items.Active = 1
             and isnull(Items.DistrictId,0) = case isnull(Items.DistrictId,0) when 0 then 0 else @DistrictId end
              )
        union (
          select Items.ItemId 
            from Items with (nolock) 
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.PackedCode = @ItemCode
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
-- DCH Added Line Below 1/10/2005
                        and Catalog.CatalogId = @pCatalogId
            join DistrictCategories on DistrictCategories.DistrictId = @DistrictId
                                   and DistrictCategories.CategoryId = @CategoryId
                                   and DistrictCategories.CategoryId = Items.CategoryId
                                   and DistrictCategories.Active = 1
                                   and DistrictCategories.AllowAddenda = 1
           where Items.Active = 1
             and isnull(Items.DistrictId,0) = case isnull(Items.DistrictId,0) when 0 then 0 else @DistrictId end
              )
           ) CD 
      join Items I1 on I1.ItemId = CD.ItemId
     group by CD.ItemId
  end
  else
  begin
    select @ItemCode = dbo.uf_PackCode(@pItemCode)

    insert @ItemTable ([ItemId])
    select CD.ItemId 
      from (
        select Items.ItemId 
          from Items with (nolock) 
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where Items.PackedCode = @ItemCode
           and Items.Active = 1
           and isnull(Items.DistrictId,0) = case isnull(Items.DistrictId,0) when 0 then 0 else @DistrictId end
        union (
          select Items.ItemId 
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
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where Items.PackedCode = @ItemCode
             and Items.Active = 1
             and isnull(Items.DistrictId,0) = case isnull(Items.DistrictId,0) when 0 then 0 else @DistrictId end
              )
        union (
          select Items.ItemId 
            from Items with (nolock) 
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
            join DistrictCategories on DistrictCategories.DistrictId = @DistrictId
                                   and DistrictCategories.CategoryId = @CategoryId
                                   and DistrictCategories.CategoryId = Items.CategoryId
                                   and DistrictCategories.Active = 1
                                   and DistrictCategories.AllowAddenda = 1
           where Items.PackedCode = @ItemCode
             and Items.Active = 1
             and isnull(Items.DistrictId,0) = case isnull(Items.DistrictId,0) when 0 then 0 else @DistrictId end
              )
           ) CD 
      join Items I1 on I1.ItemId = CD.ItemId
     group by CD.ItemId
  end

Update @ItemTable
   set CatalogId = 
   (select top 1 CatalogId
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CrossRefId from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.CrossRefId end CrossRefId, 
               Bids.VendorId VendorId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CatalogId from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogId end CatalogId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CatalogPrice from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogPrice end CatalogPrice, 
               BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.Page from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.Page end CatalogPage, 
               BidHeaders.PricePlanId, Awards.AwardId, 
               case isnull(BidItems.VendorItemCode,'') when '' then (select top 1 CrossRefs.VendorItemCode from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.VendorItemCode end VendorItemCode, 
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
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
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
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock) 
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
       ItemCode = (select Items.ItemCode from Items with (nolock) where items.itemid = it.itemid),
       Description = (select case isnull(Category.AllowAddenda,0) 
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
      from dbo.Items with (nolock) 
      join dbo.Category on Category.CategoryId = Items.CategoryId  
      left outer join dbo.Catalog on Catalog.CatalogId = ParentCatalogId  
      left outer join dbo.Headings on Headings.HeadingId = Items.HeadingId  
      left outer join dbo.BookTypes on BookTypes.BookTypeId = Items.EditionId  
      left outer join dbo.Keywords Keywords on Keywords.KeyWordId = Items.KeywordId  
      left outer join dbo.Vendors on Vendors.VendorId = Items.VendorId  
     where items.itemid = it.itemid
       and Items.Active = 1
),
       UnitId = (select Items.UnitId from Items with (nolock) where items.itemid = it.itemid),
       UnitCode = (select Units.Code from Items with (nolock) join Units on Units.UnitId = Items.UnitId where items.itemid = it.itemid),
       BidPrice =
   isnull((select top 1 BidPrice
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
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
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
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock)
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
  from @ItemTable it
  left outer join BidHeaders on BidHeaders.BidHeaderId = @BidHeaderId

  Update @ItemTable
   set CrossRefId =
   (select top 1 CrossRefId
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CrossRefId from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.CrossRefId end CrossRefId, 
               Bids.VendorId VendorId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CatalogId from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogId end CatalogId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CatalogPrice from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogPrice end CatalogPrice, 
               BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.Page from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.Page end CatalogPage, 
               BidHeaders.PricePlanId, Awards.AwardId, 
               case isnull(BidItems.VendorItemCode,'') when '' then (select top 1 CrossRefs.VendorItemCode from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.VendorItemCode end VendorItemCode, 
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
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
           and Items.Active = 1
        union (
          select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, 
                 case isnull(BidItems.CrossRefId,0) when 0 then (select top 1 CrossRefs.CrossRefId from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 where BidHeaders.BidHeaderId = @BidHeaderId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.CrossRefId end CrossRefId, 
                 Bids.VendorId VendorId, 
                 case isnull(CrossRefs.CatalogId,0) when 0 then (select top 1 CrossRefs.CatalogId from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 where BidHeaders.BidHeaderId = @BidHeaderId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogId end CatalogId, 
                 case isnull(CrossRefs.CatalogPrice,0) when 0 then (select top 1 CrossRefs.CatalogPrice from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 where BidHeaders.BidHeaderId = @BidHeaderId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogPrice end CatalogPrice, 
                 BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, 
                 case isnull(CrossRefs.Page,'') when '' then (select top 1 CrossRefs.Page from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 where BidHeaders.BidHeaderId = @BidHeaderId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.Page end CatalogPage, 
                 BidHeaders.PricePlanId, Awards.AwardId, 
                 case isnull(BidItems.VendorItemCode,'') when '' then (select top 1 CrossRefs.VendorItemCode from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 where BidHeaders.BidHeaderId = @BidHeaderId order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.VendorItemCode end VendorItemCode, 
                 BidItems.Alternate, 0 ItemMustBeBid
            from Items with (nolock)
            join Category on Category.CategoryId = Items.CategoryId
                         and Category.Type = 1
            join BidItems on BidItems.ItemId = Items.ItemId
                         and BidItems.PackedVendorItemCode = @ItemCode
            join Bids on Bids.BidId = BidItems.BidId
                     and Bids.Active = 1
            join Awards on Awards.BidId = Bids.BidId
                       and Awards.Active = 1
            join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId
            join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId
                        and Catalog.Active = 1
                        and Catalog.CatalogId = @pCatalogId
            join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                           and BidHeaders.BidHeaderId = @BidHeaderId
            left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, 
                 CrossRefs.CrossRefId CrossRefId, 
                 Bids.VendorId VendorId, 
                 CrossRefs.CatalogId, 
                 CrossRefs.CatalogPrice CatalogPrice, 
                 CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, 
                 CrossRefs.Page CatalogPage, 
                 BidHeaders.PricePlanId, Awards.AwardId, 
                 CrossRefs.VendorItemCode, 
                 null Alternate, 0 ItemMustBeBid
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
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, 
                 CrossRefs.CrossRefId CrossRefId, 
                 Catalog.VendorId VendorId, 
                 CrossRefs.CatalogId, 
                 round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, 
                 round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, 
                 CrossRefs.Page CatalogPage, 
                 null PricePlanId, null AwardId, 
                 CrossRefs.VendorItemCode, 
                 null Alternate, 1 ItemMustBeBid
            from Items with (nolock)
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where items.itemid = it.itemid
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
)
  from @ItemTable it 
  left outer join BidHeaders on BidHeaders.BidHeaderId = @BidHeaderId


Update @ItemTable
   set CatalogPrice =
   (select top 1 CatalogPrice
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CrossRefId from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.CrossRefId end CrossRefId, 
               Bids.VendorId VendorId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CatalogId from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogId end CatalogId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CatalogPrice from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogPrice end CatalogPrice, 
               BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.Page from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.Page end CatalogPage, 
               BidHeaders.PricePlanId, Awards.AwardId, 
               case isnull(BidItems.VendorItemCode,'') when '' then (select top 1 CrossRefs.VendorItemCode from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.VendorItemCode end VendorItemCode, 
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
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
           and Items.Active = 1
        union (
          select 0 IB, round(isnull(CrossRefs.GrossPrice,0) - round((isnull(AwardsCatalogList.DiscountRate,0) * isnull(CrossRefs.GrossPrice,0)) / 100,2),2) BidPrice, null BidItemId, 
                 CrossRefs.CrossRefId CrossRefId, 
                 Bids.VendorId VendorId, 
                 CrossRefs.CatalogId, 
                 CrossRefs.CatalogPrice CatalogPrice, 
                 CrossRefs.GrossPrice GrossPrice, AwardsCatalogList.DiscountRate DiscountRate, 
                 CrossRefs.Page CatalogPage, 
                 BidHeaders.PricePlanId, Awards.AwardId, 
                 CrossRefs.VendorItemCode, 
                 null Alternate, 0 ItemMustBeBid
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
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, 
                 CrossRefs.CrossRefId CrossRefId, 
                 Catalog.VendorId VendorId, 
                 CrossRefs.CatalogId, 
                 round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, 
                 round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, 
                 CrossRefs.Page CatalogPage, 
                 null PricePlanId, null AwardId, 
                 CrossRefs.VendorItemCode, 
                 null Alternate, 1 ItemMustBeBid
            from Items with (nolock) 
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
   GrossPrice =
   isnull((select top 1 GrossPrice
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
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
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
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock) 
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where items.itemid = it.itemid
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),0),
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
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
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
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock) 
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
       Page =
   (select top 1 CatalogPage
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CrossRefId from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.CrossRefId end CrossRefId, 
               Bids.VendorId VendorId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CatalogId from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogId end CatalogId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CatalogPrice from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogPrice end CatalogPrice, 
               BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.Page from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.Page end CatalogPage, 
               BidHeaders.PricePlanId, Awards.AwardId, 
               case isnull(BidItems.VendorItemCode,'') when '' then (select top 1 CrossRefs.VendorItemCode from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.VendorItemCode end VendorItemCode, 
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
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
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
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock) 
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where items.itemid = it.itemid
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
)
  from @ItemTable it 
  left outer join BidHeaders on BidHeaders.BidHeaderId = @BidHeaderId

Update @ItemTable
   set VendorId =
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
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
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
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock) 
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
       VendorItemCode =
   (select top 1 VendorItemCode
      from (
        select 1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CrossRefId from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.CrossRefId end CrossRefId, 
               Bids.VendorId VendorId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CatalogId from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogId end CatalogId, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.CatalogPrice from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.CatalogPrice end CatalogPrice, 
               BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, 
               case isnull(CrossRefs.CrossRefId,0) when 0 then (select top 1 CrossRefs.Page from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else CrossRefs.Page end CatalogPage, 
               BidHeaders.PricePlanId, Awards.AwardId, 
               case isnull(BidItems.VendorItemCode,'') when '' then (select top 1 CrossRefs.VendorItemCode from BidHeaders with (nolock) join Category on Category.CategoryId = BidHeaders.CategoryId and Category.Type = 1 join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId and Bids.Active = 1 join Awards on Awards.BidId = Bids.BidId and Awards.Active = 1 join AwardsCatalogList on AwardsCatalogList.AwardId = Awards.AwardId join Catalog on Catalog.CatalogId = AwardsCatalogList.CatalogId and Catalog.Active = 1 and Catalog.CatalogId = @pCatalogId join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId and CrossRefs.Active = 1 and CrossRefs.PackedCode = @ItemCode order by CrossRefs.CatalogYear desc, CrossRefs.CrossRefId Desc) else BidItems.VendorItemCode end VendorItemCode, 
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
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
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
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock) 
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
       Alternate =
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
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
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
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock) 
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
       BidItemId =
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
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
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
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock) 
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
          from Items with (nolock) 
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
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
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select -1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock) 
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
       PriceType =
   isnull((select top 1 IB
      from (
        select -1 IB, round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) BidPrice, BidItems.BidItemId BidItemId, BidItems.CrossRefId CrossRefId, Bids.VendorId VendorId, null CatalogId, CrossRefs.CatalogPrice CatalogPrice, BidItems.Price GrossPrice, Bids.BidDiscountRate DiscountRate, CrossRefs.Page CatalogPage, BidHeaders.PricePlanId, Awards.AwardId, BidItems.VendorItemCode, BidItems.Alternate, 0 ItemMustBeBid
          from Items with (nolock) 
          join Category on Category.CategoryId = Items.CategoryId
                       and Category.Type = 1
          join BidItems on BidItems.ItemId = Items.ItemId
          join Bids on Bids.BidId = BidItems.BidId
                   and Bids.Active = 1
          join Awards on Awards.BidId = Bids.BidId
                     and Awards.Active = 1
          join BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = @BidHeaderId
          left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
         where items.itemid = it.itemid
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
                           and BidHeaders.BidHeaderId = @BidHeaderId
           where items.itemid = it.itemid
             and Items.Active = 1
              )
        union (
          select 1 IB, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) BidPrice, null BidItemId, CrossRefs.CrossRefId CrossRefId, Catalog.VendorId VendorId, CrossRefs.CatalogId, round(isnull(CrossRefs.CatalogPrice,Items.ListPrice),2) CatalogPrice, round(isnull(CrossRefs.GrossPrice,Items.ListPrice),2) GrossPrice, null DiscountRate, CrossRefs.Page CatalogPage, null PricePlanId, null AwardId, CrossRefs.VendorItemCode, null Alternate, 1 ItemMustBeBid
            from Items with (nolock) 
            join CrossRefs on CrossRefs.ItemId = Items.ItemId
                          and CrossRefs.Active = 1
            join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
                        and Catalog.Active = 1
           where items.itemid = it.itemid
             and Items.Active = 1
              )
           ) CD 
     order by IB desc, BidPrice, BidItemId, CrossRefId
),0),
 SortSeq = (select SortSeq from Items with (nolock) where Items.ItemId = it.ItemId),
 StandardItem = isnull(cast((select StandardItem from Items with (nolock) where Items.ItemId = it.ItemId) as char(1)),'0')
  from @ItemTable it 
  left outer join BidHeaders on BidHeaders.BidHeaderId = @BidHeaderId

Update @ItemTable
   set ItemBidType = case isnull(substring(BidItems.ItemBidType,1,1),'') when 'A' then 0 when 'C' then 1 when '' then 2 else 3 end
  from @ItemTable it 
  left outer join BidItems on BidItems.BidItemId = it.BidItemId

  -- Delete Items below Highest Pricing Level (Bid (1), Catalog (0), Not Bid(-1))
  delete @ItemTable
    from @ItemTable it
   where convert(char(1),isnull(PriceType,-1) + 1) + 
         convert(char(1),isnull(ItemBidType,3)) + 
         cast(case isnull(BidItemId,0) 
                           when 0 then 0 
                           else 1 
                         end as char(1)) +
         StandardItem +
         SortSeq > 
         (select top 1 cast(isnull(PriceType,-1) + 1 as char(1)) + 
                       cast(isnull(ItemBidType,3) as char(1)) + 
                       cast(case isnull(BidItemId,0) 
                              when 0 then 0 
                              else 1 
                            end as char(1)) +
                       StandardItem +
                       SortSeq
            from @ItemTable it1 
            join CrossRefs on CrossRefs.CrossRefId = it1.CrossRefId 
           where CrossRefs.ItemId = (select top 1 x1.ItemId 
                                       from CrossRefs x1 with (nolock) 
                                      where x1.CrossRefId = it.CrossRefId) 
           order by cast(isnull(PriceType,-1) + 1 as char(1)) + 
                    cast(isnull(ItemBidType,3) as char(1)) + 
                    cast(case isnull(BidItemId,0) 
                           when 0 then 0 
                           else 1 
                         end as char(1)) +
         StandardItem +
         SortSeq)

  Update @ItemTable
     set ItemCount = (select count(*) from @ItemTable)

  return
end
```
