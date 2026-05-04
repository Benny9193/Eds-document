# Function: scalar: `dbo.uf_TeachersDiscoveryItemCode`

_Generated on 2026-05-04T13:43:20.016Z_

**Database:** `Catalogs` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_TeachersDiscoveryItemCode` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2010-03-02 19:02:31 |
| Modified | 2020-01-23 21:35:00 |
| Encrypted | no |
| Returns | varchar(50) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pInpString` | IN | varchar(50) |  |

## Depends on

_None resolved._

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE    function [dbo].[uf_TeachersDiscoveryItemCode](@pInpString varchar(50))
returns varchar(50)   AS
begin

declare	@ReturnValue varchar(50)

select @ReturnValue = ltrim(rtrim(@pInpString))

while Len(@ReturnValue) > 1
begin
  -- Beginning in position 2 of the input string ...
  -- If character is 0, remove it; continue until non-zero
  if substring(@ReturnValue,2,1) = '0'
    begin  
    Select @ReturnValue = STUFF(@ReturnValue, 2, 1, '')
    end
  else
    begin
    Break
    end
  -- Bump Pointer
end
return isnull(@ReturnValue,'null')

end
```
