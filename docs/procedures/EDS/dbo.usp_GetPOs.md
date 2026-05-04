# Procedure: `dbo.usp_GetPOs`

_Generated on 2026-05-04T13:04:00.716Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_GetPOs` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2019-04-28 12:46:44 |
| Modified | 2026-02-02 22:34:26 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@BudgetId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |
| `BidHeaders` | USER_TABLE |  |
| `BidImports` | USER_TABLE |  |
| `BidItems` | USER_TABLE |  |
| `Bids` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `DistrictVendor` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `PODetailItems` | USER_TABLE |  |
| `POQueue` | USER_TABLE |  |
| `POQueueItems` | USER_TABLE |  |
| `POStatus` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `VendorOrders` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |
| `VendorUploads` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--exec usp_GetPOs 1685242--1672687
CREATE     procedure [dbo].[usp_GetPOs] @BudgetId int
as
/*
				"POId": "#variables.rsPOs.POId#",
				"BidHeaderId": "#variables.rsPOs.BidHeaderId#",
				"CategoryId": "#variables.rsPOs.CategoryId#",
				"RequisitionId": "#variables.rsPOs.RequisitionId#",
				"SchoolId": "#variables.rsPOs.SchoolId#",
				"VendorId": "#variables.rsPOs.VendorId#",
				"AccountCode": "#variables.rsPOs.AccountCode#",
				"Amount": "#variables.rsPOs.Amount#",
				"Attention": "#variables.rsPOs.Attention#",
				"CategoryName": "#variables.rsPOs.CategoryName#",
				"DateSent": "#variables.rsPOs.DateSent#",
				"ItemCount": "#variables.rsPOs.ItemCount#",
				"PONumber": "#variables.rsPOs.PONumber#",
				"SchoolName": "#variables.rsPOs.SchoolName#"
				"Status": "#variables.rsPOs.POStatus#",
				"VendorName": "#variables.rsPOs.VendorName#",
				"UserNumber": "#variables.rsPOs.UserNumber#",
				"Updated": false
*/
declare @POs table (
POId	int null,
BidHeaderId int null,
CategoryId int null,
RequisitionId int null,
SchoolId int null,
VendorId int null,
AccountCode varchar(50) null,
Amount	decimal(14,2) null,
Attention varchar(50) null,
CategoryName varchar(50) null,
DateSent datetime null,
ItemCount int null,
PONumber varchar(50) null,
RequisitionNumber varchar(50) null,
SchoolName varchar(50) null,
POStatus varchar(255) null,
VendorName varchar(50) null,
UserNumber int null,
UserAccountId int null,
ExportedToVendor datetime null,
DistrictId int null,
ReqBidHeaderId int null,
BidImportId int null,
PODate date,
ePOSuppressed tinyint null,
VendorStatus varchar(max) null,
VendorStatusLastUpdated datetime null,
DateExported datetime null,
RequestedDeliveryDate date null,
POComments varchar(4096) null)

insert @POs(POId, CategoryId, RequisitionId, SchoolId, VendorId, Amount, Attention, CategoryName, DateSent, ItemCount, PONumber, RequisitionNumber, SchoolName, VendorName, UserNumber, UserAccountId, ExportedToVendor, DistrictId, ReqBidHeaderId, PODate, ePOSuppressed, DateExported)
  select PO.POId, Requisitions.CategoryId, Requisitions.RequisitionId as RequisitionId, Requisitions.SchoolId, PO.VendorId, PO.Amount, Requisitions.Attention, Category.Name CategoryName, PO.ExportedToVendor, PO.ItemCount, 
         PO.PONumber, Requisitions.RequisitionNumber, School.Name SchoolName, 
         Vendors.Name VendorName, Users.CometId, Requisitions.UserAccountId, PO.ExportedToVendor, Budgets.DistrictId, Requisitions.BidHeaderId, PO.PODate, PO.ePOSuppressed,
		 PO.DateExported
    from Requisitions
	join PO on PO.RequisitionId = Requisitions.RequisitionId
	join School on School.SchoolId = Requisitions.SchoolId
	join Category on Category.CategoryId = Requisitions.CategoryId
	join Users on Users.UserId = Requisitions.UserId
	join Vendors on Vendors.VendorId = PO.VendorId
	join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  where Requisitions.BudgetId = @BudgetId

  update po
     set AccountCode = a.Code,
		 POStatus = vps.POStatus,
		 VendorStatus = vo.VendorStatus,
		 VendorStatusLastUpdated = vo.LastUpdated,
		 RequestedDeliveryDate = poq.RequestedDeliveryDate,
		 POComments = poq.OrderComments
    from @Pos po
	join Vendors on Vendors.VendorId = PO.VendorId
	join DistrictVendor on DistrictVendor.VendorId = Vendors.VendorId
	                   and DistrictVendor.DistrictId = PO.DistrictId
	outer apply (Select Accounts.Code 
	               from UserAccounts 
				   join Accounts on Accounts.AccountId = UserAccounts.AccountId 
				  where UserAccounts.UserAccountId = po.UserAccountId) a
--    left outer join BidHeaders on BidHeaders.BidHeaderId = coalesce(BidImports.BidHeaderId, Requisitions.BidHeaderId)
	outer apply (select top 1 POStatus.StatusId, POStatus.UserId, POStatus.StatusDate, Users.Attention
	               from POStatus
				   left outer join Users on Users.UserId = POStatus.UserId
				  where POStatus.POId = PO.POId
				  order by POStatus.StatusDate desc) pos
	outer apply (Select top 1 VendorOrders.VendorStatus, VendorOrders.LastUpdated from VendorOrders where VendorOrders.POId = po.POId order by VendorOrders.LastUpdated desc) vo
	outer apply (select top 1 POQueueItems.POQueueItemId, POQueue.POQueueId, POQueue.RequestDate, POQueueItems.SendStarted, POQueue.RequestedDeliveryDate, POQueue.OrderComments
	               from POQueueItems
				   join POQueue on POQueue.POQueueId = POQueueItems.POQueueId
				  where POQueueItems.POId = PO.POId
				  order by POQueue.RequestDate Desc, POQueue.SendStarted desc) POQ
	outer apply (Select top 1 VendorUploads.UploadId, VendorUploads.DateUploaded
	               from VendorUploads
				  where VendorUploads.POId = PO.POId
				  order by VendorUploads.DateUploaded desc) vu
	outer apply (Select case
						   when isnull(pos.StatusId,0) in (0,1,2,5,6) 
							and PO.ExportedToVendor is not null 
							and POQ.SendStarted is not null 
							and POQ.POQueueItemId is not null then 'PO Transmitted to Vendor on ' + convert(varchar(50),POQ.SendStarted,100) 
						   when vu.UploadId is not null and Vendors.VendorId = 9 then 'PO Processed by Vendor on ' + convert(varchar(50),vu.DateUploaded,100)
						   when isnull(pos.StatusId,0) < 1 
				--		    and POHeader.ExportedToVendor is null 
							and POQ.POQueueItemId is null 
							and Vendors.AllowElectronicPOs = 1 
							and POQ.POQueueItemId is null 
							and coalesce(PO.ePOSuppressed,0) = 0
							and (   Vendors.UploadType in (1,2,4,5,6,7) 
								 or (    Vendors.UploadType in (3) 
									 and coalesce(trim(DistrictVendor.VendorsAccountCode),'') != '')) then 'PO Ready to be Transmitted' 
						   when isnull(pos.StatusId,0) < 2 
				--		    and POHeader.ExportedToVendor is null 
							and POQ.POQueueItemId is not null 
							and Vendors.AllowElectronicPOs = 1 
							and POQ.POQueueItemId is not null 
							and (   Vendors.UploadType in (1,2,4,5,6,7) 
								 or (    Vendors.UploadType in (3) 
									 and coalesce(trim(DistrictVendor.VendorsAccountCode),'') != '')) then 'PO Queued for Transmission' 
				/*		   when isnull(pos.StatusId,0) < 2 
							and ExportedToVendor is not null 
							and POQ.POQueueItemId is null 
							and Vendors.AllowElectronicPOs = 1 
							then 'PO Processed by Vendor on ' + convert(varchar(50),ExportedToVendor,100)
				*/
						   when (    isnull(pos.StatusId,0) < 2 
								 and PO.ExportedToVendor is null) 
							 or (pos.StatusId = 1)
							 or (po.ePOSuppressed = 1)
							 or (    isnull(pos.StatusId,0) < 2 
								 and PO.ExportedToVendor is not null 
								 and POQ.POQueueItemId is null) then 'PO Ready to be Mailed'
						   when pos.StatusId = 1 then 'PO Printed on ' + convert(varchar(50),pos.StatusDate,100) + case when pos.UserId is not null then ' by ' + pos.Attention else '' end
						   when pos.StatusId = 2 then 'PO Mailed on ' + convert(varchar(50),pos.StatusDate,100) + case when pos.UserId is not null then ' by ' + pos.Attention else '' end
						   when pos.StatusId = 3 then 'PO Received on ' + convert(varchar(50),pos.StatusDate,100) + case when pos.UserId is not null then ' by ' + pos.Attention else '' end
						   when pos.StatusId = 4 then 'PO Paid on ' + convert(varchar(50),pos.StatusDate,100) + case when pos.UserId is not null then ' by ' + pos.Attention else '' end
						   when pos.StatusId = 5 then 'PO Queued to Send on ' + convert(varchar(50),pos.StatusDate,100) + case when pos.UserId is not null then ' by ' + pos.Attention else '' end
						   else 'Unknown'
						 end as POStatus) vps

Update po
   set BidImportId = b.BidImportId
  from @Pos po
  join PODetailItems on PODetailItems.POId = po.POId
  join BidItems bi on bi.BidItemId = PODetailItems.BidItemId
  join Bids b on b.BidId = bi.BidId
			 and b.VendorId = PODetailItems.VendorId

Update po
   set BidImportId = Bids.BidImportId
  from @Pos po
  join PODetailItems on PODetailItems.POId = po.POId
  join Detail on Detail.DetailId = PODetailItems.DetailId
  join Requisitions r on r.RequisitionId = Detail.RequisitionId
  join Bids on Bids.VendorId = PODetailItems.VendorId
		   and Bids.BidHeaderId = case when coalesce(detail.BidHeaderId,0) = 0 then r.BidHeaderId else Detail.BidHeaderId end
		   and Bids.Active = 1
 where po.BidImportId is null

Update po
   set BidHeaderId = BidHeaders.BidHeaderId
  from @Pos po
  join BidImports on BidImports.BidImportId = po.BidImportId
  left outer join BidHeaders on BidHeaders.BidHeaderId = coalesce(BidImports.BidHeaderId, po.ReqBidHeaderId)

select *
  from @POs
 order by POId
```
