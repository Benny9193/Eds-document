# Function: scalar: `dbo.uf_BidItemDescription`

_Generated on 2026-05-04T13:43:18.964Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_BidItemDescription` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2014-01-10 17:14:42 |
| Modified | 2017-03-21 16:49:57 |
| Encrypted | no |
| Returns | varchar(1536) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pItemId` | IN | int |  |
| 2 | `@pBidHeaderId` | IN | int |  |
| 3 | `@pBidItemId` | IN | int |  |
| 4 | `@pVendorId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `vw_ItemDescription` | VIEW |  |
| `vw_ItemdescriptionNoExtraNH` | VIEW |  |
| `dbo.BidHeaders` | USER_TABLE |  |
| `dbo.BidItems` | USER_TABLE |  |
| `dbo.BidResults` | USER_TABLE |  |
| `dbo.Bids` | USER_TABLE |  |
| `dbo.BidsCatalogList` | USER_TABLE |  |
| `dbo.Catalog` | USER_TABLE |  |
| `dbo.Category` | USER_TABLE |  |
| `dbo.CrossRefs` | USER_TABLE |  |
| `dbo.Headings` | USER_TABLE |  |
| `dbo.Items` | USER_TABLE |  |
| `dbo.Keywords` | USER_TABLE |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.sp_SearchItemsByReqHK` | SQL_STORED_PROCEDURE |

## Definition

```sql
CREATE function [dbo].[uf_BidItemDescription](@pItemId int, @pBidHeaderId int, @pBidItemId int, @pVendorId int)
returns varchar(1536)
AS  
begin
  if isnull(@pBidItemId,0) != 0
  begin
-- Bid Item Version
/*
    return(select case isnull(Category.AllowAddenda,0) 
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
				   end + ', '
				end 
		   end +
		   case
		     when isnull(BidHeaders.CompliantAlert,0) != 1 
		       or isnull(BidHeaders.BidType,0) = 2
		       or isnull(BidItems.BidItemId,0) = 0 
		       or BidItems.ItemBidType != 'Compliant' then
		       id.ItemDescription
		     else ''
		   end +
           case 
             when (/*(   isnull(BidHeaders.CompliantAlert,0) = 1
                    or isnull(BidHeaders.BidType,0) = 2)
                   and*/ isnull(BidItems.BidItemId,0) != 0 
                   and BidItems.ItemBidType = 'Compliant') then
               case 
				 when isnull(BidHeaders.CompliantAlert,0) != 1 
				   or isnull(BidHeaders.BidType,0) = 2
				   or isnull(BidItems.BidItemId,0) = 0 
				   or BidItems.ItemBidType != 'Compliant' then
                      CHAR(13) + char(10)
                 else ''
               end +
-- Removed 02/25/2015 DCH               'Compliant Item' + CHAR(13) + CHAR(10) +
               isnull(rtrim(BidItems.Alternate),'') 
             else
               case 
				 when isnull(BidHeaders.CompliantAlert,0) != 1 
				   or isnull(BidHeaders.BidType,0) = 2
				   or isnull(BidItems.BidItemId,0) = 0 
				   or BidItems.ItemBidType != 'Compliant' then ''
				 else
				   id.ItemDescription
               end 
		   end +
           case 
             when isnull(rtrim(BidResults.ManufacturerBid),'') != '' and (BidHeaders.BidType = 2 or BidHeaders.CompliantAlert = 1) then
               char(13) + char(10) + 'Bid Manufacturer: ' + rtrim(BidResults.ManufacturerBid)
             else
               ''
           end +
           case 
             when isnull(rtrim(BidResults.ManufPartNoBid),'') != '' and (BidHeaders.BidType = 2 or BidHeaders.CompliantAlert = 1) then
               char(13) + char(10) + 'Bid Part Number: ' + rtrim(BidResults.ManufPartNoBid)
             else
               ''
           end as ItemDescription
      from dbo.Items 
      join vw_ItemDescription id on id.ItemId = Items.ItemId
      join dbo.Category on Category.CategoryId = Items.CategoryId
      join dbo.BidItems on BidItems.ItemId = Items.ItemId
                       and BidItems.BidItemId = @pBidItemId
      join dbo.Bids on Bids.BidId = BidItems.BidId
      join dbo.BidResults on BidResults.BidResultsId = BidItems.BidResultsId
      join dbo.BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
      left outer join dbo.Headings on Headings.HeadingId = Items.HeadingId  
      left outer join dbo.Keywords Keywords on Keywords.KeyWordId = Items.KeywordId  
     left outer join dbo.CrossRefs as cxr on cxr.CrossRefId = 
        (select Top 1 CrossRefs.CrossRefId
           from dbo.CrossRefs with (nolock)
           join dbo.Catalog as cat on cat.CatalogId = CrossRefs.CatalogId
           join dbo.Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
           join dbo.BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
                                   and BidsCatalogList.CatalogId = Cat.CatalogId
          where CrossRefs.ItemId = Items.ItemId
            and CrossRefs.Active = 1
          order by Cat.CatalogYear desc, CrossRefs.CatalogPrice, CrossRefs.CrossRefId))
*/
  return(select
	       case isnull(Headings.HeadingId,0)
			 when 0 then ''
			 else 
			   ltrim(rtrim(isnull(Headings.Title,''))) +
			   case isnull(Keywords.KeywordId,0)
				 when 0 then ''
				 else
				   ' ' + ltrim(rtrim(isnull(Keywords.Keyword,'')))
			   end + ', '
			end +
		   case
		     when isnull(BidHeaders.CompliantAlert,0) != 1 
		       or isnull(BidHeaders.BidType,0) = 2
		       or isnull(BidItems.BidItemId,0) = 0 
		       or BidItems.ItemBidType != 'Compliant' then
		       idne.ItemDescription
		     else ''
		   end +
           case 
             when (/*(   isnull(BidHeaders.CompliantAlert,0) = 1
                    or isnull(BidHeaders.BidType,0) = 2)
                   and*/ isnull(BidItems.BidItemId,0) != 0 
                   and BidItems.ItemBidType = 'Compliant') then
               case 
				 when isnull(BidHeaders.CompliantAlert,0) != 1 
				   or isnull(BidHeaders.BidType,0) = 2
				   or isnull(BidItems.BidItemId,0) = 0 
				   or BidItems.ItemBidType != 'Compliant' then
                      CHAR(13) + char(10)
                 else ''
               end +
-- Removed 02/25/2015 DCH               'Compliant Item' + CHAR(13) + CHAR(10) +
               isnull(rtrim(BidItems.Alternate),'') 
             else
               case 
				 when isnull(BidHeaders.CompliantAlert,0) != 1 
				   or isnull(BidHeaders.BidType,0) = 2
				   or isnull(BidItems.BidItemId,0) = 0 
				   or BidItems.ItemBidType != 'Compliant' then ''
				 else
				   idne.ItemDescription
               end 
		   end +
           case 
             when isnull(rtrim(BidResults.ManufacturerBid),'') != '' and (BidHeaders.BidType = 2 or BidHeaders.CompliantAlert = 1) then
               char(13) + char(10) + 'Bid Manufacturer: ' + rtrim(BidResults.ManufacturerBid)
             else
               ''
           end +
           case 
             when isnull(rtrim(BidResults.ManufPartNoBid),'') != '' and (BidHeaders.BidType = 2 or BidHeaders.CompliantAlert = 1) then
               char(13) + char(10) + 'Bid Part Number: ' + rtrim(BidResults.ManufPartNoBid) 
             when ISNULL(rtrim(BidResults.VendorItemCode),'') != '' then
               char(13) + char(10) + 'Bid Part Number: ' + rtrim(BidResults.VendorItemCode) 
             else
               ''
           end 
      from dbo.Items 
      join vw_ItemDescription id on id.ItemId = Items.ItemId
      join vw_ItemdescriptionNoExtraNH idne on idne.ItemId = Items.ItemId
      join dbo.Category on Category.CategoryId = Items.CategoryId
      join dbo.BidItems on BidItems.ItemId = Items.ItemId
                       and BidItems.BidItemId = @pBidItemId
      join dbo.Bids on Bids.BidId = BidItems.BidId
      join dbo.BidResults on BidResults.BidResultsId = BidItems.BidResultsId
      join dbo.BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
      left outer join dbo.Headings on Headings.HeadingId = Items.HeadingId  
      left outer join dbo.Keywords Keywords on Keywords.KeyWordId = Items.KeywordId  
     left outer join dbo.CrossRefs as cxr on cxr.CrossRefId = 
        (select Top 1 CrossRefs.CrossRefId
           from dbo.CrossRefs with (nolock)
           join dbo.Catalog as cat on cat.CatalogId = CrossRefs.CatalogId
           join dbo.Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
           join dbo.BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
                                   and BidsCatalogList.CatalogId = Cat.CatalogId
          where CrossRefs.ItemId = Items.ItemId
            and CrossRefs.Active = 1
          order by Cat.CatalogYear desc, CrossRefs.CatalogPrice, CrossRefs.CrossRefId))
  end
  else
  begin
-- Catalog Version
    return(select top 1 id.ItemDescription as ItemDescription
      from dbo.Items 
      join vw_ItemDescription id on id.ItemId = Items.ItemId
      join dbo.Category on Category.CategoryId = Items.CategoryId
      join dbo.CrossRefs as cxr on cxr.CrossRefId = 
        (select Top 1 xr.CrossRefId
           from dbo.CrossRefs xr with (nolock)
           join dbo.Catalog cat on cat.CatalogId = xr.CatalogId
                               and cat.Active = 1
           join dbo.BidsCatalogList bcl on bcl.CatalogId = xr.CatalogId
           join dbo.Bids b on b.BidId = bcl.BidId
                          and b.Active = 1
           join BidHeaders bh on bh.BidHeaderId = b.BidHeaderId
                             and bh.BidHeaderId = @pBidHeaderId
          where xr.ItemId = Items.ItemId
            and xr.Active = 1
          order by cat.CatalogYear desc, xr.CatalogPrice, xr.CrossRefId)
      join dbo.BidsCatalogList on BidsCatalogList.CatalogId = cxr.CatalogId
      join dbo.Bids on Bids.BidId = BidsCatalogList.BidId
                   and Bids.Active = 1
--                   and Bids.VendorId = @pVendorId
      join dbo.BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
                         and BidHeaders.BidHeaderId = @pBidHeaderId
     where Items.ItemId = @pItemId)
  end
  return(null)
end
```
