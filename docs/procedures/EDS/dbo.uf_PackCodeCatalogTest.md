# Function: scalar: `dbo.uf_PackCodeCatalogTest`

_Generated on 2026-05-04T13:43:19.059Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_PackCodeCatalogTest` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2019-03-13 12:26:08 |
| Modified | 2019-03-13 12:26:08 |
| Encrypted | no |
| Returns | varchar(255) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pCode` | IN | varchar(255) |  |
| 2 | `@pCatalogId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Catalog` | USER_TABLE |  |
| `dbo.ufn_RegExIsMatch` | unresolved | `master` |
| `dbo.ufn_RegExReplace` | unresolved | `master` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create   function [dbo].[uf_PackCodeCatalogTest](@pCode varchar(255), @pCatalogId int)
returns varchar(255)   AS
begin
declare @ReturnValue varchar(255)

if master.dbo.ufn_RegExIsMatch(@pCode, '^(?<base>[\x00-\x7F]{2}ADD[0-9]{5})$',0) = 1
begin
  select @ReturnValue = @pCode 
end
else
begin
  if isnull(@pCatalogId,0) = 0
  begin
    select @ReturnValue = isnull(master.dbo.ufn_RegExReplace(@pCode,'[^0-9A-Za-z]','',0),'')  
  end
  else
  begin
    select @ReturnValue = isnull(master.dbo.ufn_RegExReplace(master.dbo.ufn_RegExReplace(isnull(master.dbo.ufn_RegExReplace(@pCode,'[^0-9A-Za-z]','',0),''),isnull(Catalog.PackExp,'^(?i)' + isnull(Catalog.DropSeq,'') + '(?<base>.*)$'),isnull(Catalog.PackReplace,'${base}'),0),'[^0-9A-Za-z]','',0),'')
    --select @ReturnValue = isnull(master.dbo.ufn_RegExReplace(master.dbo.ufn_RegExReplace(@pCode,isnull(Catalog.PackExp,'^' + isnull(Catalog.DropSeq,'') + '(?<base>.*)$'),isnull(Catalog.PackReplace,'${base}'),0),'[^0-9A-Za-z]','',0),'')
      from Catalog with (nolock)
     where Catalog.CatalogId = @pCatalogId
  end
end

return @returnValue
end
```
