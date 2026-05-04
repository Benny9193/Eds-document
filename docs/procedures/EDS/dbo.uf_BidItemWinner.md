# Function: inline table-valued: `dbo.uf_BidItemWinner`

_Generated on 2026-05-04T13:07:57.576Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_BidItemWinner` |
| Kind | Function (inline TVF) |
| sys.objects.type | `IF` (SQL_INLINE_TABLE_VALUED_FUNCTION) |
| Created | 2003-07-17 11:10:46 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBidHeaderId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaderDetail` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `BidImports` | USER_TABLE |  |
| `BidRequestItems` | USER_TABLE |  |
| `BidResults` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |
| `dbo.uf_LowestPriceId` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function dbo.uf_BidItemWinner(@pBidHeaderId int)
returns table
as
  return(select Vendors.Code VendorCode, Vendors.Name VendorName, Detail.RequisitionId, count(*) Items, sum(Detail.Quantity * BidResults.UnitPrice) NewPrice
          from BidHeaderDetail
          inner join Detail on Detail.DetailId = BidHeaderDetail.DetailId
          inner join BidRequestItems on BidRequestItems.BidRequestItemId = BidHeaderDetail.BidRequestItemId
          inner join BidHeaders on BidHeaders.BidHeaderId = BidHeaderDetail.BidHeaderId
          left outer join BidResults on BidResults.BidResultsId = dbo.uf_LowestPriceId(BidRequestItems.BidRequestItemId)
          left outer join BidImports on BidImports.BidImportId = BidResults.BidImportId
          inner join Vendors on Vendors.VendorId = isnull(BidImports.VendorId,7691)
         where BidHeaders.BidHeaderId = @pBidHeaderId
         group by Vendors.Code, Vendors.Name, Detail.RequisitionId)
```
