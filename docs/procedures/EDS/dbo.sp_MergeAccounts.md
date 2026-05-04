# Procedure: `dbo.sp_MergeAccounts`

_Generated on 2026-05-04T13:43:18.859Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_MergeAccounts` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2016-06-27 13:39:30 |
| Modified | 2016-06-27 13:39:30 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBudgetId` | IN | int |  |
| 2 | `@pSourceAccountId` | IN | int |  |
| 3 | `@pDestinationAccountId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |
| `BudgetAccounts` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create procedure sp_MergeAccounts @pBudgetId int, @pSourceAccountId int, @pDestinationAccountId int
as
begin

	-- Move User Accounts
	Update UserAccounts
	   set BudgetAccountId = BudgetAccounts.BudgetAccountId
	  from UserAccounts
	  join BudgetAccounts on BudgetAccounts.BudgetId = UserAccounts.BudgetAccountId
	                     and BudgetAccounts.AccountId = @pDestinationAccountId
	                     and BudgetAccounts.Active = 1
	                     and BudgetAccounts.BudgetId = @pBudgetId
	 where UserAccounts.AccountId = @pSourceAccountId
	   and UserAccounts.Active = 1
	   and UserAccounts.BudgetId = @pBudgetId
	   and (select top 1 ua.UserAccountId
	          from UserAccounts ua
	         where ua.BudgetId = UserAccounts.BudgetId
	           and ua.AccountId = @pDestinationAccountId
	           and ua.UserId = UserAccounts.UserId
	           and ua.Active = 1) is null
	
	-- Move Requisitions to New Accounts
	Update Requisitions
	   set AccountCode = Accounts.Code,
	       UserAccountId = UserAccounts.UserAccountId,
	       BudgetAccountId = UserAccounts.BudgetAccountId
	  from Requisitions
	  join UserAccounts on UserAccounts.BudgetId = Requisitions.BudgetId
	                   and UserAccounts.UserId = Requisitions.UserId
	                   and UserAccounts.Active = 1
	                   and UserAccounts.AccountId = @pDestinationAccountId
	  join Accounts on Accounts.AccountId = UserAccounts.AccountId
	 where Requisitions.BudgetId = @pBudgetId
	 
	-- Deactivate Old Budget Accounts if No Active UserAccounts
	Update BudgetAccounts
	   set Active = 0
	  from BudgetAccounts
	 where BudgetAccounts.AccountId = @pSourceAccountId
	   and BudgetAccounts.BudgetId = @pBudgetId
	   and BudgetAccounts.Active = 1
	   and (select Top 1 UserAccounts.UserAccountId
	          from UserAccounts
	         where UserAccounts.BudgetAccountId = BudgetAccounts.BudgetAccountId
	           and UserAccounts.Active = 1) is null
	           
end
```
