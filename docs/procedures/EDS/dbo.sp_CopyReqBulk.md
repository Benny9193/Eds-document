# Procedure: `dbo.sp_CopyReqBulk`

_Generated on 2026-05-04T13:04:24.099Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CopyReqBulk` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2008-10-30 22:42:08 |
| Modified | 2025-06-26 11:44:19 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRSLId` | IN | int |  |
| 2 | `@pRequisitionId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |
| `BudgetAccounts` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `DistrictCategories` | USER_TABLE |  |
| `ReportSessionLinks` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `ShipLocations` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `dbo.sp_NewRequisitionId` | SQL_STORED_PROCEDURE |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.sp_CopyReqsBulk` | SQL_STORED_PROCEDURE |

## Definition

```sql
CREATE  procedure [dbo].[sp_CopyReqBulk] @pRSLId int, @pRequisitionId int as

declare @NewReqId int,
	@BudgetId int,
	@DistrictId int,
	@SchoolId int,
	@UserId int,
	@UserAccountId int,
	@BudgetAccountId int,
	@AccountCode varchar(50),
	@CategoryId int,
	@Attention varchar(50),
	@TodaysDate datetime,
	@AccountCount int,
	@DontDeleteNoBids int,
	@NewUserId int,
	@NewSchoolId int,
	@ShippingId int,
        @NewAttention varchar(50)

set transaction isolation level read uncommitted
--begin transaction

-- Get Current Date
select @TodaysDate = getdate()

-- Get District Id
select @DistrictId = School.DistrictId,
       @SchoolId = Users.SchoolId,
       @UserId = Users.UserId,
       @AccountCode = Requisitions.AccountCode,
       @CategoryId = Requisitions.CategoryId,
       @Attention = Users.Attention,
       @DontDeleteNoBids = isnull(DistrictCategories.AllowAddenda,0),
       @ShippingId = case when isnull(Users.AllowShipToChanges,0) = 1 then ISNULL(Requisitions.ShippingId,0) else Users.ShippingId end
  from Requisitions with (nolock)
  join School on School.SchoolId = Requisitions.SchoolId
  join Users on Users.UserId = Requisitions.UserId
  join DistrictCategories on DistrictCategories.DistrictId = School.DistrictId
                         and DistrictCategories.CategoryId = Requisitions.CategoryId
 where Requisitions.RequisitionId = @pRequisitionId

-- Check for User being deleted and Recreated
select @NewUserId = NewUser.UserId,
       @NewSchoolId = NewUser.SchoolId,
       @NewAttention = NewUser.Attention
  from Users OldUser
  join Users NewUser on NewUser.CometId = OldUser.CometId
                    and NewUser.DistrictId = OldUser.DistrictId
                    and NewUser.Active = 1
 where OldUser.UserId = @UserId
   and isnull(OldUser.Active,0) = 0

if @@rowcount = 0
begin
  select @NewUserId = 0,
         @NewSchoolId = 0,
         @NewAttention = ''
end

if @NewUserId > 0
begin
  select @UserId = @NewUserId,
         @SchoolId = @NewSchoolId,
         @Attention = @NewAttention
end
                               
-- Get New Budget Info
select top 1 @BudgetId = Budgets.BudgetId
  from Budgets
  join Users on Users.DistrictId = Budgets.DistrictId
            and Users.UserId = @UserId
 where GETDATE() between case when isnull(Users.AllowEarlyAccess,0) = 1 or Users.ApprovalLevel > 1 then coalesce(Budgets.EarlyAccess,Budgets.VisibleFrom) else Budgets.VisibleFrom end
                     and Budgets.VisibleUntil
/* DCH 10/6/14 Code above replaces this code for Early Access
       Budgets.VisibleFrom <= getdate()
   and Budgets.VisibleUntil >= getdate()*/
   and Budgets.DistrictId = @DistrictId
   and Budgets.Active = 1
 order by Budgets.StartDate Desc

if @@ROWCOUNT > 0
begin
	select @BudgetAccountId = BudgetAccounts.BudgetAccountId,
		   @UserAccountId = UserAccounts.UserAccountId
	  from Accounts 
	  left outer join BudgetAccounts on BudgetAccounts.BudgetId = @BudgetId
									and BudgetAccounts.AccountId = Accounts.AccountId
									and BudgetAccounts.Active = 1
	  left outer join UserAccounts on UserAccounts.BudgetAccountId = BudgetAccounts.BudgetAccountId
								  and UserAccounts.UserId = @UserId
								  and UserAccounts.Active = 1
	 where Accounts.Code = @AccountCode
	   and Accounts.Active = 1

	if isnull(@UserAccountId,0) = 0
	begin
	  select @AccountCount = count(*)
		from Budgets
		join BudgetAccounts on BudgetAccounts.BudgetId = Budgets.BudgetId
						   and BudgetAccounts.Active = 1
		join UserAccounts on UserAccounts.BudgetId = Budgets.BudgetId
						 and UserAccounts.UserId = @UserId
						 and UserAccounts.Active = 1
		join Accounts on Accounts.AccountId = BudgetAccounts.AccountId
					 and Accounts.AccountId = UserAccounts.AccountId
					 and Accounts.Active = 1
	   where Budgets.BudgetId = @BudgetId

	  if @AccountCount = 1
	  begin
		select @BudgetAccountId = BudgetAccounts.BudgetAccountId,
			   @UserAccountId = UserAccounts.UserAccountId,
			   @AccountCode = Accounts.Code
		  from Budgets
		  join BudgetAccounts on BudgetAccounts.BudgetId = Budgets.BudgetId
							 and BudgetAccounts.Active = 1
		  join UserAccounts on UserAccounts.BudgetId = Budgets.BudgetId
						   and UserAccounts.UserId = @UserId
						   and UserAccounts.Active = 1
		  join Accounts on Accounts.AccountId = BudgetAccounts.AccountId
					   and Accounts.AccountId = UserAccounts.AccountId
					   and Accounts.Active = 1
	   where Budgets.BudgetId = @BudgetId
	  end
	  else
	  begin
		select @BudgetAccountId = null,
			   @UserAccountId = null,
			   @AccountCode = null
	  end
	end

	-- Create New Requisition
	exec dbo.sp_NewRequisitionId @DistrictId, @SchoolId, @BudgetId, @UserId, @NewReqId output

	-- Update Requisition Header
	Update Requisitions
	   set Attention = @Attention,
		   BudgetAccountId = @BudgetAccountId,
		   UserAccountId = @UserAccountId,
		   CategoryId = @CategoryId,
		   AccountCode = @AccountCode,
		   BookId = @pRequisitionId,
		   SourceId = 3,
		   ShippingId = isnull((select ShippingId from ShipLocations where ShipLocations.ShippingId = @ShippingId and ShipLocations.Active = 1),ShippingId)
	  from Requisitions  with (updlock,rowlock)
	 where RequisitionId = @NewReqId

	Update ReportSessionLinks
	   set AuxId = @NewReqId
	  from ReportSessionLinks with (updlock,rowlock)
	 where RSLId = @pRSLId
end
```
