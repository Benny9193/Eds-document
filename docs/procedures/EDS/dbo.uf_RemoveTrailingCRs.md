# Function: scalar: `dbo.uf_RemoveTrailingCRs`

_Generated on 2026-05-04T14:49:07.411Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_RemoveTrailingCRs` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2003-08-27 14:47:07 |
| Modified | 2010-05-05 13:56:10 |
| Encrypted | no |
| Returns | varchar(max) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSource` | IN | varchar(max) |  |

## Depends on

_None resolved._

## Called by

| Caller | Type |
|--------|------|
| `dbo.sp_CXmlLogin` | SQL_STORED_PROCEDURE |
| `dbo.uf_BidAnalysisDetail` | SQL_INLINE_TABLE_VALUED_FUNCTION |
| `dbo.uf_BidAnalysisDetailItem` | SQL_INLINE_TABLE_VALUED_FUNCTION |
| `dbo.uf_BidAnalysisDetailReq` | SQL_INLINE_TABLE_VALUED_FUNCTION |
| `dbo.uf_BidAnalysisDetailReqComb` | SQL_INLINE_TABLE_VALUED_FUNCTION |
| `dbo.uf_BidAnalysisDetailRSId` | SQL_INLINE_TABLE_VALUED_FUNCTION |
| `dbo.uf_BidAnalysisDetailTest` | SQL_INLINE_TABLE_VALUED_FUNCTION |
| `dbo.uf_OrderBook` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_OrderBook03` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_OrderBookNew` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_OrderBookSaved` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_OrderBookTest` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_OrderBookTest1` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_OrderOrBudgetBook` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.vw_BidAnalysisDetail` | VIEW |

## Definition

```sql
CREATE  function [dbo].[uf_RemoveTrailingCRs] (@pSource varchar(max)) returns varchar(max) with schemabinding AS
begin
declare @ReturnValue varchar(max)
declare @Index int,
	@MaxIndex int,
	@CRMatch char(2)

select @ReturnValue = rtrim(@pSource),
       @Index = len(@ReturnValue),
       @CRMatch = char(13) + char(10)

while (@Index > 1)
begin
  if substring(@ReturnValue,@Index - 1,2) = @CRMatch
  begin
    if @Index <= 2
    begin
      select @ReturnValue = ''
    end
    else
    begin
      select @ReturnValue = substring(@ReturnValue,1,@Index - 2)
    end
    --select @CRMatch = len(@ReturnValue)  -- replaced kjm
    select @Index = len(@ReturnValue)
  end
  else
  begin
    break
  end
end

return isnull(@ReturnValue,'')

end
```
