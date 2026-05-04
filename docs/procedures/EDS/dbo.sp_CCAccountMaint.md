# Procedure: `dbo.sp_CCAccountMaint`

_Generated on 2026-05-04T14:49:07.223Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CCAccountMaint` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2019-06-04 16:45:14 |
| Modified | 2019-06-13 08:40:40 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pAccountId` | IN | int |  |
| 3 | `@pActive` | IN | int |  |
| 4 | `@pSchoolId` | IN | int |  |
| 5 | `@pAccountEntry` | IN | varchar(50) |  |
| 6 | `@pDescription` | IN | varchar(512) |  |
| 7 | `@pAction` | IN | tinyint |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |
| `BudgetAccounts` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE   procedure [dbo].[sp_CCAccountMaint] @pSessionId int, @pAccountId int, @pActive int, @pSchoolId int, @pAccountEntry varchar(50), @pDescription varchar(512), @pAction tinyint as
declare @AccountId int,
	@UserAccountId int,
	@BudgetAccountId int,
	@DistrictId int,
	@BudgetId int,
	@SchoolId int,
	@Account_SchoolId int,
	@Account_Active int,
	@BA_Active int,
	@UA_Active int,
	@UA_AllocationAmount decimal(11,2),
	@UA_UseAllocations int,
	@UA_BudgetAccountId int,
	@UA_Count int,
	@BA_Count int

set nocount on

-- Get District id
select @DistrictId = DistrictId, @BudgetId = BudgetId
  from SessionTable
 where SessionId = @pSessionId

if @@ROWCOUNT = 0
begin
	raiserror('Bad Budget passes BudgetId=%d',16,1,@BudgetId)
	return
end

-- Get School Id
select @SchoolId = SchoolId
  from School
 where SchoolId = @pSchoolId

--insert DebugMsgs(Msg) values('Action=' + isnull(cast(@pAction as varchar),'<null>') + ' AccountId=' + isnull(cast(@pAccountId as varchar),'<null>') + ' BudgetId=' + isnull(cast(@BudgetId as varchar),'<null>') + ' SchoolId=' + isnull(cast(@pSchoolId as varchar),'<null>') + ' Code=' + isnull(@pAccountEntry,'<null>'))
if @pAction in (2,3)
begin
    -- Get Account Id
    select top 1 @AccountId = AccountId,
           @Account_SchoolId = isnull(SchoolId,0),
           @Account_Active = isnull(Active,0)
      from Accounts
     where AccountId = @pAccountId

	if @@ROWCOUNT = 0
	begin
		raiserror('Bad AccountId Passed. AccountId=%d',16,1,@pAccountId)
		return
	end
end

if @pAction = 1
begin
	if rtrim(isnull(@pAccountEntry,'')) != ''
	begin
		-- Get Account Id
		select top 1 @AccountId = AccountId,
			   @Account_SchoolId = isnull(SchoolId,0),
			   @Account_Active = isnull(Active,0)
		  from Accounts
		 where DistrictId = @DistrictId
		   and trim(Code) = trim(@pAccountEntry)

		if @@rowcount = 0
		begin
		  -- Create New Account
		  insert Accounts (Active, DistrictId, SchoolId, Code)
			values (1, @DistrictId, @SchoolId, rtrim(ltrim(@pAccountEntry)))

		  select @AccountId = SCOPE_IDENTITY()
	--	  insert DebugMsgs(Msg) values('AccountId=' + cast(@AccountId as varchar))
		end
		else
		begin
			raiserror('Account Code already exists. Update Existing Account Code.',16,1)
			return
		end
	end
end

if isnull(@AccountId,0) != 0 and @pAction = 2
begin
	Update Accounts
	   set Active = @pActive,
	       SchoolId = @pSchoolId,
		   Code = @pAccountEntry,
		   Description = @pDescription
	 where AccountId = @AccountId
	   and (   isnull(Active,0) != isnull(@pActive,0)
	        or isnull(SchoolId,0) != isnull(@pSchoolId,0)
			or isnull(Code,'') != isnull(trim(@pAccountEntry),'') 
			or isnull(Description,'') != isnull(trim(@pDescription),''))
end

if isnull(@AccountId,0) != 0 and @pAction in (1,2)
begin
    -- Get Budget Account Id
    select @BudgetAccountId = BudgetAccountId,
           @BA_Active = isnull(Active,0)
      from BudgetAccounts
     where BudgetId = @BudgetId
       and AccountId = @AccountId

    if @@rowcount = 0
    begin
		-- Create New Budget Account
		insert BudgetAccounts (Active, BudgetId, AccountId)
		values (1, @BudgetId, @AccountId)

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
end

if @AccountId != 0 and @pAction = 3
begin
	select @UA_Count = count(*)
 	  from UserAccounts
	 where AccountId = @AccountId

	select @BA_Count = count(*)
 	  from BudgetAccounts
	 where AccountId = @AccountId

	if isnull(@UA_Count,0) + isnull(@BA_Count,0) > 0
	begin
		Update Accounts
		   set Active = 0
		 where AccountId = @AccountId
	end
	else
	begin
		delete Accounts
		 where AccountId = @AccountId
	end
end

set nocount off
```
