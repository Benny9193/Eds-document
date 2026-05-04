# Function: scalar: `dbo.uf_RemoveLeadingZeros`

_Generated on 2026-05-04T13:04:24.307Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_RemoveLeadingZeros` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2001-11-02 13:16:30 |
| Modified | 2001-11-02 13:16:30 |
| Encrypted | no |
| Returns | varchar(255) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSource` | IN | varchar(255) |  |

## Depends on

_None resolved._

## Called by

| Caller | Type |
|--------|------|
| `dbo.sp_BatchVerify` | SQL_STORED_PROCEDURE |
| `dbo.sp_BatchVerifyBook` | SQL_STORED_PROCEDURE |
| `dbo.sp_BatchVerifyForce` | SQL_STORED_PROCEDURE |
| `dbo.sp_CatalogDataCheck` | SQL_STORED_PROCEDURE |
| `dbo.sp_CatalogDataPriceCheck` | SQL_STORED_PROCEDURE |
| `dbo.sp_EnhancedSearchItem` | SQL_STORED_PROCEDURE |
| `dbo.sp_search` | SQL_STORED_PROCEDURE |
| `dbo.sp_SearchItems` | SQL_STORED_PROCEDURE |
| `dbo.uf_PackCodeCatalog_Old` | SQL_SCALAR_FUNCTION |

## Definition

```sql
CREATE   function uf_RemoveLeadingZeros (@pSource varchar(255)) returns varchar(255) AS
begin
declare @ReturnValue varchar(255),
	@NonZeroFound int,
	@Length int,
	@SourcePtr int,
	@DestPtr int

select @NonZeroFound = 0,
       @SourcePtr = 0,
       @Length = len(@pSource)

while @SourcePtr <= @Length
begin
  if @NonZeroFound = 0
  begin
    if substring(@pSource,@SourcePtr,1) != '0' and substring(@pSource,@SourcePtr,1) != ' '
    begin
      select @ReturnValue = substring(@pSource,@SourcePtr,1),
             @NonZeroFound = 1
    end
  end
  else
  begin
    select @ReturnValue = @ReturnValue + substring(@pSource,@SourcePtr,1)
  end
  select @SourcePtr = @SourcePtr + 1
end

/*
if (substring(@pSource,1,1) = '0' or substring(@pSource,1,1) = ' ') and len(@pSource) > 0
begin
  select @ReturnValue = dbo.uf_RemoveLeadingZeros(substring(@pSource,2,len(@pSource) - 1))
--  select @ReturnValue = @pSource
end
else
begin
  select @ReturnValue = @pSource
end
*/

return @ReturnValue

end
```
