# Procedure: `dbo.sp_CCUserGridMaint`

_Generated on 2026-05-04T14:49:07.229Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CCUserGridMaint` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2004-10-03 16:24:21 |
| Modified | 2025-01-31 20:46:50 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pUserId` | IN | int |  |
| 2 | `@pActive` | IN | int |  |
| 3 | `@pCometId` | IN | int |  |
| 4 | `@pUserName` | IN | varchar(50) |  |
| 5 | `@pPassword` | IN | varchar(100) |  |
| 6 | `@pAttention` | IN | varchar(50) |  |
| 7 | `@pApproverId` | IN | int |  |
| 8 | `@pApprovalLevel` | IN | int |  |
| 9 | `@pNewRequisitionButton` | IN | int |  |
| 10 | `@pDistrictAcctgCode` | IN | varchar(50) |  |
| 11 | `@pShippingId` | IN | int |  |
| 12 | `@pSchoolId` | IN | int |  |
| 13 | `@pDistrictId` | IN | int |  |
| 14 | `@pBudgetAccountId` | IN | int |  |
| 15 | `@pAllocationAmount` | IN | varchar(50) |  |
| 16 | `@pUseAllocations` | IN | int |  |
| 17 | `@pUserAccountId` | IN | int |  |
| 18 | `@pBudgetId` | IN | int |  |
| 19 | `@pAction` | IN | int |  |
| 20 | `@pAllowIncidentals` | IN | tinyint |  |
| 21 | `@pAllowVendorChanges` | IN | tinyint |  |
| 22 | `@pAllowShipToChanges` | IN | tinyint |  |
| 23 | `@pAllowTM` | IN | tinyint |  |
| 24 | `@pAllowMSRP` | IN | tinyint |  |
| 25 | `@pEMail` | IN | varchar(255) |  |
| 26 | `@pUseNewSys` | IN | int |  |
| 27 | `@pAllowAddenda` | IN | int |  |
| 28 | `@pIBTypeId` | IN | int |  |
| 29 | `@pHasAdminAccess` | IN | tinyint |  |
| 30 | `@pAllowAccountCodeMgmt` | IN | int |  |
| 31 | `@pAllowEarlyAccess` | IN | int |  |
| 32 | `@pAllowPOAccess` | IN | int |  |
| 33 | `@pAllowVendorCodeMaint` | IN | tinyint |  |
| 34 | `@pNotificationType` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BudgetAccounts` | USER_TABLE |  |
| `DebugMsgs` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |
| `Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE        procedure [dbo].[sp_CCUserGridMaint] @pUserId int, @pActive int, @pCometId int, @pUserName varchar(50), 
                                                  @pPassword varchar(100), @pAttention varchar(50), @pApproverId int, 
                                                  @pApprovalLevel int, @pNewRequisitionButton int, @pDistrictAcctgCode varchar(50), 
                                                  @pShippingId int, @pSchoolId int, @pDistrictId int, @pBudgetAccountId int, 
                                                  @pAllocationAmount varchar(50), @pUseAllocations int, @pUserAccountId int, 
                                                  @pBudgetId int, @pAction int, @pAllowIncidentals tinyint, 
                                                  @pAllowVendorChanges tinyint, @pAllowShipToChanges tinyint, @pAllowTM tinyint, 
                                                  @pAllowMSRP tinyint, @pEMail varchar(255), @pUseNewSys int, 
                                                  @pAllowAddenda int, @pIBTypeId int, @pHasAdminAccess tinyint, 
                                                  @pAllowAccountCodeMgmt int, @pAllowEarlyAccess int, @pAllowPOAccess int, @pAllowVendorCodeMaint tinyint, @pNotificationType int as
declare @UserAccountId int,
	@AccountId int,
	@UserId int,
	@AllocationAmount money,
	@LinkCount int,
	@ExistingCometId int

set nocount on
insert DebugMsgs (Msg)
  values(left('@UserId=' + isnull(CAST(@pUserId as varchar(50)),'<null>') + 
         ' Active=' + isnull(CAST(@pActive as varchar(50)),'<null>') +
         ' CometId=' + isnull(CAST(@pCometId as varchar(50)),'<null>') +
         ' UserName=' + isnull(CAST(@pUserName as varchar(50)),'<null>') +
         ' Password=' + isnull(CAST(@pPassword as varchar(100)),'<null>') +
         ' Attention=' + isnull(CAST(@pAttention as varchar(50)),'<null>') +
         ' ApproverId=' + isnull(CAST(@pApproverId as varchar(50)),'<null>') +
         ' ApprovalLevel=' + isnull(CAST(@pApprovalLevel as varchar(50)),'<null>') +
         ' NewReqButton=' + isnull(CAST(@pNewRequisitionButton as varchar(50)),'<null>') +
         ' DistrictAcctCode=' + isnull(CAST(@pDistrictAcctgCode as varchar(50)),'<null>') +
         ' ShippingId=' + isnull(CAST(@pShippingId as varchar(50)),'<null>') +
         ' SchoolId=' + isnull(CAST(@pSchoolId as varchar(50)),'<null>') +
         ' DistrictId=' + isnull(CAST(@pDistrictId as varchar(50)),'<null>') +
         ' BudgetAccountId=' + isnull(CAST(@pBudgetAccountId as varchar(50)),'<null>') +
         ' AllocationAmount=' + isnull(CAST(@pAllocationAmount as varchar(50)),'<null>') +
         ' UseAllocations=' + isnull(CAST(@pUseAllocations as varchar(50)),'<null>') +
         ' UserAccountId=' + isnull(CAST(@pUserAccountId as varchar(50)),'<null>') +
         ' BudgetId=' + isnull(CAST(@pBudgetId as varchar(50)),'<null>') +
         ' AllowIncidentals=' + isnull(CAST(@pAllowIncidentals as varchar(50)),'<null>') +
         ' AllowVendorChanges=' + isnull(CAST(@pAllowVendorChanges as varchar(50)),'<null>') +
         ' AllowShipToChanges=' + isnull(CAST(@pAllowShipToChanges as varchar(50)),'<null>') +
         ' AllowTM=' + isnull(CAST(@pAllowTM as varchar(50)),'<null>') +
         ' AllowMSRP=' + isnull(CAST(@pAllowMSRP as varchar(50)),'<null>') +
         ' Email=' + isnull(CAST(@pEmail as varchar(50)),'<null>') +
         ' UseNewSys=' + isnull(CAST(@pUseNewSys as varchar(50)),'<null>') +
         ' AllowAddenda=' + isnull(CAST(@pAllowAddenda as varchar(50)),'<null>') +
         ' IBTypeId=' + isnull(CAST(@pIBTypeId as varchar(50)),'<null>') +
         ' HasAdminAccess=' + isnull(CAST(@pHasAdminAccess as varchar(50)),'<null>') +
         ' AllowAccountCodeMgmt=' + isnull(CAST(@pAllowAccountCodeMgmt as varchar(50)),'<null>') +
         ' AllowEarlyAccess=' + isnull(cast(@pAllowEarlyAccess as varchar(50)),'<null>') +
		 ' AllowPOAccess=' + isnull(cast(@pAllowPOAccess as varchar(50)),'<null>') +
		 ' AllowVendorCodeMaint=' + isnull(cast(@pAllowVendorCodeMaint as varchar(50)),'<null>') +
		 ' Notificationtype=' + isnull(cast(@pNotificationType as varchar(50)),'<null>') +
		 ' Action=' + isnull(cast(@pAction as varchar(50)),'<null>'),1024))
         
select @AllocationAmount = case isnumeric(@pAllocationAmount) when 0 then null else convert(money,@pAllocationAmount) end

if @pAction = 1 
begin
  if @pActive = 0 and @pCometId is null and @pUserName is null and @pPassword is null and @pAttention is null
  begin
    -- Do Nothing
	select @UserId = null, @UserAccountId = null, @AccountId = null
  end
  else-- Insert
    if @pActive = 1 and isnull(trim(@pAttention),'') = ''
	begin
	  RaisError('Attention field cannot be Blank.',16,1);
	end
	else
	begin
	  insert Users (DistrictId, SchoolId, ShippingId, Active, UserName, Attention, ApprovalLevel, CometId, DistrictAcctgCode, ApproverId, NewRequisitionButton, AllowIncidentals, AllowVendorChanges, AllowShipToChanges, AllowTM, AllowMSRP, Email, UseCF, AllowAddenda, IBTypeId, HasAdminAccess, AllowAccountCodeMgmt, AllowEarlyAccess, POAccess, AllowVendorCodeMaintenance, NotificationType)
		values (@pDistrictId, @pSchoolId, @pShippingId, @pActive, rtrim(@pUserName), rtrim(@pAttention), @pApprovalLevel, @pCometId, rtrim(@pDistrictAcctgCode), @pApproverId, @pNewRequisitionButton, @pAllowIncidentals, @pAllowVendorChanges, @pAllowShipToChanges, @pAllowTM, @pAllowMSRP, @pEMail, @pUseNewSys, @pAllowAddenda, @pIBTypeId, @pHasAdminAccess, @pAllowAccountCodeMgmt, @pAllowEarlyAccess, @pAllowPOAccess, @pAllowVendorCodeMaint, @pNotificationType)

	  select @UserId = SCOPE_IDENTITY()

	  if isnull(@pBudgetAccountId,0) != 0 and isnull(@pBudgetAccountId,0) != -1
	  begin
		select @AccountId = AccountId
		  from BudgetAccounts
		 where BudgetAccountId = @pBudgetAccountId

		insert UserAccounts (Active, AccountId, BudgetId, BudgetAccountId, UserId, AllocationAmount, UseAllocations)
		  values (1, @AccountId, @pBudgetId, @pBudgetAccountId, @UserId, @AllocationAmount, @pUseAllocations)

		select @UserAccountId = SCOPE_IDENTITY()
	  end
	end
end
else
if @pAction = 2 -- Update
begin
  select @ExistingCometId = CometId
    from Users
   where UserId = @pUserId

  if @@ROWCOUNT < 1 or @ExistingCometId != @pCometId
  begin
	  RaisError('You cannot change a User''s Number after it has been created.',16,1);
  end
  else
  begin
	  Update Users
		 set ShippingId = @pShippingId,
			 Active = @pActive,
			 UserName = rtrim(@pUserName),
--			 Password = rtrim(@pPassword),
			 Attention = rtrim(@pAttention),
			 ApprovalLevel = @pApprovalLevel,
			 CometId = @pCometId,
			 DistrictAcctgCode = rtrim(@pDistrictAcctgCode),
			 ApproverId = @pApproverId,
			 NewRequisitionButton = @pNewRequisitionButton,
			 AllowIncidentals = @pAllowIncidentals,
			 AllowVendorChanges = @pAllowVendorChanges,
			 AllowShipToChanges = @pAllowShipToChanges,
			 AllowTM = @pAllowTM,
			 AllowMSRP = @pAllowMSRP,
			 Email = @pEMail,
			 UseCF = @pUseNewSys,
			 AllowAddenda = @pAllowAddenda,
			 IBTypeId = @pIBTypeId,
			 HasAdminAccess = @pHasAdminAccess,
			 AllowAccountCodeMgmt = @pAllowAccountCodeMgmt,
			 AllowEarlyAccess = @pAllowEarlyAccess,
			 POAccess = @pAllowPOAccess,
			 AllowVendorCodeMaintenance = @pAllowVendorCodeMaint,
			 NotificationType = @pNotificationType
	   where UserId = @pUserId

	  if isnull(@pBudgetAccountId,0) != 0 and isnull(@pBudgetAccountId,0) != -1
	  begin
		select @AccountId = AccountId
		  from BudgetAccounts
		 where BudgetAccountId = @pBudgetAccountId

		select @UserAccountId = UserAccountId
		  from UserAccounts
		 where UserId = @pUserId
		   and AccountId = @AccountId
		   and BudgetId = @pBudgetId

		if @@rowcount = 0 -- No User Account with this Id Active or Inactive
		begin
		  if isnull(@pUserAccountId,0) = 0 -- No Prior User Account
		  begin
			-- Create New User Account Record
			insert UserAccounts (Active, AccountId, BudgetId, BudgetAccountId, UserId, AllocationAmount, UseAllocations)
			  values (1, @AccountId, @pBudgetId, @pBudgetAccountId, @pUserId, @AllocationAmount, @pUseAllocations)

			select @UserAccountId = SCOPE_IDENTITY()
		  end
		  else
		  begin
			-- Update User Account record to Point to New Account Code
			Update UserAccounts
			   set Active = 1,
				   BudgetAccountId = @pBudgetAccountId,
				   AccountId = @AccountId,
				   AllocationAmount = @AllocationAmount,
				   UseAllocations = @pUseAllocations
			 where UserAccountId = @pUserAccountId
		  end
		end
		else
		-- Prior User Account
		begin
		  if isnull(@pUserAccountId,0) = 0 -- No User Account Record Assigned
		  begin
			Update UserAccounts
			   set Active = 1,
				   AllocationAmount = @AllocationAmount,
				   UseAllocations = @pUseAllocations
			 where UserAccountId = @UserAccountId
		  end
		  else
		  begin
			-- Update User Account record to Point to New Account Code
			Update UserAccounts
			   set Active = 1,
				   BudgetAccountId = @pBudgetAccountId,
				   AccountId = @AccountId,
				   AllocationAmount = @AllocationAmount,
				   UseAllocations = @pUseAllocations
			 where UserAccountId = @pUserAccountId
		  end
		end
	  end
  end
end
else
if @pAction = 3 -- Delete
begin
  select @LinkCount = count(*)
    from Requisitions
   where UserId = @pUserId

  select @LinkCount = @LinkCount + count(*)
    from UserAccounts
   where UserId = @pUserId

  if @LinkCount > 0
  begin
    Update Users
       set ShippingId = @pShippingId,
           Active = 0,
           UserName = rtrim(@pUserName),
--           Password = rtrim(@pPassword),
           Attention = rtrim(@pAttention),
           ApprovalLevel = @pApprovalLevel,
           CometId = @pCometId,
           DistrictAcctgCode = rtrim(@pDistrictAcctgCode),
           ApproverId = @pApproverId,
           NewRequisitionButton = @pNewRequisitionButton,
           AllowIncidentals = @pAllowIncidentals,
           AllowVendorChanges = @pAllowVendorChanges,
           AllowShipToChanges = @pAllowShipToChanges,
           AllowTM = @pAllowTM,
           AllowMSRP = @pAllowMSRP,
           Email = @pEMail,
           UseCF = @pUseNewSys,
           AllowAddenda = @pAllowAddenda,
           IBTypeId = @pIBTypeId,
           HasAdminAccess = @pHasAdminAccess,
           AllowAccountCodeMgmt = @pAllowAccountCodeMgmt,
           AllowEarlyAccess = @pAllowEarlyAccess,
		   POAccess = @pAllowPOAccess,
		   AllowVendorCodeMaintenance = @pAllowVendorCodeMaint,
		   NotificationType = @pNotificationType
     where UserId = @pUserId
  end
  else
  begin
    Delete Users
     where UserId = @pUserId
  end
end
set nocount off
```
