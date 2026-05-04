# Function: scalar: `dbo.uf_PackCodeExport`

_Generated on 2026-05-04T13:04:00.598Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_PackCodeExport` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2010-03-30 15:56:38 |
| Modified | 2011-11-14 12:19:30 |
| Encrypted | no |
| Returns | varchar(255) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pCode` | IN | varchar(255) |  |
| 2 | `@VendorId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Catalog` | USER_TABLE |  |
| `dbo.ufn_RegExReplace` | unresolved | `master` |

## Called by

| Caller | Type |
|--------|------|
| `dbo.PODetailJavaExport` | VIEW |
| `dbo.PODetailJavaExportNew` | VIEW |

## Definition

```sql
--select dbo.uf_packCodeExport('123-4567',9)

CREATE function [dbo].[uf_PackCodeExport] (@pCode varchar(255), @VendorId int)
returns varchar(255) --with schemabinding AS
begin
declare @ReturnValue varchar(255)

select top 1 @ReturnValue = isnull(master.dbo.ufn_RegExReplace(@pCode,isnull(Catalog.PackExp,'^' + isnull(Catalog.DropSeq,'') + '(?<base>.*)$'),isnull(Catalog.PackReplace,'${base}'),0),'')
  from Catalog with (nolock)
 where Catalog.VendorId = @VendorId
 order by Catalog.CatalogId desc
 
return isnull(@ReturnValue,'null')
end
```
