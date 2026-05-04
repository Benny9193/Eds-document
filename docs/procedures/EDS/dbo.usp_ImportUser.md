# Procedure: `dbo.usp_ImportUser`

_Generated on 2026-05-04T13:43:19.180Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_ImportUser` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2022-02-17 17:00:24 |
| Modified | 2022-02-26 10:11:50 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pDistrictId` | IN | int |  |
| 2 | `@pSchoolId` | IN | int |  |
| 3 | `@pUserNumber` | IN | int |  |
| 4 | `@pAttention` | IN | varchar(50) |  |
| 5 | `@pEmail` | IN | varchar(255) |  |
| 6 | `@pDistrictAccountingCode` | IN | varchar(50) |  |
| 7 | `@pApprovalLevel` | IN | int |  |
| 8 | `@pApproverNumber` | IN | int |  |
| 9 | `@pAccountCode` | IN | varchar(50) |  |
| 10 | `@pAllocation` | IN | money |  |
| 11 | `@pAllowMSRP` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |
| `BudgetAccounts` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `dbo.Accounts` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE   procedure [dbo].[usp_ImportUser]
@pDistrictId int,
@pSchoolId int,
@pUserNumber int,
@pAttention varchar(50),
@pEmail varchar(255),
@pDistrictAccountingCode varchar(50),
@pApprovalLevel int,
@pApproverNumber int,
@pAccountCode varchar(50),
@pAllocation money,
@pAllowMSRP int
as
declare @DistrictId int,
		@BudgetId int,
		@SchoolId int,
		@UserId	int,
		@ApproverId int,
		@RecCount int

set nocount on
begin transaction
begin try
    lineno 37  -- set this number based on create sproc script
	-- Check for Valid District
	select top 1 @DistrictId = District.DistrictId
	  from District
	 where District.DistrictId = @pDistrictId

	if @@ROWCOUNT != 1
	begin;
		Throw 51000,'Invalid DistrictId Passed',16
	end

	-- Check for Valid BudgetId
	select top 1 @BudgetId = Budgets.BudgetId
	  from Budgets
	 where DistrictId = @pDistrictId
	   and getdate() between Budgets.EditFrom and Budgets.EditUntil

	if @@ROWCOUNT != 1
	begin;
		Throw 51000,'No Valid Budget Available',16;
	end

	-- Check for Valid School
	select @SchoolId = School.SchoolId
	  from School
	 where School.SchoolId = @pSchoolId

	if @@rowcount != 1
	begin;
		Throw 51000,'Invalid School Passed',16
	end

	-- If account does not exist (for user school or "All Schools")
	If Not Exists
	(Select Accounts.AccountId 
	from Accounts 
	where Accounts.DistrictId = @pDistrictId and Accounts.Code = @pAccountCode and Accounts.Active = 1 
		and IsNull(Accounts.SchoolId,@pSchoolId)=@pSchoolId
	)
	Begin
	  -- If account exists for 1 other school, update to "All Schools"  
	  -- (if account exists for multiple other schools, add an account for this users school)
	  (Select @RecCount = count(*) 
	   from Accounts 
	   where Accounts.DistrictId = @pDistrictId and Accounts.Code = @pAccountCode and Accounts.Active = 1 
	     and IsNull(Accounts.SchoolId,0) != @pSchoolId
	  )
      If @RecCount = 1 
	    Begin
	      UPDATE [dbo].[Accounts]
	       Set [SchoolId] = Null
	     WHERE  Accounts.DistrictId = @pDistrictId and Accounts.Code = @pAccountCode and Accounts.Active = 1 
	       and IsNull(Accounts.SchoolId,0) != @pSchoolId
	    End
	  ELSE
	    Begin
	    -- Add Account if not present already
		  insert Accounts (Active, Code, DistrictId, SchoolId)
		  select 1, @pAccountCode, District.DistrictId, School.SchoolId
		    from School 
		    join District on District.DistrictId = School.DistrictId
		    join Budgets on Budgets.DistrictId = School.DistrictId
			  		    and Budgets.BudgetId = @BudgetId
		    outer apply (Select top 1 Accounts.AccountId from Accounts where Accounts.DistrictId = District.DistrictId and Accounts.Code = @pAccountCode and Accounts.SchoolId = @pSchoolId and Accounts.Active = 1 order by Accounts.AccountId) a
		   where School.SchoolId = @pSchoolId
		     and a.AccountId is null
		   group by District.DistrictId, School.SchoolId
		End 
	End 

	-- Get Approver
	select @ApproverId = Users.UserId
	  from Users
	 where Users.DistrictId = @DistrictId
	   and Users.CometId = @pApproverNumber
	   and Users.Active = 1
	   and Isnull(Users.ApprovalLevel,0) != 0  -- kjm

	if @@ROWCOUNT != 1
	begin;
		Throw 51000,'Invalid Approver Number Passed',16
	end

	-- Add User if not already present
	insert Users(Active, AllowIncidentals, allowMSRP, ApprovalLevel, ApproverId, Attention, CometId, DistrictId, NewRequisitionButton, Password, SchoolId, ShippingId, Use20, UseCF, UserName, Email, DistrictAcctgCode)
	select 1, 1, @pAllowMSRP, @pApprovalLevel, @ApproverId, @pAttention, @pUserNumber, District.DistrictId, 1, @pUserNumber, School.SchoolId, School.ShippingId, 1, 1, @pUserNumber, @pEmail, @pDistrictAccountingCode
	  from School
	  join District on District.DistrictId = School.DistrictId
	  join Budgets on Budgets.DistrictId = School.DistrictId
				  and Budgets.BudgetId = @BudgetId
	  left outer join Users on Users.DistrictId = District.DistrictId
	--                       and Users.SchoolId = School.SchoolId
						   and Users.CometId = @pUserNumber
						   and Users.Active = 1
	 where School.SchoolId = @SchoolId
	   and Users.UserId is null

	-- Add BudgetAccounts for AccountCode
	insert BudgetAccounts (Active, AccountId, BudgetId)
	select 1, Accounts.AccountId, Budgets.BudgetId
	  from Accounts
	  join Budgets on Budgets.BudgetId = @BudgetId
	  left outer join BudgetAccounts on BudgetAccounts.BudgetId = Budgets.BudgetId
									and BudgetAccounts.AccountId = Accounts.AccountId
									and BudgetAccounts.Active = 1
	 where Accounts.DistrictId = Budgets.DistrictId
	   and Accounts.Active = 1
	   and Accounts.Code = @pAccountCode
	   and IsNull(Accounts.SchoolId,@pSchoolId)=@pSchoolId   -- kjm 
	   and BudgetAccounts.BudgetAccountId is null
	 group by Accounts.AccountId, Budgets.BudgetId

	-- Add User Account entry with Allocation Amount
	insert UserAccounts (AccountId, Active, AllocationAmount, AllocationAvailable, BudgetAccountId, BudgetId, UseAllocations, UserId)
	  select Accounts.AccountId, 1, @pAllocation, @pAllocation, BudgetAccounts.BudgetAccountId, Budgets.BudgetId, case when isnull(@pAllocation,0) = 0 then 0 else 1 end, Users.UserId
	  from School
	  join District on District.DistrictId = School.DistrictId
	  join Budgets on Budgets.DistrictId = School.DistrictId
				  and Budgets.BudgetId = @BudgetId
	  join Accounts on Accounts.DistrictId = District.DistrictId
				   and Accounts.Active = 1
				   and Accounts.Code = @pAccountCode
				   and IsNull(Accounts.SchoolId,@pSchoolId)=@pSchoolId   -- kjm 
	  join Users on Users.DistrictId = District.DistrictId
				and Users.SchoolId = School.SchoolId
				and Users.CometId = @pUserNumber
	  join BudgetAccounts on BudgetAccounts.BudgetId = Budgets.BudgetId
						 and BudgetAccounts.AccountId = Accounts.AccountId
						 and BudgetAccounts.Active = 1
	  left outer join UserAccounts on UserAccounts.BudgetAccountId = BudgetAccounts.BudgetAccountId
								  and UserAccounts.UserId = Users.UserId
								  and UserAccounts.Active = 1
	 where School.SchoolId = @SchoolId
	   and UserAccounts.UserAccountId is null

	commit transaction
	select 1 [Status], 'Process Completed Normally' [StatusDesc]
end try
begin catch
	rollback transaction
	select 0 [Status],
	      'SQL Error#: ' + convert(varchar,ERROR_NUMBER()) + '  ' + ERROR_MESSAGE() +  + char(13) + char(10) + 
		  'Line: ' + convert(VARCHAR,ERROR_LINE()) + '  Procedure: ' + ERROR_PROCEDURE() [StatusDesc]
	-- note: remember to add LINENO x at start of procedure after "begin try" to report the error line correctly
end catch
set nocount off
```
