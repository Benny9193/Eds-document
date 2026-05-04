# Procedure: `dbo.sp_CreateBidFromRequest`

_Generated on 2026-05-04T13:04:00.340Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CreateBidFromRequest` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-06-08 20:40:58 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBidHeaderId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidItems` | USER_TABLE |  |
| `BidRequestItems` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE  procedure sp_CreateBidFromRequest @pBidHeaderId int AS

declare @BidId int

select @BidId = max(BidId)
  from Bids with (nolock)
 where BidHeaderId = @pBidHeaderId

insert BidItems (BidId, ItemId)
  select @BidId, ItemId from BidRequestItems with (nolock)
   where BidHeaderId = @pBidHeaderId
```
