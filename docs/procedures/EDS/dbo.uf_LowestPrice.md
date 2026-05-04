# Function: scalar: `dbo.uf_LowestPrice`

_Generated on 2026-05-04T13:07:57.656Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_LowestPrice` |
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

| Caller | Type |
|--------|------|
| `dbo.uf_BidAnalysisVendorSummary` | SQL_INLINE_TABLE_VALUED_FUNCTION |
| `dbo.uf_BidAnalysisVendorSummaryByDistrict` | SQL_INLINE_TABLE_VALUED_FUNCTION |

## Definition

```sql
CREATE  function dbo.uf_LowestPrice(@pBidItemRequestId int)
returns money
as
begin
declare @Price money
  
select top 1 @Price = BidResults.UnitPrice
           from BidResults
           join BidImports on BidImports.BidImportId = BidResults.BidImportId
          where BidResults.BidRequestItemId = @pBidItemRequestId
            and BidImports.Active = 1
            and BidResults.ItemBidType in ('S','C')
            and isnull(BidResults.Status,'') = ''
            and BidResults.Active = 1  -- added 9/08/08 kjm
          order by BidResults.UnitPrice

  return(@Price)
end
```
