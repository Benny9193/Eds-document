# View: `dbo.vw_SearchDescriptionBid`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

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
| `BidItems` | USER_TABLE |
| `BidMappedItems` | USER_TABLE |
| `BidResults` | USER_TABLE |
| `Crossrefs` | USER_TABLE |
| `Items` | USER_TABLE |
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
| `dbo.ufn_RegExReplace` | unresolved |
| [`dbo.Vendors`](dbo.Vendors.md) | USER_TABLE |
| [`master.dbo.ufn_RegExReplace`](../master/dbo.ufn_RegExReplace.md) | cross-database |

## Used by

_No other objects reference this view._

## Definition

```sql
--select * from CrossRefs where packedCode = 'TP6540'
--select * from vw_SearchDescription where ItemId = 919114389 and BidHeaderId = 12393 order by BidHeaderId desc
--select * from vw_SearchDescriptionBid where ItemId = 446482 and BidHeaderId = 11789 order by BidHeaderId desc
--select * from vw_SearchDescription where ItemId = 444601 and BidHeaderId = 12224 order by BidHeaderId desc

create   view  [dbo].[vw_SearchDescriptionBid]
AS  
	select Items.ItemId,
           BidHeaders.BidHeaderId,
		   case 
             when (isnull(bi.BidItemId,0) != 0 
                   and bi.ItemBidType = 'Compliant') then
               isnull(rtrim(bi.Alternate),'') 
             else
				master.dbo.ufn_RegExReplace( master.dbo.ufn_RegExReplace( master.dbo.ufn_RegExReplace(dd.ShortDescription,'<[^>]*>',' ',1), '<[a-zA-Z]+.*[^>]$', ' ',1), '\s{2,}', ' ',1)
           end as ItemDescription,
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
           end as ShortDescription
      from dbo.Items with (nolock)
      join dbo.Category on Category.CategoryId = Items.CategoryId
	  join dbo.BidHeaders on BidHeaders.CategoryId = Category.CategoryId
	  left outer join dbo.Catalog on Catalog.CatalogId = ParentCatalogId  
      left outer join dbo.Headings on Headings.HeadingId = Items.HeadingId  
      left outer join dbo.BookTypes on BookTypes.BookTypeId = Items.EditionId  
      left outer join dbo.Keywords Keywords on Keywords.KeyWordId = Items.KeywordId  
      left outer join dbo.Vendors on Vendors.VendorId = Items.VendorId 
	  left outer join BidMappedItems bmi on bmi.BidHeaderId = BidHeaders.BidHeaderId
	                                    and bmi.OrigItemId = Items.ItemId
	  join BidItems on BidItems.biditemId = (select top 1 BidItems.BidItemId
														 from dbo.BidItems
														 join dbo.Bids on Bids.BidId = BidItems.BidId
																      and Bids.Active = 1
																	  and Bids.BidHeaderId in (BidHeaders.BidHeaderId, (Select bh.BidHeaderId from BidHeaders bh where bh.ParentBidHeaderId = BidHeaders.BidHeaderId))
														 left outer join dbo.CrossRefs xr on BidItems.CrossRefId = BidItems.CrossRefId
														where BidItems.ItemId = coalesce(bmi.NewItemId, Items.ItemId)
														order by case when Bids.VendorId = 7691 then 1 else 0 end, BidItems.Price)
	  join BidResults on BidResults.BidResultsId = BidItems.BidResultsId
	  left outer join Crossrefs xr on xr.CrossRefId = BidItems.CrossRefId
	  outer apply (select BidItems.BidItemId, BidItems.ItemBidType, BidItems.Alternate, BidResults.ManufacturerBid, BidResults.ManufPartNoBid, BidResults.VendorItemCode, coalesce(xr.AIFullDesc,xr.FullDescription) FullDescription, coalesce(xr.AIShortDesc,xr.ShortDescription) ShortDescription) bi
	  outer apply (  
	    select 
			coalesce(case when bi.FullDescription = '' then null else bi.FullDescription end,  
		                case when bi.ShortDescription = '' then null else bi.ShortDescription end, 
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
				''
			end +
           case
             when bmi.OrigItemId is not null then
               char(13) + char(10) + '** Cross Referenced from Item ' + (select top 1 I.ItemCode from Items I where I.ItemId = bmi.OrigItemId)
             else ''
           end FullDescription,
           coalesce(bi.ShortDescription, Items.Description, bi.FullDescription, '') +   
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
				''
           end +
           case
             when bmi.OrigItemId is not null then
               char(13) + char(10) + '** Cross Referenced from Item ' + (select top 1 I.ItemCode from Items I where I.ItemId = bmi.OrigItemId)
             else ''
           end ShortDescription) dd
--	where Items.ItemId = 919114389
```
