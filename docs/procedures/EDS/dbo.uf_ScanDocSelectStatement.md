# Function: scalar: `dbo.uf_ScanDocSelectStatement`

_Generated on 2026-05-04T13:43:19.094Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_ScanDocSelectStatement` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2014-06-10 15:34:43 |
| Modified | 2025-10-27 20:14:31 |
| Encrypted | no |
| Returns | varchar(max) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@DocTypeFieldExternalLookupId` | IN | uniqueidentifier |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.uf_ScanDocSelectFields` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_ScanDocWhereFields` | SQL_SCALAR_FUNCTION |  |
| `dbo.DocType` | unresolved | `ContentCentral` |
| `dbo.DocTypeFieldExternalLookup` | unresolved | `ContentCentral` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function [dbo].[uf_ScanDocSelectStatement](@DocTypeFieldExternalLookupId uniqueidentifier)
returns varchar(max) as
begin
return(
select 'select ' + dbo.uf_ScanDocSelectFields(DocTypeFieldExternalLookup.Id) + ' from [' + DocTypeFieldExternalLookup.ExternalTableName + '] ' + dbo.uf_ScanDocWhereFields(DocTypeFieldExternalLookup.Id)
  from ContentCentral.dbo.DocType DocType
  join ContentCentral.dbo.DocTypeFieldExternalLookup DocTypeFieldExternalLookup on DocTypeFieldExternalLookup.DocTypeId = DocType.Id
 where DocTypeFieldExternalLookup.Id = @DocTypeFieldExternalLookupId
)
end
```
