# Function: scalar: `dbo.uf_FirstWord`

_Generated on 2026-05-04T13:04:24.263Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_FirstWord` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2011-08-25 11:40:06 |
| Modified | 2011-08-25 11:57:54 |
| Encrypted | no |
| Returns | varchar(512) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pDescription` | IN | varchar(512) |  |

## Depends on

_None resolved._

## Called by

| Caller | Type |
|--------|------|
| `dbo.uf_NameParser` | SQL_TABLE_VALUED_FUNCTION |

## Definition

```sql
CREATE function [dbo].[uf_FirstWord](@pDescription varchar(512))
returns varchar(512)
as
begin
declare @FirstPhrase varchar(512),
	@SpaceIdx int,
	@Len int,
	@StartIdx int
  
  select @Len = len(@pDescription)
  select @StartIdx = 0
  while substring(@pDescription,@StartIdx+1,1) = ' ' and @StartIdx < @Len
  begin
    select @StartIdx = @StartIdx + 1
  end
  if @StartIdx < @Len
  begin
	  select @SpaceIdx = charindex(' ',substring(@pDescription,@StartIdx+1,@Len-@StartIdx))
	  if @SpaceIdx > 0
	  begin
		select @FirstPhrase = rtrim(substring(@pDescription,@StartIdx+1,@SpaceIdx - 1))
	  end
	  else
	  begin
		if @Len > 0
		begin
		  select @FirstPhrase = ltrim(@pDescription)
		end
		else
		begin
		  select @FirstPhrase = ''
		end
	  end
  end
  else
  begin
	  select @FirstPhrase = ''
  end
  return(@FirstPhrase)
end
```
