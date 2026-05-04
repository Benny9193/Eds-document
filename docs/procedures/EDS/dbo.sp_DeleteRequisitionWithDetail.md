# Procedure: `dbo.sp_DeleteRequisitionWithDetail`

_Generated on 2026-05-04T13:04:24.117Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_DeleteRequisitionWithDetail` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2003-03-26 20:53:25 |
| Modified | 2009-03-25 06:55:28 |
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
| `Detail` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `sp_UpdateReq` | unresolved |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create procedure dbo.sp_DeleteRequisitionWithDetail @pSessionId int, @pRequisitionId int, @rStatus int output AS

declare @ReqNumber varchar(255),
	@POCount int,
	@DetailCount int

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

exec sp_UpdateReq @pRequisitionId, null, null, null

delete Detail
 where RequisitionId = @pRequisitionId

delete Requisitions
 where RequisitionId = @pRequisitionId

select @rStatus = 0
```
