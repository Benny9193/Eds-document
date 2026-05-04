# Procedure: `dbo.usp_BringAccountsForward`

_Generated on 2026-05-04T13:04:00.691Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_BringAccountsForward` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2018-09-06 12:09:56 |
| Modified | 2022-05-04 15:44:34 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pDistrictId` | IN | int |  |

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
--sp_
--exec usp_BringAccountsForward 27
CREATE   procedure [dbo].[usp_BringAccountsForward] @pDistrictId int as
declare	@StartDate datetime,
		@EndDate datetime,
		@NewBudgetId int,
		@OldBudgetId int

-- Build Start Date
select @StartDate = convert(datetime,'07/01/' + convert(char(4),year(getdate()) + case when month(getdate()) >= 8 then 1 else 0 end))

-- Build End Date
select @EndDate = convert(datetime,'06/30/' + convert(char(4),year(@Startdate) + 1) + ' 23:59:59')

-- Create New Budgets as Needed
insert Budgets (DistrictId, Active, Name, StartDate, EndDate, VisibleFrom, VisibleUntil, EditFrom, EditUntil, AnnualCutoff, EarlyAccess)
  select District.DistrictId, 1, convert(char(4),year(@StartDate)) + ' - ' + convert(char(4),year(@EndDate)), @StartDate, @EndDate, convert(datetime,'12/01/' + convert(char(4),year(@StartDate) - 1)), convert(datetime,'12/01/' + convert(char(4),year(@EndDate) - 1)), convert(datetime,'12/01/' + convert(char(4),year(@StartDate) - 1)), convert(datetime,'12/01/' + convert(char(4),year(@EndDate) - 1)), convert(datetime,'10/01/' + convert(char(4),year(@EndDate) - 1)), DATEADD(year,1,Budgets.EarlyAccess)
    from District
    left outer join Budgets on Budgets.DistrictId = District.DistrictId
                           and Budgets.Name like cast(year(@StartDate) as char(4)) + '%'
                           and Budgets.Active = 1
   where District.DistrictId = @pDistrictId
     and Budgets.BudgetId is null

select top 1 @NewBudgetId = NewBudget.BudgetId,
			 @OldBudgetId = OldBudget.BudgetId
    from District
    join Budgets NewBudget on NewBudget.DistrictId = District.DistrictId
                          and NewBudget.Name like cast(year(@StartDate) as char(4)) + '%'
                          and NewBudget.Active = 1
    join Budgets OldBudget on OldBudget.DistrictId = District.DistrictId
                          and OldBudget.Name like cast(year(@StartDate) - 1 as char(4)) + '%'
                          and OldBudget.Active = 1
   where District.DistrictId = @pDistrictId
   order by NewBudget.BudgetId

if @@ROWCOUNT = 0
begin
	select cast(1 as int) StatusCode, cast('Error locating Budgets' as varchar) StatusText
end
else
begin
	-- Create New Budget Accounts as Needed
	insert BudgetAccounts (Active, BudgetId, AccountId, BudgetAmount, AmountAvailable, UseAllocations)
	  select 1, Budgets.BudgetId, Accounts.AccountId, BA0.BudgetAmount, BA0.BudgetAmount, BA0.UseAllocations
		from Budgets
		join Budgets B0 on B0.BudgetId = @OldBudgetId
		join Accounts on Accounts.DistrictId = Budgets.DistrictId
					 and Accounts.Active = 1
		join BudgetAccounts BA0 on BA0.BudgetId = B0.BudgetId
							   and BA0.AccountId = Accounts.AccountId
							   and BA0.Active = 1
		left outer join BudgetAccounts on BudgetAccounts.BudgetId = Budgets.BudgetId
									  and BudgetAccounts.AccountId = Accounts.AccountId
									  and BudgetAccounts.Active = 1
	   where Budgets.BudgetId = @NewBudgetId
		 and BudgetAccounts.BudgetAccountId is null
	   group by Budgets.BudgetId, Accounts.AccountId, BA0.BudgetAmount, BA0.BudgetAmount, BA0.UseAllocations

	-- Create New User Accounts as Needed
	insert UserAccounts(Active, AccountId, BudgetId, BudgetAccountId, UserId, AllocationAmount, AllocationAvailable, UseAllocations)
	  select 1, Accounts.AccountId, Budgets.BudgetId, BudgetAccounts.BudgetAccountId, Users.UserId, UA0.AllocationAmount, UA0.AllocationAmount, UA0.UseAllocations
		from Budgets
		join Budgets B0 on B0.BudgetId = @OldBudgetId
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
									and UserAccounts.BudgetAccountId = BudgetAccounts.BudgetAccountId
									and UserAccounts.Active = 1
									and UserAccounts.UserId = Users.UserId
	   where Budgets.BudgetId = @NewBudgetId
		 and UserAccounts.UserAccountId is null
	   group by Accounts.AccountId, Budgets.BudgetId, BudgetAccounts.BudgetAccountId, Users.UserId, UA0.AllocationAmount, UA0.AllocationAmount, UA0.UseAllocations

	select cast(0 as int) StatusCode, cast('OK' as varchar) StatusText

end
```
