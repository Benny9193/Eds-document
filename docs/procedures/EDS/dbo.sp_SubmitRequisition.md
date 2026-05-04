# Procedure: `dbo.sp_SubmitRequisition`

_Generated on 2026-05-04T13:07:57.529Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_SubmitRequisition` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2001-08-24 14:40:45 |
| Modified | 2019-11-13 07:27:40 |
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
| `CXmlSession` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `sp_DeleteZeros` | unresolved |  |
| `StatusTable` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |
| `Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_SubmitRequisition] @pSessionId varchar(255),@pRequisitionId varchar(255) AS

declare @SessionId int,
	@CXmlSessionId int,
	@RequisitionId int,
	@ApprovalLevel tinyint,
	@UserId int,
	@StatusId int,
	@NotBidCount int,
	@ApproverId int,
	@Balance money

-- Convert Passed Data
select @SessionId = convert(int,@pSessionId),
       @RequisitionId = convert(int,@pRequisitionId)

exec sp_DeleteZeros 0, @pRequisitionId

-- Get User
select @UserId = ISNULL(Users.UserId,0),
       @ApproverId = isnull(Users.ApproverId,0),
       @CXmlSessionId = isnull(CXmlSession.SessionId,0)
  from SessionTable with (nolock)
  left outer join CXmlSession on CXmlSession.SessionId = SessionTable.SessionId
--  join Users on Users.UserId = SessionTable.UserId
  join Users on Users.UserId = case isnull(SessionTable.RepUserId,0) when 0 then SessionTable.UserId else SessionTable.RepUserId end
 where SessionTable.SessionId = @SessionId

if @@rowcount < 1
begin
  RAISERROR('Invalid Session Id or Session has timed-out',16,1)
end

-- Get User from Requisition
select @UserId = ISNULL(Users.UserId,0),
       @ApproverId = isnull(Users.ApproverId,0),
       @Balance = case isnull(UserAccounts.UseAllocations,0) when 0 then 0 else ISNULL(UserAccounts.AllocationAvailable,0) end
  from Requisitions with (nolock)
  join Users on Users.UserId = Requisitions.UserId
  left outer join UserAccounts on UserAccounts.UserAccountId = Requisitions.UserAccountId
 where RequisitionId = @RequisitionId

if @@rowcount < 1
begin
  RAISERROR('Invalid Requisition Id',16,1)
end

if isnull(@Balance,0) < 0
begin
  RAISERROR('You cannot submit a requisition that''s Overbudget',16,1)
  return
end

-- Get Category Addenda Status
select @NotBidCount = count(*) 
  from Detail with (nolock) 
 where RequisitionId = @RequisitionId
   and ItemMustBeBid = 1

-- Check Results
if @@rowcount != 0
begin
  if isnull(@NotBidCount,0) <> 0
  begin
    -- Get Status Id
    select @StatusId = ISNULL(StatusId,0)
      from StatusTable with (nolock)
     where StatusCode = 'B'

    if @@rowcount < 1
    begin
      RAISERROR('Ready to Bid Status Code is Not Defined',16,1)
    end
  end
  else
  begin
    -- Get Status Id
    select @StatusId = ISNULL(StatusId,0)
      from StatusTable with (nolock)
     where StatusCode = 'P'

    if @@rowcount < 1
    begin
      RAISERROR('Pending Status Code is Not Defined',16,1)
    end
  end
end
else
begin
  -- Get Status Id
  select @StatusId = ISNULL(StatusId,0)
    from StatusTable with (nolock)
   where StatusCode = 'P'

  if @@rowcount < 1
  begin
    RAISERROR('Pending Status Code is Not Defined',16,1)
  end
end

-- Update Last Session Activity Timer
update SessionTable
   set SessionLast = getdate()
 where SessionId = @SessionId

-- Delete Old Approvals
delete Approvals
 where RequisitionId = @RequisitionId

if isnull(@CXmlSessionId,0) = 0
begin
  -- Insert First Request for Approval
  insert Approvals (ApprovalById, Level, StatusId, RequisitionId, ApprovalDate, ApproverId)
    values (@UserId, 0, @StatusId, @RequisitionId, getdate(), @ApproverId)
end
else
begin
  -- Get Status Id
  select @StatusId = ISNULL(StatusId,0)
    from StatusTable with (nolock)
   where StatusCode = 'D'

  if @@rowcount < 1
  begin
    RAISERROR('Downloaded Status Code is Not Defined',16,1)
  end

  -- Mark as Downloaded
  insert Approvals (ApprovalById, Level, StatusId, RequisitionId, ApprovalDate, ApproverId)
    values (@UserId, 0, @StatusId, @RequisitionId, getdate(), null)

  --Timestamp Req
  Update Requisitions
     set DateExported = getdate()
   where RequisitionId = @RequisitionId
end

Update Requisitions
   set StatusId = coalesce(@StatusId,0)
 where RequisitionId = @RequisitionId

--EXECUTE dbo.sp_RefreshPendingApprovals @pSessionId
-- Return New Status
select @StatusId StatusId
```
