# Procedure: `dbo.sp_RefreshDistrictVendors`

_Generated on 2026-05-04T13:07:57.516Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_RefreshDistrictVendors` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2003-06-30 12:55:54 |
| Modified | 2014-05-20 12:12:32 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pDistrictId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `DistrictPP` | USER_TABLE |  |
| `DistrictVendor` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE      procedure [dbo].[sp_RefreshDistrictVendors] @pDistrictId int as

insert DistrictVendor (Active, DistrictId, VendorId)
  select ss.*
    from (
	  select 1 Active, DistrictPP.DistrictId, Vendors.VendorId
		from Requisitions
		join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId
		               and GETDATE() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
		               and BidHeaders.Active = 1
		join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
		         and Bids.Active = 1
		join Budgets on Budgets.BudgetId = Requisitions.BudgetId 
--					and dateadd(month,8,getdate()) between Budgets.StartDate and Budgets.EndDate 
		join DistrictPP on DistrictPP.DistrictId = Budgets.DistrictId
		               and DistrictPP.PricePlanId = BidHeaders.PricePlanId
--		join PricePlans on PricePlans.PricePlanId = DistrictPP.PricePlanId
--		join Awards on Awards.PricePlanId = DistrictPP.PricePlanId
		join Vendors on Vendors.VendorId = Bids.VendorId
		join Category on Category.CategoryId = Requisitions.CategoryId
		left outer join PO on PO.RequisitionId = Requisitions.RequisitionId
						  and PO.VendorId = Vendors.VendorId
		left outer join DistrictVendor on DistrictVendor.DistrictId = DistrictPP.DistrictId
									  and DistrictVendor.VendorId = Vendors.VendorId
									  and DistrictVendor.Active = 1
	   where DistrictPP.DistrictId = @pDistrictId
		 and DistrictVendor.DistrictVendorId is null
		 and case Category.Type when 2 then isnull(PO.POId,0) else 1 end != 0
	   group by DistrictPP.DistrictId, Vendors.VendorId
         ) ss
    left outer join DistrictVendor on DistrictVendor.DistrictId = ss.DistrictId
                                  and DistrictVendor.VendorId = ss.VendorId
   where DistrictVendor.DistrictVendorId is null
```
