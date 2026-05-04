# Function: scalar: `dbo.uf_FirstPhrase`

_Generated on 2026-05-04T13:07:57.626Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_FirstPhrase` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2003-06-17 16:50:49 |
| Modified | 2003-06-17 16:50:49 |
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
create function dbo.uf_FirstPhrase(@pDescription varchar(512))
returns varchar(512)
as
begin
declare @FirstPhrase varchar(512),
	@DashIdx int,
	@CommaIdx int
  
  select @DashIdx = charindex('-',@pDescription)
  select @CommaIdx = charindex(',',@pDescription)
  if @DashIdx > 0
  begin
    if @CommaIdx > 0
    begin
      if @DashIdx < @CommaIdx
      begin
        select @FirstPhrase = rtrim(substring(@pDescription,1,@DashIdx - 1))
      end
      else
      begin
        select @FirstPhrase = rtrim(substring(@pDescription,1,@CommaIdx - 1))
      end
    end
    else
    begin
      select @FirstPhrase = rtrim(substring(@pDescription,1,@DashIdx - 1))
    end
  end
  else
  begin
    if @CommaIdx > 0
    begin
      select @FirstPhrase = rtrim(substring(@pDescription,1,@CommaIdx - 1))
    end
    else
    begin
      select @FirstPhrase = ''
    end
  end

  return(@FirstPhrase)
end
```
