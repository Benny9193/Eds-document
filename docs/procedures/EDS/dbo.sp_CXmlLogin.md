# Procedure: `dbo.sp_CXmlLogin`

_Generated on 2026-05-04T13:04:00.359Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CXmlLogin` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2008-01-23 12:43:15 |
| Modified | 2024-10-18 06:40:48 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pDistrict` | IN | varchar(50) |  |
| 2 | `@pUserNumber` | IN | varchar(50) |  |
| 3 | `@pUserName` | IN | varchar(50) |  |
| 4 | `@pPassword` | IN | varchar(50) |  |
| 5 | `@pBuyerReqCode` | IN | varchar(50) |  |
| 6 | `@pBuyerUserName` | IN | varchar(50) |  |
| 7 | `@pBuyerUserNumber` | IN | varchar(50) |  |
| 8 | `@pBuyerPassword` | IN | varchar(50) |  |
| 9 | `@pBuyerAccountCode` | IN | varchar(50) |  |
| 10 | `@pBuyerBudgetYear` | IN | varchar(50) |  |
| 11 | `@pOrigReqId` | IN | varchar(50) |  |
| 12 | `@pPayloadId` | IN | varchar(255) |  |
| 13 | `@pFromDomain` | IN | varchar(255) |  |
| 14 | `@pFromIdentity` | IN | varchar(255) |  |
| 15 | `@pToDomain` | IN | varchar(255) |  |
| 16 | `@pToIdentity` | IN | varchar(255) |  |
| 17 | `@pSenderDomain` | IN | varchar(255) |  |
| 18 | `@pSenderIdentity` | IN | varchar(255) |  |
| 19 | `@pBuyerCookie` | IN | varchar(255) |  |
| 20 | `@pBrowserFormPost` | IN | varchar(255) |  |
| 21 | `@pFromUserAgent` | IN | varchar(255) |  |
| 22 | `@pCategoryId` | IN | varchar(50) |  |
| 23 | `@pMode` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |
| `BudgetAccounts` | USER_TABLE |  |
| `Budgets` | USER_TABLE |  |
| `Category` | USER_TABLE |  |
| `CXmlSession` | USER_TABLE |  |
| `DebugMsgs` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `PO` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `sp_NewRequisitionId` | unresolved |  |
| `UserAccounts` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `dbo.uf_EncryptPassword` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_NextCometId` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_RemoveTrailingCRs` | SQL_SCALAR_FUNCTION |  |
| `dbo.uf_RequisitionIsVisible` | SQL_SCALAR_FUNCTION |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
--exec sp_CXmlLogin '!~','91825','91825','91825','JBARTH','John A. Barth','','','A','2009','','2009-03-17T13:44:14','NetworkId','testing','DUNS','testing','NetworkId','testing','2009-03-17T13:44:14','http://webdev.wincapweb.com/wincapdotcom_staging/ordering/postXML.ashx?key=123456-13-889-2009-03-17-13:44:14', '','4','1'

CREATE           procedure [dbo].[sp_CXmlLogin]
@pDistrict varchar(50),
@pUserNumber varchar(50),
@pUserName varchar(50),
@pPassword varchar(50),
@pBuyerReqCode varchar(50),
@pBuyerUserName varchar(50),
@pBuyerUserNumber varchar(50),
@pBuyerPassword varchar(50),
@pBuyerAccountCode varchar(50),
@pBuyerBudgetYear varchar(50),
@pOrigReqId varchar(50),
@pPayloadId varchar(255),
@pFromDomain varchar(255),
@pFromIdentity varchar(255),
@pToDomain varchar(255),
@pToIdentity varchar(255),
@pSenderDomain varchar(255),
@pSenderIdentity varchar(255),
@pBuyerCookie varchar(255),
@pBrowserFormPost varchar(255),
@pFromUserAgent varchar(255),
@pCategoryId varchar(50),
@pMode int as

declare	@rSessionId int,
	@rRequisitionId int,
	@rMode int,
	@ReqCount int,
	@rStatusMsg varchar(4096),
	@AccountCode varchar(50)

declare @lPWCheck int,
	@lUserId int,
	@lCometId int,
	@lDistrictId int,
	@lCategoryId int,
	@lReqCategoryId int,
	@lBudgetId int,
	@lAccountId int,
	@lBudgetAccountId int,
	@lUserAccountId int,
	@lSchoolId int,
	@lShippingId int,
	@lBudgetCount int

set nocount on

SELECT @lPWCheck = 1 
  FROM Users 
  join District on District.DistrictId = Users.DistrictId 
               and District.DistrictCode = @pDistrict
               and District.Active = 1
 WHERE Users.CometId = @pUserNumber 
   and Users.UserName = @pUserName 
   AND	(dbo.Users.Password = dbo.uf_EncryptPassword(@pPassword) OR dbo.Users.Password = @pPassword)
   and Users.Active = 1

if @@rowcount = 0 or
   isnull(@lPWCheck,0) != 1
begin
  insert DebugMsgs (Msg) 
    values ('Login Bad - District=''' + isnull(@pDistrict,'') + ''' UserNumber=''' + isnull(@pUserNumber,'') + ''' UserName=''' + isnull(@pUserName,'') + ''' Password=''' + isnull(@pPassword,'') + '''')
  select @rSessionId = null,
         @rRequisitionId = null,
         @rStatusMsg = 'Invalid Login or Lacking Authorization'
    select @rSessionId as [@rSessionId], @rRequisitionId as [@rRequisitionId], @rStatusMsg as [@rStatusMsg], @rMode as [@rMode]
  return
end

insert DebugMsgs (Msg) 
  values ('Login OK - District=''' + isnull(@pDistrict,'') + ''' UserNumber=''' + isnull(@pUserNumber,'') + ''' UserName=''' + isnull(@pUserName,'') + ''' Password=''' + isnull(@pPassword,'') + '''')

select @lCategoryId = CategoryId
  from Category
 where Category.CategoryId = case when isnumeric(@pCategoryId) = 1 then cast(@pCategoryId as int) else 0 end
   and Category.Active = 1

if @@rowcount = 0 or
   isnull(@lCategoryId,0) = 0
begin
  insert DebugMsgs (Msg) 
    values ('Passed Category Bad, CategoryId=''' + isnull(@pCategoryId,'') + '''')
  select @rSessionId = null,
         @rRequisitionId = null,
         @rStatusMsg = 'Invalid Passed Category'
    select @rSessionId as [@rSessionId], @rRequisitionId as [@rRequisitionId], @rStatusMsg as [@rStatusMsg], @rMode as [@rMode]
  return
end

select @lDistrictId = DistrictId
  from District
 where District.DistrictCode = @pDistrict
   and District.Active = 1

if @@rowcount = 0 or
   isnull(@lDistrictId,0) = 0
begin
  insert DebugMsgs (Msg) 
    values ('District Bad')
  select @rSessionId = null,
         @rRequisitionId = null,
         @rStatusMsg = 'District determined to be invalid'
    select @rSessionId as [@rSessionId], @rRequisitionId as [@rRequisitionId], @rStatusMsg as [@rStatusMsg], @rMode as [@rMode]
  return
end

if isnull(dbo.uf_RemoveTrailingCRs(@pOrigReqId),'') != '' and ISNUMERIC(dbo.uf_RemoveTrailingCRs(@pOrigReqId)) = 1 
begin
	if cast(dbo.uf_RemoveTrailingCRs(@pOrigReqId) as int) > 0
	begin
	  select @lReqCategoryId = CategoryId,
			 @lSchoolId = SchoolId
		from Requisitions
	   where Requisitions.RequisitionId = isnull(cast(dbo.uf_RemoveTrailingCRs(@pOrigReqId) as int),0)

	  if @@rowcount = 0 or
		 isnull(@lReqCategoryId,0) != @lCategoryId
	  begin
		insert DebugMsgs (Msg) 
		  values ('Original Requisition Bad, RequisitionId=''' + isnull(cast(dbo.uf_RemoveTrailingCRs(@pOrigReqId) as varchar),'') + '''')
		select @rSessionId = null,
			   @rRequisitionId = null,
			   @rStatusMsg = 'Parent Requisition invalid'
		select @rSessionId as [@rSessionId], @rRequisitionId as [@rRequisitionId], @rStatusMsg as [@rStatusMsg], @rMode as [@rMode]
		return
	  end
	end
end
else
begin
	insert DebugMsgs (Msg) 
	  values ('Blank or Invalid OriginalReqId, OrigReqId=>' + ISNULL(@pOrigReqId,'null') + '<')
end

-- Check for School
if isnull(@lSchoolId,0) = 0
begin
  select top 1 @lSchoolId = School.SchoolId,
               @lShippingId = School.ShippingId
    from School
    join Users on Users.SchoolId = School.SchoolId
              and Users.Active = 1
   where School.DistrictId = @lDistrictId
     and School.Active = 1
   order by Users.ApprovalLevel desc, Users.ApproverId, School.SchoolId
end

-- Get ShippingId
if isnull(@lShippingId,0) = 0 
begin
  select @lShippingId = ShippingId
    from School
   where SchoolId = @lSchoolId
end

select top 1 @lUserId = Users.UserId,
             @lSchoolId = Users.SchoolId,
             @lShippingId = Users.ShippingId
  from Users
  join District on District.DistrictId = Users.DistrictId 
               and District.DistrictId = @lDistrictId
 where Users.DistrictAcctgCode = dbo.uf_RemoveTrailingCRs(@pBuyerReqCode)
   and Users.Active = 1
 order by Users.UserId

-- Check for User Not Found
if @@rowcount = 0
begin
	if @pDistrict = '!~'
	begin
		  if isnull(dbo.uf_RemoveTrailingCRs(@pBuyerUserNumber),'') = ''
		  begin
			--Locate Next Available User Number for District
			select @lCometId = dbo.uf_NextCometId(@lDistrictId, 10000)

		  end
		  else
		  begin
			select @lCometId = CAST(@pBuyerUserNumber as int)
		  end
		  INSERT INTO Users([DistrictId], [SchoolId], [ShippingId], [Active], [UserName], [Password], [Attention], [ApprovalLevel], [CometId], [DisableNewRequisition], [DistrictAcctgCode], [ApproverId], [NewRequisitionButton], [AllowIncidentals], [AllowVendorChanges], UseCF)
			values (@lDistrictId, @lSchoolId, @lShippingId, 1, right('00000' + cast(@lCometId as varchar(10)),5), right('00000' + cast(@lCometId as varchar(10)),5), @pBuyerUserName, 0, @lCometId, null, @pBuyerReqCode, null, 1, 0, 0, 1)

		  select @lUserId = scope_identity()
	end
	else
	begin
		-- Reject Unknown Users --
		  insert DebugMsgs (Msg) 
			values ('Passed User Bad, User=''' + isnull(@pBuyerUserNumber,'') + '''')
		  select @rSessionId = null,
				 @rRequisitionId = null,
				 @rStatusMsg = 'Invalid Passed User'
			select @rSessionId as [@rSessionId], @rRequisitionId as [@rRequisitionId], @rStatusMsg as [@rStatusMsg], @rMode as [@rMode]
		  return
	end
/* Auto Add Code Disabled DCH 4/28/2014 - to Solve Pine Bush problem
  if isnull(dbo.uf_RemoveTrailingCRs(@pBuyerUserNumber),'') = ''
  begin
    --Locate Next Available User Number for District
    select @lCometId = dbo.uf_NextCometId(@lDistrictId, 10000)

  end
  else
  begin
    select @lCometId = CAST(@pBuyerUserNumber as int)
  end
  INSERT INTO Users([DistrictId], [SchoolId], [ShippingId], [Active], [UserName], [Password], [Attention], [ApprovalLevel], [CometId], [DisableNewRequisition], [DistrictAcctgCode], [ApproverId], [NewRequisitionButton], [AllowIncidentals], [AllowVendorChanges], UseCF)
    values (@lDistrictId, @lSchoolId, @lShippingId, 1, right('00000' + cast(@lCometId as varchar(10)),5), right('00000' + cast(@lCometId as varchar(10)),5), @pBuyerUserName, 0, @lCometId, null, @pBuyerReqCode, null, 1, 0, 0, 1)

  select @lUserId = scope_identity()
*/
end

--Get Budget Selected
select @lBudgetId = BudgetId
  from Budgets
 where substring(Budgets.Name,1,4) = @pBuyerBudgetYear
   and Budgets.Active = 1
   and Budgets.DistrictId = @lDistrictId
   and GETDATE() between Budgets.EditFrom and Budgets.EditUntil

if @@ROWCOUNT = 0
begin
  select @lBudgetCount = COUNT(*)
    from Budgets
   where Budgets.DistrictId = @lDistrictId
     and Budgets.Active = 1
     and GETDATE() between Budgets.EditFrom and Budgets.EditUntil
  
  if @lBudgetCount = 1
  begin
	select @lBudgetId = BudgetId
	  from Budgets
     where Budgets.DistrictId = @lDistrictId
	   and Budgets.Active = 1
	   and GETDATE() between Budgets.EditFrom and Budgets.EditUntil
  end
end

if isnull(rtrim(@pBuyerAccountCode),'') != ''
begin
  -- Locate Account
  select top 1 @lAccountId = Accounts.AccountId
    from Accounts
   where Accounts.DistrictId = @lDistrictId
     and Accounts.Code = rtrim(ltrim(@pBuyerAccountCode))
     and Accounts.Active = 1

  if @@rowcount = 0
  begin
    --Check for Inactive Account
    select top 1 @lAccountId = Accounts.AccountId
      from Accounts
     where Accounts.DistrictId = @lDistrictId
       and Accounts.Code = rtrim(ltrim(@pBuyerAccountCode))
       and isnull(Accounts.Active,0) = 0

    if @@rowcount = 0
    begin
      insert Accounts (Active, DistrictId, SchoolId, Code)
        values (1, @lDistrictId, @lSchoolId, rtrim(ltrim(@pBuyerAccountCode)))

      select @lAccountId = scope_identity()
    end
    else
    begin
      --Deactivate any references to this account
      Update BudgetAccounts
         set Active = 0
       where AccountId = @lAccountId
         and Active = 1

      Update UserAccounts
         set Active = 0
       where AccountId = @lAccountId
         and Active = 1

      -- Mark Account Active
      Update Accounts
         set Active = 1
       where AccountId = @lAccountId
    end
  end

  --Locate BudgetAccount
  select top 1 @lBudgetAccountId = BudgetAccounts.BudgetAccountId
    from BudgetAccounts
   where BudgetAccounts.BudgetId = @lBudgetId
     and BudgetAccounts.AccountId = @lAccountId
     and BudgetAccounts.Active = 1

  if @@rowcount = 0
  begin
    select top 1 @lBudgetAccountId = BudgetAccounts.BudgetAccountId
      from BudgetAccounts
     where BudgetAccounts.BudgetId = @lBudgetId
       and BudgetAccounts.AccountId = @lAccountId
       and isnull(BudgetAccounts.Active,0) = 0

    if @@rowcount = 0
    begin
      insert BudgetAccounts (Active, BudgetId, AccountId)
        values (1, @lBudgetId, @lAccountId)

      select @lBudgetAccountId = scope_identity()
    end
    else
    begin
      -- Mark Any References Inactive
      Update UserAccounts
         set Active = 0
       where UserAccounts.BudgetAccountId = @lBudgetAccountId
         and Active = 1

      --Mark this Entry Active
      Update BudgetAccounts
         set Active = 1
       where BudgetAccounts.BudgetAccountId = @lBudgetAccountId
    end
  end

  --Locate User Account
  select top 1 @lUserAccountId = UserAccounts.UserAccountId
    from UserAccounts
   where UserAccounts.BudgetId = @lBudgetId
     and UserAccounts.AccountId = @lAccountId
     and UserAccounts.BudgetAccountId = @lBudgetAccountId
     and UserAccounts.UserId = @lUserId
     and UserAccounts.Active = 1

  if @@rowcount = 0
  begin
    select top 1 @lUserAccountId = UserAccounts.UserAccountId
      from UserAccounts
     where UserAccounts.BudgetId = @lBudgetId
       and UserAccounts.AccountId = @lAccountId
       and UserAccounts.BudgetAccountId = @lBudgetAccountId
       and UserAccounts.UserId = @lUserId
       and isnull(UserAccounts.Active,0) = 0

    if @@rowcount = 0
    begin
      insert UserAccounts (Active, AccountId, BudgetId, BudgetAccountId, UserId)
        values (1, @lAccountId, @lBudgetId, @lBudgetAccountId, @lUserId)

      select @lUserAccountId = scope_identity()
    end
    else
    begin
      --Mark Entry Active
      Update UserAccounts
         set Active = 1
       where UserAccounts.UserAccountId = @lUserAccountId
    end
  end
end

--Create New Session
INSERT INTO SessionTable([DistrictId], [SchoolId], [UserId], [BudgetId], [SessionStart], [SessionLast], [ApprovalLevel], [Attention], [CurrentBudgetId], [NextBudgetId], [AllowIncidentals])
select top 1 @lDistrictId, @lSchoolId, @lUserId, @lBudgetId, getdate(), getdate(), Users.ApprovalLevel, Users.Attention, @lBudgetId, @lBudgetId, Users.AllowIncidentals
  from Users
 where UserId = @lUserId

select @rSessionId = scope_Identity()

select @AccountCode = isnull(Accounts.Code,'')
  from Accounts
 where Accounts.AccountId = @lAccountId

INSERT INTO [CXmlSession]([SessionId], [OrigReqId], [payloadId], [buyerCookie], [BrowserFormPost], [fromDomain], [fromIdentity], [toDomain], [toIdentity], [senderDomain], [senderIdentity], [fromUserAgent], CategoryId, Mode, BudgetId, BudgetAccountId, UserAccountId, AccountCode)
VALUES(@rSessionId, @pOrigReqId, @pPayloadId, @pBuyerCookie, @pBrowserFormPost, @pFromDomain, @pFromIdentity, @pToDomain, @pToIdentity, @pSenderDomain, @pSenderIdentity, @pFromUserAgent, @pCategoryId, @pMode, @lBudgetId, @lBudgetAccountId, @lUserAccountId, @AccountCode )

if @@rowcount > 0
begin
  if isnull(@pMode,0) = 1
  begin
    -- Create New Requisition
    exec sp_NewRequisitionId @lDistrictId, @lSchoolId, @lBudgetId, @lUserId, @rRequisitionId out

    if isnull(@rRequisitionId,0) > 0
    begin
      -- Update Header Info
      Update Requisitions
         set CategoryId = @lCategoryId,
             BudgetId = @lBudgetId,
             BudgetAccountId = case isnull(@lBudgetAccountId,0) when 0 then BudgetAccountId else @lBudgetAccountId end,
             UserAccountId = case isnull(@lUserAccountId,0) when 0 then UserAccountId else @lUserAccountId end,
             AccountCode = case isnull(@lUserAccountId,0) when 0 then (select top 1 Code from Accounts where AccountId = @lAccountId) else (select top 1 Code from UserAccounts join Accounts on Accounts.AccountId = UserAccounts.AccountId where UserAccounts.UserAccountId = @lUserAccountId) end
       where Requisitions.RequisitionId = @rRequisitionId

      Update CxmlSession
         set RequisitionId = @rRequisitionId
       where SessionId = @rSessionId
    end
  end
end

SELECT @ReqCount = count(*)
  FROM Requisitions with (nolock)
  LEFT OUTER JOIN SessionTable on SessionTable.UserId = Requisitions.UserId
 WHERE SessionTable.SessionId = @rSessionId
   AND Requisitions.BudgetId = SessionTable.BudgetId
   and dbo.uf_RequisitionIsVisible(SessionTable.SessionId, Requisitions.RequisitionId) = 1
   and case when Requisitions.DateExported is not null then 1 else (select top 1 PO.POId from PO with (Nolock) where PO.RequisitionId = Requisitions.RequisitionId) end is null

if @pMode = 2
begin
  select @rMode = 2
end
else
if isnull(@ReqCount,0) > 0 and @@rowcount > 0
begin
  select @rMode = 2
end
else
begin
  select @rMode = 1
end

insert DebugMsgs (Msg) 
  values ('Login Successful, SessionId=''' + isnull(cast(@rSessionId as varchar(50)),'null') + ''', RequisitionId=''' + isnull(cast(@rRequisitionId as varchar(50)),'null') + '''')

set nocount off

select cast(@rSessionId as int) as [@rSessionId], cast(@rRequisitionId as int) as [@rRequisitionId], cast('Authorization OK' as varchar(50)) as [@rStatusMsg], cast(@rMode as int) as [@rMode]

return
```
