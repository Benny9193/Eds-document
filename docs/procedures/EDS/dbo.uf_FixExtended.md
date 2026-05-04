# Function: scalar: `dbo.uf_FixExtended`

_Generated on 2026-05-04T13:04:24.264Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_FixExtended` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2013-01-30 21:26:07 |
| Modified | 2013-01-30 23:20:59 |
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
CREATE FUNCTION [dbo].[uf_FixExtended] 
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
                                   when ascii(substring(@Param1,@POs,1)) >= 240 then '&#x' + right(master.dbo.fn_varbintohexstr(ascii(substring(@Param1,@POs,1))),4) + ';'
                                   else substring(@Param1,@POs,1)
                                 end
      select @POs = @Pos + 1
    end
	-- Return the result of the function
	RETURN @RetVal

END
```
