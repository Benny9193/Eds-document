# Procedure: `dbo.usp_QueuePOsToSend`

_Generated on 2026-05-04T13:04:00.737Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_QueuePOsToSend` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2019-06-10 11:24:30 |
| Modified | 2026-02-02 22:34:42 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pDistrictId` | IN | int |  |
| 3 | `@pBudgetId` | IN | int |  |
| 4 | `@pRequestedDeliveryDate` | IN | date |  |
| 5 | `@pPOComments` | IN | varchar(4096) |  |
| 6 | `@pPOSend` | IN | varchar(max) |  |
| 7 | `@ScheduledSendDate` | IN | date |  |
| 8 | `@AppendDeliveryDate` | IN | bit |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `POQueue` | USER_TABLE |  |
| `POQueueItems` | USER_TABLE |  |
| `POStatus` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE       procedure [dbo].[usp_QueuePOsToSend] 
@pSessionId int, 
@pDistrictId int, 
@pBudgetId int, 
@pRequestedDeliveryDate date, 
@pPOComments varchar(4096), 
@pPOSend varchar(max), 
@ScheduledSendDate DATE = NULL,        -- NEW: Date to release queued items
@AppendDeliveryDate BIT = 0            -- NEW: Whether to append delivery date to comments
as
begin
declare @POCount int,
		@RequestDate datetime = getdate()

--	insert DebugMsgs(Msg) values ('SessionId=' + isnull(cast(@pSessionId as varchar),'<null>') + ' DistrictId=' + isnull(cast(@pDistrictId as varchar),'<null>') + ' BudgetId=' + isnull(cast(@pBudgetId as varchar),'<null>') + ' DeliveryDate=' + isnull(convert(varchar,@pEarliestDeliveryDate,101),'<null>'))
--	insert DebugMsgs(Msg) values ('POSend=' + isnull(left(@pPOSend,1000),'<null>'))

	begin transaction
    SET NOCOUNT ON;
    
    DECLARE @FinalComments VARCHAR(MAX);
    
    -- If AppendDeliveryDate is true, prepend delivery date to comments
    IF @AppendDeliveryDate = 1
    BEGIN
        SET @FinalComments = 'Requested Delivery Date: ' + FORMAT(@pRequestedDeliveryDate, 'MM/dd/yyyy');
        IF LEN(ISNULL(@pPOComments, '')) > 0
        BEGIN
            SET @FinalComments = @FinalComments + CHAR(13) + CHAR(10) + @pPOComments;
        END
    END
    ELSE
    BEGIN
        SET @FinalComments = @pPOComments;
    END

	/* Create Queue Entry for Each Vendor */
	insert POQueue(UserId, VendorId, SessionId, RequestDate, EarliestDeliveryDate, RequestedDeliveryDate, OrderComments, ScheduledSendDate)
	  select SessionTable.UserId, PO.VendorId, Sessiontable.SessionId, @RequestDate, /*dateadd(day,-7,@pRequestedDeliveryDate)*/@pRequestedDeliveryDate, @pRequestedDeliveryDate, @pPOComments, @ScheduledSendDate
	  from SessionTable
	  join Budgets on Budgets.BudgetId = @pBudgetId
	  join District on District.DistrictId = Budgets.DistrictId
	               and District.DistrictId = @pDistrictId
	  join Requisitions on Requisitions.BudgetId = Budgets.BudgetId
	  join PO on PO.RequisitionId = Requisitions.RequisitionId
	  join Vendors on Vendors.VendorId = PO.VendorId
	              and Vendors.AllowElectronicPOs = 1
	  join openjson(@pPOSend) with (POId int '$."POId"') poi on poi.POId = PO.POId
	  outer apply (select POQueueItems.POQueueItemId
	                 from POQueueItems
					 join POQueue on POQueue.POQueueId = POQueueItems.POQueueId
					where POQueueItems.POId = PO.POId) qc
	 where SessionTable.SessionId = @pSessionId
	   and qc.POQueueItemId is null
	 group by SessionTable.UserId, PO.VendorId, Sessiontable.SessionId

	/* Update the PO Number to have a ED prefix if it's a WinCap ePO Purchase Order being sent */
	Update PO
	   set PONumber = 'ED' + PONumber
	from SessionTable
	join Budgets on Budgets.BudgetId = @pBudgetId
	join District on District.DistrictId = Budgets.DistrictId
				and District.DistrictId = @pDistrictId
				and District.AccountingFormatId = 30
	join Requisitions on Requisitions.BudgetId = Budgets.BudgetId
	join PO on PO.RequisitionId = Requisitions.RequisitionId
	       and coalesce(PO.ePOSuppressed,0) = 0
	       and PO.PONumber not like 'ED%'
	join Vendors on Vendors.VendorId = PO.VendorId
				and Vendors.AllowElectronicPOs = 1
	join openjson(@pPOSend) with (POId int '$."POId"') poi on poi.POId = PO.POId
	join POQueue on POQueue.SessionId = Sessiontable.SessionId
				and POQueue.UserId = SessionTable.UserId
				and POQueue.VendorId = PO.VendorId
				and POQueue.RequestDate = @RequestDate
	-- Check Queue for Item having been queued before
	-- Will need to check for being a Successful Transmission or not having been sent yet
	-- Failed or Cancelled Transmissions should allow a retransmit request
	outer apply (select POQueueItems.POQueueItemId
					from POQueueItems
					join POQueue on POQueue.POQueueId = POQueueItems.POQueueId
				where POQueueItems.POId = PO.POId) qc
	where SessionTable.SessionId = @pSessionId
  	  and qc.POQueueItemId is null

	/* Load Each Vendors PO's into the queue for that vendor */
	insert POQueueItems(POQueueId, POId)
	    select POQueue.POQueueId, PO.POId
		  from SessionTable
		  join Budgets on Budgets.BudgetId = @pBudgetId
		  join District on District.DistrictId = Budgets.DistrictId
					   and District.DistrictId = @pDistrictId
		  join Requisitions on Requisitions.BudgetId = Budgets.BudgetId
		  join PO on PO.RequisitionId = Requisitions.RequisitionId
		  join Vendors on Vendors.VendorId = PO.VendorId
					  and Vendors.AllowElectronicPOs = 1
		  join openjson(@pPOSend) with (POId int '$."POId"') poi on poi.POId = PO.POId
		  join POQueue on POQueue.SessionId = Sessiontable.SessionId
					  and POQueue.UserId = SessionTable.UserId
					  and POQueue.VendorId = PO.VendorId
					  and POQueue.RequestDate = @RequestDate
		  -- Check Queue for Item having been queued before
		  -- Will need to check for being a Successful Transmission or not having been sent yet
		  -- Failed or Cancelled Transmissions should allow a retransmit request
		  outer apply (select POQueueItems.POQueueItemId
						 from POQueueItems
						 join POQueue on POQueue.POQueueId = POQueueItems.POQueueId
						where POQueueItems.POId = PO.POId) qc
		 where SessionTable.SessionId = @pSessionId
		   and qc.POQueueItemId is null
		 group by POQueue.POQueueId, PO.POId

	select @POCount = @@Rowcount

	insert POStatus(POId, StatusId, UserId)
  	    select PO.POId, 5, SessionTable.UserId
		  from SessionTable
		  join Budgets on Budgets.BudgetId = @pBudgetId
		  join District on District.DistrictId = Budgets.DistrictId
					   and District.DistrictId = @pDistrictId
		  join Requisitions on Requisitions.BudgetId = Budgets.BudgetId
		  join PO on PO.RequisitionId = Requisitions.RequisitionId
		  join Vendors on Vendors.VendorId = PO.VendorId
					  and Vendors.AllowElectronicPOs = 1
		  join openjson(@pPOSend) with (POId int '$."POId"') poi on poi.POId = PO.POId
		  join POQueue on POQueue.SessionId = Sessiontable.SessionId
					  and POQueue.UserId = SessionTable.UserId
					  and POQueue.VendorId = PO.VendorId
					  and POQueue.RequestDate = @RequestDate
		  join POQueueItems on POQueueItems.POQueueId = POQueue.POQueueId
		                   and POQueueItems.POId = PO.POId
		 where SessionTable.SessionId = @pSessionId
		 group by PO.POId, SessionTable.UserId

	commit transaction

	select cast(@POCount as varchar) + ' POs were queued successfully' as Status
end
```
