# Function: scalar: `dbo.uf_LowestPriceId`

_Generated on 2026-05-04T13:07:57.657Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_LowestPriceId` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2003-07-16 17:12:42 |
| Modified | 2009-09-02 15:26:53 |
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

| Caller | Type |
|--------|------|
| `dbo.uf_BidAnalysisVendorSummary` | SQL_INLINE_TABLE_VALUED_FUNCTION |
| `dbo.uf_BidAnalysisVendorSummaryByDistrict` | SQL_INLINE_TABLE_VALUED_FUNCTION |
| `dbo.uf_BidItemWinner` | SQL_INLINE_TABLE_VALUED_FUNCTION |
| `dbo.uf_BidItemWinnerReq` | SQL_INLINE_TABLE_VALUED_FUNCTION |
| `dbo.vw_VendorBidInfoStats` | VIEW |

## Definition

```sql
CREATE  function [dbo].[uf_LowestPriceId](@pBidItemRequestId int)
returns int
as
begin
declare @PriceId int
  
select top 1 @PriceId = BidResults.BidResultsId
           from BidResults
           join BidImports on BidImports.BidImportId = BidResults.BidImportId
          where BidResults.BidRequestItemId = @pBidItemRequestId
            and BidImports.Active = 1
            and BidResults.ItemBidType in ('S','C')
            and isnull(BidResults.Status,'') = ''
            and isnull(BidResults.UnitPrice,0) - round(isnull(BidResults.UnitPrice,0) * ISNULL(BidImports.BidItemDiscountRate,0) / 100,2) <> 0  -- changed kjm 09/02/09
            and BidResults.Active = 1  -- added 4/24/08 kjm
          order by BidResults.UnitPrice - round(isnull(BidResults.UnitPrice,0) * ISNULL(BidImports.BidItemDiscountRate,0) / 100,2) Asc, BidResults.ItemBidType Desc, BidResults.BidImportId Asc    -- changed kjm 09/02/09   BidImportId is for a deterministic result.  This also provides consistency between the old and new BidMgr code  

  return(@PriceId)
end
```
