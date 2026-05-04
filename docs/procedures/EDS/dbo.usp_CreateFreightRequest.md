# Procedure: `dbo.usp_CreateFreightRequest`

_Generated on 2026-05-04T14:49:07.456Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_CreateFreightRequest` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2022-01-30 23:03:10 |
| Modified | 2022-02-16 13:48:39 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@RequisitionId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `ShipLocations` | USER_TABLE |  |
| `ShippingCosts` | USER_TABLE |  |
| `ShippingRequests` | USER_TABLE |  |
| `VendorContacts` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE   procedure [dbo].[usp_CreateFreightRequest] @RequisitionId int
as
begin
/*
	-- Create Freight Request(s)
	Insert ShippingRequests (VendorId, EMailAddresses, RequisitionId, RequestStatus)
		select Vendors.VendorId, String_Agg(vc.Email, ',') Emails, Requisitions.RequisitionId, 'Awaiting Vendor'
		  from Requisitions
		  join Detail on Detail.RequisitionId = Requisitions.RequisitionId
			         and Detail.AdditionalShipping = 1
					 and Detail.VendorId != 7691
		  join Vendors on Vendors.VendorId = Detail.VendorId
		  outer apply (select ShippingRequests.ShippingRequestId
		                 from ShippingRequests
						where ShippingRequests.RequisitionId = Requisitions.RequisitionId
						  and ShippingRequests.VendorId = Vendors.VendorId) sr
		  outer apply (select top 100 trim(VendorContacts.Email) Email 
		                 from VendorContacts 
						where VendorContacts.VendorId = Vendors.VendorId 
						  and VendorContacts.Active = 1 
						  and VendorContacts.FreightContact = 1 
						  and coalesce(trim(VendorContacts.Email),'') != '' 
						group by trim(VendorContacts.Email) 
						order by trim(VendorContacts.Email)) vc
		 where Requisitions.RequisitionId = @RequisitionId
		   and vc.Email is not null
		   and ShippingRequests.ShippingRequestId is null
		 group by Vendors.VendorId, Requisitions.RequisitionId
		 order by Vendors.VendorId

	-- Attach Items to Request
	Insert ShippingCosts (DetailId, RequisitionId, ShippingRequestId, Quantity)
		select Detail.DetailId, Requisitions.RequisitionId, ShippingRequests.ShippingRequestId, Detail.Quantity
		  from Requisitions
		  join Detail on Detail.RequisitionId = Requisitions.RequisitionId
			         and Detail.AdditionalShipping = 1
					 and Detail.VendorId != 7691
		  join Vendors on Vendors.VendorId = Detail.VendorId
		  join ShippingRequests on ShippingRequests.RequisitionId = Requisitions.RequisitionId and ShippingRequests.VendorId = Vendors.VendorId
		  left outer join ShippingCosts on ShippingCosts.ShippingRequestId = ShippingRequests.ShippingRequestId
		                               and ShippingCosts.DetailId = Detail.DetailId
		 where Requisitions.RequisitionId = @RequisitionId
		   and ShippingCosts.ShippingCostId is null
		 order by Detail.DetailId
*/
		select Requisitions.RequisitionId, Vendors.VendorId, coalesce(trim(vc.Email),'') Email, sr.ShippingRequestId
		  into #RequestList
		  from Requisitions
		  join Detail on Detail.RequisitionId = Requisitions.RequisitionId
			         and Detail.AdditionalShipping = 1
					 and Detail.VendorId != 7691
					 and (   Detail.ShippingUpdated is null
					      or coalesce(Detail.ShippingCost,0) = 0
						  or coalesce(Detail.Quantity,0) != coalesce(Detail.ShippingQuantity,0))
		  join Vendors on Vendors.VendorId = Detail.VendorId
		  outer apply (select ShippingRequests.ShippingRequestId
		                 from ShippingRequests
						where ShippingRequests.RequisitionId = Requisitions.RequisitionId
						  and ShippingRequests.VendorId = Vendors.VendorId) sr
		  outer apply (select top 100 trim(VendorContacts.Email) Email 
		                 from VendorContacts 
						where VendorContacts.VendorId = Vendors.VendorId 
						  and VendorContacts.Active = 1 
						  and VendorContacts.FreightContact = 1 
						  and coalesce(trim(VendorContacts.Email),'') != '' 
						group by trim(VendorContacts.Email) 
						order by trim(VendorContacts.Email)) vc
		 where Requisitions.RequisitionId = @RequisitionId
		   and vc.Email is not null
		   and vc.Email != ''
         group by Requisitions.RequisitionId, Vendors.VendorId, coalesce(trim(vc.Email),''), sr.ShippingRequestId

-- Reset Prior Request if present
Update ShippingRequests
   set RequestCompleted = null,
       RequestStatus = 'Pending Vendor Reply, Sent ' + convert(varchar,getdate(),101)
  from #RequestList rl
  join ShippingRequests on ShippingRequests.ShippingRequestId = rl.ShippingRequestId

-- Add new Requests
insert ShippingRequests(RequisitionId, VendorId, EmailAddresses, RequestSent, RequestStatus)
  select RequisitionId, VendorId, STRING_AGG(Email,', '), getdate(), 'Pending Vendor Reply, Sent ' + convert(varchar,getdate(),101)
    from #RequestList rl
   where rl.ShippingRequestId is null
   group by RequisitionId, VendorId

		select Requisitions.RequisitionId, Vendors.VendorId, Detail.DetailId, sr.ShippingRequestId, Detail.Quantity, sc.ShippingCostId
		  into #RequestItems
		  from Requisitions
		  join Detail on Detail.RequisitionId = Requisitions.RequisitionId
			         and Detail.AdditionalShipping = 1
					 and Detail.VendorId != 7691
					 and (   Detail.ShippingUpdated is null
					      or coalesce(Detail.ShippingCost,0) = 0
						  or coalesce(Detail.Quantity,0) != coalesce(Detail.ShippingQuantity,0))
		  join Vendors on Vendors.VendorId = Detail.VendorId
		  outer apply (select ShippingRequests.ShippingRequestId
		                 from ShippingRequests
						where ShippingRequests.RequisitionId = Requisitions.RequisitionId
						  and ShippingRequests.VendorId = Vendors.VendorId) sr
		  outer apply (select ShippingCosts.ShippingCostId
		                 from ShippingCosts
						where ShippingCosts.ShippingRequestId = sr.ShippingRequestId
						  and ShippingCosts.DetailId = Detail.DetailId) sc
		  outer apply (select top 100 trim(VendorContacts.Email) Email 
		                 from VendorContacts 
						where VendorContacts.VendorId = Vendors.VendorId 
						  and VendorContacts.Active = 1 
						  and VendorContacts.FreightContact = 1 
						  and coalesce(trim(VendorContacts.Email),'') != '' 
						group by trim(VendorContacts.Email) 
						order by trim(VendorContacts.Email)) vc
		 where Requisitions.RequisitionId = @RequisitionId
		   and vc.Email is not null
		   and vc.Email != ''
		group by Requisitions.RequisitionId, Vendors.VendorId, Detail.DetailId, sr.ShippingRequestId, Detail.Quantity, sc.ShippingCostId

Update ShippingCosts
   set Quantity = ri.Quantity
  from #RequestItems ri
  join ShippingCosts on ShippingCosts.ShippingCostId = ri.ShippingCostId
 where ri.Quantity != ShippingCosts.Quantity

insert ShippingCosts(DetailId, RequisitionId, ShippingRequestId, Quantity)
  select DetailId, Requisitionid, ShippingRequestId, Quantity
    from #RequestItems ri
   where ri.ShippingCostId is null

drop table #RequestItems
drop table #RequestList

	-- Return Emails to Send
	select ShippingRequests.ShippingRequestUniqueId, Vendors.Name VendorName, ShippingRequests.EmailAddresses, District.Name DistrictName, ShipLocations.Name SchoolName, Requisitions.Attention
	  from ShippingRequests
	  join ShippingCosts on ShippingCosts.ShippingRequestId = ShippingRequests.ShippingRequestId
	  join Detail on Detail.DetailId = ShippingCosts.DetailId
	  join Vendors on Vendors.VendorId = ShippingRequests.VendorId
	  join Requisitions on Requisitions.RequisitionId = ShippingRequests.RequisitionId
	  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
	  join District on District.DistrictId = Budgets.DistrictId
	  join ShipLocations on ShipLocations.ShippingId = Requisitions.ShippingId
	 where ShippingRequests.RequisitionId = @RequisitionId
	   and ShippingRequests.RequestCompleted is null
     group by ShippingRequests.ShippingRequestUniqueId, Vendors.Name, ShippingRequests.EmailAddresses, District.Name, ShipLocations.Name, Requisitions.Attention
end
```
