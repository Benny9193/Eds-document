# Function: scalar: `dbo.uf_PackCodeExport_Old`

_Generated on 2026-05-04T13:07:57.679Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_PackCodeExport_Old` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2011-11-10 22:03:47 |
| Modified | 2011-11-10 22:14:10 |
| Encrypted | no |
| Returns | varchar(255) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pCode` | IN | varchar(255) |  |
| 2 | `@VendorId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.uf_PackCode` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--select dbo.uf_packCodeExport('123-4567',9)

CREATE function [dbo].[uf_PackCodeExport_Old] (@pCode varchar(255), @VendorId int)
returns varchar(255) --with schemabinding AS
begin
declare @ReturnValue varchar(255),
	@Idx int,
	@CodeLen int,
	@TestChar char(1)

select @Idx = 0,
       @CodeLen = len(rtrim(@pCode)),
       @ReturnValue = ''

if @VendorId in ( 9, 28, 168, 947, 11027 ) 
begin 
  if len(dbo.uf_PackCode(@pCode)) > 7
  begin
    if substring(@pCode,2,1) = '-'
    begin
      if substring(@pCode,len(@pCode)-3,1) = '-'
      begin
        select @ReturnValue = substring(@pCode,3,len(@pCode)-2-4)
      end
      else
      begin
        select @ReturnValue = substring(@pCode,3,len(@pCode)-2)
      end
    end
    else
    begin
      if substring(@pCode,len(@pCode)-3,1) = '-'
      begin
        select @ReturnValue = substring(@pCode,1,len(@pCode)-4)
      end
      else
      begin
        if len(dbo.uf_PackCode(@pCode)) > 9
        begin
			if substring(@pCode,1,1) in ('6','7','8','9')
			begin
			  select @ReturnValue = substring(@pCode,2,len(@pCode)-4)
			end
			else
			begin
              if len(dbo.uf_PackCode(@pCode)) > 10
              begin
  			    select @ReturnValue = substring(@pCode,2,len(@pCode)-4)
              end
              else
              begin
                if len(dbo.uf_PackCode(@pCode)) > 9
                begin
  			      select @ReturnValue = substring(@pCode,1,len(@pCode)-3)
                end
                else
                begin
			      select @ReturnValue = @pCode
			    end
			  end
			end
	    end
	    else
	    begin
	      if len(dbo.uf_PackCode(@pCode)) > 7
	      begin
	        select @ReturnValue = substring(@pCode,1,len(@pCode)-3)
	      end
	      else
	      begin
  		    select @ReturnValue = @pCode
	      end
	    end
      end
    end
  end
  else
  begin
    select @ReturnValue = @pCode
  end
end
else
begin
  select @ReturnValue = @pCode
end

return isnull(@ReturnValue,'null')
end
```
