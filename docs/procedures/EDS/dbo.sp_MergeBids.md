# Procedure: `dbo.sp_MergeBids`

_Generated on 2026-05-04T13:04:00.415Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_MergeBids` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-05-28 10:32:49 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSourceBidId` | IN | int |  |
| 2 | `@pDestBidId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Awards` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE  procedure sp_MergeBids @pSourceBidId int, @pDestBidId int AS

declare @SourceBidId int,
	@DestBidId int,
	@SourcePricePlanId int,
	@DestPricePlanId int,
	@SourceCategoryId int,
	@DestCategoryId int,
	@SourceVendorId int,
	@DestVendorId int

select @SourceCategoryId = CategoryId,
       @SourceVendorId = VendorId,
       @SourcePricePlanId = PricePlanId
  from Bids
 where BidId = @pSourceBidId

if @@rowcount = 0
begin
  RAISERROR('Invalid Source Bid Specified',16,1)
  return
end

select @DestCategoryId = CategoryId,
       @DestVendorId = VendorId,
       @DestPricePlanId = PricePlanId
  from Bids
 where BidId = @pDestBidId

if @@rowcount = 0
begin
  RAISERROR('Invalid Dest Bid Specified',16,1)
  return
end

if @SourceCategoryId != @DestCategoryId
begin
  RAISERROR('Source and Destination Categories do not match',16,1)
  return
end

if @SourcePricePlanId != @DestPricePlanId
begin
  RAISERROR('Source and Destination Price Plans do not match',16,1)
  return
end

if @SourceVendorId != @DestVendorId
begin
  RAISERROR('Source and Destination Vendors do not match',16,1)
  return
end

Update BidItems
   set BidId = @pDestBidId
 where BidId = @pSourceBidId

Update Awards
   set BidId = @pDestBidId
 where BidId = @pSourceBidId

Delete Bids
 where BidId = @pSourceBidId

return
```
