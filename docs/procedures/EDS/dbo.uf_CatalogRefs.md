# Function: scalar: `dbo.uf_CatalogRefs`

_Generated on 2026-05-04T14:49:07.356Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_CatalogRefs` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2004-10-08 10:57:44 |
| Modified | 2014-01-31 15:34:42 |
| Encrypted | no |
| Returns | varchar(4096) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pItemId` | IN | int |  |
| 2 | `@pVendorId` | IN | int |  |
| 3 | `@pBidHeaderId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Catalog` | USER_TABLE |  |
| `dbo.Bids` | USER_TABLE |  |
| `dbo.BidsCatalogList` | USER_TABLE |  |
| `dbo.Catalog` | USER_TABLE |  |
| `dbo.CrossRefs` | USER_TABLE |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.uf_OrderBook` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_OrderBookNew` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_OrderBookSaved` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_OrderBookTest` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_OrderBookTest1` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_OrderOrBudgetBook` | SQL_TABLE_VALUED_FUNCTION |

## Definition

```sql
CREATE  function [dbo].[uf_CatalogRefs] (@pItemId int, @pVendorId int, @pBidHeaderId int)
returns varchar(4096)
 
as
begin
declare @ReturnValue varchar(4096),
	@XRefName varchar(128)

if isnull(@pBidHeaderId,0) = 0
begin
declare cr2t cursor fast_forward read_only for
select isnull(Catalog.Name,'') + ' Item:' + CrossRefs.VendorItemCode + ' ' + case isnull(CrossRefs.Page,'') when '' then '' else ' Page:' + rtrim(convert(varchar(16),CrossRefs.Page)) end + case isnull(rtrim(Catalog.CatalogYear),'') when '' then '' else ' Year:' + rtrim(Catalog.CatalogYear) end XrefName
  from dbo.CrossRefs
  join dbo.Catalog on Catalog.CatalogId = Crossrefs.CatalogId
                  and Catalog.Active = 1
                  and Catalog.VendorId = case isnull(@pVendorId,0) when 0 then Catalog.VendorId else @pVendorId end
                  and Catalog.CatalogYear = (select top 1 cat.CatalogYear from Catalog cat where cat.VendorId = Catalog.VendorId and cat.CategoryId = Catalog.CategoryId and Cat.Active = 1 order by cat.CatalogYear desc)
                  and Catalog.Name != 'EDS'
 where CrossRefs.ItemId = @pItemId
   and CrossRefs.Active = 1
end
else
begin
declare cr2t cursor fast_forward read_only for
select isnull(Catalog.Name,'') + ' Item:' + CrossRefs.VendorItemCode + case isnull(CrossRefs.Page,'') when '' then '' else ' Page:' + rtrim(convert(varchar(16),CrossRefs.Page)) end + case isnull(rtrim(Catalog.CatalogYear),'') when '' then '' else ' Year:' + rtrim(Catalog.CatalogYear) end XrefName
  from dbo.CrossRefs
  join dbo.Catalog on Catalog.CatalogId = Crossrefs.CatalogId
                  and Catalog.Active = 1
  join dbo.BidsCatalogList on BidsCatalogList.CatalogId = Catalog.CatalogId
  join dbo.Bids on Bids.BidId = BidsCatalogList.BidId
               and Bids.Active = 1
               and Bids.BidHeaderId = @pBidHeaderId
 where CrossRefs.ItemId = @pItemId
   and CrossRefs.Active = 1
end
select @ReturnValue = null

open cr2t

fetch next from cr2t into @XRefName

while @@fetch_status = 0
begin											     
  select @ReturnValue = isnull(@ReturnValue,'') + case isnull(@ReturnValue,'') when '' then 'Catalog References from ' else char(13) + char(10) + replicate(' ',24) end + rtrim(@XRefName)

  fetch next from cr2t into @XRefName
end

close cr2t
deallocate cr2t

return(@ReturnValue)
end
```
