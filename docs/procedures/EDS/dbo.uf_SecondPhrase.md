# Function: scalar: `dbo.uf_SecondPhrase`

_Generated on 2026-05-04T13:07:57.717Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_SecondPhrase` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2003-06-18 01:35:35 |
| Modified | 2003-06-18 01:35:35 |
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
CREATE  function dbo.uf_SecondPhrase(@pDescription varchar(512))
returns varchar(512)
as
begin
declare @SecondPhrase varchar(512),
	@DashIdx int,
	@CommaIdx int,
	@StartIdx int
  
  select @DashIdx = charindex('-',@pDescription)
  select @CommaIdx = charindex(',',@pDescription)
  if @DashIdx > 0
  begin
    if @CommaIdx > 0
    begin
      if @DashIdx < @CommaIdx
      begin
        select @StartIdx = @DashIdx + 1
      end
      else
      begin
        select @StartIdx = @CommaIdx + 1
      end
    end
    else
    begin
      select @StartIdx = @DashIdx + 1
    end
  end
  else
  begin
    if @CommaIdx > 0
    begin
      select @StartIdx = @CommaIdx + 1
    end
    else
    begin
      select @StartIdx = 0
    end
  end

  if @StartIdx > 0
  begin
    select @DashIdx = charindex('-',@pDescription,@StartIdx)
    select @CommaIdx = charindex(',',@pDescription,@StartIdx)
    if @DashIdx > 0
    begin
      if @CommaIdx > 0
      begin
        if @DashIdx < @CommaIdx
        begin
          select @SecondPhrase = ltrim(rtrim(substring(@pDescription,@StartIdx,@DashIdx - @StartIdx)))
        end
        else
        begin
          select @SecondPhrase = ltrim(rtrim(substring(@pDescription,@StartIdx,@CommaIdx - @StartIdx)))
        end
      end
      else
      begin
        select @SecondPhrase = ltrim(rtrim(substring(@pDescription,@StartIdx,@DashIdx - @StartIdx)))
      end
    end
    else
    begin
      if @CommaIdx > 0
      begin
        select @SecondPhrase = ltrim(rtrim(substring(@pDescription,@StartIdx,@CommaIdx - @StartIdx)))
      end
      else
      begin
        select @SecondPhrase = ''
      end
    end
  end

  return(@SecondPhrase)
end
```
