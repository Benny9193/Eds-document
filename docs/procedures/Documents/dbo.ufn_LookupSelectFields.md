# Function: scalar: `dbo.ufn_LookupSelectFields`

_Generated on 2026-05-04T13:08:00.521Z_

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `ufn_LookupSelectFields` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2017-03-08 20:35:18 |
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
| `DocumentTypeLookupResults` | USER_TABLE |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.ufn_LookupSelectStatement` | SQL_SCALAR_FUNCTION |

## Definition

```sql
create function [dbo].[ufn_LookupSelectFields](@DocumentTypeLookupId uniqueidentifier)
returns varchar(max) as
begin
declare @RetVal varchar(max)
   
select @RetVal = coalesce(@RetVal + ', ','') + '[' + DocumentTypeLookupResults.ColumnName + ']'
  from DocumentTypeLookupResults
 where DocumentTypeLookupResults.DocumentTypeLookupId = @DocumentTypeLookupId
 order by DocumentTypeLookupResults.Sequence
 
return @RetVal
end
```
