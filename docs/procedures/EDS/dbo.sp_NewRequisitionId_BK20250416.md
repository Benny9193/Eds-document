# Procedure: `dbo.sp_NewRequisitionId_BK20250416`

_Generated on 2026-05-04T13:04:24.154Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_NewRequisitionId_BK20250416` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2025-04-15 22:01:31 |
| Modified | 2025-04-15 22:10:13 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pDistrictId` | IN | int |  |
| 2 | `@pSchoolId` | IN | int |  |
| 3 | `@pBudgetId` | IN | int |  |
| 4 | `@pUserId` | IN | int |  |
| 5 | `@ReqId` | INOUT | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |
| `BudgetAccounts` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `NextNumber` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |
| `Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure dbo.sp_NewRequisitionId_BK20250416 @pDistrictId int, @pSchoolId int, @pBudgetId int, @pUserId int, @ReqId int output AS

declare	
	@DistrictId int,
	@SchoolId int,
	@BudgetId int,
	@UserId int,
	@UseSchool tinyint,
	@ReqNumber varchar(50),
	@UserAccountId int,
	@BudgetAccountId int,
	@AccountCode varchar(50)

  select @DistrictId = @pDistrictId,
	 @SchoolId = @pSchoolId,
	 @BudgetId = @pBudgetId,
	 @UserId = @pUserId,
	 @BudgetAccountId = null,
	 @UserAccountId = null,
	 @AccountCode = null

if ISNULL(@BudgetId,0) = 0
begin
    RAISERROR('Invalid BudgetId passed.',16,1)
    return
end

set transaction isolation level repeatable read

Begin Transaction

  select @UseSchool = ReqsbySchool
    from District with (nolock)
   where DistrictId = @DistrictId

  if @@rowcount > 0
  begin
    if @UseSchool = 1
    begin
      select @ReqNumber = ISNULL(Prefix,'') + CONVERT(varchar(16),ISNULL(NextNumber,1)) + ISNULL(Suffix,'')
        from NextNumber
       where DistrictId = @DistrictId
         and SchoolId = @SchoolId
         and BudgetId = @BudgetId
         and IdType = 'R'

      if @@rowcount > 0
      begin
        update NextNumber
           set NextNumber = ISNULL(NextNumber,1) + 1
         where DistrictId = @DistrictId
           and SchoolId = @SchoolId
           and BudgetId = @BudgetId
           and IdType = 'R'
      end
      else
      begin
        insert NextNumber (DistrictId, SchoolId, BudgetId, IdType, NextNumber)
          values (@DistrictId, @SchoolId, @BudgetId, 'R', 2)
        select @ReqNumber = '1'
      end 
    end
    else
    begin
      select @ReqNumber = ISNULL(Prefix,'') + CONVERT(varchar(16),ISNULL(NextNumber,1)) + ISNULL(Suffix,'')
        from NextNumber
       where DistrictId = @DistrictId
         and SchoolId is null
         and BudgetId = @BudgetId
         and IdType = 'R'

      if @@rowcount > 0
      begin
        update NextNumber
           set NextNumber = ISNULL(NextNumber,1) + 1
         where DistrictId = @DistrictId
           and SchoolId is null
           and BudgetId = @BudgetId
           and IdType = 'R'
      end
      else
      begin
        insert NextNumber (DistrictId, SchoolId, BudgetId, IdType, NextNumber)
          values (@DistrictId, null, @BudgetId, 'R', 2)
        select @ReqNumber = '1'
      end 
    end
  end
  else
  begin
    RAISERROR('Unable to Locate District.',16,1)
    ROLLBACK
    return
  end

if @UserId = 0
begin
  insert Requisitions (Active, RequisitionNumber, SchoolId, UserId, BudgetId, ShippingId, Attention, DateEntered)
    values (1, @ReqNumber, @SchoolId, @UserId, @BudgetId, 0, '', getDate())
end
else
begin
  select @BudgetAccountId = BudgetAccounts.BudgetAccountId,
         @UserAccountId = UserAccounts.UserAccountId,
         @AccountCode = Accounts.Code
    from Users with (nolock)
    join UserAccounts on UserAccounts.UserId = Users.UserId
                     and UserAccounts.Active = 1
	join Budgets on Budgets.BudgetId = UserAccounts.BudgetId
		        and Budgets.BudgetId = @BudgetId
    join BudgetAccounts on BudgetAccounts.BudgetAccountId = UserAccounts.BudgetAccountId
                       and BudgetAccounts.Active = 1
    join Accounts on Accounts.AccountId = BudgetAccounts.AccountId
                 and Accounts.Active = 1
   where Users.UserId = @UserId
   group by BudgetAccounts.BudgetAccountId, UserAccounts.UserAccountId, Accounts.Code
--   having COUNT(*) = 1
  if @@rowcount != 1
  begin
    select @BudgetAccountId = null,
	       @UserAccountId = null,
		   @AccountCode = null
  end
   
  insert Requisitions (Active, RequisitionNumber, SchoolId, UserId, BudgetId, BudgetAccountId, UserAccountId, AccountCode, ShippingId, Attention, DateEntered)
    select 1, @ReqNumber, @SchoolId, @UserId, @BudgetId, @BudgetAccountId, @UserAccountId, @AccountCode, Users.ShippingId, Users.Attention, getDate()
      from Users with (nolock)
     where UserId = @UserId
end

if @@rowcount > 0
begin
  select @ReqId = Scope_Identity() --DCH 11/24/2015 @@IDENTITY
end
else
begin
  select @ReqId = 0
end

Commit Transaction
set transaction isolation level read unCommitted
```
