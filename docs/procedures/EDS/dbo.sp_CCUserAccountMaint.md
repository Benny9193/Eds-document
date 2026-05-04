# Procedure: `dbo.sp_CCUserAccountMaint`

_Generated on 2026-05-04T13:43:18.743Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CCUserAccountMaint` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2004-10-02 16:43:28 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pUserAccountId` | IN | int |  |
| 2 | `@pBudgetAccountId` | IN | int |  |
| 3 | `@pAllocationAmount` | IN | decimal(11,2) |  |
| 4 | `@pUseAllocations` | IN | int |  |
| 5 | `@pBudgetId` | IN | int |  |
| 6 | `@pUserId` | IN | int |  |
| 7 | `@pActive` | IN | int |  |
| 8 | `@pAccountEntry` | IN | varchar(50) |  |
| 9 | `@pAction` | IN | tinyint |  |

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
CREATE    procedure dbo.sp_CCUserAccountMaint @pUserAccountId int, @pBudgetAccountId int, @pAllocationAmount decimal(11,2), @pUseAllocations int, @pBudgetId int, @pUserId int, @pActive int, @pAccountEntry varchar(50), @pAction tinyint as
declare @AccountId int,
	@UserAccountId int,
	@BudgetAccountId int,
	@DistrictId int,
	@SchoolId int,
	@Account_SchoolId int,
	@Account_Active int,
	@BA_Active int,
	@UA_Active int,
	@UA_AllocationAmount decimal(11,2),
	@UA_UseAllocations int,
	@UA_BudgetAccountId int,
	@LinkCount int

set nocount on

-- Get District id
select @DistrictId = DistrictId
  from Budgets 
 where BudgetId = @pBudgetId

-- Get School Id
select @SchoolId = SchoolId
  from Users
 where UserId = @pUserId

if @pAction = 1 or @pAction = 2
begin
  if rtrim(isnull(@pAccountEntry,'')) != ''
  begin
    -- Get Account Id
    select @AccountId = AccountId,
           @Account_SchoolId = isnull(SchoolId,0),
           @Account_Active = isnull(Active,0)
      from Accounts
     where DistrictId = @DistrictId
       and rtrim(ltrim(Code)) = rtrim(ltrim(@pAccountEntry))

    if @@rowcount = 0
    begin
      -- Create New Account
      insert Accounts (Active, DistrictId, SchoolId, Code)
        values (1, @DistrictId, @SchoolId, rtrim(ltrim(@pAccountEntry)))

      select @AccountId = SCOPE_IDENTITY()
    end
    else
    begin
      -- Check if Update for Available School needs Updating
      if @Account_SchoolId != @SchoolId
      begin
        -- Set for All Schools
        Update Accounts
           set SchoolId = null
         where AccountId = @AccountId
      end

      -- Check if Account Not Active
      if @Account_Active = 0
      begin
        Update Accounts
           set Active = 1
         where AccountId = @AccountId
      end
    end

    -- Get Budget Account Id
    select @BudgetAccountId = BudgetAccountId,
           @BA_Active = isnull(Active,0)
      from BudgetAccounts
     where BudgetId = @pBudgetId
       and AccountId = @AccountId

    if @@rowcount = 0
    begin
      -- Create New Budget Account
      insert BudgetAccounts (Active, BudgetId, AccountId)
        values (1, @pBudgetId, @AccountId)

      select @BudgetAccountId = SCOPE_IDENTITY()
    end
    else
    begin
      -- Check for Account Active
      if @BA_Active = 0
      begin
        -- Make Account Active
        Update BudgetAccounts
           set Active = 1
         where BudgetAccountId = @BudgetAccountId
      end
    end

    -- Get User Account Id
    select @UserAccountId = UserAccountId,
           @UA_Active = isnull(Active,0),
           @UA_AllocationAmount = isnull(AllocationAmount,0),
           @UA_UseAllocations = isnull(UseAllocations,0)
      from UserAccounts
     where UserId = @pUserId
       and BudgetAccountId = @BudgetAccountId

    if @@rowcount = 0
    begin
      insert UserAccounts (Active, AccountId, BudgetId, BudgetAccountId, UserId, AllocationAmount, UseAllocations)
        values (1, @AccountId, @pBudgetId, @BudgetAccountId, @pUserId, @pAllocationAmount, @pUseAllocations)

      select @UserAccountId = SCOPE_IDENTITY()
    end
    else
    begin
      -- Check for Changes
      if @UA_Active != isnull(@pActive,0) or
         @UA_AllocationAmount != isnull(@pAllocationAmount,0) or
         @UA_UseAllocations != isnull(@pUseAllocations,0)
      begin
        -- Make Changes
        Update UserAccounts
           set Active = @pActive,
               AllocationAmount = @pAllocationAmount,
               UseAllocations = @pUseAllocations
         where UserAccountId = @UserAccountId
      end
    end
  end
  else
  begin
    -- Get User Account Id
    select @UserAccountId = UserAccountId,
           @AccountId = AccountId,
           @UA_Active = isnull(Active,0),
           @UA_AllocationAmount = isnull(AllocationAmount,0),
           @UA_UseAllocations = isnull(UseAllocations,0),
           @UA_BudgetAccountId = isnull(BudgetAccountId,0)
      from UserAccounts
     where UserAccountId = @pUserAccountId

    -- Check for Valid Row
    if @@rowcount != 0
    begin
      -- Check for Changes
      if @UA_Active != isnull(@pActive,0) or
         @UA_AllocationAmount != isnull(@pAllocationAmount,0) or
         @UA_UseAllocations != isnull(@pUseAllocations,0) or
         @UA_BudgetAccountId != isnull(@pBudgetAccountId,0)
      begin
        -- Make Changes
        Update UserAccounts
           set Active = @pActive,
               AllocationAmount = @pAllocationAmount,
               UseAllocations = @pUseAllocations,
               BudgetAccountId = @pBudgetAccountId
         where UserAccountId = @UserAccountId
      end
    end
    else
    begin
      -- Get Budget Account Id
      select @BudgetAccountId = BudgetAccountId,
             @AccountId = AccountId
        from BudgetAccounts
       where BudgetAccountId = @pBudgetAccountId

      insert UserAccounts (Active, AccountId, BudgetId, BudgetAccountId, UserId, AllocationAmount, UseAllocations)
        values (1, @AccountId, @pBudgetId, @BudgetAccountId, @pUserId, @pAllocationAmount, @pUseAllocations)

      select @UserAccountId = SCOPE_IDENTITY()
    end
  end
end
else
begin
  select @LinkCount = count(*)
    from Requisitions
   where UserAccountId = @pUserAccountId

  if @LinkCount > 0
  begin
    Update UserAccounts
       set Active = 0
     where UserAccountId = @pUserAccountId
  end
  else
  begin
    delete UserAccounts
     where UserAccountId = @pUserAccountId
  end
end

set nocount off
```
