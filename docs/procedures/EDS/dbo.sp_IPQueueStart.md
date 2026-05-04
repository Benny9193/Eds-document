# Procedure: `dbo.sp_IPQueueStart`

_Generated on 2026-05-04T14:49:07.288Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_IPQueueStart` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-12-18 16:26:38 |
| Modified | 2012-12-18 17:51:55 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pDevice` | IN | varchar(50) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `IPQueue` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create procedure sp_QueueStart @pDevice varchar(50)
as
declare @IPQueueId int
	begin transaction
	select @IPQueueId = null
	select top 1 @IPQueueId = IPQueueId
	  from IPQueue
	 where IPQueue.Queue = @pDevice
	   and Started is null
	 order by IPQueueId
	 
	 if @@ROWCOUNT = 1
	 begin
		update IPQueue
		   set Started = GETDATE(),
			   Status = 'Generating Instruction Packets'
	     where IPQueue.IPQueueId = @IPQueueId
	 end
	 commit Transaction
	 select @IPQueueId IPQueueId
```
