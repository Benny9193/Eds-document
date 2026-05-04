# Procedure: `dbo.sp_DeleteRequisitionRestricted`

_Generated on 2026-05-04T13:43:18.802Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_DeleteRequisitionRestricted` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-05-28 13:09:15 |
| Modified | 2017-05-11 15:15:45 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pReportSessionId` | IN | int |  |
| 3 | `@rStatus` | INOUT | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Approvals` | USER_TABLE |  |
| `ApprovalsHistory` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `ReportSession` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `sp_UpdateReq` | unresolved |  |
| `StatusTable` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE    procedure [dbo].[sp_DeleteRequisitionRestricted] @pSessionId int, @pReportSessionId int, @rStatus int output AS

declare @ReqNumber varchar(255),
	@MaxLevel int,
	@RequisitionId int

declare ReqCur cursor fast_forward read_only for
select IntId from ReportSessionLinks where RSId = @pReportSessionId

open ReqCur

fetch next from ReqCur into @RequisitionId

while @@fetch_status = 0
begin
  select Requisitions.RequisitionId
    from Requisitions
    left outer join PO on PO.RequisitionId = Requisitions.RequisitionId
   where Requisitions.RequisitionId = @RequisitionId
     and PO.POId is null

  if @@rowcount != 0
  begin
    select @MaxLevel = max(Level)
      from Approvals
     where RequisitionId = @RequisitionId

    if @@rowcount != 0
    begin
      select ApprovalId
        from Approvals
        join StatusTable on StatusTable.StatusId = Approvals.StatusId
       where Approvals.RequisitionId = @RequisitionId
         and Approvals.Level = @MaxLevel
         and StatusTable.StatusCode = 'R'

      if @@rowcount != 0
      begin
        exec sp_UpdateReq @RequisitionId, null, null, null

		delete Approvals
		 where RequisitionId = @RequisitionId
		
		delete ApprovalsHistory
		 where RequisitionId = @RequisitionId

        delete Detail
         where RequisitionId = @RequisitionId

        delete Requisitions
         where RequisitionId = @RequisitionId
      end
    end
  end

  fetch next from ReqCur into @RequisitionId
end

close ReqCur
deallocate ReqCur

Delete ReportSessionLinks
 where RSId = @pReportSessionId

Delete ReportSession
 where RSId = @pReportSessionId

select @rStatus = 0
```
