# Procedure: `dbo.sp_UpdateReq`

_Generated on 2026-05-04T13:04:00.476Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_UpdateReq` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2001-08-24 14:40:45 |
| Modified | 2012-07-30 13:56:22 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRequisitionId` | IN | int |  |
| 2 | `@pBudgetAccountId` | IN | int |  |
| 3 | `@pBudgetId` | IN | int |  |
| 4 | `@pUserId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |
| `Approvals` | USER_TABLE |  |
| `ApprovalsHistory` | USER_TABLE |  |
| `BudgetAccounts` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `sp_DeleteZeros` | unresolved |  |
| `UserAccounts` | USER_TABLE |  |
| `Users` | USER_TABLE |  |

## Called by

| Caller | Type |
|--------|------|
| `dbo.sp_UpdateReqDetailItem` | SQL_STORED_PROCEDURE |
| `dbo.sp_UpdateReqDetailPricePlan` | SQL_STORED_PROCEDURE |
| `dbo.sp_UpdateReqHeader` | SQL_STORED_PROCEDURE |

## Definition

```sql
CREATE         PROCEDURE [dbo].[sp_UpdateReq] @pRequisitionId int, @pBudgetAccountId int, @pBudgetId int, @pUserId int AS

declare @oldBudgetAccountId int,
	@oldTotalRequisitionCost money,
	@oldBudgetId int,
	@oldUserAccountId int,
	@oldAmountAvailable money,
	@oldUseAllocations int,
	@newBudgetAccountId int,
	@newTotalRequisitionCost money,
	@newBudgetId int,
	@newUserAccountId int,
	@newAmountAvailable money,
	@newUseAllocations int,
	@oldRequisitionId int,
	@newRequisitionId int,
	@oldUserId int,
	@newUserId int,
	@oldAccountId int,
	@newAccountId int,
	@oldTotalItemsCost money,
	@newTotalItemsCost money,
	@newTotalBidCost money,
	@newTotalGrossCost money,
	@oldShippingCost money,
	@newShippingCost money,
	@tempBudgetAccountId int,
	@tempUserAccountId int,
	@VendorId int,
	@DiscountRate decimal(9,5),
	@tempTotalGrossCost money,
	@AccountCode varchar(255),
	@oldPOId int

--begin transaction

exec sp_DeleteZeros 0, @pRequisitionId

select @oldRequisitionId = ISNULL(Requisitions.RequisitionId,0),
       @oldBudgetAccountId = ISNULL(Requisitions.BudgetAccountId,0),
       @oldTotalItemsCost = ISNULL(Requisitions.TotalItemsCost,0),
       @oldShippingCost = ISNULL(Requisitions.ShippingCost,0),
       @oldTotalRequisitionCost = ISNULL(Requisitions.TotalRequisitionCost,0),
       @oldUserAccountId = ISNULL(Requisitions.UserAccountId,0),
       @oldUserId = ISNULL(Requisitions.UserId,0),
       @oldBudgetId = ISNULL(Requisitions.BudgetId,0),
       @oldAccountId = ISNULL(BudgetAccounts.AccountId,0),
       @oldPOId = ISNULL(PO.POId,0)
  from Requisitions
  left outer join BudgetAccounts on BudgetAccounts.BudgetAccountId = Requisitions.BudgetAccountId
  left outer join PO on PO.POId =
    (select Top 1 p.POId
       from PO p with (nolock)
      where p.RequisitionId = Requisitions.RequisitionId)
 where Requisitions.RequisitionId = @pRequisitionId

if @oldRequisitionId = 0
begin
  RAISERROR('Invalid Requisition Identifier passed. RequisitionId=%d',16,1,@pRequisitionId)
  ROLLBACK TRANSACTION
  RETURN
end

/*
-- Set Price Flag Based on Setting if Needs Updating
Update Detail
   set UseGrossPrices = isnull(Awards.UseGrossPrices,0) & isnull(District.UseGrossPrices,0)
  from Detail
  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
  join School on School.SchoolId = Requisitions.SchoolId
  join District on District.DistrictId = School.DistrictId
  join Awards on Awards.AwardId = Detail.AwardId
 where Detail.RequisitionId = @pRequisitionId
   and isnull(Detail.UseGrossPrices,0) != isnull(Awards.UseGrossPrices,0) & isnull(District.UseGrossPrices,0)

select @newTotalBidCost = sum(isnull(Detail.Quantity,0) * round(isnull(Detail.BidPrice,0),2))
  from Detail
--  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
--  join School on School.SchoolId = Requisitions.SchoolId
--  join District on District.DistrictId = School.DistrictId
--  join Awards on Awards.AwardId = Detail.AwardId
--  left outer join Vendors on Vendors.VendorId = Detail.VendorId
 where Detail.RequisitionId = @pRequisitionId
   and isnull(Detail.UseGrossPrices,0) != 1

select @newTotalGrossCost = 0

declare VendorCursor cursor FAST_FORWARD for 
select Detail.VendorId, Detail.DiscountRate
  from Detail
--  join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
--  join School on School.SchoolId = Requisitions.SchoolId
--  join District on District.DistrictId = School.DistrictId
--  join Awards on Awards.AwardId = Detail.AwardId
--  left outer join Vendors on Vendors.VendorId = Detail.VendorId
 where Detail.RequisitionId = @pRequisitionId
   and isnull(Detail.UseGrossPrices,0) = 1
 group by Detail.VendorId, Detail.DiscountRate

open VendorCursor

fetch next from VendorCursor into @VendorId, @DiscountRate

while @@fetch_status = 0
begin
  select @tempTotalGrossCost = sum(isnull(Detail.Quantity,0) * isnull(Detail.GrossPrice,0))
    from Detail
--    join Requisitions on Requisitions.RequisitionId = Detail.RequisitionId
--    join School on School.SchoolId = Requisitions.SchoolId
--    join District on District.DistrictId = School.DistrictId
--    join Awards on Awards.AwardId = Detail.AwardId
    left outer join Vendors on Vendors.VendorId = Detail.VendorId
   where Detail.RequisitionId = @pRequisitionId
     and Detail.VendorId = @VendorId
     and Detail.DiscountRate = @DiscountRate
     and isnull(Detail.UseGrossPrices,0) = 1

  select @newTotalGrossCost = @newTotalGrossCost + (isnull(@tempTotalGrossCost,0) * (1 - (isnull(@DiscountRate,0)/100)))

  fetch next from VendorCursor into @VendorId, @DiscountRate
end

close VendorCursor
deallocate VendorCursor

select @newTotalItemsCost = isnull(@newTotalBidCost,0) + isnull(@newTotalGrossCost,0)

select @newShippingCost = @oldShippingCost

select @newTotalRequisitionCost = isnull(@newTotalItemsCost,0) + isnull(@newShippingCost,0)
*/
-- Check for Change in Budget Account
if @pBudgetAccountId = 0
begin
  select @pBudgetAccountId = isnull(@oldBudgetAccountId,0)
end

if @pBudgetId = 0
begin
  select @pBudgetId = isnull(@oldBudgetId,0)
end

if @pUserId = 0
begin
  select @pUserId = isnull(@oldUserId,0)
end

-- Load New Budget Account
if isnull(@pBudgetId,0) != 0
begin
  select @newBudgetId = BudgetId
    from Budgets
   where BudgetId = @pBudgetId

  if @@rowcount = 0
  begin
    select @newBudgetId = null
  end
end
else
begin
  select @newBudgetId = null
end

-- Load New User Id
if isnull(@pUserId,0) != 0
begin
  select @newUserId = UserId
    from Users
   where UserId = @pUserId

  if @@rowcount = 0
  begin
    select @newUserId = null
  end
end
else
begin
  select @newUserId = null
end

-- Load New Budget Account Id
if isnull(@pBudgetAccountId,0) != 0
begin
  select @newBudgetAccountId = BudgetAccountId
    from BudgetAccounts
   where BudgetAccountId = @pBudgetAccountId

  if @@rowcount = 0
  begin
    select @newBudgetAccountId = null
  end
end
else
begin
  select @newBudgetAccountId = null
end

-- Load New User Account Id
if isnull(@newUserId,0) != 0 and
   isnull(@newBudgetAccountId,0) != 0
begin
  select @newUserAccountId = UserAccountId
    from UserAccounts
   where BudgetAccountId = @newBudgetAccountId
     and UserId = @newUserId
     and UserAccounts.Active = 1

  if @@rowcount = 0
  begin
    select @newUserAccountId = null
  end
end
else
begin
  select @newUserAccountId = null
end

-- Load New Account Code
if isnull(@newBudgetAccountId,0) != 0
begin
  select @AccountCode = Accounts.Code
    from Accounts
    join BudgetAccounts on BudgetAccounts.AccountId = Accounts.AccountId
                       and BudgetAccounts.Active = 1
   where BudgetAccounts.BudgetAccountId = @newBudgetAccountId

  if @@rowcount = 0
  begin
    select @AccountCode = ''
  end
end
else
begin
  select @AccountCode = ''
end

/*
-- Check for Budget Account Change
if @oldBudgetAccountId != @newBudgetAccountId or
   isnull(@oldTotalRequisitionCost,0) != isnull(@newTotalRequisitionCost,0)
begin
  -- Check for Old Budget Account Existing
  if isnull(@oldBudgetAccountId,0) != 0 or
     isnull(@oldTotalRequisitionCost,0) != isnull(@newTotalRequisitionCost,0)
  begin
    -- Return Money to Old Budget Account
    update BudgetAccounts
       set AmountAvailable = ISNULL(AmountAvailable,0) + ISNULL(@oldTotalRequisitionCost,0)
     where BudgetAccountId = @oldBudgetAccountId
       and UseAllocations = 1
  end

  -- Check for New Budget Account Entry
  if isnull(@newBudgetAccountId,0) != 0 or
     isnull(@oldTotalRequisitionCost,0) != isnull(@newTotalRequisitionCost,0)
  begin
    -- Take Money From New Budget Account
    update BudgetAccounts
       set AmountAvailable = ISNULL(AmountAvailable,0) - ISNULL(@newTotalRequisitionCost,0)
     where BudgetAccountId = @newBudgetAccountId
       and UseAllocations = 1
  end
end

-- Check for User Account Change
if @oldUserAccountId != @newUserAccountId or
   isnull(@oldTotalRequisitionCost,0) != isnull(@newTotalRequisitionCost,0)
begin
  -- Check for Old User Account Existing
  if isnull(@oldUserAccountId,0) != 0 or
     isnull(@oldTotalRequisitionCost,0) != isnull(@newTotalRequisitionCost,0)
  begin
    -- Return Money to Old User Account
    update UserAccounts
       set AllocationAvailable = ISNULL(AllocationAvailable,0) + ISNULL(@oldTotalRequisitionCost,0)
     where UserAccountId = @oldUserAccountId
       and UseAllocations = 1
  end

  -- Check for New User Account Entry
  if isnull(@newUserAccountId,0) != 0 or
     isnull(@oldTotalRequisitionCost,0) != isnull(@newTotalRequisitionCost,0)
  begin
    -- Take Money from New User Account
    update UserAccounts
       set AllocationAvailable = ISNULL(AllocationAvailable,0) - ISNULL(@newTotalRequisitionCost,0)
     where UserAccountId = @newUserAccountId
       and UseAllocations = 1
  end
end
*/
/* Don't change Status is PO has been created */
if @oldPOId = 0
begin
  INSERT INTO ApprovalsHistory([ApprovalId], [ApprovalById], [Level], [StatusId], [RequisitionId], [ApprovalDate], [ApproverId])
    select [ApprovalId], [ApprovalById], [Level], [StatusId], [RequisitionId], [ApprovalDate], [ApproverId]
      from Approvals
     where Approvals.RequisitionId = @pRequisitionId

-- Delete Old Approval
  delete Approvals
   where Approvals.RequisitionId = @pRequisitionId
end

-- Update Requisition
update Requisitions
   set Requisitions.BudgetAccountId = @newBudgetAccountId,
       Requisitions.UserAccountId = @newUserAccountId,
       Requisitions.AccountCode = @AccountCode,
       Requisitions.UserId = @newUserId,
--       Requisitions.BudgetId = @newBudgetId,
       Requisitions.StatusId = case @oldPOId when 0 then 1 else StatusId end -- Hold 
/*,
       Requisitions.TotalItemsCost = isnull(@newTotalItemsCost,0),
       Requisitions.ShippingCost = isnull(@newShippingCost,0),
       Requisitions.TotalRequisitionCost = isnull(@newTotalRequisitionCost,0) */
  from Requisitions
 where RequisitionId = @pRequisitionId

update Requisitions
   set BudgetId = @newBudgetId
  from Requisitions
 where RequisitionId = @pRequisitionId
   and ISNULL(@newBudgetId,0) != ISNULL(@oldBudgetId,0)
   
--Commit Transaction

RETURN
```
