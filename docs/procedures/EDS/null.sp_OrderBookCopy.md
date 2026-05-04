# Procedure: `null.sp_OrderBookCopy`

_Generated on 2026-05-04T13:04:00.220Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `null`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `null` |
| Name | `sp_OrderBookCopy` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-12-19 16:06:48 |
| Modified | 2015-11-24 23:37:41 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.OrderBookDetail` | USER_TABLE |  |
| `dbo.OrderBooks` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [EDSIQWebUser].[sp_OrderBookCopy] @pOrderBookId int as

declare @OrderBookId int

insert dbo.OrderBooks (PricePlanDescription, Category, CategoryId, PricePlanId, AwardId, Type)
  select 'Copy of ' + PricePlanDescription, Category, CategoryId, PricePlanId, AwardId, Type
    from dbo.OrderBooks
   where OrderBookId = @pOrderBookId

select @OrderBookId = Scope_Identity() --DCH 11/24/2015 @@IDENTITY

insert dbo.OrderBookDetail (OrderBookId, Active, ItemId, BidItemId, Weight)
  select @OrderBookId, Active, ItemId, BidItemId, Weight
    from dbo.OrderBookDetail
   where OrderBookId = @pOrderBookId
```
