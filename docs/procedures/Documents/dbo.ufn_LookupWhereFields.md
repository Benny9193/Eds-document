# Function: scalar: `dbo.ufn_LookupWhereFields`

_Generated on 2026-05-04T14:49:10.295Z_

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `ufn_LookupWhereFields` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2017-03-08 13:41:13 |
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
| `DocumentTypeLookupKeys` | USER_TABLE |  |
| `Fields` | USER_TABLE |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.ufn_LookupSelectStatement` | SQL_SCALAR_FUNCTION |

## Definition

```sql
CREATE function [dbo].[ufn_LookupWhereFields](@DocumentTypeLookupId uniqueidentifier)
returns varchar(max) as
begin
declare @RetVal varchar(max)
   
select @RetVal = coalesce(@RetVal,'') + 
                 case DocumentTypeLookupKeys.Boolean 
                   when '' then 'where' 
                   else DocumentTypeLookupKeys.Boolean 
                 end + ' [' + DocumentTypeLookupKeys.ColumnName + '] ' + 
                 case DocumentTypeLookupKeys.Operand 
                   when 'EQ' then '=' 
                   when 'NOTEQ' then '!=' 
                   when 'GT' then '>' 
                   when 'GTE' then '>=' 
                   when 'LT' then '<' 
                   when 'LTE' then '<=' 
                   else DocumentTypeLookupKeys.Operand 
                 end + 
                 case 
                   when isnull(DocumentTypeLookupKeys.Constant,0) = 0 then ' ''{' + Fields.Name + '}'' ' 
                   else ' ''' + DocumentTypeLookupKeys.MatchData + ''' ' 
                 end
  from DocumentTypeLookupKeys
  left outer join Fields on Fields.Id = case when len(DocumentTypeLookupKeys.MatchData) = 36 then DocumentTypeLookupKeys.MatchData else null end
 where DocumentTypeLookupKeys.DocumentTypeLookupId = @DocumentTypeLookupId
 order by DocumentTypeLookupKeys.Sequence
 
return @RetVal
end
```
