# Function: table-valued: `dbo.uf_SearchDistrictDetail`

_Generated on 2026-05-04T13:07:57.713Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_SearchDistrictDetail` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2008-02-26 20:32:44 |
| Modified | 2011-07-13 13:03:23 |
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
| `BookTypes` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Catalog` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `CrossRefs` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `DistrictCategories` | USER_TABLE |  |
| `Headings` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `Keywords` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `Units` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--select * from dbo.uf_SearchItemsDetail(165939) order by Items_SortSeq
--select * from dbo.uf_SearchItemsDetail(165945) order by Items_SortSeq

CREATE function [dbo].[uf_SearchDistrictDetail] (@pRequisitionId int, @pHeadingId int) 
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
    select Items.ItemId, 
      r1.BidHeaderId 
      from Requisitions with (nolock)
      join Requisitions r1 on r1.RequisitionId = @pRequisitionId
      join Budgets on Budgets.BudgetId = r1.BudgetId 
      join Detail on Detail.RequisitionId = Requisitions.RequisitionId
      join Items on Items.ItemId = Detail.ItemId 
                and Items.CategoryId = Requisitions.CategoryId 
                and Items.Active = 1 
      left outer join Headings on Headings.HeadingId = Items.HeadingId 
                              and Headings.Active = 1 
     where Requisitions.BudgetId = r1.BudgetId
/*      (select top 1 b1.BudgetId 
         FROM Requisitions req
         join Budgets b1 on b1.DistrictId = Budgets.DistrictId 
                        and b1.Active = 1 
                        and cast(substring(b1.Name,1,4) as int) between cast(substring(Budgets.Name,1,4) as int) - 1 and cast(substring(Budgets.Name,1,4) as int)
        WHERE req.RequisitionId = @pRequisitionId)
*/
          and Requisitions.CategoryId = r1.CategoryId
          and isnull(Items.HeadingId,0) = case isnull(@pHeadingId,0) 
                                            when -1 then isnull(Items.HeadingId,0) 
                                            else isnull(@pHeadingId,0) 
                                          end
     group by Items.ItemId, r1.BidHeaderId

/*
   set CatalogId = 
       Items_ItemCode = (select Items.ItemCode from Items where items.itemid = it.itemid),
       Items_Description = (select case isnull(Category.AllowAddenda,0) 
       Units_Code = (select Units.Code from Items join Units on Units.UnitId = Items.UnitId where items.itemid = it.itemid),
       Price =
  from @LYDistrict it
  join Requisitions on Requisitions.RequisitionId = @pRequisitionId
--  left outer join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId

Update @LYDistrict
   set DiscountRate =
       PageNo =
       Vendors_Name =
       BidItems_VendorItemCode =
       BidItems_Alternate =
       BidItems_BidItemId =
       ItemMustBeBid =
 SortSeq = (select SortSeq from Items where Items.ItemId = it.ItemId)
  from @LYDistrict it
  join Requisitions on Requisitions.RequisitionId = @pRequisitionId
*/

  update @LYDistrict
   set CatalogId = CrossRefs.CatalogId,
       Items_ItemCode = Items.ItemCode,
       Items_Description = 
           case isnull(Category.AllowAddenda,0) 
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
           case isnull(Category.Type,1)
             when 2 then   
               case isnull(ParentCatalogId,0)   
                 when 0 then ''   
                 else char(13) + char(10) + 'Publisher: ' + isnull(pc.Name,'')  
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
                   case isnull(Detail.ExtraDescription,'')  
                     when '' then ''  
                     else char(13) + char(10) +   
                       case isnull(Category.ExtraTitle,'')  
                         when '' then 'Extra Information: '  
                         else isnull(Category.ExtraTitle,'')  
                       end + ' ' + 
                       isnull(Detail.ExtraDescription,'')  
                   end  
               end   
           end,  
       Units_Code = Units.Code,
       Price = case
                    when isnull(BidItems.BidItemId,0) != 0 then round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) 
                    when isnull(cxr.CrossRefId,0) != 0 then round(case isnull(cxr.DoNotDiscount,0) when 0 then isnull(cxr.GrossPrice,0) - round(cxr.GrossPrice * cacl.DiscountRate / 100,2) else cxr.GrossPrice end,2)
                    when isnull(axr.CrossRefId,0) != 0 then case when isnull(Items.ListPrice,0) != 0 then Items.ListPrice else axr.GrossPrice end
                    else 
                      case isnull(DistrictCategories.AllowAddenda,0) 
                        when 1 then Items.ListPrice
                        else 0
                      end
                  end,
/*       CatalogPrice = case
                    when isnull(BidItems.BidItemId,0) != 0 then bxr.CatalogPrice 
                    when isnull(cxr.CrossRefId,0) != 0 then cxr.CatalogPrice
                    when isnull(axr.CrossRefId,0) != 0 then axr.CatalogPrice
                    else 
                      case isnull(DistrictCategories.AllowAddenda,0) 
                        when 1 then Items.ListPrice
                        else 0
                      end
                  end,
       GrossPrice = case
                    when isnull(BidItems.BidItemId,0) != 0 then isnull(BidItems.Price,0)
                    when isnull(cxr.CrossRefId,0) != 0 then cxr.GrossPrice
                    when isnull(axr.CrossRefId,0) != 0 then case when isnull(Items.ListPrice,0) != 0 then Items.ListPrice else axr.GrossPrice end
                    else 
                      case isnull(DistrictCategories.AllowAddenda,0) 
                        when 1 then Items.ListPrice
                        else 0
                      end
                  end,
*/
       DiscountRate = case
                    when isnull(BidItems.BidItemId,0) != 0 then isnull(Bids.BidDiscountRate,0)
                    when isnull(cxr.CrossRefId,0) != 0 then case isnull(cxr.DoNotDiscount,0) when 0 then cacl.DiscountRate else 0 end 
                    when isnull(axr.CrossRefId,0) != 0 then 0
                    else 0
                  end,
       PageNo = case
                    when isnull(BidItems.BidItemId,0) != 0 then case isnull(BidItems.PageNo,0) when 0 then bxr.Page else convert(varchar(16),BidItems.PageNo) end
                    when isnull(cxr.CrossRefId,0) != 0 then cxr.Page
                    when isnull(axr.CrossRefId,0) != 0 then axr.Page
                    else null
                  end,
/*       PricePlanId = BidHeaders.PricePlanId,
       AwardId = case
                    when isnull(BidItems.BidItemId,0) != 0 then isnull(ba.AwardId,0)
                    when isnull(cxr.CrossRefId,0) != 0 then isnull(ca.AwardId,0)
                    when isnull(axr.CrossRefId,0) != 0 then 0
                    else 0
                  end,
       VendorId = case
                    when isnull(BidItems.BidItemId,0) != 0 then isnull(Bids.VendorId,7691)
                    when isnull(cxr.CrossRefId,0) != 0 then isnull(ca.VendorId,7691)
                    when isnull(axr.CrossRefId,0) != 0 then isnull(ac.VendorId,7691)
                    else 
                      case isnull(DistrictCategories.AllowAddenda,0) 
                        when 1 then null
                        else 7691
                      end
                  end,
*/
       Vendors_Name = case
                    when isnull(BidItems.BidItemId,0) != 0 then isnull(BVendors.Name,NBVendors.Name)
                    when isnull(cxr.CrossRefId,0) != 0 then isnull(cVendors.Name,NBVendors.Name)
                    when isnull(axr.CrossRefId,0) != 0 then isnull(aVendors.Name,NBVendors.Name)
                    else 
                      case isnull(DistrictCategories.AllowAddenda,0) 
                        when 1 then null
                        else NBVendors.Name
                      end
                  end,
       BidItems_VendorItemCode = case
                    when isnull(BidItems.BidItemId,0) != 0 then case isnull(BidItems.VendorItemCode,'') when '' then bxr.VendorItemCode else BidItems.VendorItemCode end
                    when isnull(cxr.CrossRefId,0) != 0 then cxr.VendorItemCode
                    when isnull(axr.CrossRefId,0) != 0 then axr.VendorItemCode
                    else 
                      case isnull(DistrictCategories.AllowAddenda,0) 
                        when 1 then isnull(Items.VendorPartNumber,'')
                        else null
                      end
                  end,
       BidItems_Alternate = case
                    when isnull(BidItems.BidItemId,0) != 0 then BidItems.Alternate
                    when isnull(cxr.CrossRefId,0) != 0 then null
                    when isnull(axr.CrossRefId,0) != 0 then null
                    else null
                  end,
       SortSeq = Items.SortSeq,
       BidItems_BidItemId = BidItems.BidItemId,
       ItemMustBeBid = case
                    when isnull(BidItems.BidItemId,0) != 0 then 0
                    when isnull(cxr.CrossRefId,0) != 0 then 0
                    when isnull(axr.CrossRefId,0) != 0 then 
                      case isnull(DistrictCategories.AllowAddenda,0) 
                        when 1 then 1
                        else 0
                      end
                    else
                      case isnull(DistrictCategories.AllowAddenda,0) 
                        when 1 then 1
                        else 0
                      end

                  end
  from @LYDistrict it --with (nolock)
  join Requisitions on Requisitions.RequisitionId = @pRequisitionId
  join Category on Category.categoryId = Requisitions.CategoryId
  left outer join BidHeaders on BidHeaders.BidHeaderId = it.BidHeaderId
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
  join DistrictCategories on DistrictCategories.DistrictId = Budgets.DistrictId
                         and DistrictCategories.CategoryId = Requisitions.CategoryId
                         and DistrictCategories.Active = 1
  left outer join PO on PO.RequisitionId = Requisitions.RequisitionId
  left outer join BidItems on BidItems.BidItemId = 
    (select top 1 bi.BidItemId 
       from BidItems bi with (nolock)
       join Bids b on b.BidId = bi.BidId
                  and b.Active = 1
                  and b.BidHeaderId = BidHeaders.BidHeaderId
      where bi.ItemId = it.ItemId)
  left outer join Bids on Bids.BidId = 
    (select top 1 b.BidId 
       from BidItems bi with (nolock) 
       join Bids b on b.BidId = bi.BidId
                  and b.Active = 1
                  and b.BidHeaderId = BidHeaders.BidHeaderId
      where bi.ItemId = it.ItemId)
  left outer join CrossRefs bxr on bxr.CrossRefId = 
    (select top 1 bi.CrossRefId
       from BidItems bi with (nolock) 
       join Bids b on b.BidId = bi.BidId
                  and b.Active = 1
                  and b.BidHeaderId = BidHeaders.BidHeaderId
      where bi.ItemId = it.ItemId)
  left outer join Awards ba on ba.AwardId = 
    (select top 1 a.AwardId
       from BidItems bi with (nolock) 
       join Bids b on b.BidId = bi.BidId
                  and b.Active = 1
                  and b.BidHeaderId = BidHeaders.BidHeaderId
       join Awards a on a.BidId = b.BidId
                    and a.Active =  1
      where bi.ItemId = it.ItemId)
  left outer join CrossRefs cxr on cxr.CrossRefId = 
    (select top 1 xr.CrossRefId
       from Crossrefs xr with (nolock)
       join Catalog cat on cat.CatalogId = xr.CatalogId
       join AwardsCatalogList acl on acl.CatalogId = cat.CatalogId
       join Awards a on a.AwardId = acl.AwardId
                    and a.Active = 1
       join Bids b on b.BidId = a.BidId
                  and b.Active = 1
                  and b.BidHeaderId = BidHeaders.BidHeaderId
      where xr.ItemId = it.ItemId
        and xr.Active = 1
      order by round(case isnull(xr.DoNotDiscount,0) when 0 then isnull(xr.GrossPrice,0) - round(acl.DiscountRate * isnull(xr.GrossPrice,0) / 100,2) else xr.GrossPrice end,2), xr.CrossRefId)
  left outer join Catalog cc on Cc.CatalogId = 
    (select top 1 cat.CatalogId
       from Crossrefs xr with (nolock)
       join Catalog cat on cat.CatalogId = xr.CatalogId
       join AwardsCatalogList acl on acl.CatalogId = cat.CatalogId
       join Awards a on a.AwardId = acl.AwardId
                    and a.Active = 1
       join Bids b on b.BidId = a.BidId
                  and b.Active = 1
                  and b.BidHeaderId = BidHeaders.BidHeaderId
      where xr.ItemId = it.ItemId
        and xr.Active = 1
      order by round(case isnull(xr.DoNotDiscount,0) when 0 then isnull(xr.GrossPrice,0) - round(acl.DiscountRate * isnull(xr.GrossPrice,0) / 100,2) else xr.GrossPrice end,2), xr.CrossRefId)
  left outer join Awards ca on ca.AwardId = 
    (select top 1 a.AwardId
       from Crossrefs xr with (nolock)
       join Catalog cat on cat.CatalogId = xr.CatalogId
       join AwardsCatalogList acl on acl.CatalogId = cat.CatalogId
       join Awards a on a.AwardId = acl.AwardId
                    and a.Active = 1
       join Bids b on b.BidId = a.BidId
                  and b.Active = 1
                  and b.BidHeaderId = BidHeaders.BidHeaderId
      where xr.ItemId = it.ItemId
        and xr.Active = 1
      order by round(case isnull(xr.DoNotDiscount,0) when 0 then isnull(xr.GrossPrice,0) - round(acl.DiscountRate * isnull(xr.GrossPrice,0) / 100,2) else xr.GrossPrice end,2), xr.CrossRefId)
  left outer join AwardsCatalogList cacl on cacl.AwardCatalogId = 
    (select top 1 acl.AwardCatalogId
       from Crossrefs xr with (nolock)
       join Catalog cat on cat.CatalogId = xr.CatalogId
       join AwardsCatalogList acl on acl.CatalogId = cat.CatalogId
       join Awards a on a.AwardId = acl.AwardId
                    and a.Active = 1
       join Bids b on b.BidId = a.BidId
                  and b.Active = 1
                  and b.BidHeaderId = BidHeaders.BidHeaderId
      where xr.ItemId = it.ItemId
        and xr.Active = 1
      order by round(case isnull(xr.DoNotDiscount,0) when 0 then isnull(xr.GrossPrice,0) - round(acl.DiscountRate * isnull(xr.GrossPrice,0) / 100,2) else xr.GrossPrice end,2), xr.CrossRefId)
  left outer join CrossRefs axr on axr.CrossRefId = 
    (select top 1 xr.CrossRefId
       from Crossrefs xr with (nolock)
       join Catalog cat on cat.CatalogId = xr.CatalogId
                       and cat.Active = 1
      where xr.ItemId = it.ItemId
        and xr.Active = 1
        and DistrictCategories.AllowAddenda = 1
      order by isnull(xr.GrossPrice,0), xr.CrossRefId)
  left outer join Catalog ac on ac.CatalogId = axr.CatalogId
  left outer join Items on Items.ItemId = it.ItemId
  left outer join CrossRefs on CrossRefs.CrossRefId = case 
                                                        when isnull(bxr.CrossRefId,0) != 0 then bxr.CrossRefId
                                                        when isnull(cxr.CrossRefId,0) != 0 then cxr.CrossRefId
                                                        when isnull(axr.CrossRefId,0) != 0 then axr.CrossRefId
                                                        else null
                                                      end
  left outer join Units on Units.UnitId = Items.UnitId
  left outer join Catalog pc on pc.CatalogId = ParentCatalogId  
  left outer join Headings on Headings.HeadingId = Items.HeadingId  
  left outer join BookTypes on BookTypes.BookTypeId = Items.EditionId  
  left outer join Keywords on Keywords.KeyWordId = Items.KeywordId  
  left outer join Detail on Detail.ItemId = it.ItemId
                        and Detail.RequisitionId = @pRequisitionId
  left outer join Vendors on Vendors.VendorId = Items.VendorId  
  left outer join Vendors NBVendors on NBVendors.VendorId = 7691
  left outer join Vendors AVendors on AVendors.VendorId = isnull(AC.VendorId,7691)
  left outer join Vendors BVendors on BVendors.VendorId = isnull(Bids.VendorId,7691)
  left outer join Vendors CVendors on CVendors.VendorId = isnull(CA.VendorId,7691)
 where PO.POId is null


  update @LYDistrict
     set Quantity = Detail.Quantity,
         DetailId = Detail.DetailId
    from @LYDistrict lyd
    join Detail on Detail.RequisitionId = @pRequisitionId
               and Detail.ItemId = lyd.ItemId

return
end
```
