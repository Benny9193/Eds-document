# Function: scalar: `dbo.uf_NextLowestPriceId`

_Generated on 2026-05-04T13:04:24.291Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_NextLowestPriceId` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2003-07-16 17:12:42 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |
| Returns | int |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBidItemRequestId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidImports` | USER_TABLE |  |
| `BidResults` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE  function dbo.uf_NextLowestPriceId(@pBidItemRequestId int)
returns int
as
begin
declare @PriceId int

select top 1 @PriceId = BidResultsId
           from (select top 2 BidResultsId 
                   from BidResults
                   join BidImports on BidImports.BidImportId = BidResults.BidImportId
                  where BidResults.BidRequestItemId = @pBidItemRequestId
                    and BidImports.Active = 1
                    and BidResults.ItemBidType in ('S','C')
                    and isnull(BidResults.Status,'') = ''
                  order by BidResults.UnitPrice desc) ss

  
  return(@PriceId)
end
```
