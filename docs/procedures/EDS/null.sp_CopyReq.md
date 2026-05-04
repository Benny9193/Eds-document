# Procedure: `null.sp_CopyReq`

_Generated on 2026-05-04T13:04:00.215Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `null`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `null` |
| Name | `sp_CopyReq` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-11-25 14:06:52 |
| Modified | 2014-10-07 17:53:24 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |
| `BudgetAccounts` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Detail` | USER_TABLE |  |
| `DistrictCategories` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `dbo.sp_NewRequisitionId` | SQL_STORED_PROCEDURE |  |

## Called by

| Caller | Type |
|--------|------|
| `null.sp_CopyReqs` | SQL_STORED_PROCEDURE |

## Definition

```sql
CREATE procedure [EDSIQWebUser].[sp_CopyReq] @pRequisitionId int as

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
	@NewUserId int

set transaction isolation level read uncommitted
--begin transaction

-- Get Current Date
select @TodaysDate = getdate()

-- Get District Id
select @DistrictId = School.DistrictId,
       @SchoolId = Requisitions.SchoolId,
       @UserId = Requisitions.UserId,
       @AccountCode = Requisitions.AccountCode,
       @CategoryId = Requisitions.CategoryId,
       @Attention = Users.Attention,
       @DontDeleteNoBids = isnull(DistrictCategories.AllowAddenda,0)
  from Requisitions with (nolock)
  join School on School.SchoolId = Requisitions.SchoolId
  join Users on Users.UserId = Requisitions.UserId
  join DistrictCategories on DistrictCategories.DistrictId = School.DistrictId
                         and DistrictCategories.CategoryId = Requisitions.CategoryId
 where Requisitions.RequisitionId = @pRequisitionId

-- Check for User being deleted and Recreated
select @NewUserId = NewUser.UserId
  from Users OldUser
  join Users NewUser on NewUser.CometId = OldUser.CometId
                    and NewUser.DistrictId = OldUser.DistrictId
                    and NewUser.Active = 1
 where OldUser.UserId = @UserId
   and isnull(OldUser.Active,0) = 0

if @@rowcount = 0
begin
  select @NewUserId = 0
end

if @NewUserId > 0
begin
  select @UserId = @NewUserId
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
--print 'DistrictId=' + isnull(convert(varchar(16),@DistrictId),'<null>')
--print 'SchoolId=' + isnull(convert(varchar(16),@SchoolId),'<null>')
--print 'UserId=' + isnull(convert(varchar(16),@UserId),'<null>')
--print 'CategoryId=' + isnull(convert(varchar(16),@CategoryId),'<null>')
--print 'BudgetId=' + isnull(convert(varchar(16),@BudgetId),'<null>')
--print 'BudgetAccountId=' + isnull(convert(varchar(16),@BudgetAccountId),'<null>')
--print 'UserAccountId=' + isnull(convert(varchar(16),@UserAccountId),'<null>')
--print 'AccountCode=' + isnull(@AccountCode,'<null>')
--print 'Attention=' + isnull(@Attention,'<null>')

-- Create New Requisition
exec dbo.sp_NewRequisitionId @DistrictId, @SchoolId, @BudgetId, @UserId, @NewReqId output

--print 'RequisitionId=' + isnull(convert(varchar(16),@NewReqId),'<null>')

-- Update Requisition Header
Update Requisitions
   set Attention = @Attention,
       BudgetAccountId = @BudgetAccountId,
       UserAccountId = @UserAccountId,
       CategoryId = @CategoryId,
       AccountCode = @AccountCode,
       BookId = @pRequisitionId,
       SourceId = 3
 where RequisitionId = @NewReqId

if @@rowcount > 0
begin
  -- Copy Detail
  insert Detail (RequisitionId, CatalogId, ItemId, ItemCode, Quantity, LastYearsQuantity, Description, UnitId, UnitCode, BidPrice, CatalogPrice, GrossPrice, DiscountRate, CatalogPage, PricePlanId, AwardId, VendorId, VendorItemCode, Alternate, BidItemId)
    select @NewReqId, CatalogId, ItemId, ItemCode, Quantity, Quantity, Description, UnitId, UnitCode, BidPrice, CatalogPrice, GrossPrice, DiscountRate, CatalogPage, PricePlanId, AwardId, VendorId, VendorItemCode, Alternate, BidItemId
      from Detail
     where RequisitionId = @pRequisitionId
end

-- Update Prices
--exec dbo.sp_UpdateReqDetail @NewReqId

-- Delete Bad Entries from Copy
delete Detail
  from Detail
 where RequisitionId = @NewReqId
   and ItemId is null

if @DontDeleteNoBids = 0
begin
  -- Delete No Bid Entries from Copy
  delete Detail
    from Detail
   where RequisitionId = @NewReqId
     and isnull(VendorId,7691) = 7961

  -- Delete Zero Priced Items
  delete Detail
    from Detail
   where RequisitionId = @NewReqId
     and isnull(BidPrice,0) = 0
end

--commit
```
