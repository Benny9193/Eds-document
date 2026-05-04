# Function: scalar: `dbo.uf_ItemDescription`

_Generated on 2026-05-04T13:04:00.555Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_ItemDescription` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2003-05-10 10:19:41 |
| Modified | 2015-09-01 08:46:32 |
| Encrypted | no |
| Returns | varchar(1024) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pItemId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.BookTypes` | USER_TABLE |  |
| `dbo.Catalog` | USER_TABLE |  |
| `dbo.Category` | USER_TABLE |  |
| `dbo.Headings` | USER_TABLE |  |
| `dbo.Items` | USER_TABLE |  |
| `dbo.Keywords` | USER_TABLE |  |
| `dbo.Vendors` | USER_TABLE |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.BidItemView` | VIEW |
| `dbo.BidResultsView` | VIEW |
| `dbo.sp_BidCompareDiscount` | SQL_STORED_PROCEDURE |
| `dbo.sp_BidCompareSame` | SQL_STORED_PROCEDURE |
| `dbo.sp_BidCompareSummary` | SQL_STORED_PROCEDURE |
| `dbo.sp_ReqAdd` | SQL_STORED_PROCEDURE |
| `dbo.sp_UpdateISBN` | SQL_STORED_PROCEDURE |
| `dbo.uf_BidAnalysisDetailReqComb` | SQL_INLINE_TABLE_VALUED_FUNCTION |
| `dbo.uf_BidSummary` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_OrderBook03` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.usp_BidRequestItemMergeDetailDavid` | SQL_STORED_PROCEDURE |
| `dbo.usp_BidRequestItemMergeDetailDavidTest_notused` | SQL_STORED_PROCEDURE |

## Definition

```sql
CREATE      function [dbo].[uf_ItemDescription] (@pItemId int)  
returns varchar(1024)  
    
AS  
begin  
  
  return(  
    select case isnull(Category.AllowAddenda,0) 
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
                                  and Headings.Active = 1  
      left outer join dbo.BookTypes on BookTypes.BookTypeId = Items.EditionId  
      left outer join dbo.Keywords Keywords on Keywords.KeyWordId = Items.KeywordId  
                                                    and Keywords.Active = 1
      left outer join dbo.Vendors on Vendors.VendorId = Items.VendorId  
     where Items.ItemId = @pItemId)  
end
```
