# Procedure: `dbo.sp_PrepareNextYear`

_Generated on 2026-05-04T13:43:18.881Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_PrepareNextYear` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2003-08-23 01:05:38 |
| Modified | 2015-01-28 13:38:11 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |
| `BudgetAccounts` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |
| `Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_PrepareNextYear] as
declare	@StartDate datetime,
	@EndDate datetime

-- Build Start Date
if month(getdate()) >= 7
begin
  select @StartDate = convert(datetime,'07/01/' + convert(char(4),year(getdate()) + 1))
end
else
begin
  select @StartDate = convert(datetime,'07/01/' + convert(char(4),year(getdate())))
end

-- Build End Date
select @EndDate = convert(datetime,'06/30/' + convert(char(4),year(@Startdate) + 1) + ' 23:59:59')

-- Create New Budgets as Needed
insert Budgets (DistrictId, Active, Name, StartDate, EndDate, VisibleFrom, VisibleUntil, EditFrom, EditUntil, AnnualCutoff, EarlyAccess)
  select District.DistrictId, 1, convert(char(4),year(@StartDate)) + ' - ' + convert(char(4),year(@EndDate)), @StartDate, @EndDate, convert(datetime,'12/01/' + convert(char(4),year(@StartDate) - 1)), convert(datetime,'12/01/' + convert(char(4),year(@EndDate) - 1)), convert(datetime,'12/01/' + convert(char(4),year(@StartDate) - 1)), convert(datetime,'12/01/' + convert(char(4),year(@EndDate) - 1)), convert(datetime,'10/01/' + convert(char(4),year(@EndDate) - 1)), DATEADD(year,1,Budgets.EarlyAccess)
    from District
    left outer join Budgets on Budgets.DistrictId = District.DistrictId
                           and Budgets.Name like cast(year(@StartDate) as char(4)) + '%'
                           and Budgets.Active = 1
--                           and Budgets.StartDate = @StartDate
--                           and Budgets.EndDate = @EndDate
   where District.Active = 1
     and Budgets.BudgetId is null

-- Create New Budget Accounts as Needed
insert BudgetAccounts (Active, BudgetId, AccountId, BudgetAmount, AmountAvailable, UseAllocations)
  select 1, Budgets.BudgetId, Accounts.AccountId, BA0.BudgetAmount, BA0.BudgetAmount, BA0.UseAllocations
    from Budgets
    join Budgets B0 on B0.DistrictId = Budgets.DistrictId
                   and B0.StartDate <= getdate()
                   and B0.EndDate >= getdate()
                   and B0.Active = 1
    join Accounts on Accounts.DistrictId = Budgets.DistrictId
                 and Accounts.Active = 1
    join BudgetAccounts BA0 on BA0.BudgetId = B0.BudgetId
                           and BA0.AccountId = Accounts.AccountId
                           and BA0.Active = 1
    left outer join BudgetAccounts on BudgetAccounts.BudgetId = Budgets.BudgetId
                                  and BudgetAccounts.AccountId = Accounts.AccountId
                                  and BudgetAccounts.Active = 1
   where Budgets.Active = 1
     and Budgets.StartDate <= dateadd(year,1,getdate())
     and Budgets.EndDate >= Dateadd(year,1,getdate())
     and BudgetAccounts.BudgetAccountId is null
   group by Budgets.BudgetId, Accounts.AccountId, BA0.BudgetAmount, BA0.BudgetAmount, BA0.UseAllocations

-- Create New User Accounts as Needed
insert UserAccounts(Active, AccountId, BudgetId, BudgetAccountId, UserId, AllocationAmount, AllocationAvailable, UseAllocations)
  select 1, Accounts.AccountId, Budgets.BudgetId, BudgetAccounts.BudgetAccountId, Users.UserId, UA0.AllocationAmount, UA0.AllocationAmount, UA0.UseAllocations
    from Budgets
    join Budgets B0 on B0.DistrictId = Budgets.DistrictId
                   and B0.StartDate <= getdate()
                   and B0.EndDate >= getdate()
                   and B0.Active = 1
    join Accounts on Accounts.DistrictId = Budgets.DistrictId
                 and Accounts.Active = 1
    join BudgetAccounts BA0 on BA0.BudgetId = B0.BudgetId
                           and BA0.AccountId = Accounts.AccountId
                           and BA0.Active = 1
    join UserAccounts UA0 on UA0.BudgetId = B0.BudgetId
                         and UA0.AccountId = Accounts.AccountId
                         and UA0.Active = 1
    join BudgetAccounts on BudgetAccounts.BudgetId = Budgets.BudgetId
                       and BudgetAccounts.AccountId = Accounts.AccountId
                       and BudgetAccounts.Active = 1
    join Users on Users.UserId = UA0.UserId
              and Users.Active = 1
    left outer join UserAccounts on UserAccounts.BudgetId = Budgets.BudgetId
                                and UserAccounts.AccountId = Accounts.AccountId
                                and UserAccounts.Active = 1
                                and UserAccounts.UserId = Users.UserId
   where Budgets.Active = 1
     and Budgets.StartDate <= dateadd(year,1,getdate())
     and Budgets.EndDate >= dateadd(year,1,getdate())
     and UserAccounts.UserAccountId is null
   group by Accounts.AccountId, Budgets.BudgetId, BudgetAccounts.BudgetAccountId, Users.UserId, UA0.AllocationAmount, UA0.AllocationAmount, UA0.UseAllocations
```
