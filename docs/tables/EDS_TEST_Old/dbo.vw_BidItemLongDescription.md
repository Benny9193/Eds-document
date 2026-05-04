# View: `dbo.vw_BidItemLongDescription`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ItemId` | int | NO |  |  |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `ItemDescription` | varchar(6035) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `CrossRefs` | USER_TABLE |
| `vw_CrossRefsLongDescription` | VIEW |
| `vw_ItemDescription` | VIEW |
| `vw_ItemDescriptionNoExtraNH` | VIEW |
| [`dbo.BidHeaders`](dbo.BidHeaders.md) | USER_TABLE |
| [`dbo.BidItems`](dbo.BidItems.md) | USER_TABLE |
| [`dbo.BidResults`](dbo.BidResults.md) | USER_TABLE |
| [`dbo.Bids`](dbo.Bids.md) | USER_TABLE |
| [`dbo.BidsCatalogList`](dbo.BidsCatalogList.md) | USER_TABLE |
| [`dbo.BookTypes`](dbo.BookTypes.md) | USER_TABLE |
| [`dbo.Catalog`](dbo.Catalog.md) | USER_TABLE |
| [`dbo.Category`](dbo.Category.md) | USER_TABLE |
| [`dbo.CrossRefs`](dbo.CrossRefs.md) | USER_TABLE |
| [`dbo.Headings`](dbo.Headings.md) | USER_TABLE |
| [`dbo.Items`](dbo.Items.md) | USER_TABLE |
| [`dbo.Keywords`](dbo.Keywords.md) | USER_TABLE |
| [`dbo.Vendors`](dbo.Vendors.md) | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| `dbo.uf_LookupPriceByBHLong` | SQL_TABLE_VALUED_FUNCTION |

## Definition

```sql
CREATE     view [dbo].[vw_BidItemLongDescription]
AS  
    select Items.ItemId,
           BidHeaders.BidHeaderId,
           case 
             when (BidItems.BidItemId is null or BidItems.BidItemId = 0)  then
			   case
			     when xr.CrossRefId > 0 and xr.FullDescription > '' then xr.FullDescription
			     when cxr.CrossrefId is not null and cxr.CrossRefId != 0 and xd.ItemDescription is not null and xd.ItemDescription != '' then xd.ItemDescription
				 else id.ItemDescription
               end
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
				end +
			   case
				 when isnull(BidHeaders.CompliantAlert,0) != 1 
				   or isnull(BidHeaders.BidType,0) = 2
				   or isnull(BidItems.BidItemId,0) = 0 
				   or BidItems.ItemBidType != 'Compliant' then
				   case 
				     when xr.CrossRefId > 0 and xr.FullDescription > '' then xr.FullDescription
				     when xd.CrossRefId is not null and xd.CrossRefId != 0 and xd.ItemDescription is not null and xd.ItemDescription != '' then xd.ItemDescription
				     else idne.ItemDescription
				   end
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
				 when ISNULL(rtrim(BidResults.VendorItemCode),'') = '' and isnull(rtrim(BidResults.ManufPartNoBid),'') != '' and isnull(rtrim(BidResults.ManufacturerBid),'') != '' then
				   char(13) + char(10) + 'Bid Manufacturer: ' + rtrim(BidResults.ManufacturerBid)
				 else
				   ''
			   end +
			   case 
				 when isnull(rtrim(BidResults.ManufPartNoBid),'') != '' and (BidHeaders.BidType = 2 or BidHeaders.CompliantAlert = 1) then
				   char(13) + char(10) + 'Bid Part Number: ' + rtrim(BidResults.ManufPartNoBid) 
				 when ISNULL(rtrim(BidResults.VendorItemCode),'') != '' then
				   char(13) + char(10) + 'Bid Part Number: ' + rtrim(BidResults.VendorItemCode) 
				 when ISNULL(rtrim(BidResults.VendorItemCode),'') = '' and isnull(rtrim(BidResults.ManufPartNoBid),'') != '' then
				   char(13) + char(10) + 'Bid Part Number: ' + rtrim(BidResults.ManufPartNoBid) 
				 else
				   ''
		       end
           end ItemDescription
--select *
      from dbo.Items 
      join vw_ItemDescription id on id.ItemId = Items.ItemId
      join vw_ItemDescriptionNoExtraNH idne on idne.ItemId = Items.ItemId
      join dbo.Category on Category.CategoryId = Items.CategoryId
      left outer join dbo.Catalog on Catalog.CatalogId = ParentCatalogId  
      left outer join dbo.Headings on Headings.HeadingId = Items.HeadingId  
      left outer join dbo.BookTypes on BookTypes.BookTypeId = Items.EditionId  
      left outer join dbo.Keywords Keywords on Keywords.KeyWordId = Items.KeywordId  
      left outer join dbo.Vendors on Vendors.VendorId = Items.VendorId  
      left outer join dbo.BidItems on BidItems.ItemId = Items.ItemId
      left outer join dbo.Bids on Bids.BidId = BidItems.BidId
                              and Bids.Active = 1
      left outer join dbo.BidResults on BidResults.BidResultsId = BidItems.BidResultsId
      left outer join dbo.BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
      left outer join dbo.CrossRefs as cxr on cxr.CrossRefId = 
        (select Top 1 CrossRefs.CrossRefId
           from dbo.CrossRefs with (nolock)
           join dbo.Catalog as cat on cat.CatalogId = CrossRefs.CatalogId
           join dbo.Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
           join dbo.BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
                                   and BidsCatalogList.CatalogId = Cat.CatalogId
          where CrossRefs.ItemId = Items.ItemId
            and CrossRefs.Active = 1
          order by cat.CatalogYear desc, CrossRefs.CatalogPrice, CrossRefs.CrossRefId)
      left outer join vw_CrossRefsLongDescription xd on xd.ItemId = Items.ItemId
	                                            and xd.CrossRefId = cxr.CrossRefId
	  left outer join CrossRefs xr on xr.CrossRefId = BidItems.CrossRefId
/*
        (select Top 1 lxr.CrossRefId 
           from dbo.vw_LatestCrossRef lxr with (nolock) 
          where lxr.BidHeaderId = Requisitions.BidHeaderId 
            and lxr.ItemId = Detail.ItemId
          order by lxr.CatalogYear desc, lxr.CatalogPrice, lxr.CrossRefId)
*/
-- where isnull(bidheaders.BidHeaderId,0) = 10454 and items.ItemId = 63450390
```
