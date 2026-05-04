# Procedure: `dbo.usp_POStatusUpdates`

_Generated on 2026-05-04T13:07:57.797Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_POStatusUpdates` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2019-07-17 15:25:13 |
| Modified | 2023-06-30 13:58:00 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pDistrictId` | IN | int |  |
| 3 | `@pBudgetId` | IN | int |  |
| 4 | `@pPOStatusUpdates` | IN | varchar(max) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `POStatus` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE     procedure [dbo].[usp_POStatusUpdates] @pSessionId int, @pDistrictId int, @pBudgetId int, @pPOStatusUpdates varchar(max)
as
begin
declare @POCount int,
		@RequestDate datetime = getdate()

	insert POStatus(POId, StatusId, UserId)
  	    select PO.POId, poi.POStatus, SessionTable.UserId
		  from SessionTable
		  join Budgets on Budgets.BudgetId = @pBudgetId
		  join District on District.DistrictId = Budgets.DistrictId
					   and District.DistrictId = @pDistrictId
		  join Requisitions on Requisitions.BudgetId = Budgets.BudgetId
		  join PO on PO.RequisitionId = Requisitions.RequisitionId
		  join openjson(@pPOStatusUpdates) with (POId int '$."POId"',
		                                         POStatus int '$."POStatus"') poi on poi.POId = PO.POId
		 where SessionTable.SessionId = @pSessionId
		 group by PO.POId, poi.POStatus, SessionTable.UserId

	select @POCount = @@Rowcount
	select cast(@POCount as varchar) + ' PO Statuses where Updated successfully' as Status
end
```
