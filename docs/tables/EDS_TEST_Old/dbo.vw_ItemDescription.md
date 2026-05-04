# View: `dbo.vw_ItemDescription`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ItemId` | int | NO |  |  |
| 2 | `CategoryId` | int | YES |  |  |
| 3 | `ItemDescription` | varchar(1156) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.BookTypes`](dbo.BookTypes.md) | USER_TABLE |
| [`dbo.Catalog`](dbo.Catalog.md) | USER_TABLE |
| [`dbo.Category`](dbo.Category.md) | USER_TABLE |
| [`dbo.Headings`](dbo.Headings.md) | USER_TABLE |
| [`dbo.Items`](dbo.Items.md) | USER_TABLE |
| [`dbo.Keywords`](dbo.Keywords.md) | USER_TABLE |
| [`dbo.Vendors`](dbo.Vendors.md) | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.BidMgrBidRequestDetail`](dbo.BidMgrBidRequestDetail.md) | VIEW |
| [`dbo.BidRequestDetail`](dbo.BidRequestDetail.md) | VIEW |
| [`dbo.BidRequestDetail1`](dbo.BidRequestDetail1.md) | VIEW |
| [`dbo.BidRequestDetail2`](dbo.BidRequestDetail2.md) | VIEW |
| [`dbo.BidRequestItemsView1`](dbo.BidRequestItemsView1.md) | VIEW |
| `dbo.sp_BidCompare` | SQL_STORED_PROCEDURE |
| `dbo.sp_CreateBidHeaderDetail` | SQL_STORED_PROCEDURE |
| `dbo.uf_BidAnalysisDetail` | SQL_INLINE_TABLE_VALUED_FUNCTION |
| `dbo.uf_BidAnalysisDetailItem` | SQL_INLINE_TABLE_VALUED_FUNCTION |
| `dbo.uf_BidAnalysisDetailTest` | SQL_INLINE_TABLE_VALUED_FUNCTION |
| `dbo.uf_BidItemDescription` | SQL_SCALAR_FUNCTION |
| `dbo.uf_LookupItemCodeByReqVendor` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_LookupItemCodeByReqVendor_BK20241205` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_LookupItemCodeByReqVendor_BK20241227` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_LookupItemCodeByReqVendorTest` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_LookupPriceByBH` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_LookupPriceByBHLong` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_OrderBook` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_OrderBookNew` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_OrderBookSaved` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_OrderBookTest` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_OrderBookTest1` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_OrderOrBudgetBook` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.usp_BidRequestItemMergeDetailDavid` | SQL_STORED_PROCEDURE |
| `dbo.usp_BidRequestItemMergeDetailDavidTest_notused` | SQL_STORED_PROCEDURE |
| `dbo.usp_getSDSItems` | SQL_STORED_PROCEDURE |
| `dbo.usp_SearchItems_SearchDataDB` | SQL_STORED_PROCEDURE |
| `dbo.usp_SearchItemsByReqHKDS` | SQL_STORED_PROCEDURE |
| `dbo.usp_SearchItemsByReqHKDS_David` | SQL_STORED_PROCEDURE |
| `dbo.usp_SearchItemsByReqHKDSDavid` | SQL_STORED_PROCEDURE |
| `dbo.usp_SearchItemsByReqHKDSError` | SQL_STORED_PROCEDURE |
| `dbo.usp_SearchItemsByReqHKDSTest` | SQL_STORED_PROCEDURE |
| [`dbo.vw_AwardedBidResults`](dbo.vw_AwardedBidResults.md) | VIEW |
| [`dbo.vw_BidAnalysisDetail`](dbo.vw_BidAnalysisDetail.md) | VIEW |
| [`dbo.vw_BidItemDescription`](dbo.vw_BidItemDescription.md) | VIEW |
| [`dbo.vw_BidItemLongDescription`](dbo.vw_BidItemLongDescription.md) | VIEW |
| [`dbo.vw_BidPricing`](dbo.vw_BidPricing.md) | VIEW |
| [`dbo.vw_ItemsByBid`](dbo.vw_ItemsByBid.md) | VIEW |

## Definition

```sql
CREATE    view [dbo].[vw_ItemDescription]  
as
    select Items.ItemId,
	       Items.CategoryId,
--           case isnull(Category.AllowAddenda,0) 
--             when 0 then ''
--             else
               case isnull(Headings.HeadingId,0)
                 when 0 then ''
                 else 
                   ltrim(rtrim(isnull(Headings.Title,''))) +
                   case isnull(Keywords.KeywordId,0)
                     when 0 then ''
                     else
                       ' ' + ltrim(rtrim(isnull(Keywords.Keyword,'')))
                   end + ', '
--              end 
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
               case when isnull(Category.AllowAddenda,0) = 0 and SUBSTRING(SortSeq,1,8) != 'EDS' then ''
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
                   end 
               end   
           end as ItemDescription
      from dbo.Items with (nolock)
      join dbo.Category on Category.CategoryId = Items.CategoryId  
      left outer join dbo.Catalog on Catalog.CatalogId = ParentCatalogId  
      left outer join dbo.Headings on Headings.HeadingId = Items.HeadingId
                                  and Headings.Active = 1  
      left outer join dbo.BookTypes on BookTypes.BookTypeId = Items.EditionId  
      left outer join dbo.Keywords Keywords on Keywords.KeyWordId = Items.KeywordId  
                                                    and Keywords.Active = 1
      left outer join dbo.Vendors on Vendors.VendorId = Items.VendorId
```
