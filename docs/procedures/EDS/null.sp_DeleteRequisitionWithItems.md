# Procedure: `null.sp_DeleteRequisitionWithItems`

_Generated on 2026-05-04T13:04:00.218Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `null`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `null` |
| Name | `sp_DeleteRequisitionWithItems` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2003-03-13 11:26:51 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

_No parameters._

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
create procedure sp_DeleteRequisitionWithItems @pSessionId int, @pRequisitionId int, @rStatus int output AS

declare @ReqNumber varchar(255)

select Requisitions.RequisitionId
  from Requisitions
  left outer join PO on PO.RequisitionId = Requisitions.RequisitionId
 where Requisitions.RequisitionId = @pRequisitionId
   and PO.POId is null

if @@rowcount = 0
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
