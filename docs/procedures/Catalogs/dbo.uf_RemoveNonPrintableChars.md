# Function: scalar: `dbo.uf_RemoveNonPrintableChars`

_Generated on 2026-05-04T14:49:08.555Z_

**Database:** `Catalogs` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_RemoveNonPrintableChars` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2006-02-02 17:45:46 |
| Modified | 2020-01-23 21:35:00 |
| Encrypted | no |
| Returns | varchar(4096) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pInpString` | IN | varchar(4096) |  |

## Depends on

_None resolved._

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE    function [dbo].[uf_RemoveNonPrintableChars](@pInpString varchar(4096))
returns varchar(4096)   AS
begin

declare	@ReturnValue varchar(4096),
	@Idx int,
	@InpStringLen int,
	@TestChar char(1)

select @Idx = 1,
       @InpStringLen = Len(@pInpString),
       @ReturnValue = ''

while @Idx <= @InpStringLen
begin
  -- Get Character to Test
  select @TestChar = substring(@pInpString,@Idx,1)

  -- Test Character for Range
  if (ASCII(@TestChar) >= 32) and (ASCII(@TestChar) < 127)
  begin
    select @ReturnValue = @ReturnValue + @TestChar
  end

  -- Bump Pointer
  select @Idx = @Idx + 1
end
return isnull(@ReturnValue,'null')

end
```
