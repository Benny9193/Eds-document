# Function: scalar: `dbo.ufn_LookupSelectStatement`

_Generated on 2026-05-04T13:43:21.512Z_

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `ufn_LookupSelectStatement` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2017-03-08 20:38:54 |
| Modified | 2024-06-21 20:33:45 |
| Encrypted | no |
| Returns | varchar(max) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@DocumentTypeLookupId` | IN | uniqueidentifier |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `DocumentTypeLookups` | USER_TABLE |  |
| `dbo.ufn_LookupSelectFields` | SQL_SCALAR_FUNCTION |  |
| `dbo.ufn_LookupWhereFields` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
Create function [dbo].[ufn_LookupSelectStatement](@DocumentTypeLookupId uniqueidentifier)
returns varchar(max) as
begin
return(
select 'select ' + dbo.ufn_LookupSelectFields(DocumentTypeLookups.Id) + ' from [' + DocumentTypeLookups.TableName + '] ' + dbo.ufn_LookupWhereFields(DocumentTypeLookups.Id)
  from DocumentTypeLookups
 where DocumentTypeLookups.Id = @DocumentTypeLookupId
)
end
```
