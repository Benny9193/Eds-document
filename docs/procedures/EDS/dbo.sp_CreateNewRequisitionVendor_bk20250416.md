# Procedure: `dbo.sp_CreateNewRequisitionVendor_bk20250416`

_Generated on 2026-05-04T13:04:24.106Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CreateNewRequisitionVendor_bk20250416` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2025-04-15 22:37:30 |
| Modified | 2025-04-15 22:37:30 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pCategoryId` | IN | int |  |
| 3 | `@pVendorId` | IN | int |  |
| 4 | `@pBudgetId` | IN | int |  |
| 5 | `@ReqId` | INOUT | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `CXmlSession` | USER_TABLE |  |
| `DistrictCategories` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `sp_NewRequisitionId` | unresolved |  |
| `Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE PROCEDURE dbo.sp_CreateNewRequisitionVendor_bk20250416 @pSessionId int, @pCategoryId int, @pVendorId int, @pBudgetId int, @ReqId int output AS

declare	@DistrictId int,
	@SchoolId int,
	@BudgetId int,
	@UserId int,
	@UseSchool tinyint,
	@ReqNumber varchar(50),
	@StartDate varchar(32),
	@CurrentBudgetId int,
	@NextBudgetId int,
	@IncidentalCategories int,
	@CategoryId int,
	@CXmlSessionId int

Update SessionTable
   set VendorId = ISNULL(@pVendorId,0)
 where SessionId = @pSessionId

select 	@DistrictId = DistrictId,
		@SchoolId = SchoolId,
		@UserId = UserId,
		@CategoryId = isnull(@pCategoryId,0),
        @BudgetId = coalesce(@pBudgetId,SessionTable.BudgetId,0),
		@CurrentBudgetId = isnull(CurrentBudgetId,0),
		@NextBudgetId = isnull(NextBudgetId,0)
  from SessionTable
 where SessionId = @pSessionId

if @@rowcount > 0
begin
--  insert DebugMsgs (Msg) values ('CNRV-1 BudgetId=' + CAST(@BudgetId as varchar) + ' CurrentBudgetId=' + CAST(@CurrentBudgetId as varchar))
  
  if @BudgetId != 0 and @BudgetId = case @CurrentBudgetId when 0 then @BudgetId else @CurrentBudgetId end
  begin
    select @IncidentalCategories = count(*)
      from DistrictCategories
      join SessionTable on SessionTable.SessionId = @pSessionId
      left outer join Users on Users.UserId = SessionTable.UserId
     where DistrictCategories.DistrictId = @DistrictId
       and DistrictCategories.CategoryId = @CategoryId
       and DistrictCategories.Active = 1
       and (   DistrictCategories.AllowIncidentals = 1
            or ((   ISNULL(Users.AllowEarlyAccess,0) = 1
                 or ISNULL(SessionTable.ApprovalLevel,0) > 1)
                and ISNULL(DistrictCategories.EarlyAccess,0) = 1))

    if isnull(@IncidentalCategories,0) = 0
    begin
      select @BudgetId = 0
    end
  end
  else
  if @BudgetId != @NextBudgetId
  begin
    select @BudgetId = 0
  end

--  insert DebugMsgs (Msg) values ('CNRV-2 BudgetId=' + CAST(@BudgetId as varchar))

  if @BudgetId = 0 
  begin
    select top 1 @BudgetId = BudgetId
      from Budgets
      join Users on Users.DistrictId = Budgets.DistrictId
                and Users.UserId = @UserId
      join DistrictCategories on DistrictCategories.DistrictId = Budgets.DistrictId
                             and DistrictCategories.CategoryId = @CategoryId
     where Budgets.DistrictId = @DistrictId
       and GETDATE() between case when (ISNULL(Users.AllowEarlyAccess,0) = 1 or isnull(Users.ApprovalLevel,0) > 1) and isnull(DistrictCategories.EarlyAccess,0) = 1 then coalesce(Budgets.EarlyAccess,Budgets.VisibleFrom) else Budgets.VisibleFrom end and Budgets.VisibleUntil
/*       and VisibleFrom <= getdate()
       and VisibleUntil >= getdate()*/
       and Budgets.Active = 1
     order by StartDate desc, EndDate desc

    if @@rowcount = 0
    begin
      select top 1 @BudgetId = BudgetId
        from Budgets
       where DistrictId = @DistrictId and Active = 1
       order by StartDate desc, EndDate desc
    end
  end

--  insert DebugMsgs (Msg) values (' CNRV-3 BudgetId=' + CAST(@BudgetId as varchar))

  execute sp_NewRequisitionId @DistrictId, @SchoolId, @BudgetId, @UserId, @ReqId output
  
  if @CategoryId != 0 and ISNULL(@ReqId,0) != 0
  begin
    Update Requisitions
       set CategoryId = @CategoryId
     where RequisitionId = @ReqId
  end
end
else
begin
  RAISERROR('Unable to Locate Session.',16,1)
end

select @ReqId as RequisitionId

select @CXmlSessionId = isnull(CXmlSession.SessionId,0)
  from Sessiontable
  left outer join CXmlSession on CXmlSession.SessionId = Sessiontable.SessionId
 where Sessiontable.SessionId = @pSessionId

if isnull(@CXmlSessionId,0) != 0 and @@rowcount > 0 and isnull(@ReqId,0) > 0
begin
  update Requisitions
     set CategoryId = CXmlSession.CategoryId,
         BudgetId = CXmlSession.BudgetId,
         BudgetAccountId = CXmlSession.BudgetAccountId,
         UserAccountId = CXmlSession.UserAccountId,
         AccountCode = CXmlSession.AccountCode
    from Requisitions
    join CXmlSession on CXmlSession.SessionId = @CXmlSessionid
   where Requisitions.RequisitionId = @ReqId
end


--  insert DebugMsgs (Msg) values ('CNRV-4 BudgetId=' + CAST((select BudgetId from Requisitions where RequisitionId = @ReqId) as varchar))
```
