# Function: scalar: `dbo.uf_ReplaceNonPrintableChars`

_Generated on 2026-05-04T13:07:58.750Z_

**Database:** `Catalogs` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_ReplaceNonPrintableChars` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2006-10-25 14:34:21 |
| Modified | 2020-01-23 21:35:00 |
| Encrypted | no |
| Returns | varchar(5000) |

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
CREATE    function [dbo].[uf_ReplaceNonPrintableChars](@pInpString varchar(4096))
returns varchar(5000)   AS
--returns varchar(4096)   AS
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

  -- Replace specific chars
  if (ASCII(@TestChar) = 133)
    select @ReturnValue = @ReturnValue + '...'
  else
  if (ASCII(@TestChar) = 138)
    select @ReturnValue = @ReturnValue + 'S'
  else
  if (ASCII(@TestChar) = 142)
    select @ReturnValue = @ReturnValue + 'Z'
  else
  if (ASCII(@TestChar) between 145 and 146)
    select @ReturnValue = @ReturnValue + ''''
  else
  if (ASCII(@TestChar) between 147 and 148)
    select @ReturnValue = @ReturnValue + '"'
  else
  if (ASCII(@TestChar) = 149)
    select @ReturnValue = @ReturnValue + '*'
  else
  if (ASCII(@TestChar) between 150 and 151)
    select @ReturnValue = @ReturnValue + '-'
  else
  if (ASCII(@TestChar) = 158)
    select @ReturnValue = @ReturnValue + 'z'
  else
  if (ASCII(@TestChar) = 159)
    select @ReturnValue = @ReturnValue + 'Y'
  else
  if (ASCII(@TestChar) = 160)  -- replace with blank space, found in Fisher descriptions
    select @ReturnValue = @ReturnValue + ' '
  else
  if (ASCII(@TestChar) = 162)
    select @ReturnValue = @ReturnValue + ' cent'
  else
  if (ASCII(@TestChar) = 170)
    select @ReturnValue = @ReturnValue + 'a'
  else
  if (ASCII(@TestChar) = 176)
    select @ReturnValue = @ReturnValue + ' Degrees'
  else
  if (ASCII(@TestChar) = 181)
    select @ReturnValue = @ReturnValue + 'u'
  else
  if (ASCII(@TestChar) = 186)
    select @ReturnValue = @ReturnValue + '  Degrees'
  else
  if (ASCII(@TestChar) = 188) 
    select @ReturnValue = @ReturnValue + ' 1/4'
  else
  if (ASCII(@TestChar) = 189) 
    select @ReturnValue = @ReturnValue + ' 1/2'
  else
  if (ASCII(@TestChar) = 190) 
    select @ReturnValue = @ReturnValue + ' 3/4'
  else
  if (ASCII(@TestChar) between 192 and 197)
    select @ReturnValue = @ReturnValue + 'A'
  else
  if (ASCII(@TestChar) between 200 and 203)
    select @ReturnValue = @ReturnValue + 'E'
  else
  if (ASCII(@TestChar) between 204 and 207)
    select @ReturnValue = @ReturnValue + 'I'
  else
  if (ASCII(@TestChar) = 209)  
    select @ReturnValue = @ReturnValue + 'N'
  else
  if (ASCII(@TestChar) between 210 and 214)
    select @ReturnValue = @ReturnValue + 'O'
  else
  if (ASCII(@TestChar) = 216)  
    select @ReturnValue = @ReturnValue + '0'
  else
  if (ASCII(@TestChar) between 217 and 220)
    select @ReturnValue = @ReturnValue + 'U'
  else
  if (ASCII(@TestChar) between 224 and 229)
    select @ReturnValue = @ReturnValue + 'a'
  else
  if (ASCII(@TestChar) between 232 and 235)
    select @ReturnValue = @ReturnValue + 'e'
  else
  if (ASCII(@TestChar) between 236 and 239)
    select @ReturnValue = @ReturnValue + 'i'
  else
  if (ASCII(@TestChar) = 241)
    select @ReturnValue = @ReturnValue + 'n'
  else
  if (ASCII(@TestChar) = 247)
    select @ReturnValue = @ReturnValue + '/'
  else
  if (ASCII(@TestChar) between 249 and 252)
    select @ReturnValue = @ReturnValue + 'u'
  else
  if (ASCII(@TestChar) between 253 and 255)
    select @ReturnValue = @ReturnValue + 'y'
  else
  if (ASCII(@TestChar) = 153)  -- remove
    select @ReturnValue = @ReturnValue
  else
  if (ASCII(@TestChar) = 169)  -- remove
    select @ReturnValue = @ReturnValue
  else
  if (ASCII(@TestChar) = 174)  -- remove
    select @ReturnValue = @ReturnValue
  else
    select @ReturnValue = @ReturnValue + @TestChar

  -- Bump Pointer
  select @Idx = @Idx + 1
end
return isnull(@ReturnValue,'null')

end
```
