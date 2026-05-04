# Procedure: `dbo.sp_SessionTableUpdate`

_Generated on 2026-05-04T13:07:57.525Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_SessionTableUpdate` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2004-09-29 09:31:25 |
| Modified | 2014-10-07 17:53:26 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pDistrictId` | IN | int |  |
| 3 | `@pBudgetId` | IN | int |  |
| 4 | `@pTabSelected` | IN | varchar(32) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_SessionTableUpdate] @pSessionId int, @pDistrictId int, @pBudgetId int, @pTabSelected varchar(32) as

declare @DistrictId int,
	@BudgetId int,
	@UserId int
set nocount on

  select @BudgetId = null, @DistrictId = null

  select @UserId = UserId
    from SessionTable
   where SessionTable.SessionId = @pSessionId
   
  if isnull(@pDistrictId,0) = 0 and isnull(@pBudgetId,0) = 0
  begin
    Update SessionTable
       set DistrictId = null,
           BudgetId = null,
           SchoolId = null,
           TempUserId = null,
           TabSelected = @pTabSelected
     where SessionId = @pSessionId
  end
  else
  begin
    if isnull(@pDistrictId,0) = 0 and isnull(@pBudgetId,0) != 0
    begin
      select @BudgetId = Budgets.BudgetId,
             @DistrictId = Budgets.DistrictId
        from Budgets 
       where BudgetId = @pBudgetId
    end
    else
    if isnull(@pDistrictId,0) != 0 and isnull(@pBudgetId,0) = 0
    begin
      select top 1 @BudgetId = Budgets.BudgetId,
             @DistrictId = @pDistrictId
        from Budgets
        left outer join Users on Users.DistrictId = Budgets.DistrictId
                             and Users.UserId = @UserId
       where Budgets.DistrictId = @pDistrictId
         AND getdate() between case when isnull(Users.AllowEarlyAccess,0) = 1 or isnull(Users.ApprovalLevel,0) > 1 then coalesce(Budgets.EarlyAccess,Budgets.VisibleFrom) else dbo.Budgets.VisibleFrom end AND dbo.Budgets.VisibleUntil
       order by StartDate desc
    end

    if @@rowcount != 0
    begin
      update SessionTable
         set DistrictId = @DistrictId,
             BudgetId = @BudgetId,
             SchoolId = case isnull(@pDistrictId,0) when 0 then SchoolId else null end,
             TempUserId = case isnull(@pDistrictId,0) when 0 then TempUserId else null end,
             TabSelected = @pTabSelected,
             CurrentBudgetId = isnull((select top 1 Budgets.BudgetId from Budgets left outer join Users on Users.DistrictId = Budgets.DistrictId and Users.UserId = @UserId where Budgets.DistrictId = @DistrictId AND getdate() between case when isnull(Users.AllowEarlyAccess,0) = 1 or isnull(Users.ApprovalLevel,0) > 1 then coalesce(Budgets.EarlyAccess,Budgets.VisibleFrom) else dbo.Budgets.VisibleFrom end AND dbo.Budgets.VisibleUntil and dbo.Budgets.Active = 1 and getdate() between dbo.Budgets.StartDate and dbo.Budgets.EndDate),0),
             NextBudgetId = isnull((select top 1 Budgets.BudgetId from Budgets left outer join Users on Users.DistrictId = Budgets.DistrictId and Users.UserId = @UserId where Budgets.DistrictId = @DistrictId AND getdate() between case when isnull(Users.AllowEarlyAccess,0) = 1 or isnull(Users.ApprovalLevel,0) > 1 then coalesce(Budgets.EarlyAccess,Budgets.VisibleFrom) else dbo.Budgets.VisibleFrom end AND dbo.Budgets.VisibleUntil and dbo.Budgets.Active = 1 and dateadd(year,1,getdate()) between dbo.Budgets.StartDate and dbo.Budgets.EndDate),0)
        from SessionTable
       where SessionId = @pSessionId
    end
    else
    begin
      update SessionTable
         set TabSelected = @pTabSelected,
             SchoolId = case isnull(@pDistrictId,0) when 0 then SchoolId else null end,
             TempUserId = case isnull(@pDistrictId,0) when 0 then TempUserId else null end,
             CurrentBudgetId = isnull((select top 1 Budgets.BudgetId from Budgets left outer join Users on Users.DistrictId = Budgets.DistrictId and Users.UserId = @UserId where Budgets.DistrictId = @DistrictId AND getdate() between case when isnull(Users.AllowEarlyAccess,0) = 1 or isnull(Users.ApprovalLevel,0) > 1 then coalesce(Budgets.EarlyAccess,Budgets.VisibleFrom) else dbo.Budgets.VisibleFrom end AND dbo.Budgets.VisibleUntil and dbo.Budgets.Active = 1 and getdate() between dbo.Budgets.StartDate and dbo.Budgets.EndDate),0),
             NextBudgetId = isnull((select top 1 Budgets.BudgetId from Budgets left outer join Users on Users.DistrictId = Budgets.DistrictId and Users.UserId = @UserId where Budgets.DistrictId = @DistrictId AND getdate() between case when isnull(Users.AllowEarlyAccess,0) = 1 or isnull(Users.ApprovalLevel,0) > 1 then coalesce(Budgets.EarlyAccess,Budgets.VisibleFrom) else dbo.Budgets.VisibleFrom end AND dbo.Budgets.VisibleUntil and dbo.Budgets.Active = 1 and dateadd(year,1,getdate()) between dbo.Budgets.StartDate and dbo.Budgets.EndDate),0)
        from SessionTable
       where SessionId = @pSessionId
    end
  end

set nocount off
```
