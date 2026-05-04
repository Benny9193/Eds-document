# Procedure: `dbo.usp_SearchVendors`

_Generated on 2026-05-04T13:04:24.387Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_SearchVendors` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2019-01-28 08:13:15 |
| Modified | 2025-09-18 15:12:43 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRequisitionId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `DistrictPP` | USER_TABLE |  |
| `PPCategory` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `VendorCategory` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |
| `dbo.utv_BidsList` | unresolved |  |
| `dbo.PricingConsolidated` | unresolved | `searchdata` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--exec usp_SearchVendors 55566873
CREATE   procedure [dbo].[usp_SearchVendors] @pRequisitionId int
as
declare @BidHeaderId int
declare @BidsList as dbo.utv_BidsList;  -- table it TYPE'd in Programmability section
declare @VendorList table (VendorId int, CategoryId int)

select @BidHeaderId = isnull(Requisitions.BidHeaderId,0)
  from Requisitions with (nolock) 
  left outer join Budgets on Budgets.BudgetId = Requisitions.BudgetId
 where RequisitionId = @pRequisitionId

-- Build Base List of Bids for each Requisition
if @BidHeaderId is not null and @BidHeaderId != 0
begin
	insert @BidsList (RequisitionId, BidHeaderId)
	values (@pRequisitionId, @BidHeaderId)
end
     
-- Add All other bids needed to list
while @@rowcount != 0
begin
-- Add Parent PreBids
insert @BidsList (RequisitionId, BidHeaderId)
	select Requisitions.RequisitionId, BidHeaders.BidHeaderId
	from Requisitions with (nolock)
	join @BidsList bl on bl.RequisitionId = Requisitions.RequisitionId
	join Budgets on Budgets.BudgetId = Requisitions.BudgetId
	join Category on Category.CategoryId = Requisitions.CategoryId
	join BidHeaders on BidHeaders.CategoryId = Requisitions.CategoryId
					and BidHeaders.Active = 1
					and BidHeaders.ParentBidHeaderId = bl.BidHeaderId
 					and isnull(BidHeaders.DistrictId,0) = case isnull(BidHeaders.BidType,1) when 2 then Budgets.DistrictId else isnull(BidHeaders.DistrictId,0) end
					and getdate() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
	join PPCategory on PPCategory.PricePlanId = BidHeaders.PricePlanId
					and PPCategory.CategoryId = BidHeaders.CategoryId
	join DistrictPP on DistrictPP.PricePlanId = BidHeaders.PricePlanId
					and DistrictPP.DistrictId = Budgets.DistrictId
	left outer join @BidsList ble on ble.RequisitionId = Requisitions.RequisitionId
									and ble.BidHeaderId = BidHeaders.BidHeaderId
	where ble.BidHeaderId is null
	group by Requisitions.RequisitionId, BidHeaders.BidHeaderId
end

insert @VendorList(VendorId, CategoryId)
  select pc.VendorId, pc.CategoryId
    from searchdata.dbo.PricingConsolidated pc
    join @BidsList bl on bl.BidHeaderId = pc.BidHeaderId
   where pc.VendorId != 7691
   group by pc.VendorId, pc.CategoryId

select vl.VendorId, coalesce(vc.VendorName,Vendors.DisplayAs,Vendors.Name,'') VendorName
  from @VendorList vl
  join Vendors on Vendors.VendorId = vl.VendorId
  outer apply (select top 1 VendorName from VendorCategory where VendorCategory.VendorId = Vendors.VendorId and VendorCategory.CategoryId = vl.CategoryId) vc
 where coalesce(vc.VendorName,Vendors.DisplayAs,Vendors.Name,'') != ''
 order by coalesce(vc.VendorName,Vendors.DisplayAs,Vendors.Name,'')
```
