# Procedure: `dbo.sp_ValidateBidImport`

_Generated on 2026-05-04T13:43:18.939Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_ValidateBidImport` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2003-07-15 16:20:30 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBidImportId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `BidRequestItems` | USER_TABLE |  |
| `BidResults` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE  procedure dbo.sp_ValidateBidImport @pBidImportId int as

-- Reset Bid Results Status Flag
Update BidResults
   set Status = null
 where BidImportId = @pBidImportId
   and Status is not null

-- Check Header Ids
Update BidResults
   set Status = 'Invalid Bid Header Link'
  from BidResults
  left outer join BidHeaders on BidHeaders.BidHeaderId = BidResults.BidHeaderId
 where BidResults.BidImportId = @pBidImportId
   and BidHeaders.BidHeaderId is null
   and BidResults.Status is null

-- Check Request Item Link
Update BidResults
   set Status = 'Request Item Link Invalid'
  from BidResults
  join BidHeaders on BidHeaders.BidHeaderId = BidResults.BidHeaderId
  left outer join BidRequestItems on BidRequestItems.BidRequestItemId = BidResults.BidRequestItemId
                                 and BidRequestItems.ItemId = BidResults.ItemId
 where BidResults.BidImportId = @pBidImportId
   and BidRequestItems.BidRequestItemId is null
   and BidResults.Status is null

-- Check Category
Update BidResults
   set Status = 'Category does NOT Match BidHeader'
  from BidResults
  left outer join BidHeaders on BidHeaders.BidHeaderId = BidResults.BidHeaderId
                            and BidHeaders.CategoryId = BidResults.CategoryId
 where BidResults.BidImportId = @pBidImportId
   and BidHeaders.BidHeaderId is null
   and BidResults.Status is null

-- Check Request Quantity
Update BidResults
   set Status = 'Requested Quantities do not match'
  from BidResults
  join BidHeaders on BidHeaders.BidHeaderId = BidResults.BidHeaderId
  left outer join BidRequestItems on BidRequestItems.BidRequestItemId = BidResults.BidRequestItemId
                                 and BidRequestItems.ItemId = BidResults.ItemId
                                 and BidRequestItems.BidRequest = BidResults.Quantity
 where BidResults.BidImportId = @pBidImportId
   and BidRequestItems.BidRequestItemId is null
   and BidResults.Status is null

-- Check Cost Calculation
Update BidResults
   set Status = 'Extended Cost does not match BidQty * UnitCost'
  from BidResults
  join BidHeaders on BidHeaders.BidHeaderId = BidResults.BidHeaderId
  join BidRequestItems on BidRequestItems.BidRequestItemId = BidResults.BidRequestItemId
 where BidResults.BidImportId = @pBidImportId
   and isnull(BidResults.Cost,0) != isnull(BidResults.QuantityBid * BidResults.UnitPrice,0)
   and BidResults.Status is null

-- Check Item Type
Update BidResults
   set Status = 'Bid Item Type not ''S'',''C'',''N'' or Empty'
  from BidResults
  join BidHeaders on BidHeaders.BidHeaderId = BidResults.BidHeaderId
  join BidRequestItems on BidRequestItems.BidRequestItemId = BidResults.BidRequestItemId
 where BidResults.BidImportId = @pBidImportId
   and BidResults.ItemBidType is not null
   and isnull(BidResults.ItemBidType,'') not in ('S','C','N','')
   and BidResults.Status is null

-- Check Unit Cost
Update BidResults
   set Status = 'Unit Cost of Zero'
  from BidResults
  join BidHeaders on BidHeaders.BidHeaderId = BidResults.BidHeaderId
  join BidRequestItems on BidRequestItems.BidRequestItemId = BidResults.BidRequestItemId
 where BidResults.BidImportId = @pBidImportId
   and BidResults.ItemBidType in ('S','C','N')
   and isnull(BidResults.UnitPrice,0) = 0
   and BidResults.Status is null
```
