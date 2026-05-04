# Procedure: `dbo.sp_SubmitRequisitionNew`

_Generated on 2026-05-04T13:04:24.188Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_SubmitRequisitionNew` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2004-12-30 12:37:11 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pRequisitionId` | IN | int |  |
| 3 | `@rStatus` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Approvals` | USER_TABLE |  |
| `BudgetAccounts` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `StatusTable` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `dbo.sp_RefreshPendingApprovals` | SQL_STORED_PROCEDURE |  |
| `dbo.uf_lower` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure sp_SubmitRequisitionNew @pSessionId int,@pRequisitionId int, @rStatus int AS

declare @SessionId int,
	@RequisitionId int,
	@ApprovalLevel tinyint,
	@UserId int,
	@StatusId int,
	@NotBidCount int,
	@ApproverId int,
	@ReturnValue int,
	@AmountAvailable money

-- Convert Passed Data
select @SessionId = @pSessionId,
       @RequisitionId = @pRequisitionId,
       @ReturnValue = 0

-- Get User
select @UserId = ISNULL(Users.UserId,0),
       @ApproverId = isnull(Users.ApproverId,0)
  from SessionTable with (nolock)
--  join Users on Users.UserId = SessionTable.UserId
  join Users on Users.UserId = case isnull(SessionTable.RepUserId,0) when 0 then SessionTable.UserId else SessionTable.RepUserId end
 where SessionId = @SessionId

if @@rowcount < 1
begin
  RAISERROR('Invalid Session Id or Session has timed-out',16,1)
end

-- Get User from Requisition
select @UserId = ISNULL(Users.UserId,0),
       @ApproverId = isnull(Users.ApproverId,0)
  from Requisitions with (nolock)
  join Users on Users.UserId = Requisitions.UserId
 where RequisitionId = @RequisitionId

if @@rowcount < 1
begin
  RAISERROR('Invalid Requisition Id',16,1)
end

-- Check for Overbudget
select @AmountAvailable = case isnull(BudgetAccounts.UseAllocations,0) 
                            when 0 then 
                              case isnull(UserAccounts.UseAllocations,0) 
                                when 0 then 0 
                                else isnull(UserAccounts.AllocationAvailable,0) 
                              end 
                            else
                              case isnull(UserAccounts.UseAllocations,0) 
                                when 0 then isnull(BudgetAccounts.AmountAvailable,0)
                                else
                                  dbo.uf_lower(isnull(BudgetAccounts.AmountAvailable,0), isnull(UserAccounts.AllocationAvailable,0))
                              end
                          end
  from Requisitions
  left outer join UserAccounts on UserAccounts.UserAccountId = Requisitions.UserAccountId
                              and UserAccounts.UseAllocations = 1
  left outer join BudgetAccounts on BudgetAccounts.BudgetAccountId = Requisitions.BudgetAccountId
                                and BudgetAccounts.UseAllocations = 1
 where Requisitions.RequisitionId = @RequisitionId

if @AmountAvailable < 0
begin
  -- Mark Error
  select @ReturnValue = 1
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

-- Insert First Request for Approval
insert Approvals (ApprovalById, Level, StatusId, RequisitionId, ApprovalDate, ApproverId)
  values (@UserId, 0, @StatusId, @RequisitionId, getdate(), @ApproverId)

EXECUTE dbo.sp_RefreshPendingApprovals @pSessionId

select @rStatus = @ReturnValue
```
