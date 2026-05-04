# View: `dbo.vw_SearchDescription`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ItemId` | int | NO |  |  |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `ItemDescription` | nvarchar(max) | YES |  |  |
| 4 | `ShortDescription` | nvarchar(max) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidMappedItems` | USER_TABLE |
| `Items` | USER_TABLE |
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
| `dbo.ufn_RegExReplace` | unresolved |
| [`dbo.Vendors`](dbo.Vendors.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
--select * from CrossRefs where packedCode = 'TP6540'
--select * from vw_SearchDescription where ItemId = 919114389 and BidHeaderId = 12393 order by BidHeaderId desc
--select * from vw_SearchDescription where ItemId = 446482 and BidHeaderId = 11789 order by BidHeaderId desc
--select * from vw_SearchDescription where ItemId = 444601 and BidHeaderId = 12224 order by BidHeaderId desc

CREATE       view  [dbo].[vw_SearchDescription]
AS  
    select Items.ItemId,
           BidHeaders.BidHeaderId,
/*		   case isnull(Headings.HeadingId,0)
			 when 0 then ''
			 else 
			   ltrim(rtrim(isnull(Headings.Title,''))) +
			   case isnull(Keywords.KeywordId,0)
				 when 0 then ''
				 else
				   ' ' + ltrim(rtrim(isnull(Keywords.Keyword,'')))
			   end + ', '
			end +
*/
		   case 
             when (isnull(bi.BidItemId,0) != 0 
                   and bi.ItemBidType = 'Compliant') then
               isnull(rtrim(bi.Alternate),'') 
             else
				master.dbo.ufn_RegExReplace( master.dbo.ufn_RegExReplace( master.dbo.ufn_RegExReplace(dd.ShortDescription,'<[^>]*>',' ',1), '<[a-zA-Z]+.*[^>]$', ' ',1), '\s{2,}', ' ',1)
		   end +
		   case 
             when isnull(rtrim(bi.ManufacturerBid),'') != '' /*and (BidHeaders.BidType = 2 or BidHeaders.CompliantAlert = 1)*/ then
               char(13) + char(10) + 'Bid Manufacturer: ' + rtrim(bi.ManufacturerBid) + ' '
             when ISNULL(rtrim(bi.VendorItemCode),'') = '' and isnull(rtrim(bi.ManufPartNoBid),'') != '' and isnull(rtrim(bi.ManufacturerBid),'') != '' then
               char(13) + char(10) + 'Bid Manufacturer: ' + rtrim(bi.ManufacturerBid) + ' '
             else
               ''
           end +
           case 
             when isnull(rtrim(bi.ManufPartNoBid),'') != '' /*and (BidHeaders.BidType = 2 or BidHeaders.CompliantAlert = 1)*/ then
               'Bid Part Number: ' + rtrim(bi.ManufPartNoBid) + ' '
             when ISNULL(rtrim(bi.VendorItemCode),'') != '' then
               'Bid Part Number: ' + rtrim(bi.VendorItemCode) + ' ' 
			 when ISNULL(rtrim(bi.VendorItemCode),'') = '' and isnull(rtrim(bi.ManufPartNoBid),'') != '' then
               'Bid Part Number: ' + rtrim(bi.ManufPartNoBid) + ' '
             else
               ' '
           end as ItemDescription,
/*		   case isnull(Headings.HeadingId,0)
			 when 0 then ''
			 else 
			   ltrim(rtrim(isnull(Headings.Title,''))) +
			   case isnull(Keywords.KeywordId,0)
				 when 0 then ''
				 else
				   ' ' + ltrim(rtrim(isnull(Keywords.Keyword,'')))
			   end + ', '
			end +
*/
			left(case 
					when (isnull(bi.BidItemId,0) != 0 
						and bi.ItemBidType = 'Compliant') then
					  isnull(rtrim(bi.Alternate),'') 
					else
					  master.dbo.ufn_RegExReplace( master.dbo.ufn_RegExReplace( master.dbo.ufn_RegExReplace(dd.ShortDescription,'<[^>]*>',' ',1), '<[a-zA-Z]+.*[^>]$', ' ',1), '\s{2,}', ' ',1)
				  end,120) +
				  case
				    when len(case 
							   when (isnull(bi.BidItemId,0) != 0 
								   and bi.ItemBidType = 'Compliant') then
							     isnull(rtrim(bi.Alternate),'') 
							   else
								 master.dbo.ufn_RegExReplace( master.dbo.ufn_RegExReplace( master.dbo.ufn_RegExReplace(dd.ShortDescription,'<[^>]*>',' ',1), '<[a-zA-Z]+.*[^>]$', ' ',1), '\s{2,}', ' ',1)
						     end) > 120 then '...'
					else ''
				  end +
		   case 
             when isnull(rtrim(bi.ManufacturerBid),'') != '' /*and (BidHeaders.BidType = 2 or BidHeaders.CompliantAlert = 1)*/ then
               char(13) + char(10) + 'Bid Manufacturer: ' + rtrim(bi.ManufacturerBid) + ' '
             when ISNULL(rtrim(bi.VendorItemCode),'') = '' and isnull(rtrim(bi.ManufPartNoBid),'') != '' and isnull(rtrim(bi.ManufacturerBid),'') != '' then
               char(13) + char(10) + 'Bid Manufacturer: ' + rtrim(bi.ManufacturerBid) + ' '
             else
               ''
           end +
           case 
             when isnull(rtrim(bi.ManufPartNoBid),'') != '' /*and (BidHeaders.BidType = 2 or BidHeaders.CompliantAlert = 1)*/ then
               'Bid Part Number: ' + rtrim(bi.ManufPartNoBid) + ' '
             when ISNULL(rtrim(bi.VendorItemCode),'') != '' then
               'Bid Part Number: ' + rtrim(bi.VendorItemCode) + ' '
			 when ISNULL(rtrim(bi.VendorItemCode),'') = '' and isnull(rtrim(bi.ManufPartNoBid),'') != '' then
               'Bid Part Number: ' + rtrim(bi.ManufPartNoBid) + ' '
             else
               ' '
           end as ShortDescription
      from dbo.Items with (nolock)
      join dbo.Category on Category.CategoryId = Items.CategoryId
	  join dbo.BidHeaders on BidHeaders.CategoryId = Category.CategoryId
	  left outer join dbo.Catalog on Catalog.CatalogId = ParentCatalogId  
      left outer join dbo.Headings on Headings.HeadingId = Items.HeadingId  
      left outer join dbo.BookTypes on BookTypes.BookTypeId = Items.EditionId  
      left outer join dbo.Keywords Keywords on Keywords.KeyWordId = Items.KeywordId  
      left outer join dbo.Vendors on Vendors.VendorId = Items.VendorId 
	  outer apply (Select top 1 BidMappedItems.NewItemId, BidMappedItems.OrigItemId
	                 from BidMappedItems
					where BidMappedItems.BidHeaderId = BidHeaders.BidHeaderId
					  and BidMappedItems.OrigItemId = Items.ItemId
					order by BidMappedItems.MapDate desc, BidMappedItems.BidMappedItemId desc) bmi
	  outer apply (Select top 1 BidItems.BidItemId, BidItems.ItemBidType, BidItems.Alternate, BidResults.ManufacturerBid, BidResults.ManufPartNoBid, BidResults.VendorItemCode, coalesce(xr.AIFullDesc,xr.FullDescription) FullDescription, coalesce(xr.AIShortDesc,xr.ShortDescription) ShortDescription
	                 from dbo.BidItems
					 join dbo.Bids on Bids.BidId = BidItems.BidId
					          and Bids.Active = 1
					 join dbo.BidResults on BidResults.BidResultsId = BidItems.BidResultsId
					 join dbo.BidHeaders bh on bh.BidHeaderId = Bids.BidHeaderId
					                   and bh.BidHeaderId in (BidHeaders.BidHeaderId, (select top 1 bh1.BidHeaderId from BidHeaders bh1 where bh1.ParentBidHeaderId = BidHeaders.BidHeaderId))
									   and bh.Active = 1
					 left outer join dbo.CrossRefs xr on BidItems.CrossRefId = BidItems.CrossRefId
					where BidItems.ItemId = coalesce(bmi.NewItemId, Items.ItemId)
					order by case when Bids.VendorId = 7691 then 1 else 0 end, BidItems.Price) bi
	  outer apply (select Top 1 CrossRefs.CrossRefId, coalesce(CrossRefs.AIFullDesc,CrossRefs.FullDescription) FullDescription, coalesce(CrossRefs.AIShortDesc,CrossRefs.ShortDescription) ShortDescription
					from dbo.CrossRefs with (nolock)
					join dbo.Catalog as cat on cat.CatalogId = CrossRefs.CatalogId
					join dbo.Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
					join dbo.BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
											and BidsCatalogList.CatalogId = Cat.CatalogId
					where CrossRefs.ItemId = coalesce(bmi.NewItemId, Items.ItemId)
					  and CrossRefs.Active = 1
					order by Catalog.CatalogYear desc, CrossRefs.CatalogPrice, CrossRefs.CrossRefId) cxr
	  outer apply (  
	    select 
			coalesce(case when bi.FullDescription = '' then null else bi.FullDescription end, case when cxr.FullDescription = '' then null else cxr.FullDescription end, 
		                case when bi.ShortDescription = '' then null else bi.ShortDescription end, case when cxr.ShortDescription = '' then null else cxr.ShortDescription end, 
						Items.Description,'') +   
           case Category.Type   
             when 2 then   
               case isnull(Items.ParentCatalogId,0)   
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
               case when SUBSTRING(Items.SortSeq,1,8) != 'EDS' then ''
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
           end +
           case
             when bmi.OrigItemId is not null then
               char(13) + char(10) + '** Cross Referenced from Item ' + (select top 1 I.ItemCode from Items I where I.ItemId = bmi.OrigItemId)
             else ''
           end FullDescription,
           coalesce(bi.ShortDescription, cxr.ShortDescription, Items.Description, bi.FullDescription, cxr.FullDescription, '') +   
           case Category.Type   
             when 2 then   
               case isnull(Items.ParentCatalogId,0)   
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
               case when SUBSTRING(Items.SortSeq,1,8) != 'EDS' then ''
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
           end +
           case
             when bmi.OrigItemId is not null then
               char(13) + char(10) + '** Cross Referenced from Item ' + (select top 1 I.ItemCode from Items I where I.ItemId = bmi.OrigItemId)
             else ''
           end ShortDescription) dd
--	where Items.ItemId = 919114389
```
