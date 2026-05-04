# Procedure: `dbo.sp_ApproveReq`

_Generated on 2026-05-04T13:43:18.694Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_ApproveReq` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2001-08-24 14:40:44 |
| Modified | 2016-04-28 17:01:27 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | varchar(255) |  |
| 2 | `@pRequisitionId` | IN | varchar(255) |  |
| 3 | `@pStatusCode` | IN | varchar(255) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Approvals` | USER_TABLE |  |
| `ApprovalsHistory` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `DistrictTypes` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `StatusTable` | USER_TABLE |  |
| `Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE          procedure [dbo].[sp_ApproveReq] @pSessionId varchar(255), @pRequisitionId varchar(255), @pStatusCode varchar(255) AS

declare @UserApprovalLevel int,
	@RequiredApprovalLevel int,
	@UserId int,
	@DistrictId int,
	@RequisitionId int,
	@RequisitionNumber varchar(255),
	@CurrentApprovalLevel int,
	@StatusId int,
	@StatusCode char(1),
	@PendingId int,
	@HoldId int,
	@ChangesId int,
	@ApprovedId int,
	@AtEDSId int,
	@POPrintedId int,
	@pStatusId int,
	@CurrentStatus int,
	@ApproverId int,
	@POCount int,
	@OnlineDistrict int,
	@Amount money

-- Validate Session
select 	@UserId = ISNULL(Users.UserId,0),
	@UserApprovalLevel = ISNULL(Users.ApprovalLevel,0),
	@DistrictId = ISNULL(District.DistrictId,0),
	@RequiredApprovalLevel = ISNULL(District.RequiredApprovalLevel,0),
	@ApproverId = isnull(Users.ApproverId,0),
        @OnlineDistrict = isnull(DistrictTypes.UsesOnline,0)
  from SessionTable
  join District on District.DistrictId = SessionTable.DistrictId
  left outer join DistrictTypes on DistrictTypes.DistrictTypeId = District.DistrictTypeId
  join Users on Users.UserId = case isnull(SessionTable.RepUserId,0) when 0 then SessionTable.UserId else SessionTable.RepUserId end
 where SessionId = CONVERT(int,@pSessionId)

if @@rowcount = 0
begin
  RAISERROR('Invalid Session Id.',16,1)
  RETURN
end

-- Check Action
select	@StatusCode = ISNULL(StatusCode,'H'),
	@StatusId = ISNULL(StatusId,0)
  from StatusTable
 where OptionValue = rtrim(@pStatusCode)

-- Check for Error
if @@rowcount = 0
begin
  RAISERROR('Error Locating Status Id %d',16,1,@pStatusId)
  RETURN
end

-- Validate Requisition
select	@RequisitionId = ISNULL(RequisitionId,0),
	@RequisitionNumber = ISNULL(RequisitionNumber,''),
	@Amount = isnull(TotalRequisitionCost,0)
  from Requisitions with (nolock)
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join Users on Users.UserId = @UserId
 where RequisitionId = CONVERT(int,@pRequisitionId)
   and Budgets.DistrictId = case Users.DistrictId when 1 then Budgets.DistrictId else Users.DistrictId end
   
if @@rowcount = 0
begin
  RAISERROR('Invalid Requisition Id',16,1)
  RETURN
end

if ISNULL(@Amount,0) = 0
begin
  RAISERROR('Cannot approve a requisition with a zero amount.',16,1)
  RETURN
end

-- Get Pending Id
select @PendingId = ISNULL(StatusId,0)
  from StatusTable
 where StatusCode = 'P'

-- Get Changes Id
select @ChangesId = ISNULL(StatusId,0)
  from StatusTable
 where StatusCode = 'E'

-- Get OnHold Id
select @HoldId = ISNULL(StatusId,0)
  from StatusTable
 where StatusCode = 'H'

-- Get Approved Id
select @ApprovedId = ISNULL(StatusId,0)
  from StatusTable
 where StatusCode = 'A'

-- Get @EDS Id
select @AtEDSId = ISNULL(StatusId,0)
  from StatusTable
 where StatusCode = 'I' -- Inhouse

-- Get POPrinted Id
select @POPrintedId = ISNULL(StatusId,0)
  from StatusTable
 where StatusCode = 'O' -- pO printed

-- Special for Manually Processed PO's
if @StatusCode = 'M'
begin
    insert Approvals (ApprovalById, [Level], StatusId, RequisitionId, ApprovalDate, ApproverId)
              values (@UserId, @UserApprovalLevel, 45, @RequisitionId, getdate(), @ApproverId)
	return
end

-- Check Current Approval Level
select	@CurrentApprovalLevel = isnull((select top 1 Approvals.Level from Approvals where Approvals.RequisitionId = @RequisitionId Order by ApprovalDate desc),0)
  from Approvals
 where Approvals.RequisitionId = @RequisitionId

if @@rowcount = 0 
begin
  RAISERROR('Requisition %s is on Hold. It Cannot be Approved.',16,1,@RequisitionNumber)
  RETURN
end

select @POCount = count(*)
  from PO
 where RequisitionId = @RequisitionId

if @POCount > 0
begin
  RAISERROR('Requisition %s has POs. It''s status cannot be changed.',16,1,@RequisitionNumber)
  RETURN
end

-- Check Level
if @UserApprovalLevel < 5 and @CurrentApprovalLevel > @UserApprovalLevel
begin
  RAISERROR('Requisition %s has been processed by a higher authority. You cannot change its Status',16,1,@RequisitionNumber)
  RETURN
end

-- Check Current Approval Status
select	@CurrentStatus = isnull((select top 1 Approvals.StatusId from Approvals where Approvals.RequisitionId = @RequisitionId Order by ApprovalDate desc),0) 
  from Approvals
 where Approvals.RequisitionId = @RequisitionId

if @@rowcount = 0
begin
  select @CurrentStatus = @HoldId

-- Update Requisition Status
  update Requisitions
     set StatusId = @HoldId,
         DateExported = null -- Reset Exported Flag when Req put on Hold 4/29/2013 DCH Done for NyACK / WinCap
   where RequisitionId = @RequisitionId
end

if @CurrentStatus = 45 and @UserApprovalLevel < 5
begin
  RAISERROR('Requisition has been Manually Processed into a PO, and cannot be changed.',16,1)
  RETURN
end
-- Set New Level
if @StatusCode = 'H'
begin
-- Save History
  INSERT INTO ApprovalsHistory([ApprovalId], [ApprovalById], [Level], [StatusId], [RequisitionId], [ApprovalDate], [ApproverId])
    select [ApprovalId], [ApprovalById], [Level], [StatusId], [RequisitionId], [ApprovalDate], [ApproverId]
      from Approvals
     where Approvals.RequisitionId = @RequisitionId

-- Delete Old Approval
  delete Approvals
   where Approvals.RequisitionId = @RequisitionId
--     and Approvals.Level >= @CurrentApprovalLevel

-- Update Requisition Status
  update Requisitions
     set StatusId = @HoldId,
         DateExported = null -- Reset Exported Flag when Req put on Hold 4/29/2013 DCH Done for NyACK / WinCap
   where RequisitionId = @RequisitionId
end
else
begin
  if @CurrentStatus = @HoldId and @OnlineDistrict = 1
  begin
    return
  end

  if @CurrentStatus = 4 -- Rejected
  begin
    return;
  end
  
  if @CurrentStatus = 27 or @CurrentStatus = 29 -- Ready to Bid or Out to Bid
  begin
    return;
  end
  
  if @CurrentApprovalLevel = @UserApprovalLevel
  begin
  -- Update Old Approval
    update Approvals
       set StatusId = @StatusId,
           ApprovalById = @UserId,
           ApprovalDate = getdate(),
           ApproverId = case @StatusId when 2 then @UserId else @ApproverId end
     where Approvals.RequisitionId = @RequisitionId
       and Approvals.Level = @CurrentApprovalLevel
  end
  else
  begin
  -- Insert New Approval
    insert Approvals (ApprovalById, [Level], StatusId, RequisitionId, ApprovalDate, ApproverId)
              values (@UserId, @UserApprovalLevel, @StatusId, @RequisitionId, getdate(), @ApproverId)
  end
  
  if (@UserApprovalLevel >= 5 and @StatusId = @ApprovedId)
  begin
  -- Update Requisition Status
    update Requisitions
       set StatusId = @AtEDSId
     where RequisitionId = @RequisitionId
  end
  else
  if (@UserApprovalLevel >= 5 and @StatusId = @POPrintedId)
  begin
  -- Update Requisition Status
    update Requisitions
       set StatusId = @POPrintedId
     where RequisitionId = @RequisitionId
  end
  else
  if (@UserApprovalLevel >= @RequiredApprovalLevel and @StatusId = @ApprovedId)
  begin
  -- Update Requisition Status
    update Requisitions
       set StatusId = @ApprovedId
     where RequisitionId = @RequisitionId
  end
  else
  begin
  -- Update Requisition Status
    update Requisitions
       set StatusId = @PendingId
     where RequisitionId = @RequisitionId
  end
end
```
