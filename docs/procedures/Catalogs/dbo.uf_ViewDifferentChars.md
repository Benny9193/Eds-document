# Function: scalar: `dbo.uf_ViewDifferentChars`

_Generated on 2026-05-04T13:07:58.755Z_

**Database:** `Catalogs` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_ViewDifferentChars` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2010-11-17 17:56:37 |
| Modified | 2020-01-23 21:35:00 |
| Encrypted | no |
| Returns | varchar(4096) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pInpString` | IN | varchar(4096) |  |
| 2 | `@pInpString2` | IN | varchar(4096) |  |

## Depends on

_None resolved._

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE    function [dbo].[uf_ViewDifferentChars](@pInpString varchar(4096),@pInpString2 varchar(4096))
returns varchar(4096)  AS
begin

declare	@ReturnValue varchar(4096),
	@Idx int,
	@InpStringLen int,
	@TestChar1 char(1),
	@TestChar2 char(1)

select @Idx = 1,
       @InpStringLen = Len(@pInpString),
       @ReturnValue = ''

while @Idx <= @InpStringLen
begin
  -- Get Character to Test
  select @TestChar1 = substring(@pInpString,@Idx,1)
  select @TestChar2 = substring(@pInpString2,@Idx,1)
  
  -- Test Character for Range
  if not ( @TestChar1 = @TestChar2 )
  begin
    select @ReturnValue = @ReturnValue + '  Position: ' + Convert(Varchar(4), @Idx) + '  Char1: ' +@TestChar1+'  ASCII: ' + Convert(Varchar(4), ASCII(@TestChar1))+ '  Char2: ' +@TestChar2+'  ASCII: ' + Convert(Varchar(4), ASCII(@TestChar2))
--    select @ReturnValue = @ReturnValue + '  Position: ' + Convert(Varchar(4), @Idx) + '  ASCII: ' + Convert(Varchar(4), ASCII(@TestChar))
  end

  -- Bump Pointer
  select @Idx = @Idx + 1
end
return @ReturnValue

end
```
