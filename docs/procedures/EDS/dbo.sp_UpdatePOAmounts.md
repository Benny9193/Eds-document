# Procedure: `dbo.sp_UpdatePOAmounts`

_Generated on 2026-05-04T13:07:57.544Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_UpdatePOAmounts` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-06-12 15:19:45 |
| Modified | 2025-06-26 11:54:37 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pPOId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Awards` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `PODetailItems` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |
| `vw_RequisitionShippingCosts` | VIEW |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.sp_CreatePO` | SQL_STORED_PROCEDURE |
| `dbo.sp_CreatePO_Saved062724` | SQL_STORED_PROCEDURE |
| `dbo.sp_CreatePOTest` | SQL_STORED_PROCEDURE |
| `dbo.sp_FA_CreatePO` | SQL_STORED_PROCEDURE |

## Definition

```sql
CREATE        procedure [dbo].[sp_UpdatePOAmounts] @pPOId int AS

declare	@VendorId int,
	@TotalItems int,
	@tempItemCount int,
	@TotalBidCost money,
	@TotalGrossCost money,
	@TotalItemsCost money,
	@tempTotalGrossCost money,
	@TotalCalcAmount money,
	@TotalDiscountAmount money,
	@DiscountRate decimal(9,5)

  -- Initialize Variables
  select @TotalGrossCost = 0,
         @TotalItems = 0,
	 @TotalCalcAmount = 0,
	 @TotalDiscountAmount = 0

  -- Get Amount of PO
  select @TotalBidCost = sum(isnull(PODetailItems.Quantity,0) * round(isnull(PODetailItems.BidPrice,0),2)), 
         @tempItemCount = count(PODetailItems.DetailId)
    from PODetailItems
    join Detail on Detail.DetailId = PODetailItems.DetailId
    join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
    join School on School.SchoolId = Requisitions.SchoolId
    join District on District.DistrictId = School.DistrictId
    left outer join Vendors on Vendors.VendorId = PODetailItems.VendorId
   where PODetailItems.POId = @pPOId
     and isnull(Detail.UseGrossPrices,0) = 0

  -- Add Count
  select @TotalItems = @TotalItems + isnull(@tempItemCount,0)

  -- Get Detail for PO
  declare VendorCursor cursor FAST_FORWARD for 
  select isnull(PODetailItems.VendorId,0), isnull(PODetailItems.DiscountRate,0)
    from PODetailItems
    join Detail on Detail.DetailId = PODetailItems.DetailId
    join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
    join School on School.SchoolId = Requisitions.SchoolId
    join District on District.DistrictId = School.DistrictId
    left outer join Vendors on Vendors.VendorId = PODetailItems.VendorId
   where PODetailItems.POId = @pPOId
     and isnull(Detail.UseGrossPrices,0) = 1
   group by isnull(PODetailItems.VendorId,0), isnull(PODetailItems.DiscountRate,0)

  open VendorCursor

  -- Get First Discount Rate
  fetch next from VendorCursor into @VendorId, @DiscountRate

  while @@fetch_status = 0
  begin
    -- Calculate Gross Prices
    select @tempTotalGrossCost = sum(isnull(PODetailItems.Quantity,0) * isnull(PODetailItems.GrossPrice,0)),
           @tempItemCount = count(PODetailItems.DetailId)
      from PODetailItems
      join Detail on Detail.DetailId = PODetailItems.DetailId
      join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
      join School on School.SchoolId = Requisitions.SchoolId
      join District on District.DistrictId = School.DistrictId
      left outer join Vendors on Vendors.VendorId = PODetailItems.VendorId
     where PODetailItems.POId = @pPOId
       and isnull(PODetailItems.VendorId,0) = @VendorId
       and isnull(PODetailItems.DiscountRate,0) = @DiscountRate
       and isnull(Detail.UseGrossPrices,0) = 1

    -- Add Amount In
    select @TotalGrossCost = @TotalGrossCost + isnull(@tempTotalGrossCost,0),
           @TotalCalcAmount = @TotalCalcAmount + (isnull(@tempTotalGrossCost,0) * (1 - (isnull(@DiscountRate,0)/100))),
           @TotalDiscountAmount = @TotalDiscountAmount + (isnull(@tempTotalGrossCost,0) * (isnull(@DiscountRate,0)/100)),
           @TotalItems = @TotalItems + isnull(@tempItemCount,0)

    -- Get Next Discount Rate
    fetch next from VendorCursor into @VendorId, @DiscountRate
  end

  -- Close out Cursor

  close VendorCursor
  deallocate VendorCursor

  -- Add Costs
  select @TotalItemsCost = isnull(@TotalBidCost,0) + isnull(@TotalCalcAmount,0)

  -- Update PO
  Update PO
     Set Amount = @TotalItemsCost,
	 ItemCount = @TotalItems,
	 TotalGross = isnull(@TotalGrossCost,0) + isnull(@TotalBidCost,0),
         DiscountRate = @DiscountRate,
         DiscountAmount = @TotalDiscountAmount,
         AwardId = isnull(AwardId, (select top 1 PODetailItems.AwardId from PODetailItems where PODetailItems.POId = PO.POId order by PODetailItems.AwardId))
	from PO with (updlock,rowlock)
   where POId = @pPOId

  -- Add Freight
  Update PO
     Set Amount = Amount + round(Amount * (isnull(Vendors.ShippingPercentage,0) / 100),2) + isnull((select sum(coalesce(ShippingCost,0) + coalesce(TotalShippingCost,0)) from vw_RequisitionShippingCosts rsc join Awards on Awards.AwardId = PO.AwardId and Awards.BidHeaderId = rsc.BidHeaderId where rsc.RequisitionId = PO.RequisitionId and rsc.VendorId = PO.VendorId),0),
         ShippingAmount = round(Amount * (isnull(Vendors.ShippingPercentage,0) / 100),2) + isnull((select sum(coalesce(ShippingCost,0) + coalesce(TotalShippingCost,0)) from vw_RequisitionShippingCosts rsc join Awards on Awards.AwardId = PO.AwardId and Awards.BidHeaderId = rsc.BidHeaderId where rsc.RequisitionId = PO.RequisitionId and rsc.VendorId = PO.VendorId),0)
-- Code Replaced 2/6/19 DCH		 round(Amount * (isnull(Vendors.ShippingPercentage,0) / 100),2) + isnull((select sum(ShippingCost) from vw_RequisitionShippingCosts rsc join Awards on Awards.AwardId = PO.AwardId where rsc.RequisitionId = PO.RequisitionId and rsc.VendorId = PO.VendorId),0)
    from PO with (updlock,rowlock)
    join Vendors on Vendors.VendorId = PO.VendorId
   where POId = @pPOId

  return
```
