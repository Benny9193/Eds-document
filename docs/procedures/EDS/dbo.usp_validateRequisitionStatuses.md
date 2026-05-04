# Procedure: `dbo.usp_validateRequisitionStatuses`

_Generated on 2026-05-04T13:43:19.212Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_validateRequisitionStatuses` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2023-09-25 17:22:49 |
| Modified | 2023-09-25 17:22:49 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@RSID` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Approvals` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create   procedure usp_validateRequisitionStatuses @RSID int
as
begin
declare @Status varchar(50) = '',
		@Message varchar(max) = '',
		@Errors int,
		@ReqList varchar(max) = '',
		@Warnings int

select @Errors = count(*), @ReqList = String_Agg(Requisitions.RequisitionNumber, ', ')
  from Requisitions
  join ReportSessionLinks rsl on rsl.IntId = Requisitions.RequisitionId
                             and rsl.RSId = @RSId
  outer apply (Select Approvals.ApprovalId from Approvals where Approvals.RequisitionId = Requisitions.RequisitionId and Approvals.StatusId in (6, 45, 49)) ap
 where Ap.ApprovalId is not null

if @@ROWCOUNT = 0
begin
	Select @Status = 'error', @Message = 'No Requisitions were found.'
end
if @@ROWCOUNT > 0 and @Errors > 0
begin
	Select @Status = 'error', @Message = 'Requisitions ' + @ReqList + ' were Printed for PO.'
end

select @Warnings = count(*), @ReqList = String_Agg(Requisitions.RequisitionNumber, ', ')
  from Requisitions
  join ReportSessionLinks rsl on rsl.IntId = Requisitions.RequisitionId
                             and rsl.RSId = @RSId
  outer apply (Select Approvals.ApprovalId from Approvals where Approvals.RequisitionId = Requisitions.RequisitionId and Approvals.StatusId in (35)) ap
 where Ap.ApprovalId is not null

if @Warnings > 0
begin
	Select @Status = 'warning', @Message = 'Requisitions ' + @ReqList + ' were already downloaded. Do you wish to continue?'
end

Select @Status [status], @Message [message]
end
```
