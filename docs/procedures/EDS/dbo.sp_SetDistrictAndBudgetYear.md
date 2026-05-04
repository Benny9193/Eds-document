# Procedure: `dbo.sp_SetDistrictAndBudgetYear`

_Generated on 2026-05-04T13:43:18.910Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_SetDistrictAndBudgetYear` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2004-11-30 17:13:19 |
| Modified | 2014-10-07 17:53:26 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pDistrictId` | IN | int |  |
| 3 | `@pBudgetId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `DebugMsgs` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `dbo.District` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_SetDistrictAndBudgetYear] @pSessionId int, @pDistrictId int, @pBudgetId int AS

declare @DistrictId int,
	@tempBudgetId int,
	@CurrentBudget int,
	@NextBudget int,
	@StartDate varchar(32),
	@AllowIncidentals tinyint,
	@VerifyDistrictId int,
	@UserId int

select @AllowIncidentals = isnull(AllowIncidentals,0),
	   @UserId = SessionTable.UserId
  from SessionTable
 where SessionId = @pSessionId

if isnull(@pDistrictId,0) = 0
begin
  select @DistrictId = DistrictId
    from SessionTable
   where SessionId = @pSessionId
end
else
begin
  select @DistrictId = @pDistrictId
end

if ISNULL(@pBudgetId,0) != 0
begin
  select @VerifyDistrictId = Budgets.DistrictId
    from Budgets with (nolock)
   where BudgetId = @pBudgetId
     
  if @@ROWCOUNT != 1
  begin
    select @pBudgetId = 0
    insert DebugMsgs (Msg) values ('SessionId = ' + cast(@pSessionId as varchar) + ' Resetting invalid passed BudgetId=' + CAST(@pBudgetId as varchar))
  end
  else
  begin
    if @VerifyDistrictId != @DistrictId
    begin
      select @pBudgetId = 0
      insert DebugMsgs (Msg) values ('SessionId = ' + cast(@pSessionId as varchar) + ' Resetting incorrect passed BudgetId=' + CAST(@pBudgetId as varchar))
    end
  end
end

if isnull(@pBudgetId,0) = 0
begin
  select top 1 @tempBudgetId = Budgets.BudgetId
    FROM Budgets
    JOIN dbo.District on dbo.District.DistrictId = Budgets.DistrictId
    left outer join Users on Users.DistrictId = District.DistrictId
                         and Users.UserId = @UserId
   WHERE dbo.District.DistrictId = @DistrictId
     AND getdate() between case when isnull(Users.AllowEarlyAccess,0) = 1 or isnull(Users.ApprovalLevel,0) > 1 then coalesce(Budgets.EarlyAccess,Budgets.VisibleFrom) else dbo.Budgets.VisibleFrom end AND dbo.Budgets.VisibleUntil
     and dbo.Budgets.Active = 1
   order by Budgets.StartDate desc, Budgets.EndDate desc

  if @@rowcount = 0
  begin
    select top 1 @tempBudgetId = Budgets.BudgetId
      FROM Budgets
      JOIN dbo.District on dbo.District.DistrictId = Budgets.DistrictId
     WHERE dbo.District.DistrictId = @DistrictId
       and dbo.Budgets.Active = 1
     order by Budgets.StartDate desc, Budgets.EndDate desc
  end
end
else
begin
    select @tempBudgetId = @pBudgetId
end

select top 1 @CurrentBudget = BudgetId
  from Budgets
  left outer join Users on Users.DistrictId = Budgets.DistrictId
                       and Users.UserId = @UserId
 where Budgets.DistrictId = @DistrictId
   AND getdate() between case when isnull(Users.AllowEarlyAccess,0) = 1 or ISNULL(Users.ApprovalLevel,0) > 1 then coalesce(Budgets.EarlyAccess,Budgets.VisibleFrom) else dbo.Budgets.VisibleFrom end and dbo.Budgets.VisibleUntil
   and GETDATE() between dbo.Budgets.StartDate and dbo.Budgets.EndDate
   and dbo.Budgets.Active = 1
   and @AllowIncidentals = 1

select top 1 @NextBudget = Budgets.BudgetId
  from Budgets
  left outer join Users on Users.DistrictId = Budgets.DistrictId
                       and Users.UserId = @UserId
 where Budgets.DistrictId = @DistrictId
   AND getdate() between case when isnull(Users.AllowEarlyAccess,0) = 1 or ISNULL(Users.ApprovalLevel,0) > 1 then coalesce(Budgets.EarlyAccess,Budgets.VisibleFrom) else dbo.Budgets.VisibleFrom end and dbo.Budgets.VisibleUntil
   and dbo.Budgets.Active = 1
   and dateadd(year,1,getdate()) between dbo.Budgets.StartDate and dbo.Budgets.EndDate 

-- Update Session Table
Update SessionTable
   set DistrictId = @DistrictId,
       BudgetId = @tempBudgetId,
       CurrentBudgetId = @CurrentBudget,
       NextBudgetId = @NextBudget
 where SessionId = @pSessionId

 insert DebugMsgs (Msg) values ('SessionId = ' + cast(@pSessionId as varchar) + ' Setting DistrictId = ' + cast(@DistrictId as varchar) + ' BudgetId=' + CAST(@pBudgetId as varchar) + ' New BudgetId = ' + CAST(@tempBudgetId as varchar))
```
