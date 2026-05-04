# View: `dbo.vw_FormattedDetailDescription`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DetailId` | int | NO |  |  |
| 2 | `ItemDescription` | varchar(2893) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.BidItems`](dbo.BidItems.md) | USER_TABLE |
| [`dbo.Bids`](dbo.Bids.md) | USER_TABLE |
| [`dbo.BidsCatalogList`](dbo.BidsCatalogList.md) | USER_TABLE |
| [`dbo.BookTypes`](dbo.BookTypes.md) | USER_TABLE |
| [`dbo.Budgets`](dbo.Budgets.md) | USER_TABLE |
| [`dbo.Catalog`](dbo.Catalog.md) | USER_TABLE |
| [`dbo.Category`](dbo.Category.md) | USER_TABLE |
| [`dbo.CrossRefs`](dbo.CrossRefs.md) | USER_TABLE |
| [`dbo.Detail`](dbo.Detail.md) | USER_TABLE |
| [`dbo.DistrictCategories`](dbo.DistrictCategories.md) | USER_TABLE |
| [`dbo.Headings`](dbo.Headings.md) | USER_TABLE |
| [`dbo.Items`](dbo.Items.md) | USER_TABLE |
| [`dbo.Keywords`](dbo.Keywords.md) | USER_TABLE |
| [`dbo.Requisitions`](dbo.Requisitions.md) | USER_TABLE |
| [`dbo.Vendors`](dbo.Vendors.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_FormattedDetailDescription]  
AS  
    select Detail.DetailId,
           case isnull(BidItems.BidItemId,0) 
             when 0 then
               case Detail.ItemMustBeBid 
                 when 1 then 'Item Not Bid:'
                 else 
                   case Detail.VendorId
                     when 7691 then 'No Bid:'
                     else 'Catalog Item:'
                   end
               end
             else
               case ISNULL(substring(BidItems.ItemBidType,1,1),'')
                 when 'C' then 'Compliant Item: ' + 
                               --CHAR(13) + CHAR(10) + 
                               isnull(BidItems.Alternate,'') + 
                               CHAR(13) + CHAR(10) + 
                               'Bid as:' 
                 when 'A' then 'Bid As Specified: '
                 else
                   ''
               end 
           end + --CHAR(13) + char(10) +
           case isnull(DistrictCategories.AllowAddenda,0) 
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
               case isnull(DistrictCategories.AllowAddenda,0)   
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
           end +
           case
             when isnull(Detail.BidItemId,0) != 0 then ''
             when ISNULL(cxr.CrossRefId,0) != 0 then 
               case ISNULL(cxr.AdditionalShipping,0)
                 when 0 then ''
                 else '*** Additional Shipping Charges May Apply ***'
               end
             else ''
           end as ItemDescription
/*,
           Detail.ItemId,
           case isnull(Detail.BidHeaderId,0) when 0 then Requisitions.BidHeaderId else Detail.BidHeaderId end as BidHeaderId 
*/
      from dbo.Detail with (nolock)
      join dbo.Items on Items.ItemId = Detail.ItemId
      join dbo.Category on Category.CategoryId = Items.CategoryId
      join dbo.Requisitions on Requisitions.RequisitionId = Detail.RequisitionId 
      join dbo.Budgets on Budgets.BudgetId = Requisitions.BudgetId
      left outer join dbo.DistrictCategories on DistrictCategories.DistrictId = Budgets.DistrictId
                                            and DistrictCategories.CategoryId = Requisitions.CategoryId
                                            and DistrictCategories.Active = 1
      left outer join dbo.Catalog on Catalog.CatalogId = ParentCatalogId  
      left outer join dbo.Headings on Headings.HeadingId = Items.HeadingId  
      left outer join dbo.BookTypes on BookTypes.BookTypeId = Items.EditionId  
      left outer join dbo.Keywords Keywords on Keywords.KeyWordId = Items.KeywordId  
      left outer join dbo.Vendors on Vendors.VendorId = Items.VendorId  
      left outer join dbo.BidItems on BidItems.BidItemId = Detail.BidItemId
      left outer join dbo.CrossRefs as cxr on cxr.CrossRefId = 
        (select Top 1 CrossRefs.CrossRefId
           from dbo.CrossRefs with (nolock)
           join dbo.Catalog as cat on cat.CatalogId = CrossRefs.CatalogId
           join dbo.Bids on Bids.BidHeaderId = Requisitions.BidHeaderId
           join dbo.BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
                                   and BidsCatalogList.CatalogId = Cat.CatalogId
          where CrossRefs.ItemId = Detail.ItemId
            and CrossRefs.Active = 1
          order by Catalog.CatalogYear desc, CrossRefs.CatalogPrice, CrossRefs.CrossRefId)
/*
        (select Top 1 lxr.CrossRefId 
           from dbo.vw_LatestCrossRef lxr with (nolock) 
          where lxr.BidHeaderId = Requisitions.BidHeaderId 
            and lxr.ItemId = Detail.ItemId
          order by lxr.CatalogYear desc, lxr.CatalogPrice, lxr.CrossRefId)
*/
```
