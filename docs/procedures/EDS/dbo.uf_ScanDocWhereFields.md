# Function: scalar: `dbo.uf_ScanDocWhereFields`

_Generated on 2026-05-04T13:04:24.321Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_ScanDocWhereFields` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2014-06-10 14:54:48 |
| Modified | 2014-06-11 14:37:42 |
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
| `dbo.DocTypeFieldExternalLookupItem` | unresolved | `ContentCentral` |

## Called by

| Caller | Type |
|--------|------|
| `dbo.uf_ScanDocSelectStatement` | SQL_SCALAR_FUNCTION |

## Definition

```sql
CREATE function [dbo].[uf_ScanDocWhereFields](@DocTypeFieldExternalLookupId uniqueidentifier)
returns varchar(max) as
begin
declare @RetVal varchar(max)
   
select @RetVal = coalesce(@RetVal,'') + case DocTypeFieldExternalLookupItem.Boolean when '' then 'where' else DocTypeFieldExternalLookupItem.Boolean end + ' [' + DocTypeFieldExternalLookupItem.ExternalColumn + '] ' + case DocTypeFieldExternalLookupItem.Operator when 'EQ' then '=' when 'NOTEQ' then '!=' when 'GT' then '>' when 'GTE' then '>=' when 'LT' then '<' when 'LTE' then '<=' else DocTypeFieldExternalLookupItem.Operator end + case when isnull(DocTypeFieldExternalLookupItem.StaticValue,'') = '' then ' ''{' + DocTypeField.Name + '}'' ' else ' ''' + DocTypeFieldExternalLookupItem.StaticValue + ''' ' end
  from ContentCentral.dbo.DocTypeFieldExternalLookupItem DocTypeFieldExternalLookupItem
  left outer join ContentCentral.dbo.DocTypeField DocTypeField on DocTypeField.Id = DocTypeFieldExternalLookupItem.DocTypeFieldId
 where DocTypeFieldExternalLookupItem.DocTypeFieldExternalLookupId = @DocTypeFieldExternalLookupId
 order by DocTypeFieldExternalLookupItem.ItemOrder
 
return @RetVal
end
```
