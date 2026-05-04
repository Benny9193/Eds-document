# Function: scalar: `dbo.uf_SanitizeDataTest`

_Generated on 2026-05-04T13:08:04.074Z_

**Database:** `NJ_RTK` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_SanitizeDataTest` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2015-02-02 21:00:47 |
| Modified | 2024-06-21 19:09:19 |
| Encrypted | no |
| Returns | varchar(4096) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@Param1` | IN | varchar(4096) |  |

## Depends on

_None resolved._

## Called by

_No other objects in this database reference it._

## Definition

```sql
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date, ,>
-- Description:	<Description, ,>
-- =============================================
CREATE FUNCTION [dbo].[uf_SanitizeDataTest] 
(
	-- Add the parameters for the function here
	@Param1 varchar(4096)
)
RETURNS varchar(4096)
AS
BEGIN
	-- Declare the return variable here
	DECLARE @Pos int, @MaxLen int, @RetVal varchar(4096)
	
	select @Pos = 1, @MaxLen = len(@Param1), @RetVal = ''
	while @Pos <= @MaxLen
	begin
      select @RetVal = @RetVal + case 
                                   when char(ascii(substring(@Param1,@POs,1)) & 0x7f) != substring(@Param1,@POs,1) then ' '
                                   when substring(@Param1,@POs,1) < ' ' then ' '
                                   when substring(@Param1,@POs,1) = '`' then ''''
                                   when substring(@Param1,@POs,1) = '%' then ''
                                   else substring(@Param1,@POs,1) 
                                 end
      select @POs = @Pos + 1
    end
	-- Return the result of the function
	while @RetVal != replace(@RetVal,'  ',' ')
	begin
	  select @RetVal = replace(@RetVal,'  ',' ')
	end
	RETURN @RetVal

END
```
