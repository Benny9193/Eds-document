# Procedure: `dbo.sp_CCUpdateUserAccounts_2`

_Generated on 2026-05-04T14:49:07.228Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CCUpdateUserAccounts_2` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2008-05-19 16:30:36 |
| Modified | 2014-10-07 17:53:25 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pOldCode` | IN | varchar(255) |  |
| 2 | `@pNewCode` | IN | varchar(255) |  |
| 3 | `@pUserId` | IN | int |  |
| 4 | `@pDistrictId` | IN | int |  |
| 5 | `@pBudgetId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |
| `BudgetAccounts` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |
| `Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_CCUpdateUserAccounts_2] 
                  @pOldCode varchar(255),                                -- Users account code to be replaced (leave blank if no entry)
                  @pNewCode varchar(255),                                -- New account code (required)
                  @pUserId int,                                          -- required
                  @pDistrictId int,                                      -- required
                  @pBudgetId int = null                                  -- required if multiple Budgets (visible and active); code will warn user if multiple budgets are found 
as
declare @OldAccountId int, 
	@BudgetAccountId int, 
	@UserSchoolId int, 
	@NewAccountId int,         
	@NewAccountSchoolId int,
	@UserAccountId int, 
	@BudgetId int,
	@RowCount int
--	@UserId int


-- sample use: Execute sp_CCUpdateUserAccounts_2  '1519010006100003360366000', '150002220600000314014000', 162708, 344  -- Art/Judge at Fourth Avenue School
-- different school: 150002220600000314014000  (15898)
--      same school: 1500024006000003360366662 (15894)
--                   1519010006100003360366000 (15894)

-- If BudgetId not specified (e.g. null), determine budgetid to use  (Note: if more than 1 exists, than print message that user must specify)
if @pBudgetId = null                                                     
  begin
	select @BudgetId = Budgets.BudgetId
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
  set @RowCount = @@rowcount                                            
  if @RowCount > 1  
    begin
    Print 'There is more than 1 active budget; a BudgetId is required.'
    return
    end
  if @RowCount < 1  
    begin
    Print 'There are no active budgets for the district specified.'
    return
    end
  end
-- else verify budgetId specified is correct
else     
  begin
  select @BudgetId = BudgetId from Budgets where BudgetId = @pBudgetId  and DistrictId = @pDistrictId
  if @@rowcount <> 1 
    begin
    Print 'The BudgetId specified: '+isnull(convert(varchar, @pBudgetId),'')+' is incorrect or it does not match the DistrictId: '+isnull(convert(varchar, @pDistrictId),'')
    return
    end
  end
--print '*** Testing **** BudgetId: ' + isnull(convert(varchar, @BudgetId),'')

print '*** Processing UserId: ' + isnull(convert(varchar, @pUserId),'')

-- verify that the userid and districtId match, and save the user's schoolId
select @UserSchoolId = SchoolId from Users where UserId = @pUserId  and DistrictId = @pDistrictId
if @@rowcount <> 1 
  begin
  Print 'The UserId: '+isnull(convert(varchar, @pUserId),'')+' is incorrect or it does not match the DistrictId: '+isnull(convert(varchar, @pDistrictid),'')
  return
  end
--print '*** Testing **** UserSchoolId: ' + isnull(convert(varchar, @UserSchoolId),'')

-- Look for Old Account Code (for selected district)   
-- (Need Old accountId to locate UserAccountId and Update with new accountId)
set @pOldCode = rtrim(ltrim(isnull(@pOldCode,'')))
if @pOldCode != '' 
  begin
  select @OldAccountId = AccountId from Accounts where DistrictId = @pDistrictId and Code = @pOldCode and Active = 1
  set @RowCount = @@rowcount
  if @RowCount < 1                                        
    begin
    Print 'The old account code "'+@pOldCode+'" was not found; process stopped.  UserId: '+isnull(convert(varchar, @pUserId),'')
    Return
    end
  if @RowCount > 1
    begin
    Print 'Multiple copies of the old account code: '+@pOldCode+' were found; process stopped.  UserId: '+isnull(convert(varchar, @pUserId),'')
    Return
    end
--  print '*** Testing **** OldAccountId = ' + isnull(convert(varchar, @OldAccountId),'')
  end
else 
  begin
  set @OldAccountId = null
--  print '*** Testing **** OldAccountId set to null ' 
  end
  
set @pNewCode = rtrim(ltrim(isnull(@pNewCode,'')))
if @pNewCode = ''
  begin
  Print 'A new account code was not specified; process stopped.  UserId: '+isnull(convert(varchar, @pUserId),'')
  Return
  end

-- Look for New Account Code (for selected district)   
-- If found, verify the schoolId is same as Users school id (or null for all schools)
select @NewAccountId = AccountId, @NewAccountSchoolId = SchoolId from Accounts where DistrictId = @pDistrictId and Code = @pNewCode and Active = 1
set @RowCount = @@rowcount
if @RowCount < 1                                        
  begin
  insert accounts (active, districtId, schoolid, code) values (1, @pDistrictId, @UserSchoolId, @pNewCode)
  set @NewAccountId = @@identity
  set @NewAccountSchoolId = @UserSchoolId
  Print '  New account code: '+@pNewCode+' was added.  UserId: '+isnull(convert(varchar, @pUserId),'')
  end
else 
  begin
  if @RowCount > 1
    begin
    Print 'Multiple copies of the new account code: '+@pNewCode+' were found; process stopped.  UserId: '+isnull(convert(varchar, @pUserId),'')
    Return
    end
  end

--Print '*** Testing **** The NewAccountId: '+isnull(convert(varchar, @NewAccountId),'')

-- If Account not marked as "multi-school" (e.g. null), then verify account is for same school as the user
if @NewAccountSchoolId is not null                      
  begin
  if @NewAccountSchoolId != @UserSchoolId
    begin
    Update Accounts set SchoolId = null where AccountId = @NewAccountId
--    Print '*** Testing **** The account school id did not match the user school id; the account school id was changed to "multi-school".'
    end
--  Print '*** Testing **** New account code school id matches user school id.'
  end
--else
--  begin
--  Print '*** Testing **** New account code is already marked for "multi-school"'
--  end

-- Get BudgetAccountId; If BudgetAccount record doesn't exist, add it 
select @BudgetAccountId = BudgetAccountId 
  from BudgetAccounts 
where BudgetId = @BudgetId 
   and AccountId = @NewAccountId 
   and Active = 1

set @RowCount = @@rowcount
if @RowCount = 0                                        
  begin
  print '  Add new BudgetAccount'
  insert BudgetAccounts (Active, BudgetId, AccountId, BudgetAmount, AmountAvailable, UseAllocations) values (1, @BudgetId, @NewAccountId, NULL, NULL, 0)
  select @BudgetAccountId = @@Identity
  end
/*  -- Budget Amounts were not provided for in this procedure 
else
  begin
  Update BudgetAccounts
     set BudgetAmount = @pBudgetAmount, 
         AmountAvailable = @pBudgetAmount - isnull((select sum(TotalRequisitionCost) from Requisitions where BudgetAccountId = BudgetAccounts.BudgetAccountId),0), 
         UseAllocations = case isnull(@pBudgetAmount,0) when 0 then 0 else 1 end 
    from BudgetAccounts 
    where BudgetAccountId = @BudgetAccountId
  end
*/
--Print '*** Testing **** BudgetAccountId: '+isnull(convert(varchar, @BudgetAccountId),'')

-- If UserAccount already exists for "NewCode", return
select @UserAccountId = UserAccountId from UserAccounts where active=1 and BudgetId=@BudgetId and UserId=@pUserId and AccountId=@NewAccountId
set @RowCount = @@rowcount
if @RowCount > 0
  begin
  Print '  User Account already existed; no update needed.  UserId: '+isnull(convert(varchar, @pUserId),'')
  return
  end

-- IF UserAccount record existed for "OldCode", THEN update record ELSE insert record
if @OldAccountId is not null 
  begin
  select @UserAccountId = UserAccountId from UserAccounts where active=1 and BudgetId=@BudgetId and UserId=@pUserId and AccountId=@OldAccountId
  set @RowCount = @@rowcount
  end
if (@OldAccountId is not null) and (@RowCount > 0)
  begin
  print '  Update UserAccounts set accountid = '+isnull(convert(varchar,@NewAccountId),'')+', BudgetAccountId = '+isnull(convert(varchar,@BudgetAccountId),'')+' where UserAccountId = '+isnull(convert(varchar,@UserAccountId),'')
  Update UserAccounts set AccountId = @NewAccountId, BudgetAccountId=@BudgetAccountId where UserAccountId = @UserAccountId
  end
else
  begin
  print '  Add new UserAccount'
  insert UserAccounts (Active, AccountId, BudgetId, BudgetAccountId, UserId) Values (1, @NewAccountId, @BudgetId, @BudgetAccountId, @pUserId)
  end
```
