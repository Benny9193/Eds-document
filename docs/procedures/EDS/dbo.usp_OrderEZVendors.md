# Procedure: `dbo.usp_OrderEZVendors`

_Generated on 2026-05-04T14:49:07.475Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_OrderEZVendors` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2019-03-19 13:42:03 |
| Modified | 2025-09-18 15:12:44 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRequisitionId` | IN | int |  |
| 2 | `@ShowEDS` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `BidsCatalogList` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Catalog` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `DistrictCategories` | USER_TABLE |  |
| `DistrictPP` | USER_TABLE |  |
| `PPCatalogs` | USER_TABLE |  |
| `PPCategory` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `VendorCategory` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |
| `dbo.utv_BidsList` | unresolved |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--exec usp_OrderEZVendors 55566873,1
CREATE   procedure [dbo].[usp_OrderEZVendors] @pRequisitionId int, @ShowEDS int
as
declare @BidHeaderId int, @DistrictId int, @CategoryId int
declare @BidsList as dbo.utv_BidsList;  -- table it TYPE'd in Programmability section
declare @VendorList table (VendorId int, CatalogId int, isEDS int, CategoryId int)

select @BidHeaderId = isnull(Requisitions.BidHeaderId,0), @DistrictId = Budgets.DistrictId, @CategoryId = Requisitions.CategoryId
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

-- Add Vendors from Bid(s)
insert @VendorList(VendorId, CatalogId, isEDS, CategoryId)
select Vendors.VendorId, Catalog.CatalogId, 0, BidHeaders.CategoryId
  from @BidsList bl
  join BidHeaders on BidHeaders.BidHeaderId = bl.BidHeaderId
  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
           and Bids.Active = 1
  join BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
  join Catalog on Catalog.CatalogId = BidsCatalogList.CatalogId
              and Catalog.Active = 1
			  and isnull(Catalog.NotValidForOB,0) = 0
  join Vendors on Vendors.VendorId = Catalog.VendorId
              and Vendors.VendorId not in ( 7691, 7853)
              and Vendors.Active = 1
 group by Vendors.VendorId, Catalog.CatalogId,BidHeaders.CategoryId

-- Add Addenda Vendors
insert @VendorList(VendorId, CatalogId, isEDS, CategoryId)
  select Vendors.VendorId, Catalog.CatalogId, 0, DistrictCategories.CategoryId
    from DistrictCategories with (nolock)
    join DistrictPP on DistrictPP.DistrictId = DistrictCategories.DistrictId
    join PPCatalogs on PPCatalogs.CategoryId = DistrictCategories.CategoryId
                   and PPCatalogs.PricePlanId = DistrictPP.PricePlanId
    join Catalog on Catalog.CatalogId = PPCatalogs.CatalogId
                and Catalog.Active = 1
    join Category on Category.CategoryId = Catalog.CategoryId
                 and Category.Type = 1
    join Vendors on Vendors.VendorId = Catalog.VendorId
                and Vendors.Active = 1
				and Vendors.VendorId != 7853
   where DistrictCategories.DistrictId = @DistrictId
     and DistrictCategories.CategoryId = @CategoryId
     and DistrictCategories.Active = 1
     and DistrictCategories.AllowAddenda = 1
   group by Vendors.VendorId, Catalog.CatalogId, DistrictCategories.CategoryId

if @ShowEDS = 1 or (select count(*) from @VendorList) = 0
begin
	-- Add EDS Vendor
	insert @VendorList(VendorId, CatalogId, isEDS, CategoryId)
	  select Vendors.VendorId, Catalog.CatalogId, 1, DistrictCategories.CategoryId
		from DistrictCategories with (nolock)
		join DistrictPP on DistrictPP.DistrictId = DistrictCategories.DistrictId
		join PPCatalogs on PPCatalogs.CategoryId = DistrictCategories.CategoryId
					   and PPCatalogs.PricePlanId = DistrictPP.PricePlanId
		join Catalog on Catalog.CategoryId = DistrictCategories.CategoryId
					and Catalog.Active = 1
					and Catalog.Name = 'EDS'
		join Vendors on Vendors.VendorId = Catalog.VendorId
					and Vendors.Active = 1
	   where DistrictCategories.DistrictId = @DistrictId
		 and DistrictCategories.CategoryId = @CategoryId
		 and DistrictCategories.Active = 1
	   group by Vendors.VendorId, Catalog.CatalogId, DistrictCategories.CategoryId
end

select Vendors.VendorId, coalesce(vc.VendorName,Vendors.DisplayAs,Vendors.Name,'') VendorName, coalesce(vc.WebLink, c.WebLink) WebURL
  from @VendorList vl
  join Vendors on Vendors.VendorId = vl.VendorId
  outer apply (select top 1 Catalog.WebLink from @VendorList vl1 join Catalog on Catalog.CatalogId = vl1.CatalogId where vl1.VendorId = vl.VendorId order by Catalog.WebLink desc) c
  outer apply (select top 1 VendorName, WebLink from VendorCategory where VendorCategory.VendorId = Vendors.VendorId and VendorCategory.CategoryId = vl.CategoryId) vc
 where Vendors.Name is not null
   and trim(Vendors.Name) != ''
   and vl.VendorId != 7691
 group by isEDS, Vendors.VendorId, coalesce(vc.VendorName,Vendors.DisplayAs,Vendors.Name,''), coalesce(vc.WebLink, c.WebLink)
 order by isEDS, coalesce(vc.VendorName,Vendors.DisplayAs,Vendors.Name,'')
```
