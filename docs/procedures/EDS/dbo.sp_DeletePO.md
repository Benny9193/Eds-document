# Procedure: `dbo.sp_DeletePO`

_Generated on 2026-05-04T13:43:18.800Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_DeletePO` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-04-16 15:56:44 |
| Modified | 2014-05-20 13:29:00 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pPOId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Approvals` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `podetailItems` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `StatusTable` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE    procedure [dbo].[sp_DeletePO] @pPOId int AS

delete Approvals
  from Approvals
  join Requisitions on Requisitions.RequisitionId = Approvals.RequisitionId
  join Detail on Detail.RequisitionId = Requisitions.RequisitionId
  join podetailItems on PODetailItems.DetailId = Detail.DetailId
  join PO on PO.POId = PODetailItems.POId
  join School on School.SchoolId = Requisitions.SchoolId
  join StatusTable on StatusTable.StatusId = Approvals.StatusId
 where PO.POId = @pPOId
   and StatusTable.StatusCode = 'O'

Delete PODetailItems
  from podetailItems
  join PO on PO.POId = PODetailItems.POId
  join Requisitions on Requisitions.RequisitionId = PO.RequisitionId
  join School on School.SchoolId = Requisitions.SchoolId
 where PO.POId = @pPOId

/*
Update Detail
   set POId = null
 where POId = @pPOId
*/

Update Requisitions
   set OrderDate = null
  from Requisitions
  join PO on PO.RequisitionId = Requisitions.RequisitionId
 where PO.POId = @pPOId

delete po
 where poid = @pPOId
```
