# Function: scalar: `dbo.uf_FormatData`

_Generated on 2026-05-04T13:04:00.553Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_FormatData` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2012-03-05 22:37:07 |
| Modified | 2012-03-05 23:36:44 |
| Encrypted | no |
| Returns | varchar(4096) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@Mask` | IN | varchar(50) |  |
| 2 | `@Data` | IN | varchar(4096) |  |

## Depends on

_None resolved._

## Called by

| Caller | Type |
|--------|------|
| `dbo.vw_BidTradesVendorDetailForReports` | VIEW |
| `dbo.vw_BidTradesVendorsAnswers` | VIEW |

## Definition

```sql
CREATE function [dbo].[uf_FormatData](@Mask varchar(50), @Data varchar(4096)) 
returns varchar(4096) 
as
begin
declare @FormatType int,
		@DollarSign tinyint,
		@Blank tinyint,
		@TotalLength int,
		@Decimals int,
		@DecimalPtr int,
		@LengthSPtr int,
		@WorkStr varchar(4096),
		@WorkDec decimal(34,6),
		@LeftPart varchar(50),
		@RightPart varchar(50)
		
	select @FormatType = case upper(SUBSTRING(@Mask,1,2)) when '@N' then 2 when '@S' then 1 else 0 end
    if @FormatType > 0
    begin
	  select @DollarSign = case SUBSTRING(@Mask,3,1) when '$' then 1 else 0 end,
		     @Blank = case upper(SUBSTRING(@Mask,LEN(@Mask),1)) when 'B' then 1 else 0 end,
		     @DecimalPtr = CHARINDEX('.',@Mask)
      select @LengthSPtr = case @DollarSign when 1 then 4 else 3 end
		     
	  if @DecimalPtr > 0
	  begin
	    select @TotalLength = cast(SUBSTRING(@Mask,@LengthSPtr,@DecimalPtr - @LengthSPtr) as int),
		  	   @Decimals = CAST(substring(@Mask,@DecimalPtr + 1,len(@Mask) - @DecimalPtr - @Blank) as int)
	  end
	  else
	  begin
	    select @TotalLength = CAST(SUBSTRING(@Mask,@LengthSPtr,len(@Mask) - @Blank - @LengthSPtr + 1) as int),
			   @Decimals = 0
	  end
	end
	else
	begin
	  return @Data
	end
	
	if @FormatType = 1
	begin
	  return substring(@Data,1,@TotalLength)
	end
	else
	begin
	  select @WorkDec = cast(case isnull(rtrim(@Data),'') when '' then '0' else rtrim(@Data) end as decimal(34,6))
	  select @WorkStr = cast(round(@WorkDec,@Decimals) as varchar(4096))
      select @DecimalPtr = charindex('.',@WorkStr)
      if @DecimalPtr > 0
      begin
        select @LeftPart = substring(@WorkStr,1,@DecimalPtr - 1),
			   @RightPart = left(case when len(@WorkStr) - @DecimalPtr > 0 then substring(@WorkStr,@DecimalPtr + 1,len(@WorkStr) - @DecimalPtr) else '' end + replicate('0',@Decimals),@Decimals)
      end
      else
      begin
        select @LeftPart = rtrim(@WorkStr),
			   @RightPart = replicate('0',@Decimals)
      end
	  if len(@LeftPart) > 3
	  begin
		  if len(@LeftPart) > 6
		  begin
		    if len(@LeftPart) > 9
		    begin
		      select @LeftPart = substring(@LeftPart,1,len(@LeftPart)-9) + ',' + substring(@LeftPart,len(@LeftPart)-8,3) + ',' + substring(@LeftPart,len(@LeftPart)-5,3) + ',' + substring(@LeftPart,len(@LeftPart)-2,3)
		    end
		    else
		    begin
		      select @LeftPart = substring(@LeftPart,1,len(@LeftPart)-6) + ',' + substring(@LeftPart,len(@LeftPart)-5,3) + ',' + substring(@LeftPart,len(@LeftPart)-2,3)
		    end
		  end
		  else
		  begin
		    select @LeftPart = substring(@LeftPart,1,len(@LeftPart)-3) + ',' + substring(@LeftPart,len(@LeftPart)-2,3)
		  end
	  end

	  if @Blank = 1 and round(@WorkDec,@Decimals) = 0
	  begin
		  return ''
	  end
      return case @DollarSign when 1 then '$' else '' end + @LeftPart + '.' + @RightPart
   end
   return '<Error>'
end
```
