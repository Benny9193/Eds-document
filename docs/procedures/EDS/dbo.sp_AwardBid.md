# Procedure: `dbo.sp_AwardBid`

_Generated on 2026-05-04T13:07:57.341Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_AwardBid` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-06-13 17:37:16 |
| Modified | 2015-11-24 23:37:27 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBidId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Awards` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `DistrictVendor` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_AwardBid] @pBidId int as

declare @AwardId int,
	@ItemsBid int,
	@AmountBid money

select @ItemsBid = count(*),
       @AmountBid = sum(isnull(BidQuantity,0) * isnull(Price,0))
  from BidItems
 where BidId = @pBidId

-- Check for Existing Award
select @AwardId = AwardId
  from Awards
 where BidId = @pBidId
   and Active = 1

if @@rowcount = 0
begin
  -- Create Award
  insert Awards (Active, BidId, VendorId, PricePlanId, CategoryId, VendorBidNumber, Description, CatalogId, ItemsBid, AmountBid)
    select 1, BidId, VendorId, PricePlanId, CategoryId, VendorBidNumber, Name, CatalogId, @ItemsBid, @AmountBid
      from Bids
     where BidId = @pBidId

  select @AwardId = Scope_Identity() --DCH 11/24/2015 @@IDENTITY
end

-- Award Items
Update BidItems
   set AwardId = @AwardId
  where BidId = @pBidId

-- Add District Vendor Entry if Needed
insert DistrictVendor (Active, DistrictId, VendorId)
  select 1, Bids.DistrictId, Awards.VendorId
    from Awards
    join Bids on Bids.BidId = Awards.BidId
    left outer join DistrictVendor on DistrictVendor.DistrictId = Bids.DistrictId
                                  and DistrictVendor.VendorId = Awards.VendorId
   where Awards.Active = 1
     and Bids.Active = 1
     and DistrictVendor.DistrictVendorId is null
     and Bids.DistrictId is not null
     and Bids.BidId = @pBidId
   group by Bids.DistrictId, Awards.VendorId

return
```
