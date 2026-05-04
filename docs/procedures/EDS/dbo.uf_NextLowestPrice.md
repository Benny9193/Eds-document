# Function: scalar: `dbo.uf_NextLowestPrice`

_Generated on 2026-05-04T14:49:07.395Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_NextLowestPrice` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2003-07-16 17:12:42 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |
| Returns | money |

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
CREATE  function dbo.uf_NextLowestPrice(@pBidItemRequestId int)
returns money
as
begin
declare @Price money
  
select top 1 @Price = UnitPrice
           from (select top 2 BidResults.UnitPrice 
                   from BidResults
                   join BidImports on BidImports.BidImportId = BidResults.BidImportId
                  where BidResults.BidRequestItemId = @pBidItemRequestId
                    and BidImports.Active = 1
                    and BidResults.ItemBidType in ('S','C')
                    and isnull(BidResults.Status,'') = ''
                  order by BidResults.UnitPrice desc) ss

  return(@Price)
end
```
