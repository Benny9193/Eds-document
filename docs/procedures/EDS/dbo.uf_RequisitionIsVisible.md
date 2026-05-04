# Function: scalar: `dbo.uf_RequisitionIsVisible`

_Generated on 2026-05-04T13:07:57.697Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_RequisitionIsVisible` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2003-03-13 14:20:02 |
| Modified | 2020-09-02 11:53:28 |
| Encrypted | no |
| Returns | int |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pRequisitionId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Requisitions` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `dbo.uf_UserInApprovalChain` | SQL_SCALAR_FUNCTION |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.sp_CXmlLogin` | SQL_STORED_PROCEDURE |
| `dbo.sp_FA_RequisitionsTotals` | SQL_STORED_PROCEDURE |
| `dbo.sp_RefreshPendingApprovals` | SQL_STORED_PROCEDURE |
| `dbo.sp_ReturnUserReqs` | SQL_STORED_PROCEDURE |
| `dbo.uf_FA_Requisitions` | SQL_INLINE_TABLE_VALUED_FUNCTION |
| `dbo.uf_PARequisitions` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_PARequisitionsTest` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_RequisitionList` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_RequisitionListSelective` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.uf_RequisitionListTest` | SQL_TABLE_VALUED_FUNCTION |
| `dbo.vw_ApproveRequisitions` | VIEW |
| `dbo.vw_ApproveRequisitionsBySession` | VIEW |
| `dbo.vw_ApproveRequisitionsBySession_Test` | VIEW |
| `dbo.vw_ApproveRequisitionsTest` | VIEW |
| `dbo.vw_ExistingRequisitions` | VIEW |
| `dbo.vw_FA_Requisitions` | VIEW |

## Definition

```sql
CREATE      function [dbo].[uf_RequisitionIsVisible] (@pSessionId int, @pRequisitionId int)
returns int as
begin
declare @Visible int,
        @MaxLevel int,
	@ApprovalLevel int,
	@StatusId int,
	@UserId int,
	@ApproverId int,
	@QueryUserId int,
	@ReqSchoolId int,
	@QuerySchoolId int,
	@QueryUserApproverId int
/*
select UserId from SessionTable where SessionId = 77578
select UserId from Requisitions where requisitionid = 87755
select dbo.uf_UserInApprovalChain(205515, 147150, '')
*/
  select @UserId = isnull(Requisitions.UserId,0),
         @ApproverId = isnull(Users.ApproverId,0),
         @ReqSchoolId = coalesce(Requisitions.SchoolId, Users.SchoolId, 0)
    from Requisitions
    left outer join Users on Users.UserId = Requisitions.UserId
   where Requisitions.RequisitionId = @pRequisitionId

  select @QueryUserId = isnull(SessionTable.UserId,0),
         @QueryUserApproverId = isnull(Users.ApproverId,0),
         @ApprovalLevel = isnull(SessionTable.ApprovalLevel,0),
         @QuerySchoolId = isnull(Users.SchoolId,0)
    from SessionTable
    left outer join Users on Users.UserId = SessionTable.UserId
   where SessionId = @pSessionId

--  if @ApprovalLevel >= 5 or (@ApprovalLevel >= 2 and @ApproverId = 0) or (@ApprovalLevel >= 1 and (@ApproverId = 0 and @UserId != @QueryUserApproverId) and @QuerySchoolId = @ReqSchoolId)
  if @ApprovalLevel >= 5 or (@ApprovalLevel >= 2 and @QueryUserApproverId = 0) or (@ApprovalLevel >= 1 and (@ApproverId = 0 and @UserId != @QueryUserApproverId and @QueryUserApproverId = 0) and @QuerySchoolId = @ReqSchoolId)
    select @Visible = 1
  else
    select @Visible = dbo.uf_UserInApprovalChain(@QueryUserId, @UserId, '')

/*
  select @ApprovalLevel = ApprovalLevel
    from SessionTable
   where SessionId = @pSessionId

  select @MaxLevel = Max(Approvals.Level),
         @StatusId = max(Requisitions.StatusId)
    from Approvals
    join Requisitions on Requisitions.RequisitionId = Approvals.RequisitionId
   where Approvals.RequisitionId = @pRequisitionId

  select @Visible = max(StatusTable.UserVisibilityLevel) 
    from Approvals
    join StatusTable on StatusTable.StatusId = Approvals.StatusId
   where Approvals.RequisitionId = @pRequisitionId
     and Approvals.Level = @MaxLevel

  if @StatusId = 6
  begin
    select @Visible = 1
  end
  else
  if @Visible is null
  begin
    select @Visible = 1
  end
  else
  begin
    if @Visible > @ApprovalLevel
    begin
      select @Visible = 0
    end
    else
    begin
      select @Visible = 1
    end
  end
*/
  return(@Visible)
end
```
