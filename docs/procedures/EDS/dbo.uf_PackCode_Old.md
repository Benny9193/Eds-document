# Function: scalar: `dbo.uf_PackCode_Old`

_Generated on 2026-05-04T13:04:00.594Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_PackCode_Old` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2011-11-10 22:00:11 |
| Modified | 2011-11-10 22:00:11 |
| Encrypted | no |
| Returns | varchar(255) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pCode` | IN | varchar(255) |  |

## Depends on

_None resolved._

## Called by

_No other objects in this database reference it._

## Definition

```sql
create   function [dbo].[uf_PackCode_Old] (@pCode varchar(255))
returns varchar(255) with schemabinding AS
begin
declare @ReturnValue varchar(255),
	@Idx int,
	@CodeLen int,
	@TestChar char(1)

select @Idx = 1,
       @CodeLen = len(rtrim(@pCode)),
       @ReturnValue = ''

if @CodeLen = 10 and substring(@pCode,3,4) = 'ADD0'
begin
  select @ReturnValue = rtrim(@pCode)
end
else
begin
  while @Idx <= @CodeLen
  begin
    -- Get Character to Test
    select @TestChar = upper(substring(@pCode,@Idx,1))

    -- Test Character for Range
    if (@TestChar >= '0' and @TestChar <= '9') or
       (@TestChar >= 'A' and @TestChar <= 'Z')
    begin
      select @ReturnValue = @ReturnValue + @TestChar
    end

    -- Bump Pointer
    select @Idx = @Idx + 1
  end
end

return isnull(@ReturnValue,'null')
end
```
