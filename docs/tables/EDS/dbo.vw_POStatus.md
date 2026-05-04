# View: `dbo.vw_POStatus`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `POId` | int | NO |  |  |
| 2 | `AwardsBidHeaderId` | int | YES |  |  |
| 3 | `CategoryId` | int | YES |  |  |
| 4 | `RequisitionId` | int | NO |  |  |
| 5 | `SchoolId` | int | NO |  |  |
| 6 | `VendorId` | int | YES |  |  |
| 7 | `AccountCode` | varchar(50) | YES |  |  |
| 8 | `Amount` | money | YES |  |  |
| 9 | `Attention` | varchar(50) | YES |  |  |
| 10 | `CategoryName` | varchar(50) | YES |  |  |
| 11 | `ExportedToVendor` | datetime | YES |  |  |
| 12 | `ItemCount` | int | YES |  |  |
| 13 | `PONumber` | varchar(24) | YES |  |  |
| 14 | `RequisitionNumber` | varchar(24) | YES |  |  |
| 15 | `SchoolName` | varchar(50) | YES |  |  |
| 16 | `POStatus` | varchar(125) | YES |  |  |
| 17 | `VendorName` | varchar(50) | YES |  |  |
| 18 | `CometId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `DistrictVendor` | USER_TABLE |
| `POHeader` | VIEW |
| `POQueue` | USER_TABLE |
| `POQueueItems` | USER_TABLE |
| `POStatus` | USER_TABLE |
| `Users` | USER_TABLE |
| `Vendors` | USER_TABLE |
| `VendorUploads` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| `dbo.sp_FA_RequisitionsForPurchaseOrderModal` | SQL_STORED_PROCEDURE |

## Definition

```sql
--update Vendors set AllowElectronicPOs = 1 where VendorId = 2198
--select * from Vendors where VendorId = 2198
--exec usp_GetPOs 1451139
--select * from POQueueItems where POId = 706867250
--select * from POStatus where POId = 706867250

CREATE       view [dbo].[vw_POStatus] as
  select POHeader.POId, POHeader.AwardsBidHeaderId, POHeader.CategoryId, 0 as RequisitionId, POHeader.SchoolId, POHeader.VendorId, POHeader.AccountCode, POHeader.Amount, POHeader.Attention, POHeader.CategoryName, POHeader.ExportedToVendor, POHeader.ItemCount, 
         POHeader.PONumber, POHeader.RequisitionNumber, POHeader.SchoolName, 
         case
		   when isnull(pos.StatusId,0) in (0,1,2,4,5,6) 
		    and (POHeader.ExportedToVendor is not null 
			     or POQ.SendStatus like '%StatusCode=200%')
			and POQ.SendStarted is not null 
			and POQ.POQueueItemId is not null then 'PO Transmitted to Vendor on ' + convert(varchar(50),POQ.SendStarted,100) 
		   when vu.UploadId is not null and Vendors.VendorId = 9 then 'PO Processed by Vendor on ' + convert(varchar(50),vu.DateUploaded,100)
		   when isnull(pos.StatusId,0) < 1 
--		    and POHeader.ExportedToVendor is null 
			and POQ.POQueueItemId is null 
			and Vendors.AllowElectronicPOs = 1 
			and coalesce(POHeader.ePOSuppressed,0) = 0
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
		         and POHeader.ExportedToVendor is null) 
			 or (pos.StatusId = 1) 
			 or (POHeader.ePOSuppressed = 1)
			 or (    isnull(pos.StatusId,0) < 2 
			     and POHeader.ExportedToVendor is not null 
				 and POQ.POQueueItemId is null) then 'PO Ready to be Mailed'
		   when pos.StatusId = 1 then 'PO Printed on ' + convert(varchar(50),pos.StatusDate,100) + case when pos.UserId is not null then ' by ' + pos.Attention else '' end
		   when pos.StatusId = 2 then 'PO Mailed on ' + convert(varchar(50),pos.StatusDate,100) + case when pos.UserId is not null then ' by ' + pos.Attention else '' end
		   when pos.StatusId = 3 then 'PO Received on ' + convert(varchar(50),pos.StatusDate,100) + case when pos.UserId is not null then ' by ' + pos.Attention else '' end
		   when pos.StatusId = 4 then 'PO Paid on ' + convert(varchar(50),pos.StatusDate,100) + case when pos.UserId is not null then ' by ' + pos.Attention else '' end
		   when pos.StatusId = 5 then 'PO Queued to Send on ' + convert(varchar(50),pos.StatusDate,100) + case when pos.UserId is not null then ' by ' + pos.Attention else '' end
		   else 'Unknown'
		 end as POStatus, POHeader.VendorName, POHeader.CometId
    from POHeader
	join Vendors on Vendors.VendorId = POHeader.VendorId
	join DistrictVendor on DistrictVendor.VendorId = Vendors.VendorId
	                   and DistrictVendor.DistrictId = POHeader.DistrictId
	outer apply (select top 1 POStatus.StatusId, POStatus.UserId, POStatus.StatusDate, Users.Attention
	               from POStatus
				   left outer join Users on Users.UserId = POStatus.UserId
				  where POStatus.POId = POHeader.POId
				  order by POStatus.StatusDate desc) pos
	outer apply (select top 1 POQueueItems.POQueueItemId, POQueue.POQueueId, POQueue.RequestDate, POQueueItems.SendStarted, POQueueItems.SendStatus
	               from POQueueItems
				   join POQueue on POQueue.POQueueId = POQueueItems.POQueueId
				  where POQueueItems.POId = POHeader.POId
				  order by POQueue.RequestDate Desc, POQueue.SendStarted desc) POQ
	outer apply (Select top 1 VendorUploads.UploadId, VendorUploads.DateUploaded
	               from VendorUploads
				  where VendorUploads.POId = POHeader.POId
				  order by VendorUploads.DateUploaded desc) vu
```
