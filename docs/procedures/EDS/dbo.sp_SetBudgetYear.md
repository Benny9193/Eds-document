# Procedure: `dbo.sp_SetBudgetYear`

_Generated on 2026-05-04T13:43:18.909Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_SetBudgetYear` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-01-23 11:54:33 |
| Modified | 2014-10-07 17:53:26 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `dbo.District` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_SetBudgetYear] @pSessionId int AS

declare @DistrictId int,
	@tempBudgetId int,
	@CurrentBudget int,
	@NextBudget int,
	@StartDate varchar(32),
	@UserId int

select @DistrictId = DistrictId,
		@UserId = UserId
  from SessionTable
 where SessionId = @pSessionId

/*
if month(getdate()) > 10
begin
  select @StartDate = '07/01/' + convert(char(4),year(getdate()) + 1)
end
else
begin
  select @StartDate = '07/01/' + convert(char(4),year(getdate()))
end
*/

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

select top 1 @CurrentBudget = Budgets.BudgetId
  from Budgets
  left outer join Users on Users.DistrictId = Budgets.DistrictId
                       and Users.UserId = @UserId
 where Budgets.DistrictId = @DistrictId
   AND getdate() between case when isnull(Users.AllowEarlyAccess,0) = 1 or isnull(Users.ApprovalLevel,0) > 1 then coalesce(Budgets.EarlyAccess,Budgets.VisibleFrom) else dbo.Budgets.VisibleFrom end AND dbo.Budgets.VisibleUntil
   and dbo.Budgets.Active = 1
   and getdate() between dbo.Budgets.StartDate and dbo.Budgets.EndDate

select top 1 @NextBudget = Budgets.BudgetId
  from Budgets
  left outer join Users on Users.DistrictId = Budgets.DistrictId
                       and Users.UserId = @UserId
 where Budgets.DistrictId = @DistrictId
   AND getdate() between case when isnull(Users.AllowEarlyAccess,0) = 1 or isnull(Users.ApprovalLevel,0) > 1 then coalesce(Budgets.EarlyAccess,Budgets.VisibleFrom) else dbo.Budgets.VisibleFrom end AND dbo.Budgets.VisibleUntil
   and dbo.Budgets.Active = 1
   and dateadd(year,1,getdate()) between dbo.Budgets.StartDate and dbo.Budgets.EndDate

-- Update Session Table
Update SessionTable
   set BudgetId = @tempBudgetId,
       CurrentBudgetId = @CurrentBudget,
       NextBudgetId = @NextBudget
 where SessionId = @pSessionId
```
