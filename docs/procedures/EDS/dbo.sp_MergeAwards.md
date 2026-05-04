# Procedure: `dbo.sp_MergeAwards`

_Generated on 2026-05-04T13:07:57.488Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_MergeAwards` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-05-28 11:12:44 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSourceAwardId` | IN | int |  |
| 2 | `@pDestAwardId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Awards` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `Prices` | USER_TABLE |  |
| `sp_MergeBids` | unresolved |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE  procedure sp_MergeAwards @pSourceAwardId int, @pDestAwardId int AS

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
       @SourcePricePlanId = PricePlanId,
       @SourceBidId = BidId
  from Awards
 where AwardId = @pSourceAwardId

if @@rowcount = 0
begin
  RAISERROR('Invalid Source Award Specified',16,1)
  return
end

select @DestCategoryId = CategoryId,
       @DestVendorId = VendorId,
       @DestPricePlanId = PricePlanId,
       @DestBidId = BidId
  from Awards
 where AwardId = @pDestAwardId

if @@rowcount = 0
begin
  RAISERROR('Invalid Dest Award Specified',16,1)
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

if @SourceBidId != @DestBidId
begin
  exec sp_MergeBids @SourceBidId, @DestBidId
end

Update BidItems
   set AwardId = @pDestAwardId
 where AwardId = @pSourceAwardId

Update Prices
   set AwardId = @pDestAwardId
 where AwardId = @pSourceAwardId

Delete Awards
 where AwardId = @pSourceAwardId

return
```
