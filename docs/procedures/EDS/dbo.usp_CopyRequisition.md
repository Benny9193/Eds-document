# Procedure: `dbo.usp_CopyRequisition`

_Generated on 2026-05-04T13:04:24.354Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_CopyRequisition` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2025-03-26 17:45:26 |
| Modified | 2025-08-11 11:44:01 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@SessionId` | IN | int |  |
| 2 | `@BudgetId` | IN | int |  |
| 3 | `@RequisitionId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |
| `BudgetAccounts` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `DistrictCategories` | USER_TABLE |  |
| `Items` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `ShipLocations` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `dbo.sp_NewRequisitionId` | SQL_STORED_PROCEDURE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--exec usp_CopyRequisition 1785595599, 1685926, 59353636
--select * from Requisitions where RequisitionId = 59303301
CREATE   procedure [dbo].[usp_CopyRequisition] @SessionId int, @BudgetId int, @RequisitionId int
as
begin
declare @SessionBudgetId int,
		@Status varchar(50),
		@Message varchar(4096)
declare @NewReqId int,
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

	select @SessionBudgetId = bp.BudgetId
	  from SessionTable
	  join Budgets bc on bc.BudgetId = SessionTable.BudgetId
	  join Budgets bp on bp.DistrictId = bc.DistrictId
	                 and Year(bp.StartDate) = Year(bc.StartDate) - 1
	 where SessionId = @SessionId

	select @Status = 'OK', @Message = 'Requisition Copied'
	  from Requisitions
	 where RequisitionId = @RequisitionId
	   and BudgetId = @SessionBudgetId

	if @@ROWCOUNT > 0
	begin
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
			where Requisitions.RequisitionId = @RequisitionId

		-- Check for User being deleted and Recreated
		select @NewUserId = NewUser.UserId,
				@NewSchoolId = NewUser.SchoolId,
				@NewAttention = NewUser.Attention
			from Users OldUser with (nolock)
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

			begin try
				set transaction isolation level read committed
				begin transaction
				-- Create New Requisition
				exec dbo.sp_NewRequisitionId @DistrictId, @SchoolId, @BudgetId, @UserId, @NewReqId output

				-- Update Requisition Header
				Update Requisitions
				   set Attention = @Attention,
					   BudgetAccountId = @BudgetAccountId,
					   UserAccountId = @UserAccountId,
					   CategoryId = @CategoryId,
					   AccountCode = @AccountCode,
					   BookId = @RequisitionId,
					   SourceId = 3,
					   ShippingId = isnull((select ShippingId from ShipLocations where ShipLocations.ShippingId = @ShippingId and ShipLocations.Active = 1),ShippingId)
				  from Requisitions with (rowlock,updlock)
				 where RequisitionId = @NewReqId

				  -- Copy Detail
				  insert Detail (RequisitionId, ItemId, ItemCode, Quantity, LastYearsQuantity, Description)
					select @NewReqId, Detail.ItemId, Detail.ItemCode, Detail.Quantity, Detail.Quantity, Detail.Description
					  from Detail with (nolock)
					  join Items on Items.ItemId = Detail.ItemId
								and Items.Active = 1
					 where Detail.RequisitionId = @RequisitionId
					   and (Detail.VendorId != 7691 or Detail.ItemMustBeBid = 1)

				-- Delete Bad Entries from Copy
				delete Detail
				  from Detail with (rowlock,updlock)
				 where RequisitionId = @NewReqId
				   and ItemId is null

				if @DontDeleteNoBids = 0
				begin
				  -- Delete No Bid Entries from Copy
				  delete Detail
					from Detail with (rowlock,updlock)
				   where RequisitionId = @NewReqId
					 and isnull(VendorId,7691) = 7961

				  -- Delete Zero Priced Items
				  delete Detail
					from Detail with (rowlock,updlock)
				   where RequisitionId = @NewReqId
					 and isnull(BidPrice,0) = 0
				end

				commit transaction
			end try
			begin catch
				rollback transaction
				select @Status = 'Error', @Message = 'Error at line ' + cast(Error_Line() as varchar) + ':' + Error_Message()
			end catch;
		end
		else
		begin
			select @Status = 'Error', @Message = 'Unable to locate new Budget'
		end
	end
	else
	begin
		select @Status = 'Error', @Message = 'Passed Information dores not match'
	end

	select @Status [Status], @Message [Message]
end
```
