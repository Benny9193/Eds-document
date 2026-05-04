# Function: scalar: `dbo.uf_CatalogRefsDetail`

_Generated on 2026-05-04T14:49:07.357Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_CatalogRefsDetail` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2013-01-20 14:33:53 |
| Modified | 2017-04-17 12:29:57 |
| Encrypted | no |
| Returns | varchar(8000) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pDetailId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidItems` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `BidsCatalogList` | USER_TABLE |  |
| `Catalog` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `dbo.BidItems` | USER_TABLE |  |
| `dbo.Bids` | USER_TABLE |  |
| `dbo.BidsCatalogList` | USER_TABLE |  |
| `dbo.Catalog` | USER_TABLE |  |
| `dbo.Category` | USER_TABLE |  |
| `dbo.CrossRefs` | USER_TABLE |  |
| `dbo.Detail` | USER_TABLE |  |
| `dbo.Requisitions` | USER_TABLE |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.vw_ReqDetailAsp1` | VIEW |

## Definition

```sql
--select eds.dbo.uf_CatalogRefsDetail(41813931)

CREATE function [dbo].[uf_CatalogRefsDetail] (@pDetailId int)
returns varchar(8000)
 
as
begin
declare @ReturnValue varchar(8000),
		@ItemId int,
		@BidHeaderId int,
		@VendorId int,
		@BidItemId int,
		@CrossRefId int,
		@useCatalogViewer int,
		@ItemDesc varchar(max),
		@Catalogs varchar(max),
		@DetailInfo varchar(max),
		@DebugInfo varchar(max)
		
declare @catTable table (
					catalogId int null,
					catalogName varchar(50) null,
					catalogPage varchar(10) null,
					pdfAvailable tinyint null,
					crossRefId int null,
					packedCode varchar(50) null,
					searchCode varchar(50) null)

select @ItemId = Detail.ItemId,
       @BidHeaderId = case isnull(Bids.BidHeaderId,0) when 0 then Requisitions.BidHeaderId else Bids.BidHeaderId end,
       @VendorId = Detail.VendorId,
       @BidItemId = Detail.BidItemId,
       @CrossRefId = BidItems.CrossRefId,
       @usecatalogViewer = isnull(Category.useCatalogViewer,0)
  from dbo.Detail with (nolock)
  join dbo.Requisitions on Requisitions.RequisitioNId = Detail.RequisitionId
  join dbo.Category on Category.CategoryId = Requisitions.CategoryId
  left outer join dbo.BidItems on BidItems.BidItemId = Detail.BidItemId
  left outer join dbo.Bids on Bids.BidId = BidItems.BidId
 where Detail.DetailId = @pDetailId


if @useCatalogViewer = 1
begin
	if isnull(@BidHeaderId,0) = 0
	begin
	  insert @catTable (catalogId, catalogName, catalogPage, pdfAvailable, crossRefId, PackedCode, searchCode)
		select isnull(Catalog.CatalogId,0) CatalogId,
			   Catalog.Name CatalogName,
			   case isnull(CrossRefs.Page,'') 
				 when '' then '' 
				 else convert(varchar(16),CrossRefs.Page)
			   end CatPage,
			   isnull(Catalog.PDFAvailable,0) PDFAvail,
			   max(CrossRefs.CrossRefId) CrossRefId,
			   CrossRefs.PackedCode,
			   CrossRefs.VendorItemCode
		from dbo.CrossRefs
		join dbo.Catalog on Catalog.CatalogId = Crossrefs.CatalogId
						and Catalog.Active = 1
						and Catalog.CatalogYear = (select top 1 cat.CatalogYear from Catalog cat where cat.VendorId = Catalog.VendorId and cat.CategoryId = Catalog.CategoryId and Cat.Active = 1 order by cat.CatalogYear desc)
						and Catalog.Name != 'EDS'
	   where CrossRefs.ItemId = @ItemId
		 and CrossRefs.Active = 1
	   group by isnull(Catalog.CatalogId,0),
			   Catalog.Name,
			   case isnull(CrossRefs.Page,'') 
				 when '' then '' 
				 else convert(varchar(16),CrossRefs.Page)
			   end,
			   isnull(Catalog.PDFAvailable,0),
			   CrossRefs.PackedCode,
			   CrossRefs.VendorItemCode
	end
	else
	if isnull(@CrossRefId,0) = 0
	begin
	  insert @catTable (catalogId, catalogName, catalogPage, pdfAvailable, crossRefId, PackedCode, searchCode)
		select isnull(Catalog.CatalogId,0) CatalogId,
			   Catalog.Name CatalogName,
			   case isnull(CrossRefs.Page,'') 
				 when '' then '' 
				 else convert(varchar(16),CrossRefs.Page)
			   end CatPage,
			   isnull(Catalog.PDFAvailable,0) PDFAvail,
			   max(CrossRefs.CrossRefId) CrossRefId,
			   CrossRefs.PackedCode,
			   CrossRefs.VendorItemCode
		from dbo.CrossRefs
		join dbo.Catalog on Catalog.CatalogId = Crossrefs.CatalogId
						and Catalog.Active = 1
		join dbo.BidsCatalogList on BidsCatalogList.CatalogId = Catalog.CatalogId
		join dbo.Bids on Bids.BidId = BidsCatalogList.BidId
					 and Bids.Active = 1
					 and Bids.BidHeaderId = @BidHeaderId
					 and Bids.VendorId = @VendorId
	   where CrossRefs.ItemId = @ItemId
		 and CrossRefs.Active = 1
	   group by isnull(Catalog.CatalogId,0),
			   Catalog.Name,
			   case isnull(CrossRefs.Page,'') 
				 when '' then '' 
				 else convert(varchar(16),CrossRefs.Page)
			   end,
			   isnull(Catalog.PDFAvailable,0),
			   CrossRefs.PackedCode,
			   CrossRefs.VendorItemCode
	end
	else
	begin
	  insert @catTable (catalogId, catalogName, catalogPage, pdfAvailable, crossRefId, PackedCode, searchCode)
		select isnull(Catalog.CatalogId,0) CatalogId,
			   Catalog.Name CatalogName,
			   case isnull(CrossRefs.Page,'') 
				 when '' then '' 
				 else convert(varchar(16),CrossRefs.Page)
			   end CatPage,
			   isnull(Catalog.PDFAvailable,0) PDFAvail,
			   max(CrossRefs.CrossRefId) CrossRefId,
			   CrossRefs.PackedCode,
			   CrossRefs.VendorItemCode
		from dbo.CrossRefs
		join dbo.Catalog on Catalog.CatalogId = Crossrefs.CatalogId
						and Catalog.Active = 1
		join dbo.BidsCatalogList on BidsCatalogList.CatalogId = Catalog.CatalogId
		join dbo.Bids on Bids.BidId = BidsCatalogList.BidId
					 and Bids.Active = 1
					 and Bids.BidHeaderId = @BidHeaderId
					 and Bids.VendorId = @VendorId
	   where CrossRefs.CrossRefId = @CrossRefId
		 and CrossRefs.Active = 1
	   group by isnull(Catalog.CatalogId,0),
			   Catalog.Name,
			   case isnull(CrossRefs.Page,'') 
				 when '' then '' 
				 else convert(varchar(16),CrossRefs.Page)
			   end,
			   isnull(Catalog.PDFAvailable,0),
			   CrossRefs.PackedCode,
			   CrossRefs.VendorItemCode

	  if @@rowCount = 0
	  begin
		  insert @catTable (catalogId, catalogName, catalogPage, pdfAvailable, crossRefId, PackedCode, searchCode)
			select isnull(Catalog.CatalogId,0) CatalogId,
				   Catalog.Name CatalogName,
				   case isnull(BidItems.PageNo,'') 
					 when '' then '' 
					 else convert(varchar(16),BidItems.PageNo)
				   end CatPage,
				   isnull(Catalog.PDFAvailable,0) PDFAvail,
				   BidItems.CrossRefId,
				   BidItems.PackedVendorItemCode,
				   BidItems.VendorItemCode
			from BidItems
			join Bids on Bids.BidId = BidItems.BidId
						 and Bids.VendorId = @VendorId
			join BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
			join Catalog on Catalog.CatalogId = BidsCatalogList.CatalogId
			            and Catalog.Active = 1 
		   where BidItems.BidItemId = @BidItemId
		   group by isnull(Catalog.CatalogId,0),
				   Catalog.Name,
				   case isnull(BidItems.PageNo,'') 
					 when '' then '' 
					 else convert(varchar(16),BidItems.PageNo)
				   end,
				   isnull(Catalog.PDFAvailable,0),
				   BidItems.PackedVendorItemCode,
				   BidItems.VendorItemCode,
				   BidItems.CrossRefId
		end
	end

	if isnull((select count(*) from @CatTable),0) = 0
	begin
	-- Show All if this vendor does not have a reference in our system
	  insert @catTable (catalogId, catalogName, catalogPage, pdfAvailable, crossRefId, PackedCode, searchCode)
		select isnull(Catalog.CatalogId,0) CatalogId,
			   Catalog.Name CatalogName,
			   case isnull(CrossRefs.Page,'') 
				 when '' then '' 
				 else convert(varchar(16),CrossRefs.Page)
			   end CatPage,
			   isnull(Catalog.PDFAvailable,0) PDFAvail,
			   max(CrossRefs.CrossRefId) CrossRefId,
			   CrossRefs.PackedCode,
			   CrossRefs.VendorItemCode
		  from dbo.CrossRefs
		  join dbo.Catalog on Catalog.CatalogId = Crossrefs.CatalogId
						  and Catalog.Active = 1
		  join dbo.BidsCatalogList on BidsCatalogList.CatalogId = Catalog.CatalogId
		  join dbo.Bids on Bids.BidId = BidsCatalogList.BidId
					   and Bids.Active = 1
					   and Bids.BidHeaderId = @BidHeaderId
		 where CrossRefs.ItemId = @ItemId
		   and CrossRefs.Active = 1
		 group by isnull(Catalog.CatalogId,0),
			   Catalog.Name,
			   case isnull(CrossRefs.Page,'') 
				 when '' then '' 
				 else convert(varchar(16),CrossRefs.Page)
			   end,
			   isnull(Catalog.PDFAvailable,0),
			   CrossRefs.PackedCode,
			   CrossRefs.VendorItemCode
	end
    else
    begin
	  insert @catTable (catalogId, catalogName, catalogPage, pdfAvailable, crossRefId, PackedCode, searchCode)
		select isnull(Catalog.CatalogId,0) CatalogId,
			   Catalog.Name CatalogName,
			   case isnull(CrossRefs.Page,'') 
				 when '' then '' 
				 else convert(varchar(16),CrossRefs.Page)
			   end CatPage,
			   isnull(Catalog.PDFAvailable,0) PDFAvail,
			   max(CrossRefs.CrossRefId) CrossRefId,
			   CrossRefs.PackedCode,
			   CrossRefs.VendorItemCode
		from @catTable ct 
		join dbo.CrossRefs on CrossRefs.PackedCode = ct.PackedCode
		                  and CrossRefs.Active = 1
		join dbo.Catalog on Catalog.CatalogId = CrossRefs.CatalogId
						and Catalog.Active = 1
		join dbo.BidsCatalogList on BidsCatalogList.CatalogId = Catalog.CatalogId
		join dbo.Bids on Bids.BidId = BidsCatalogList.BidId
					 and Bids.Active = 1
					 and Bids.BidHeaderId = @BidHeaderId
					 and Bids.VendorId = @VendorId
		left outer join @catTable cte on cte.CatalogId = Catalog.CatalogId
	   where cte.catalogId is null
	   group by isnull(Catalog.CatalogId,0),
			   Catalog.Name,
			   case isnull(CrossRefs.Page,'') 
				 when '' then '' 
				 else convert(varchar(16),CrossRefs.Page)
			   end,
			   isnull(Catalog.PDFAvailable,0),
			   CrossRefs.PackedCode,
			   CrossRefs.VendorItemCode
    end
/*    select @ItemDesc = (select 1 as tag,
	                           0 as parent,
	                           dd.ItemDescription as [ItemDescription!1!!CDATA]
                          from Detail
                          join vw_DetailDescription dd on dd.DetailId = Detail.DetailId
                         where Detail.DetailId = @pDetailId
                           for xml explicit)
*/
    select @DetailInfo = isnull((select DetailId
                                   from Detail with (nolock)
                                  where Detail.DetailId = @pDetailId
                                  for xml path('')),'')
                                  
    select @Catalogs = (select cast(ct.CatalogId as varchar) [CatalogId], 
	                           CatalogName as [CatalogName], 
	                           ct.CatalogPage as [CatPage], 
	                           cast(pdfAvailable as varchar) [PDFAvail], 
	                           isnull(searchCode,'') [searchCode]
	                      from @catTable ct 
	                     group by cast(ct.CatalogId as varchar), 
	                           CatalogName, 
	                           ct.CatalogPage, 
	                           cast(pdfAvailable as varchar), 
	                           isnull(searchCode,'')
	                      for xml path('Catalog'))

	select @DebugInfo = (select isnull(cast(@ItemId as varchar),'<null>') as ItemId, isnull(cast(@BidHeaderId as varchar),'<null>') as BidHeaderId, isnull(cast(@VendorId as varchar),'<null>') as VendorId, isnull(cast(@BidItemId as varchar),'<null>') as BidItemId, isnull(cast(@CrossrefId as varchar),'<null>') as CrossRefId, isnull(cast(@useCatalogViewer as varchar),'<null>') as useCatalogViewer for xml path('DebugInfo'))

    select @ReturnValue = '<Catalogs>' + @DetailInfo + isnull(@Catalogs,'') + '</Catalogs>'
--    select @ReturnValue = '<Catalogs>' + @ItemDesc + @Catalogs + '</Catalogs>'
/*
	select @ReturnValue = isnull((select isnull(dd.ItemDescription,'') ItemDescription, isnull(
	  (select cast(CatalogId as varchar) CatalogId, CatalogName, CatalogPage CatPage, cast(pdfAvailable as varchar) PDFAvail, isnull(searchCode,'') searchCode
		from @catTable
		 for xml path('Catalog'),type
		 ),'<Catalogs></Catalogs>')
      from Detail with (nolock)
      join vw_DetailDescription dd on dd.DetailId = Detail.DetailId
     where Detail.DetailId = @pDetailId
     for xml path(''),
 	 root('Catalogs')),'Empty')
*/
end
else
begin
	select @ReturnValue = null
end
return(@ReturnValue)
end
```
