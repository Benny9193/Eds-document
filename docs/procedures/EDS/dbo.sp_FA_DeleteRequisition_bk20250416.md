# Procedure: `dbo.sp_FA_DeleteRequisition_bk20250416`

_Generated on 2026-05-04T14:49:07.273Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_FA_DeleteRequisition_bk20250416` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2025-04-15 22:25:26 |
| Modified | 2025-04-15 22:25:26 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pRequisitionId` | IN | int |  |
| 3 | `@rStatus` | INOUT | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Approvals` | USER_TABLE |  |
| `ApprovalsHistory` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `sp_UpdateReq` | unresolved |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure dbo.sp_FA_DeleteRequisition_bk20250416 @pSessionId int, @pRequisitionId int, @rStatus int output AS

declare @ReqNumber varchar(255),
	@POCount int,
	@DetailCount int,
	@ApprovalCount int,
	@CSRepId int

select Requisitions.RequisitionId
  from Requisitions
 where Requisitions.RequisitionId = @pRequisitionId

if @@rowcount = 0
begin
  RETURN
end

select @POCount = count(*)
  from Requisitions
  join PO on PO.RequisitionId = Requisitions.RequisitionId
 where Requisitions.RequisitionId = @pRequisitionId

if @POCount != 0
begin
  RETURN
end

select @CSRepId = isnull(CSRepId,0)
  from SessionTable
 where SessionTable.SessionId = @pSessionId

if @CSRepId = 0
begin
	select @DetailCount = count(*)
	  from Requisitions
	  join Detail on Detail.RequisitionId = Requisitions.RequisitionId
	 where Requisitions.RequisitionId = @pRequisitionId

	if @DetailCount != 0
	begin
	  RETURN
	end
end

exec sp_UpdateReq @pRequisitionId, null, null, null

select @ApprovalCount = COUNT(*)
  from Approvals
 where Approvals.RequisitionId = @pRequisitionId

if @ApprovalCount != 0
begin
  delete Approvals
   where RequisitionId = @pRequisitionId 
end
 
delete ApprovalsHistory
 where RequisitionId = @pRequisitionId
 
delete Detail
 where RequisitionId = @pRequisitionId

delete Requisitions
 where RequisitionId = @pRequisitionId

select @rStatus = 0

return
```
