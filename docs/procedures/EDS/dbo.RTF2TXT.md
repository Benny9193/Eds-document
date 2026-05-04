# Function: scalar: `dbo.RTF2TXT`

_Generated on 2026-05-04T13:07:57.332Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `RTF2TXT` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2012-02-06 20:56:24 |
| Modified | 2012-02-06 21:31:16 |
| Encrypted | no |
| Returns | nvarchar(4000) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@in` | IN | nvarchar(4000) |  |

## Depends on

_None resolved._

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function [dbo].[RTF2TXT](@in nvarchar(4000)) RETURNS  nvarchar(4000) AS 
BEGIN

DECLARE @object int
DECLARE @hr int
DECLARE @out nvarchar(4000),
		@Source nvarchar(255),
		@Description nvarchar(255)

-- Create an object that points to the SQL Server
EXEC @hr = sp_OACreate 'RICHTEXT.RichtextCtrl', @object OUT
if @hr != 0
begin
  exec @hr = sp_OAGetErrorInfo @object, @Source out, @Description out
  if @hr != 0
  begin
    select @out = 'sp_OACreate/sp_OAGetErrorInfo returned ' + cast(@hr as varchar)
  end
  else
  begin
    select @out = 'Source: ' + isnull(@Source,'') + ' Description: ' + isnull(@Description,'')
  end
  return @out
end
EXEC @hr = sp_OASetProperty @object, 'TextRTF', @in
if @hr != 0
begin
  select @out = 'sp_OASetProperty returned ' + cast(@hr as varchar)
  return @out
end
EXEC @hr = sp_OAGetProperty @object, 'Text', @out OUT
if @hr != 0
begin
  select @out = 'sp_OAGetProperty returned ' + cast(@hr as varchar)
  return @out
end
EXEC @hr = sp_OADestroy @object
if @hr != 0
begin
  select @out = 'sp_OADestroy returned ' + cast(@hr as varchar)
  return @out
end
return @out

END
```
