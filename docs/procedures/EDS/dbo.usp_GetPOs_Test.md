# Procedure: `dbo.usp_GetPOs_Test`

_Generated on 2026-05-04T13:04:24.369Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_GetPOs_Test` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2022-05-18 01:08:58 |
| Modified | 2022-05-18 01:08:58 |
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
| `Budgets` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `DistrictVendor` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `POQueue` | USER_TABLE |  |
| `POQueueItems` | USER_TABLE |  |
| `POStatus` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |
| `vw_POHeaderBidImports` | VIEW |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create     procedure [dbo].[usp_GetPOs_Test] @BudgetId int
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
UserNumber int null)

insert @POs(POId, BidHeaderId, CategoryId, RequisitionId, SchoolId, VendorId, AccountCode, Amount, Attention, CategoryName, DateSent, ItemCount, PONumber, RequisitionNumber, SchoolName, POStatus, VendorName, UserNumber)
  select PO.POId, BidHeaders.BidHeaderId AwardsBidHeaderId, Requisitions.CategoryId, 0 as RequisitionId, Requisitions.SchoolId, PO.VendorId, a.Code AccountCode, PO.Amount, Requisitions.Attention, Category.Name CategoryName, PO.ExportedToVendor, PO.ItemCount, 
         PO.PONumber, Requisitions.RequisitionNumber, School.Name SchoolName, 
         vps.POStatus, Vendors.Name VendorName, Users.CometId
    from Requisitions
	join PO on PO.RequisitionId = Requisitions.RequisitionId
	join School on School.SchoolId = Requisitions.SchoolId
	join Category on Category.CategoryId = Requisitions.CategoryId
	join Users on Users.UserId = Requisitions.UserId
	join Vendors on Vendors.VendorId = PO.VendorId
	join Budgets on Budgets.BudgetId = Requisitions.BudgetId
	join DistrictVendor on DistrictVendor.VendorId = Vendors.VendorId
	                   and DistrictVendor.DistrictId = Budgets.DistrictId
	outer apply (Select Accounts.Code from UserAccounts join Accounts on Accounts.AccountId = UserAccounts.AccountId where UserAccounts.UserAccountId = Requisitions.UserAccountId) a
    outer apply (select top 1 BI.VendorBidNumber, BI.POVendorContactId, BI.BidHeaderId 
                   from vw_POHeaderBidImports HBI
				   join BidImports BI on BI.BidImportId = HBI.BidImportId
				  where HBI.POId = PO.POId
				  order by HBI.BidType) BidImports	
    left outer join BidHeaders on BidHeaders.BidHeaderId = coalesce(BidImports.BidHeaderId, Requisitions.BidHeaderId)
	outer apply (select top 1 POStatus.StatusId, POStatus.UserId, POStatus.StatusDate, Users.Attention
	               from POStatus
				   left outer join Users on Users.UserId = POStatus.UserId
				  where POStatus.POId = PO.POId
				  order by POStatus.StatusDate desc) pos
	outer apply (select top 1 POQueueItems.POQueueItemId, POQueue.POQueueId, POQueue.RequestDate, POQueueItems.SendStarted
	               from POQueueItems
				   join POQueue on POQueue.POQueueId = POQueueItems.POQueueId
				  where POQueueItems.POId = PO.POId
				  order by POQueue.RequestDate Desc) POQ
	outer apply (Select case
						   when isnull(pos.StatusId,0) in (0,1,2,5) 
							and PO.ExportedToVendor is not null 
							and POQ.POQueueItemId is not null 
							and POQ.POQueueItemId is not null then 'PO Transmitted to Vendor on ' + convert(varchar(50),POQ.SendStarted,100) 
						   when isnull(pos.StatusId,0) < 2 
				--		    and POHeader.ExportedToVendor is null 
							and POQ.POQueueItemId is null 
							and Vendors.AllowElectronicPOs = 1 
							and POQ.POQueueItemId is null 
							and (   Vendors.UploadType in (1,2,4,5) 
								 or (    Vendors.UploadType in (3) 
									 and coalesce(trim(DistrictVendor.VendorsAccountCode),'') != '')) then 'PO Ready to be Transmitted' 
						   when isnull(pos.StatusId,0) < 2 
				--		    and POHeader.ExportedToVendor is null 
							and POQ.POQueueItemId is not null 
							and Vendors.AllowElectronicPOs = 1 
							and POQ.POQueueItemId is not null 
							and (   Vendors.UploadType in (1,2,4,5) 
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
  where Requisitions.BudgetId = @BudgetId

select *
  from @POs
 order by POId
```
