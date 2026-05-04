# Function: table-valued: `dbo.ufn_CatalogRefsItem`

_Generated on 2026-05-04T14:49:07.443Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `ufn_CatalogRefsItem` |
| Kind | Function (table-valued) |
| sys.objects.type | `TF` (SQL_TABLE_VALUED_FUNCTION) |
| Created | 2018-02-11 20:42:10 |
| Modified | 2018-05-20 23:07:30 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBidHeaderId` | IN | int |  |
| 2 | `@pItemId` | IN | int |  |
| 3 | `@pVendorId` | IN | int |  |
| 4 | `@pBidItemId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.BidHeaders` | USER_TABLE |  |
| `dbo.BidItems` | USER_TABLE |  |
| `dbo.Bids` | USER_TABLE |  |
| `dbo.BidsCatalogList` | USER_TABLE |  |
| `dbo.Catalog` | USER_TABLE |  |
| `dbo.Category` | USER_TABLE |  |
| `dbo.CrossRefs` | USER_TABLE |  |
| `dbo.Items` | USER_TABLE |  |
| `dbo.Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function [dbo].[ufn_CatalogRefsItem] (@pBidHeaderId int, @pItemId int, @pVendorId int, @pBidItemId int)
returns @catTable table (
					catalogId int null,
					catalogName varchar(50) null,
					catalogPage varchar(10) null,
					pdfAvailable tinyint null,
					crossRefId int null,
					packedCode varchar(50) null,
					searchCode varchar(50) null,
					vendorLink varchar(255) null,
					vendorName varchar(255) null)
as
begin
declare @ReturnValue varchar(4096),
		@ItemId int,
		@BidHeaderId int,
		@VendorId int,
		@BidItemId int,
		@CrossRefId int,
		@useCatalogViewer int,
		@ItemDesc varchar(max),
		@Catalogs varchar(max),
		@ItemInfo varchar(max)
		
select @ItemId = @pItemId,
       @BidHeaderId = @pBidHeaderId,
       @VendorId = @pVendorId,
       @BidItemId = @pBidItemId,
       @CrossRefId = BidItems.CrossRefId,
       @usecatalogViewer = isnull(Category.useCatalogViewer,0)
  from dbo.Items with (nolock)
  join dbo.Category on Category.CategoryId = Items.CategoryId
  left outer join dbo.BidHeaders on BidHeaders.BidHeaderId = @pBidHeaderId 
  left outer join dbo.BidItems on BidItems.BidItemId = @pBidItemId
 where Items.ItemId = @pItemId
 
if @useCatalogViewer = 1
begin
/*	if isnull(@BidHeaderId,0) = 0
	begin
	  insert @catTable (catalogId, catalogName, catalogPage, pdfAvailable, crossRefId, searchCode, vendorLink, vendorName)
		select isnull(Catalog.CatalogId,0) CatalogId,
			   Catalog.Name CatalogName,
			   case isnull(CrossRefs.Page,'') 
				 when '' then '' 
				 else convert(varchar(16),CrossRefs.Page)
			   end CatPage,
			   isnull(Catalog.PDFAvailable,0) PDFAvail,
			   CrossRefs.CrossRefId,
			   CrossRefs.VendorItemCode,
			   Catalog.WebLink,
			   Vendors.Name
		from dbo.CrossRefs
		join dbo.Catalog on Catalog.CatalogId = Crossrefs.CatalogId
						and Catalog.Active = 1
						and Catalog.CatalogYear = (select top 1 cat.CatalogYear from Catalog cat where cat.VendorId = Catalog.VendorId and cat.CategoryId = Catalog.CategoryId and Cat.Active = 1 order by cat.CatalogYear desc)
						and Catalog.Name != 'EDS'
		join dbo.Vendors on Vendors.VendorId = Catalog.VendorId
	   where CrossRefs.ItemId = @ItemId
		 and CrossRefs.Active = 1
	end
	else
*/	if isnull(@BidItemId,0) != 0
	begin
	  insert @catTable (catalogId, catalogName, catalogPage, pdfAvailable, crossRefId, searchCode, vendorLink, vendorName)
		select isnull(Catalog.CatalogId,0) CatalogId,
			   Catalog.Name CatalogName,
			   case isnull(CrossRefs.Page,'') 
				 when '' then '' 
				 else convert(varchar(16),CrossRefs.Page)
			   end CatPage,
			   isnull(Catalog.PDFAvailable,0) PDFAvail,
			   CrossRefs.CrossRefId,
			   CrossRefs.VendorItemCode,
			   Catalog.WebLink,
			   Vendors.Name
		from dbo.BidItems
		join dbo.CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
		join dbo.Catalog on Catalog.CatalogId = Crossrefs.CatalogId
						and Catalog.Active = 1
		join dbo.Vendors on Vendors.VendorId = Catalog.VendorId
	   where BidItems.BidItemId = @BidItemId
	end
/*	else
	if isnull(@CrossRefId,0) = 0
	begin
	  insert @catTable (catalogId, catalogName, catalogPage, pdfAvailable, crossRefId, searchCode, vendorLink, vendorName)
		select isnull(Catalog.CatalogId,0) CatalogId,
			   Catalog.Name CatalogName,
			   case isnull(CrossRefs.Page,'') 
				 when '' then '' 
				 else convert(varchar(16),CrossRefs.Page)
			   end CatPage,
			   isnull(Catalog.PDFAvailable,0) PDFAvail,
			   CrossRefs.CrossRefId,
			   CrossRefs.VendorItemCode,
			   Catalog.WebLink,
			   Vendors.Name
		from dbo.CrossRefs
		join dbo.Catalog on Catalog.CatalogId = Crossrefs.CatalogId
						and Catalog.Active = 1
		join dbo.BidsCatalogList on BidsCatalogList.CatalogId = Catalog.CatalogId
		join dbo.Bids on Bids.BidId = BidsCatalogList.BidId
					 and Bids.Active = 1
					 and Bids.BidHeaderId = @BidHeaderId
					 and Bids.VendorId = @VendorId
		join dbo.Vendors on Vendors.VendorId = Catalog.VendorId
	   where CrossRefs.ItemId = @ItemId
		 and CrossRefs.Active = 1
	end
*/	else
	begin
	  insert @catTable (catalogId, catalogName, catalogPage, pdfAvailable, crossRefId, searchCode, vendorLink, vendorName)
		select isnull(Catalog.CatalogId,0) CatalogId,
			   Catalog.Name CatalogName,
			   case isnull(CrossRefs.Page,'') 
				 when '' then '' 
				 else convert(varchar(16),CrossRefs.Page)
			   end CatPage,
			   isnull(Catalog.PDFAvailable,0) PDFAvail,
			   CrossRefs.CrossRefId,
			   CrossRefs.VendorItemCode,
			   Catalog.WebLink,
			   Vendors.Name
		from dbo.CrossRefs
		join dbo.Catalog on Catalog.CatalogId = Crossrefs.CatalogId
						and Catalog.Active = 1
		join dbo.BidsCatalogList on BidsCatalogList.CatalogId = Catalog.CatalogId
		join dbo.Bids on Bids.BidId = BidsCatalogList.BidId
					 and Bids.Active = 1
					 and Bids.BidHeaderId = @BidHeaderId
					 and Bids.VendorId = @VendorId
		join dbo.Vendors on Vendors.VendorId = Catalog.VendorId
	   where CrossRefs.CrossRefId = @CrossRefId
		 and CrossRefs.Active = 1
	end

/*	if @@rowcount = 0
	begin
	-- Show All if this vendor does not have a reference in our system
	  insert @catTable (catalogId, catalogName, catalogPage, pdfAvailable, crossRefId, searchCode, vendorLink, vendorName)
		select isnull(Catalog.CatalogId,0) CatalogId,
			   Catalog.Name CatalogName,
			   case isnull(CrossRefs.Page,'') 
				 when '' then '' 
				 else convert(varchar(16),CrossRefs.Page)
			   end CatPage,
			   isnull(Catalog.PDFAvailable,0) PDFAvail,
			   CrossRefs.CrossRefId,
			   CrossRefs.VendorItemCode,
			   Catalog.WebLink,
			   Vendors.Name
		  from dbo.CrossRefs
		  join dbo.Catalog on Catalog.CatalogId = Crossrefs.CatalogId
						  and Catalog.Active = 1
		  join dbo.BidsCatalogList on BidsCatalogList.CatalogId = Catalog.CatalogId
		  join dbo.Bids on Bids.BidId = BidsCatalogList.BidId
					   and Bids.Active = 1
					   and Bids.BidHeaderId = @BidHeaderId
		  join dbo.Vendors on Vendors.VendorId = Catalog.VendorId
		 where CrossRefs.ItemId = @ItemId
		   and CrossRefs.Active = 1
	end
*/
end
else
begin
	select @ReturnValue = null
end
return
end
```
