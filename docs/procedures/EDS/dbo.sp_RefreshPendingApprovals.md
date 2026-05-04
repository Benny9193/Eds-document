# Procedure: `dbo.sp_RefreshPendingApprovals`

_Generated on 2026-05-04T13:04:24.174Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_RefreshPendingApprovals` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2003-06-30 12:55:55 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | varchar(255) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Approvals` | USER_TABLE |  |
| `BudgetAccounts` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `PendingApprovals` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `StatusTable` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `dbo.uf_RequisitionIsVisible` | SQL_SCALAR_FUNCTION |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.sp_SubmitRequisitionNew` | SQL_STORED_PROCEDURE |

## Definition

```sql
CREATE     procedure [dbo].[sp_RefreshPendingApprovals] @pSessionId varchar(255) AS
declare @SessionId int,
	@SchoolId int,
	@DistrictId int,
	@UserId int,
	@UserApprovalLevel int,
	@DistrictApprovalLevel int,
	@ApprovalStatusId int,
	@PendingStatusId int,
	@OnHoldStatusId int,
	@BudgetId int

set transaction isolation level read uncommitted

select  @SessionId = ISNULL(SessionId,0),
	@SchoolId = ISNULL(SchoolId,0),
	@DistrictId = ISNULL(DistrictId,0),
	@UserId = ISNULL(UserId,0),
	@BudgetId = isnull(BudgetId,0),
        @UserApprovalLevel = ISNULL(ApprovalLevel,0)
  from SessionTable with (nolock)
 where SessionId = convert(int,@pSessionId)
   and SessionEnd is null

if @@rowcount = 0
begin
  RAISERROR('Invalid Session Id or Session has timed-out',16,1)
end

/*
select @UserApprovalLevel = ApprovalLevel
  from Users
 where UserId = @UserId

if @@rowcount = 0
begin
  RAISERROR('Invalid User Id',16,1)
end
*/

select @DistrictApprovalLevel = RequiredApprovalLevel
  from District with (nolock)
 where DistrictId = @DistrictId

if @@rowcount = 0
begin
  RAISERROR('Invalid District Id',16,1)
end

select @ApprovalStatusId = StatusId
  from StatusTable with (nolock)
 where StatusCode = 'A'

select @PendingStatusId = StatusId
  from StatusTable with (nolock)
 where StatusCode = 'P'

select @OnHoldStatusId = StatusId
  from StatusTable with (nolock)
 where StatusCode = 'H'

delete PendingApprovals
 where SessionId = @SessionId

insert PendingApprovals (SessionId, SchoolId, UserId, RequisitionId, BudgetId, AccountId, CategoryId, Amount, ApprovalLevel, StatusId, LastApprovalId)
  select @SessionId, Requisitions.SchoolId, Requisitions.UserId, 
         Requisitions.RequisitionId, 
         Requisitions.BudgetId, BudgetAccounts.AccountId, Requisitions.CategoryId,
         ISNULL(Requisitions.TotalRequisitionCost,0) TotalRequisitionCost,
         isnull((select top 1 Approvals.Level from Approvals with (nolock) where Approvals.RequisitionId = Requisitions.RequisitionId Order by ApprovalDate desc),0) ApprovalLevel,
         isnull((select top 1 Approvals.StatusId from Approvals with (nolock) where Approvals.RequisitionId = Requisitions.RequisitionId Order by ApprovalDate desc),@OnHoldStatusId) StatusId,
         isnull((select top 1 Approvals.ApprovalId from Approvals with (nolock) where Approvals.RequisitionId = Requisitions.RequisitionId Order by ApprovalDate desc),@OnHoldStatusId) LastApprovalId
    from Requisitions with (nolock)
    left outer join BudgetAccounts on BudgetAccounts.BudgetAccountId = Requisitions.BudgetAccountId
   Where Requisitions.BudgetId = @BudgetId
     and dbo.uf_RequisitionIsVisible(@SessionId,Requisitions.RequisitionId) = 1

/*
Delete PendingApprovals
  from PendingApprovals
 where SessionId = @SessionId
   and dbo.uf_RequisitionIsVisible(@SessionId,PendingApprovals.RequisitionId) != 1
*/
/*
update PendingApprovals
   set StatusId = isnull(Approvals.StatusId,@OnHoldStatusId),
       ApprovalLevel = isnull(Approvals.Level,@UserApprovalLevel),
       ApprovalDate = Approvals.ApprovalDate
  from PendingApprovals
  left outer join Approvals on Approvals.RequisitionId = PendingApprovals.RequisitionId
                           and Approvals.Level = PendingApprovals.ApprovalLevel
 where SessionId = @SessionId
   and Approvals.ApprovalId is null
*/
update PendingApprovals
   set LastApproverId = Users.UserId,
       NextApproverId = Approvals.ApproverId --Users.ApproverId
  from PendingApprovals
  join Approvals on Approvals.ApprovalId = PendingApprovals.LastApprovalId
  join Users on Users.UserId = Approvals.ApprovalById
 where SessionId = @SessionId

update PendingApprovals
   set ApprovalLevel = @UserApprovalLevel,
       StatusId = @PendingStatusId
  from PendingApprovals
 where SessionId = @SessionId
   and NextApproverId = @UserId
   and (StatusId = @ApprovalStatusId or StatusId = @PendingStatusId)

update Requisitions
   set StatusId = PendingApprovals.StatusId,
       ApprovalLevel = PendingApprovals.ApprovalLevel
  from Requisitions
  inner join PendingApprovals on PendingApprovals.RequisitionId = Requisitions.RequisitionId
 where PendingApprovals.SessionId = @SessionId

if @UserApprovalLevel < @DistrictApprovalLevel
begin 
  update Requisitions
     set StatusId = @PendingStatusId,
         ApprovalLevel = @UserApprovalLevel + 1
    from Requisitions
    inner join PendingApprovals on PendingApprovals.RequisitionId = Requisitions.RequisitionId
   where PendingApprovals.SessionId = @SessionId
     and PendingApprovals.ApprovalLevel = @UserApprovalLevel
     and PendingApprovals.StatusId = @ApprovalStatusId
end
```
