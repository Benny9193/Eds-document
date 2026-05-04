# Procedure: `dbo.sp_CCAnalysisReturn`

_Generated on 2026-05-04T13:04:00.319Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CCAnalysisReturn` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2007-06-26 13:59:48 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pRSId` | IN | int |  |
| 3 | `@pAction` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Approvals` | USER_TABLE |  |
| `ReportSession` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE  procedure dbo.sp_CCAnalysisReturn @pSessionId int, @pRSId int, @pAction int as

if @pAction = 1 -- Keep 'Pending Analysis' Status
begin
  insert Approvals (ApprovalById, Level, StatusId, RequisitionId, ApprovalDate, ApproverId)
    select SessionTable.UserId, SessionTable.ApprovalLevel, 28, Requisitions.RequisitionId, getdate(), null
      from SessionTable
      join ReportSession on ReportSession.RSId = @pRSId
      join ReportSessionLinks rsl on rsl.RSId = ReportSession.RSId
      join Requisitions on Requisitions.RequisitionId = rsl.IntId
      left outer join Approvals on Approvals.ApprovalId = 
          (select top 1 ap.ApprovalId
             from Approvals ap
            where ap.RequisitionId = Requisitions.RequisitionId
            order by ap.ApprovalDate desc)
     where Sessiontable.SessionId = @pSessionId
       and isnull(Approvals.StatusId,0) != 28
end
else
if @pAction = 2 -- Change to On-Hold
begin
  insert Approvals (ApprovalById, Level, StatusId, RequisitionId, ApprovalDate, ApproverId)
    select SessionTable.UserId, SessionTable.ApprovalLevel, 1, Requisitions.RequisitionId, getdate(), null
      from SessionTable
      join ReportSession on ReportSession.RSId = @pRSId
      join ReportSessionLinks rsl on rsl.RSId = ReportSession.RSId
      join Requisitions on Requisitions.RequisitionId = rsl.IntId
      left outer join Approvals on Approvals.ApprovalId = 
          (select top 1 ap.ApprovalId
             from Approvals ap
            where ap.RequisitionId = Requisitions.RequisitionId
            order by ap.ApprovalDate desc)
     where Sessiontable.SessionId = @pSessionId
       and isnull(Approvals.StatusId,0) = 28
end

Update ReportSession
   set ReportOption = @pAction
 where RSId = @pRSId
```
