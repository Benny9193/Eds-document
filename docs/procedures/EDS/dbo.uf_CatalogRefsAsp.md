# Function: scalar: `dbo.uf_CatalogRefsAsp`

_Generated on 2026-05-04T14:49:07.357Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_CatalogRefsAsp` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2012-09-19 11:38:29 |
| Modified | 2013-01-14 15:56:25 |
| Encrypted | no |
| Returns | varchar(4096) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pItemId` | IN | int |  |
| 2 | `@pBidHeaderId` | IN | int |  |
| 3 | `@pVendorId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Catalog` | USER_TABLE |  |
| `dbo.Bids` | USER_TABLE |  |
| `dbo.BidsCatalogList` | USER_TABLE |  |
| `dbo.Catalog` | USER_TABLE |  |
| `dbo.CrossRefs` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function [dbo].[uf_CatalogRefsAsp] (@pItemId int, @pBidHeaderId int, @pVendorId int)
returns varchar(4096)
 
as
begin
declare @ReturnValue varchar(4096)

if isnull(@pBidHeaderId,0) = 0
begin
select @ReturnValue = (
  select cast(isnull(Catalog.CatalogId,0) as varchar) CatalogId,
       Catalog.Name CatalogName,
       case isnull(CrossRefs.Page,'') 
         when '' then '' 
         else rtrim(convert(varchar(16),CrossRefs.Page)) 
       end CatPage,
       isnull(cast(Catalog.PDFAvailable as char(1)),'0') PDFAvail
  from dbo.CrossRefs
  join dbo.Catalog on Catalog.CatalogId = Crossrefs.CatalogId
                  and Catalog.Active = 1
                  and Catalog.CatalogYear = (select top 1 cat.CatalogYear from Catalog cat where cat.VendorId = Catalog.VendorId and cat.CategoryId = Catalog.CategoryId and Cat.Active = 1 order by cat.CatalogYear desc)
                  and Catalog.Name != 'EDS'
 where CrossRefs.ItemId = @pItemId
   and CrossRefs.Active = 1
 for xml path('Catalog'),
 root('Catalogs'))
end
else
begin
select @ReturnValue = (
  select cast(isnull(Catalog.CatalogId,0) as varchar) CatalogId,
       Catalog.Name CatalogName,
       case isnull(CrossRefs.Page,'') 
         when '' then '' 
         else rtrim(convert(varchar(16),CrossRefs.Page)) 
       end CatPage,
       isnull(cast(Catalog.PDFAvailable as char(1)),'0') PDFAvail
  from dbo.CrossRefs
  join dbo.Catalog on Catalog.CatalogId = Crossrefs.CatalogId
                  and Catalog.Active = 1
  join dbo.BidsCatalogList on BidsCatalogList.CatalogId = Catalog.CatalogId
  join dbo.Bids on Bids.BidId = BidsCatalogList.BidId
               and Bids.Active = 1
               and Bids.BidHeaderId = @pBidHeaderId
               and Bids.VendorId = @pVendorId
 where CrossRefs.ItemId = @pItemId
   and CrossRefs.Active = 1
 for xml path('Catalog'),
 root('Catalogs'))
end

return(@ReturnValue)
end
```
