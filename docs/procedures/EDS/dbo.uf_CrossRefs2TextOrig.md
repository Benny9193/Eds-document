# Function: scalar: `dbo.uf_CrossRefs2TextOrig`

_Generated on 2026-05-04T13:07:57.596Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_CrossRefs2TextOrig` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2010-06-03 14:40:53 |
| Modified | 2017-01-14 20:10:28 |
| Encrypted | no |
| Returns | varchar(1024) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pItemId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.Catalog` | USER_TABLE |  |
| `dbo.CrossRefs` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function [dbo].[uf_CrossRefs2TextOrig] (@pItemId int)
returns varchar(1024)
  
as
begin
declare @ReturnValue varchar(1024),
	@XRefName varchar(128)

declare cr2t cursor fast_forward read_only for
select isnull(Catalog.Name,'') + ': ' + convert(varchar(50),isnull(CrossRefs.VendorItemCode,'')) + case isnull(CrossRefs.Page,'') when '' then '' else ' Page: ' + rtrim(convert(varchar(16),CrossRefs.Page)) end + case isnull(rtrim(Crossrefs.CatalogYear),'') when '' then '' else ' Year: ' + rtrim(CrossRefs.CatalogYear) end XrefName
  from dbo.CrossRefs
  join dbo.Catalog on Catalog.CatalogId = Crossrefs.CatalogId
                  and Catalog.Active = 1
                  and Catalog.CatalogId in (select CatalogId 
                                             from dbo.Catalog cat 
                                            where cat.VendorId = Catalog.VendorId 
                                              and cat.CategoryId = Catalog.CategoryId 
                                              and cat.Active = 1)
                  and Catalog.CatalogYear = (select top 1 CatalogYear
                                             from dbo.Catalog cat 
                                            where cat.VendorId = Catalog.VendorId 
                                              and cat.CategoryId = Catalog.CategoryId 
                                              and cat.Active = 1 
                                            order by cat.CatalogYear desc, cat.CatalogId desc) 
 where CrossRefs.ItemId = @pItemId
   and CrossRefs.Active = 1

select @ReturnValue = ''

open cr2t

fetch next from cr2t into @XRefName

while @@fetch_status = 0
begin
  select @ReturnValue = @ReturnValue + char(13) + char(10) + @XRefName

  fetch next from cr2t into @XRefName
end

close cr2t
deallocate cr2t

if @ReturnValue = ''
begin
  select @ReturnValue = null
end
else
begin
  select @ReturnValue = substring(@ReturnValue,3,len(@ReturnValue) - 2)
end

return(@ReturnValue)
end
```
