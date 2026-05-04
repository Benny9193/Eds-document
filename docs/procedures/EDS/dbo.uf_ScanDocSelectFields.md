# Function: scalar: `dbo.uf_ScanDocSelectFields`

_Generated on 2026-05-04T14:49:07.422Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_ScanDocSelectFields` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2014-06-10 14:40:13 |
| Modified | 2014-06-10 15:25:31 |
| Encrypted | no |
| Returns | varchar(max) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@DocTypeFieldExternalLookupId` | IN | uniqueidentifier |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.DocTypeField` | unresolved | `ContentCentral` |
| `dbo.DocTypeFieldExternalLookupSelectItem` | unresolved | `ContentCentral` |

## Called by

| Caller | Type |
|--------|------|
| `dbo.uf_ScanDocSelectStatement` | SQL_SCALAR_FUNCTION |

## Definition

```sql
CREATE function [dbo].[uf_ScanDocSelectFields](@DocTypeFieldExternalLookupId uniqueidentifier)
returns varchar(max) as
begin
declare @RetVal varchar(max)
   
select @RetVal = coalesce(@RetVal + ', ','') + '[' + DocTypeFieldExternalLookupSelectItem.ExternalValueColumn + ']'
  from ContentCentral.dbo.DocTypeFieldExternalLookupSelectItem DocTypeFieldExternalLookupSelectItem
  join ContentCentral.dbo.DocTypeField DocTypeField on DocTypeField.Id = DocTypeFieldExternalLookupSelectItem.DestinationDocTypeFieldId
 where DocTypeFieldExternalLookupSelectItem.DocTypeFieldExternalLookupId = @DocTypeFieldExternalLookupId
 order by DocTypeFieldExternalLookupSelectItem.ItemOrder
 
return @RetVal
end
```
