# Procedure: `dbo.usp_EndPOSend`

_Generated on 2026-05-04T13:04:00.703Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_EndPOSend` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2019-04-28 12:45:09 |
| Modified | 2019-04-28 12:46:45 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pPOQueueItemId` | IN | int |  |
| 2 | `@pSendStatus` | IN | varchar(255) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `POQueueItems` | USER_TABLE |  |
| `VendorUploads` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create   procedure usp_EndPOSend @pPOQueueItemId int, @pSendStatus varchar(255)
as
declare @POId int

select @POId = POId
  from POQueueItems
 where POQueueItems.POQueueItemId = @pPOQueueItemId

Update POQueueItems
   set SendEnded = getdate(),
       SendStatus = @pSendStatus,
	   PayloadId = (select top 1 VendorUploads.PayloadId from VendorUploads where VendorUploads.POId = @POId order by VendorUploads.DateCreated desc)
 where POQueueItemId = @pPOQueueItemId
```
