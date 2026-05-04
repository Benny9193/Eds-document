# Function: scalar: `dbo.uf_LineCount`

_Generated on 2026-05-04T14:49:07.380Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_LineCount` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2004-07-07 19:32:04 |
| Modified | 2004-07-07 19:32:04 |
| Encrypted | no |
| Returns | int |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pDescription` | IN | varchar(4096) |  |

## Depends on

_None resolved._

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function dbo.uf_LineCount(@pDescription varchar(4096))
returns int
as
begin
declare @LineCount int,
        @CurrPtr int,
        @EndPtr int,
	@LinePtr int

  select @LineCount = 1
  select @CurrPtr = 1
  select @LinePtr = 1
  select @EndPtr = len(@pDescription)

  while @CurrPtr < @EndPtr
  begin
    if substring(@pDescription,@CurrPtr,1) = char(10) or @LinePtr > 60
      select @LineCount = @LineCount + 1, @LinePtr = 1

    
    select @CurrPtr = @CurrPtr + 1, @LinePtr = @LinePtr + 1
  end

  return @LineCount
end
```
