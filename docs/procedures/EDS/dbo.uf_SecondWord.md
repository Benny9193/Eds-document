# Function: scalar: `dbo.uf_SecondWord`

_Generated on 2026-05-04T13:04:24.325Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_SecondWord` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2011-08-25 11:45:03 |
| Modified | 2011-08-25 12:53:23 |
| Encrypted | no |
| Returns | varchar(512) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pDescription` | IN | varchar(512) |  |

## Depends on

_None resolved._

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE  function [dbo].[uf_SecondWord](@pDescription varchar(512))
returns varchar(512)
as
begin
declare @SecondPhrase varchar(512),
	@DashIdx int,
	@CommaIdx int,
	@StartIdx int,
	@SpaceIdx int,
	@Len int
  
  select @Len = len(@pDescription)
  select @StartIdx = 0
  while substring(@pDescription,@StartIdx+1,1) = ' ' and @StartIdx < @Len
  begin
    select @StartIdx = @StartIdx + 1
  end
  if @StartIdx < @Len
  begin
	  select @SpaceIdx = charindex(' ',substring(@pDescription,@StartIdx+1,@Len-@StartIdx))
	  if @SpaceIdx = 0
	  begin
        select @SpaceIdx = @Len + 1
      end	  

      select @StartIdx = @StartIdx + @SpaceIdx
      
      while substring(@pDescription,@StartIdx+1,1) = ' ' and @StartIdx < @Len
      begin
        select @StartIdx = @StartIdx + 1
      end
      if @StartIdx < @Len
      begin
		  if @StartIdx > 0
		  begin
			select @SpaceIdx = charindex(' ',@pDescription,@StartIdx+1)
			if @SpaceIdx = 0
			begin
			  select @SpaceIdx = @Len + 1
			end

			select @SecondPhrase = substring(@pDescription,@StartIdx+1,@SpaceIdx - @StartIdx - 1)
		  end
	  end
	  else
	  begin
		  select @SecondPhrase = ''
	  end
  end
  else
  begin
		  select @SecondPhrase = ''
  end

  return(@SecondPhrase)
end
```
