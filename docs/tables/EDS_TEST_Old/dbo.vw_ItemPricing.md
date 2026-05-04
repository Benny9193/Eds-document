# View: `dbo.vw_ItemPricing`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `categoryId` | int | YES |  |  |
| 3 | `ItemId` | int | NO |  |  |
| 4 | `CatalogId` | int | YES |  |  |
| 5 | `CrossRefId` | int | YES |  |  |
| 6 | `ItemCode` | varchar(50) | YES |  |  |
| 7 | `Description` | varchar(2356) | YES |  |  |
| 8 | `UnitId` | int | YES |  |  |
| 9 | `UnitCode` | varchar(20) | YES |  |  |
| 10 | `BidPrice` | decimal(34,13) | YES |  |  |
| 11 | `CatalogPrice` | money | YES |  |  |
| 12 | `GrossPrice` | money | YES |  |  |
| 13 | `DiscountRate` | decimal(15,5) | YES |  |  |
| 14 | `CatalogPage` | varchar(16) | YES |  |  |
| 15 | `CatalogYear` | char(2) | YES |  |  |
| 16 | `PricePlanId` | int | YES |  |  |
| 17 | `AwardId` | int | YES |  |  |
| 18 | `VendorId` | int | YES |  |  |
| 19 | `VendorItemCode` | varchar(50) | YES |  |  |
| 20 | `PackedVendorItemCode` | varchar(255) | YES |  |  |
| 21 | `Alternate` | varchar(512) | YES |  |  |
| 22 | `SortSeq` | varchar(64) | YES |  |  |
| 23 | `BidItemId` | int | YES |  |  |
| 24 | `ItemMustBeBid` | int | NO |  |  |
| 25 | `PriceSort` | varchar(82) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Awards`](dbo.Awards.md) | USER_TABLE |
| [`dbo.AwardsCatalogList`](dbo.AwardsCatalogList.md) | USER_TABLE |
| [`dbo.BidHeaders`](dbo.BidHeaders.md) | USER_TABLE |
| [`dbo.BidItems`](dbo.BidItems.md) | USER_TABLE |
| [`dbo.Bids`](dbo.Bids.md) | USER_TABLE |
| [`dbo.BookTypes`](dbo.BookTypes.md) | USER_TABLE |
| [`dbo.Catalog`](dbo.Catalog.md) | USER_TABLE |
| [`dbo.Category`](dbo.Category.md) | USER_TABLE |
| [`dbo.CrossRefs`](dbo.CrossRefs.md) | USER_TABLE |
| [`dbo.Headings`](dbo.Headings.md) | USER_TABLE |
| [`dbo.Items`](dbo.Items.md) | USER_TABLE |
| [`dbo.Keywords`](dbo.Keywords.md) | USER_TABLE |
| `dbo.uf_PackCode` | SQL_SCALAR_FUNCTION |
| [`dbo.Units`](dbo.Units.md) | USER_TABLE |
| [`dbo.Vendors`](dbo.Vendors.md) | USER_TABLE |
| [`dbo.vw_PLBidItems`](dbo.vw_PLBidItems.md) | VIEW |
| [`dbo.vw_PLCatalog`](dbo.vw_PLCatalog.md) | VIEW |

## Used by

| Object | Type |
|--------|------|
| `dbo.uf_OrderBook` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_OrderBookNew` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_OrderOrBudgetBook` | SQL_TABLE_VALUED_FUNCTION |

## Definition

```sql
create   view  [dbo].[vw_ItemPricing]   as
select BidHeaders.BidHeaderId,
       Items.categoryId,
       Items.ItemId,
       CrossRefs.CatalogId,
       CrossRefs.CrossRefId,
       Items.ItemCode,
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
       end +
       case 
         when isnull(BidItems.BidItemId,0) != 0 then ''
         when isnull(cxr.CrossRefId,0) != 0 then
           case isnull(cxr.AdditionalShipping,0)
             when 0 then ''
             else '*** Additional Shipping Charges May Apply ***'
           end
         else ''
       end as [Description],
       Items.UnitId,
       Units.Code as UnitCode,
       case
         when isnull(BidItems.BidItemId,0) != 0 then round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) 
         when isnull(cxr.CrossRefId,0) != 0 then round(case isnull(cxr.DoNotDiscount,0) when 0 then isnull(cxr.GrossPrice,0) - round(cxr.GrossPrice * cacl.DiscountRate / 100,2) else cxr.GrossPrice end,2)
         else 
           Items.ListPrice
       end as BidPrice,
       case
         when isnull(BidItems.BidItemId,0) != 0 then bxr.CatalogPrice 
         when isnull(cxr.CrossRefId,0) != 0 then cxr.CatalogPrice
         else 
           Items.ListPrice
       end as CatalogPrice,
       case
         when isnull(BidItems.BidItemId,0) != 0 then isnull(BidItems.Price,0)
         when isnull(cxr.CrossRefId,0) != 0 then cxr.GrossPrice
         else 
           Items.ListPrice
       end as GrossPrice,
       case
         when isnull(BidItems.BidItemId,0) != 0 then isnull(Bids.BidDiscountRate,0)
         when isnull(cxr.CrossRefId,0) != 0 then case isnull(cxr.DoNotDiscount,0) when 0 then cacl.DiscountRate else 0 end 
         else 0
       end as DiscountRate,
       case
         when isnull(BidItems.BidItemId,0) != 0 then case isnull(BidItems.PageNo,0) when 0 then bxr.Page else convert(varchar(16),BidItems.PageNo) end
         when isnull(cxr.CrossRefId,0) != 0 then cxr.Page
         else null
       end as CatalogPage,
       case
         when isnull(BidItems.BidItemId,0) != 0 then CrossRefs.CatalogYear
         when isnull(cxr.CrossRefId,0) != 0 then cxr.CatalogYear
         else null
       end AS CatalogYear,
       BidHeaders.PricePlanId,
       case
         when isnull(BidItems.BidItemId,0) != 0 then isnull(ba.AwardId,0)
         when isnull(cxr.CrossRefId,0) != 0 then isnull(ca.AwardId,0)
         else null
       end as AwardId,
       case
         when isnull(BidItems.BidItemId,0) != 0 then isnull(Bids.VendorId,7691)
         when isnull(cxr.CrossRefId,0) != 0 then isnull(ca.VendorId,7691)
         else 
           null
       end as VendorId,
       case
         when isnull(BidItems.BidItemId,0) != 0 then case isnull(BidItems.VendorItemCode,'') when '' then bxr.VendorItemCode else BidItems.VendorItemCode end
         when isnull(cxr.CrossRefId,0) != 0 then cxr.VendorItemCode
         else 
           isnull(Items.VendorPartNumber,'')
       end as VendorItemCode,
       case
         when isnull(BidItems.BidItemId,0) != 0 then case isnull(BidItems.PackedVendorItemCode,'') when '' then bxr.VendorItemCode else BidItems.VendorItemCode end
         when isnull(cxr.CrossRefId,0) != 0 then cxr.PackedCode
         else 
           dbo.uf_PackCode(isnull(Items.VendorPartNumber,''))
       end as PackedVendorItemCode,
       case
         when isnull(BidItems.BidItemId,0) != 0 then BidItems.Alternate
         when isnull(cxr.CrossRefId,0) != 0 then null
         else null
       end as Alternate,
       Items.SortSeq,
       BidItems.BidItemId,
       case
         when isnull(BidItems.BidItemId,0) != 0 then 0
         when isnull(cxr.CrossRefId,0) != 0 then 0
         else
           1
       end as ItemMustBeBid,
       '0' +
         cast(case isnull(BidItems.BidItemId,0) when 0 then 1 else 0 end as CHAR(1)) + 
         cast(case isnull(substring(BidItems.ItemBidType,1,1),'') when 'A' then 0 when 'C' then 1 when '' then 2 else 3 end as CHAR(1)) +
         right('00000000000000' + cast(cast(case when isnull(BidItems.BidItemId,0) != 0 then round(isnull(BidItems.Price,0) - round((isnull(Bids.BidDiscountRate,0) * isnull(BidItems.Price,0)) / 100,2),2) when isnull(cxr.CrossRefId,0) != 0 then round(case isnull(cxr.DoNotDiscount,0) when 0 then isnull(cxr.GrossPrice,0) - round(cxr.GrossPrice * cacl.DiscountRate / 100,2) else cxr.GrossPrice end,2) else Items.ListPrice end as decimal(11,2)) as varchar(14)),14) +  
         isnull(cast(Items.StandardItem as char(1)),'0') +
         Items.SortSeq as PriceSort
--select *       
  from dbo.Items with (nolock)
  join dbo.Category on Category.categoryId = Items.CategoryId
  -- Following Join was Added 11/24/2010 by David
  join dbo.BidHeaders on BidHeaders.EffectiveFrom IS not null
                     and BidHeaders.EffectiveUntil IS not null
                     and BidHeaders.Active = 1
  left outer join dbo.vw_PLBidItems plbi on plbi.ItemId = Items.ItemId
  -- Following  Line was added by David 11/24/2010
                     and plbi.BidHeaderId = BidHeaders.BidHeaderId
  left outer join dbo.BidItems on BidItems.BidItemId = plbi.BidItemId
  left outer join dbo.Bids on Bids.BidId = plbi.BidId
  --Following Join Removed 11/24/2010 by David
--  left outer join dbo.BidHeaders on BidHeaders.BidHeaderId = plbi.BidHeaderId 
  left outer join dbo.CrossRefs bxr on bxr.CrossRefId = plbi.CrossRefId
  left outer join dbo.Awards ba on ba.AwardId = plbi.AwardId
  left outer join dbo.vw_PLCatalog plc on plc.ItemId = Items.ItemId
                                  and plc.BidHeaderId = BidHeaders.BidHeaderId
  left outer join dbo.CrossRefs cxr on cxr.CrossRefId = plc.CrossRefId
  left outer join dbo.Catalog cc on Cc.CatalogId = cxr.CatalogId
  left outer join dbo.Awards ca on ca.AwardId = plc.AwardId
  left outer join dbo.AwardsCatalogList cacl on cacl.AwardId = plc.AwardId
                                        and cacl.CatalogId = cxr.CatalogId
  left outer join dbo.CrossRefs on CrossRefs.CrossRefId = case 
                                                        when isnull(bxr.CrossRefId,0) != 0 then bxr.CrossRefId
                                                        when isnull(cxr.CrossRefId,0) != 0 then cxr.CrossRefId
                                                        else null
                                                      end
  left outer join dbo.Units on Units.UnitId = Items.UnitId
  left outer join dbo.Catalog pc on pc.CatalogId = ParentCatalogId  
  left outer join dbo.Headings on Headings.HeadingId = Items.HeadingId  
  left outer join dbo.BookTypes on BookTypes.BookTypeId = Items.EditionId  
  left outer join dbo.Keywords on Keywords.KeyWordId = Items.KeywordId  
  left outer join dbo.Vendors on Vendors.VendorId = Items.VendorId  
 where Items.Active = 1
union (
select 0 as BidHeaderId,
       Items.categoryId,
       Items.ItemId,
       CrossRefs.CatalogId,
       CrossRefs.CrossRefId,
       Items.ItemCode,
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
       end +
       case 
         when isnull(axr.CrossRefId,0) != 0 then
           case isnull(axr.AdditionalShipping,0)
             when 0 then ''
             else '*** Additional Shipping Charges May Apply ***'
           end
         else ''
       end as [Description],
       Items.UnitId,
       Units.Code as UnitCode,
       case
         when isnull(axr.CrossRefId,0) != 0 then case when isnull(Items.ListPrice,0) != 0 then Items.ListPrice else axr.GrossPrice end
         else 
           Items.ListPrice
       end as BidPrice,
       case
         when isnull(axr.CrossRefId,0) != 0 then axr.CatalogPrice
         else 
           Items.ListPrice
       end as CatalogPrice,
       case
         when isnull(axr.CrossRefId,0) != 0 then case when isnull(Items.ListPrice,0) != 0 then Items.ListPrice else axr.GrossPrice end
         else 
           Items.ListPrice
       end as GrossPrice,
       case
         when isnull(axr.CrossRefId,0) != 0 then 0
         else 0
       end as DiscountRate,
       case
         when isnull(axr.CrossRefId,0) != 0 then axr.Page
         else null
       end as CatalogPage,
       case
         when isnull(axr.CrossRefId,0) != 0 then axr.CatalogYear
         else null
       end AS CatalogYear,
       null as PricePlanId,
       case
         when isnull(axr.CrossRefId,0) != 0 then 0
         else 0
       end as AwardId,
       case
         when isnull(axr.CrossRefId,0) != 0 then case isnull(ac.VendorId,7691) when 7853 then isnull(Items.VendorId,7691) else isnull(ac.VendorId,7691) end
         else 
           null
       end as VendorId,
       case
         when isnull(axr.CrossRefId,0) != 0 then axr.VendorItemCode
         else 
           isnull(Items.VendorPartNumber,'')
       end as VendorItemCode,
       case
         when isnull(axr.CrossRefId,0) != 0 then axr.PackedCode
         else 
           dbo.uf_PackCode(isnull(Items.VendorPartNumber,''))
       end as PackedVendorItemCode,
       null as Alternate,
       Items.SortSeq,
       null as BidItemId,
       1 as ItemMustBeBid,
       '200' +
         right('00000000000000' + cast(cast(case when isnull(axr.CrossRefId,0) != 0 then case when isnull(Items.ListPrice,0) != 0 then Items.ListPrice else axr.GrossPrice end else Items.ListPrice end as decimal(11,2)) as varchar(14)),14) +  
         isnull(cast(Items.StandardItem as char(1)),'0') +
         Items.SortSeq as PriceSort
--select *       
  from dbo.Items with (nolock)
  join dbo.Category on Category.categoryId = Items.CategoryId
  left outer join dbo.CrossRefs axr on axr.CrossRefId = 
    (select top 1 xr.CrossRefId
       from dbo.Crossrefs xr with (nolock)
       join dbo.Catalog cat on cat.CatalogId = xr.CatalogId
                       and cat.Active = 1
      where xr.ItemId = Items.ItemId
        and xr.Active = 1
      order by case when cat.Name = 'EDS' then 1 else 0 end, isnull(xr.GrossPrice,0), xr.CrossRefId)
  left outer join dbo.Catalog ac on ac.CatalogId = axr.CatalogId
  left outer join dbo.CrossRefs on CrossRefs.CrossRefId = case 
                                                        when isnull(axr.CrossRefId,0) != 0 then axr.CrossRefId
                                                        else null
                                                      end
  left outer join dbo.Units on Units.UnitId = Items.UnitId
  left outer join dbo.Catalog pc on pc.CatalogId = ParentCatalogId  
  left outer join dbo.Headings on Headings.HeadingId = Items.HeadingId  
  left outer join dbo.BookTypes on BookTypes.BookTypeId = Items.EditionId  
  left outer join dbo.Keywords on Keywords.KeyWordId = Items.KeywordId  
  left outer join dbo.Vendors on Vendors.VendorId = Items.VendorId  
 where Items.Active = 1
)
```
