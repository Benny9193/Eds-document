# Procedure: `null.sp_DeleteEmptyReqs`

_Generated on 2026-05-04T13:04:00.217Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `null`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `null` |
| Name | `sp_DeleteEmptyReqs` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2003-01-09 16:38:54 |
| Modified | 2014-01-06 16:40:17 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Approvals` | USER_TABLE |  |
| `ApprovalsHistory` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `DebugMsgs` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `sp_DeleteRequisition` | unresolved |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--select * from District where DistrictId = 263


CREATE     Procedure [EDSIQWebUser].[sp_DeleteEmptyReqs] AS

declare @RequisitionId int,
	@rStatus int

insert DebugMsgs(Msg) values ('Deleting Empty Requisitions')

declare DelReqCur cursor fast_forward read_only for
select Requisitions.RequisitionId 
  from Requisitions
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
              and Budgets.DistrictId != 263 -- Belleville
  left outer join Detail on Detail.RequisitionId = Requisitions.RequisitionId
  left outer join Approvals on Approvals.RequisitionId = Requisitions.RequisitionId
  left outer join ApprovalsHistory on ApprovalsHistory.RequisitionId = Requisitions.RequisitionId
 where Detail.detailId is null
   and Approvals.ApprovalId is null
   and ApprovalsHistory.ApprovalId is null

open DelReqCur

fetch next from DelReqCur into @RequisitionId 

while @@fetch_status = 0
begin
  exec sp_DeleteRequisition 1, @RequisitionId, @rStatus output

  fetch next from DelReqCur into @RequisitionId 
end

close DelReqCur
deallocate DelReqCur
```
