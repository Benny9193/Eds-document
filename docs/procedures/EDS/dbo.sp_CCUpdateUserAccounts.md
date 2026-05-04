# Procedure: `dbo.sp_CCUpdateUserAccounts`

_Generated on 2026-05-04T13:43:18.740Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CCUpdateUserAccounts` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2004-02-16 12:12:16 |
| Modified | 2015-11-24 23:37:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pCode` | IN | varchar(255) |  |
| 2 | `@pAllocationAmount` | IN | money |  |
| 3 | `@pBudgetAmount` | IN | money |  |
| 4 | `@pDistrictId` | IN | int |  |
| 5 | `@pUserId` | IN | int |  |
| 6 | `@pUserAccountId` | IN | int |  |
| 7 | `@pSchoolId` | IN | int |  |
| 8 | `@pDelete` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |
| `BudgetAccounts` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |
| `Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_CCUpdateUserAccounts] @pCode varchar(255), @pAllocationAmount money, @pBudgetAmount money, @pDistrictId int, @pUserId int, @pUserAccountId int, @pSchoolId int, @pDelete int as
declare @AccountId int, 
	@BudgetAccountId int, 
	@SchoolId int, 
	@UserAccountId int, 
	@BudgetId int

if @pDelete = 1
begin
  delete UserAccounts
   where UserAccountId = @pUserAccountId
end
else
if rtrim(@pCode) != '' 
begin
	select top 1 @BudgetId = Budgets.BudgetId
	  from Budgets
	  join Users on Users.DistrictId = Budgets.DistrictId
				and Users.UserId = @pUserId
	 where GETDATE() between case when isnull(Users.AllowEarlyAccess,0) = 1 or Users.ApprovalLevel > 1 then coalesce(Budgets.EarlyAccess,Budgets.VisibleFrom) else Budgets.VisibleFrom end
						 and Budgets.VisibleUntil
	/* DCH 10/6/14 Code above replaces this code for Early Access
		   Budgets.VisibleFrom <= getdate()
	   and Budgets.VisibleUntil >= getdate()*/
	   and Budgets.DistrictId = @pDistrictId
	   and Budgets.Active = 1
	 order by Budgets.StartDate Desc
/*  select @BudgetId = BudgetId 
    from Budgets 
   where DistrictId = @pDistrictId 
     and VisibleFrom <= getdate() 
     and VisibleUntil >= getdate() 
     and Active = 1
*/
  select @AccountId = AccountId, @SchoolId = SchoolId 
    from Accounts 
   where DistrictId = @pDistrictId
     and Code = @pCode 
     and Active = 1

  if @@rowcount = 0
  begin
    insert Accounts (Active, DistrictId, SchoolId, Code) 
      values (1, @pDistrictId, @pSchoolId, @pCode)

    select @AccountId = Scope_Identity() --DCH 11/24/2015 @@Identity
         , @SchoolId = @pSchoolId
  end
  else
  begin
    if @SchoolId != @pSchoolId
    begin
      Update Accounts
         set SchoolId = null
       where AccountId = @AccountId
      select @SchoolId = null
    end
  end

  select @BudgetAccountId = BudgetAccountId 
    from BudgetAccounts 
   where BudgetId = @BudgetId 
     and AccountId = @AccountId 
     and Active = 1

  if @@rowcount = 0
  begin
    insert BudgetAccounts (Active, BudgetId, AccountId, BudgetAmount, AmountAvailable, UseAllocations) 
      values (1, @BudgetId, @AccountId, @pBudgetAmount, @pBudgetAmount, case isnull(@pBudgetAmount,0) when 0 then 0 else 1 end)
    select @BudgetAccountId = Scope_Identity() --DCH 11/24/2015 @@Identity
  end
  else
  begin
    Update BudgetAccounts
       set BudgetAmount = @pBudgetAmount, 
           AmountAvailable = @pBudgetAmount - isnull((select sum(TotalRequisitionCost) from Requisitions where BudgetAccountId = BudgetAccounts.BudgetAccountId),0), 
           UseAllocations = case isnull(@pBudgetAmount,0) when 0 then 0 else 1 end 
      from BudgetAccounts 
     where BudgetAccountId = @BudgetAccountId
  end

  select @UserAccountId = UserAccountId 
    from UserAccounts 
   where UserId = @pUserId
     and AccountId = @AccountId 
     and BudgetId = @BudgetId 
     and BudgetAccountId = @BudgetAccountId 
     and Active = 1

  if @@rowcount = 0
  begin
    INSERT INTO [UserAccounts](Active, AccountId, BudgetId, BudgetAccountId, UserId, AllocationAmount, AllocationAvailable, UseAllocations) 
      VALUES(1, @AccountId, @BudgetId, @BudgetAccountId, @pUserId, @pAllocationAmount, @pAllocationAmount, case isnull(@pAllocationAmount,0) when 0 then 0 else 1 end)
    select @UserAccountId = Scope_Identity() --DCH 11/24/2015 @@Identity
  end
  else
  begin
    Update UserAccounts
       set AllocationAmount = @pAllocationAmount, 
           AllocationAvailable = @pAllocationAmount - isnull((select sum(TotalRequisitionCost) from Requisitions where UserAccountId = UserAccounts.UserAccountId),0), 
           UseAllocations = case isnull(@pAllocationAmount,0) when 0 then 0 else 1 end 
      from UserAccounts 
     where UserAccountId = @UserAccountId
  end

  if @UserAccountId != @pUserAccountId and @pUserAccountId != 0
  begin
    delete UserAccounts
     where UserAccountId = @pUserAccountId
  end
end
```
