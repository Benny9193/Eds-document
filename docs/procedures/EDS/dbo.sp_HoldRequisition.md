# Procedure: `dbo.sp_HoldRequisition`

_Generated on 2026-05-04T13:07:57.482Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_HoldRequisition` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-03-06 16:39:54 |
| Modified | 2013-07-02 16:11:06 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | varchar(255) |  |
| 2 | `@pRequisitionId` | IN | varchar(255) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Approvals` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `sp_DeleteZeros` | unresolved |  |
| `StatusTable` | USER_TABLE |  |
| `Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE         procedure [dbo].[sp_HoldRequisition] @pSessionId varchar(255),@pRequisitionId varchar(255) AS

declare @SessionId int,
	@RequisitionId int,
	@ApprovalLevel tinyint,
	@CurrentApprovalLevel tinyint,
	@UserApprovalLevel tinyint,
	@UserId int,
	@StatusId int

-- Convert Passed Data
select @SessionId = convert(int,@pSessionId),
       @RequisitionId = convert(int,@pRequisitionId)

exec sp_DeleteZeros 0, @pRequisitionId

-- Get User
select @UserId = ISNULL(Users.UserId,0)
  from SessionTable
  join Users on Users.UserId = case isnull(SessionTable.RepUserId,0) when 0 then SessionTable.UserId else SessionTable.RepUserId end
 where SessionId = @SessionId

if @@rowcount < 1
begin
  RAISERROR('Invalid Session Id or Session has timed-out',16,1)
  RETURN
end

-- Check Current Approval Level
select	@CurrentApprovalLevel = max(Approvals.[Level])
  from Approvals
 where Approvals.RequisitionId = @pRequisitionId

if @@rowcount = 0
begin
  RAISERROR('Requisition %s is on Hold. It Cannot be Approved.',16,1,@pRequisitionId)
  RETURN
end

-- Check Level
if @CurrentApprovalLevel > @UserApprovalLevel
begin
  RAISERROR('Requisition %s has been processed by a higher authority. You cannot change its Status',16,1,@pRequisitionId)
  RETURN
end

-- Get Status Id
select @StatusId = ISNULL(StatusId,0)
  from StatusTable
 where StatusCode = 'H'

if @@rowcount < 1
begin
  RAISERROR('On-Hold Status Code is Not Defined',16,1)
  RETURN
end

-- Update Last Session Activity Timer
update SessionTable
   set SessionLast = getdate()
 where SessionId = @SessionId

-- Delete Old Approvals
delete Approvals
 where RequisitionId = @RequisitionId

--EXECUTE dbo.sp_RefreshPendingApprovals @pSessionId
-- Update Requisition Status
  update Requisitions
     set StatusId = @StatusId,
         DateExported = null -- Reset Exported Flag when Req put on Hold 4/29/2013 DCH Done for NyACK / WinCap
   where RequisitionId = @RequisitionId
```
