# Procedure: `dbo.usp_StartPOSend`

_Generated on 2026-05-04T13:04:24.391Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_StartPOSend` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2019-04-28 12:45:09 |
| Modified | 2023-05-23 10:24:06 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pPOQueueId` | IN | int |  |
| 2 | `@pPOId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `DistrictVendor` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `POQueue` | USER_TABLE |  |
| `POQueueItems` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE   procedure [dbo].[usp_StartPOSend] @pPOQueueId int, @pPOId int
as
begin
declare @POQueueItemId int

select @POQueueItemId = POQueueItems.POQueueItemId
  from POQueue with (nolock) 
  join POQueueItems on POQueueItems.POQueueId = POQueue.POQueueId 
 where POQueue.POQueueId = @pPOQueueId
   and POQueueItems.POId = @pPOId
 order by POQueueItems.POQueueItemId

Update POQueueItems
   set SendStarted = getdate()
 where POQueueItemId = @POQueueItemId


select Vendors.UploadType, Vendors.UploadEmailList, Vendors.Name VendorName, District.Name DistrictName, isnull(dv.VendorsAccountCode,'') VendorsAccountCode, PO.POId, PO.PONumber, PO.Amount, PO.ItemCount POLines, School.Name SchoolName, Category.Name CategoryName, Requisitions.Attention, POQueueItems.POQueueItemId, POQueue.EarliestDeliveryDate EarliestDeliveryDate, POQueue.RequestedDeliveryDate, isnull(POQueue.OrderComments,'') OrderComments
  from POQueueItems
  join POQueue on POQueue.POQueueId = POQueueItems.POQueueId
  join Vendors on Vendors.VendorId = POQueue.VendorId
  join PO on PO.POId = POQueueItems.POId
  join Requisitions on Requisitions.RequisitionId = PO.RequisitionId
  join Category on Category.CategoryId = Requisitions.CategoryId
  join School on School.SchoolId = Requisitions.SchoolId
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
  outer apply (select top 1 DistrictVendor.VendorsAccountCode
                 from DistrictVendor
				where DistrictVendor.DistrictId = District.DistrictId
				  and DistrictVendor.VendorId = Vendors.VendorId
				order by DistrictVendor.VendorsAccountCode) dv
 where POQueueItems.POQueueItemId = @POQueueItemId
end
```
