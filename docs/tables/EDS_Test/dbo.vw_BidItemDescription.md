# View: `dbo.vw_BidItemDescription`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ItemId` | int | NO |  |  |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `ItemDescription` | nvarchar(4000) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `CrossRefs` | USER_TABLE |
| `vw_CrossRefsDescription` | VIEW |
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
| `dbo.uf_LookupItemCodeByReqVendor` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_LookupItemCodeByReqVendor_BK20241205` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_LookupItemCodeByReqVendor_BK20241227` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_LookupPriceByBH` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.usp_GetVendorPricing` | SQL_STORED_PROCEDURE |
| `dbo.usp_SetPricing` | SQL_STORED_PROCEDURE |
| `dbo.usp_SetPricing_SearchDataDB` | SQL_STORED_PROCEDURE |

## Definition

```sql
--select * from Items where ItemCode = 'EDS01016' and CategoryId = 3
--Select * from vw_BidItemDescription where ItemId = 458962 and BidHeaderId = 13369
CREATE  view [dbo].[vw_BidItemDescription]
AS  
    select Items.ItemId,
           BidHeaders.BidHeaderId,
           case 
             when (BidItems.BidItemId is null or BidItems.BidItemId = 0)  then
			   case
			     when cxr.CrossrefId is not null and cxr.CrossRefId != 0 and xd.ItemDescription is not null and xd.ItemDescription != '' then xd.ItemDescription
				 else id.ItemDescription
               end
             else
			 /* dch removed 10/28/2025
			   case isnull(Headings.HeadingId,0)
				 when 0 then ''
				 else 
				   ltrim(rtrim(isnull(Headings.Title,''))) +
				   case isnull(Keywords.KeywordId,0)
					 when 0 then ''
					 else
					   ' ' + ltrim(rtrim(isnull(Keywords.Keyword,'')))
				   end + ', '
				end +*/
			   case
				 when isnull(BidHeaders.CompliantAlert,0) != 1 
				   or isnull(BidHeaders.BidType,0) = 2
				   or isnull(BidItems.BidItemId,0) = 0 
				   or BidItems.ItemBidType != 'Compliant' then
					   coalesce(bixr.AIShortDesc, 
					            case when trim(bixr.ShortDescription) = '' then null else trim(bixr.ShortDescription) end,
								BidResults.AIShortDesc,
								trim(idne.ItemDescription),'')
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
				   coalesce(case when BidItems.Alternate like '%Sold As%' or BidItems.Alternate like '%Priced As%' or BidItems.Alternate like '%Bid As%' then rtrim(BidItems.Alternate) else null end, case when coalesce(trim(bixr.AIShortDesc),'') = '' then null else trim(bixr.AIShortDesc) end, BidResults.AIShortDesc, rtrim(BidItems.Alternate), '') 
				 else
				   case 
					 when isnull(BidHeaders.CompliantAlert,0) != 1 
					   or isnull(BidHeaders.BidType,0) = 2
					   or isnull(BidItems.BidItemId,0) = 0 
					   or BidItems.ItemBidType != 'Compliant' then ''
					 else
					   coalesce(bixr.AIShortDesc, 
					            case when trim(bixr.ShortDescription) = '' then null else trim(bixr.ShortDescription) end,
								BidResults.AIShortDesc,
								trim(idne.ItemDescription),'')
				   end 
			   end /* dch removed 10/28/2025 
			   +
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
		       end */
           end ItemDescription
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
      left outer join vw_CrossRefsDescription xd on xd.ItemId = Items.ItemId
	                                            and xd.CrossRefId = cxr.CrossRefId
	  left outer join CrossRefs bixr on bixr.CrossRefId = BidItems.CrossRefId
/*
        (select Top 1 lxr.CrossRefId 
           from dbo.vw_LatestCrossRef lxr with (nolock) 
          where lxr.BidHeaderId = Requisitions.BidHeaderId 
            and lxr.ItemId = Detail.ItemId
          order by lxr.CatalogYear desc, lxr.CatalogPrice, lxr.CrossRefId)
*/
```
