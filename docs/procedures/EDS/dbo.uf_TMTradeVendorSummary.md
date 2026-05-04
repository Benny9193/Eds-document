# Function: scalar: `dbo.uf_TMTradeVendorSummary`

_Generated on 2026-05-04T13:43:19.112Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_TMTradeVendorSummary` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2014-05-19 22:46:05 |
| Modified | 2014-05-19 23:06:03 |
| Encrypted | no |
| Returns | varchar(1024) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBidHeaderId` | IN | int |  |
| 2 | `@pCountyId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `vw_TMTradesSummary` | VIEW |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function uf_TMTradeVendorSummary(@pBidHeaderId int, @pCountyId int)
returns varchar(1024)
as
begin
declare @RetVal varchar(1024)

select @RetVal = coalesce(@RetVal + '<br/>','') + VendorName
  from vw_TMTradesSummary
 where BidHeaderId = @pBidHeaderId
   and CountyId = @pCountyId

return coalesce(@RetVal,'N/A')
end
```
