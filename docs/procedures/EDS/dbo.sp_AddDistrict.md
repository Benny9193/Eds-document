# Procedure: `dbo.sp_AddDistrict`

_Generated on 2026-05-04T14:49:07.198Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_AddDistrict` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2001-10-08 22:30:33 |
| Modified | 2022-07-21 13:12:26 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pDistrictId` | IN | int |  |
| 3 | `@pDistrictCode` | IN | varchar(255) |  |
| 4 | `@pDistrictName` | IN | varchar(50) |  |
| 5 | `@pDistrictAddr1` | IN | varchar(255) |  |
| 6 | `@pDistrictAddr2` | IN | varchar(255) |  |
| 7 | `@pDistrictAddr3` | IN | varchar(255) |  |
| 8 | `@pDistrictCity` | IN | varchar(255) |  |
| 9 | `@pDistrictState` | IN | varchar(255) |  |
| 10 | `@pDistrictZip` | IN | varchar(255) |  |
| 11 | `@pPhoneNumber` | IN | varchar(255) |  |
| 12 | `@pFax` | IN | varchar(255) |  |
| 13 | `@pEMail` | IN | varchar(255) |  |
| 14 | `@pNextCometId` | IN | int |  |
| 15 | `@pApprovalLevel` | IN | int |  |
| 16 | `@pBAName` | IN | varchar(255) |  |
| 17 | `@pUseGrossPrices` | IN | tinyint |  |
| 18 | `@pPOLayoutId` | IN | int |  |
| 19 | `@pAccountingFormatId` | IN | int |  |
| 20 | `@pTextbookPercentage` | IN | varchar(255) |  |
| 21 | `@rDistrictId` | INOUT | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Budgets` | USER_TABLE |  |
| `CSRep` | USER_TABLE |  |
| `District` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `sp_SetBudgetYear` | unresolved |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_AddDistrict] @pSessionId int, @pDistrictId int, @pDistrictCode varchar(255), @pDistrictName varchar(50), @pDistrictAddr1 varchar(255), @pDistrictAddr2 varchar(255), @pDistrictAddr3 varchar(255), @pDistrictCity varchar(255), @pDistrictState varchar(255), @pDistrictZip varchar(255), @pPhoneNumber varchar(255), @pFax varchar(255), @pEMail varchar(255), @pNextCometId int, @pApprovalLevel int, @pBAName varchar(255), @pUseGrossPrices tinyint, @pPOLayoutId int, @pAccountingFormatId int, @pTextbookPercentage varchar(255), @rDistrictId int output AS

declare @DistrictId int,
	@ShippingId int,
	@UserId int,
	@CSRepId int,
	@BudgetId int,
	@NextCometId int,
	@StartDate datetime,
	@EndDate datetime,
	@TextbookPercentage decimal(9,5)

if rtrim(@pTextbookPercentage) = ''
begin
  select @pTextbookPercentage = '0.0'
end

select @TextbookPercentage = convert(decimal(9,5),@pTextbookPercentage)

select @DistrictId = ISNULL(SessionTable.DistrictId,0),
       @UserId = ISNULL(SessionTable.UserId,0),
       @CSRepId = ISNULL(CSRep.CSRepId,0)
  from SessionTable
  full join CSRep on CSRep.UserId = SessionTable.UserId
 where SessionTable.SessionId = @pSessionId

if ISNULL(@pNextCometId,0) = 0
begin
  select @NextCometId = 1
end
else
begin
  select @NextCometId = @pNextCometId
end

if ISNULL(@pDistrictId,0) = 0
begin
  -- Check for District Letters being in Use
  select DistrictId
    from District
   where DistrictCode = @pDistrictCode

  if @@rowcount > 0
  begin
    select @pDistrictCode = null
  end

  insert District (Active, DistrictCode, [Name], Address1, Address2, Address3, City, State, Zipcode, CSRepId, PhoneNumber, Fax, EMail, NextCometId, RequiredApprovalLevel, BAName, UseGrossPrices, POLayoutId, AccountingFormatId)
    values (1, rtrim(@pDistrictCode), rtrim(@pDistrictName), rtrim(@pDistrictAddr1), rtrim(@pDistrictAddr2), rtrim(@pDistrictAddr3), rtrim(@pDistrictCity), rtrim(@pDistrictState), rtrim(@pDistrictZip), @CSRepId, rtrim(@pPhoneNumber), rtrim(@pFax), rtrim(@pEMail), @NextCometId, @pApprovalLevel, @pBAName, @pUseGrossPrices, @pPOLayoutId, @pAccountingFormatId)

  -- Get New District Id
  select @DistrictId = Scope_Identity() --DCH 11/24/2015 @@IDENTITY

  -- Create Beginning Budget
  -- Find Beginning of Year
  if month(getdate()) > 7
  begin
    select @StartDate = convert(datetime,'07/01/' + convert(varchar(4),year(getdate())))
  end
  else
  begin
    select @StartDate = convert(datetime,'07/01/' + convert(varchar(4),year(getdate()) - 1))
  end
  select @EndDate = convert(datetime,'06/30/' + convert(varchar(4),year(@StartDate) + 1))

  insert Budgets (DistrictId, Active, [Name], StartDate, EndDate, VisibleFrom, VisibleUntil)
    values (@DistrictId, 1, convert(varchar(4),year(@StartDate)) + ' - ' + convert(varchar(4),year(@EndDate)), @StartDate, @EndDate, convert(datetime,'12/01/' + convert(char(4),year(@StartDate)-1)), convert(datetime,'12/01/' + convert(char(4),year(@EndDate)-1)))

  select @BudgetId = Scope_Identity() --DCH 11/24/2015 @@IDENTITY

  -- Set Dates to Next Year
  select @StartDate = convert(datetime,'07/01/' + convert(varchar(4),year(@StartDate) + 1))
  select @EndDate = convert(datetime,'06/30/' + convert(varchar(4),year(@StartDate) + 1))

  insert Budgets (DistrictId, Active, [Name], StartDate, EndDate, VisibleFrom, VisibleUntil)
    values (@DistrictId, 1, convert(varchar(4),year(@StartDate)) + ' - ' + convert(varchar(4),year(@EndDate)), @StartDate, @EndDate, convert(datetime,'12/01/' + convert(char(4),year(@StartDate)-1)), convert(datetime,'12/01/' + convert(char(4),year(@EndDate)-1)))
--  insert Budgets (DistrictId, Active, [Name], StartDate, EndDate)
--    values (@DistrictId, 1, convert(varchar(4),year(@StartDate)) + ' - ' + convert(varchar(4),year(@EndDate)) + ' Budget', @StartDate, @EndDate)

  select @BudgetId = Scope_Identity() --DCH 11/24/2015 @@IDENTITY

  -- Update Session Table
  Update SessionTable
     set DistrictId = @DistrictId,
	 SchoolId = null,
	 BudgetId = @BudgetId
   where SessionId = @pSessionId

  -- Set Dates to Next Year
  select @StartDate = convert(datetime,'07/01/' + convert(varchar(4),year(@StartDate) + 1))
  select @EndDate = convert(datetime,'06/30/' + convert(varchar(4),year(@StartDate) + 1))

  insert Budgets (DistrictId, Active, [Name], StartDate, EndDate, VisibleFrom, VisibleUntil)
    values (@DistrictId, 1, convert(varchar(4),year(@StartDate)) + ' - ' + convert(varchar(4),year(@EndDate)), @StartDate, @EndDate, convert(datetime,'12/01/' + convert(char(4),year(@StartDate)-1)), convert(datetime,'12/01/' + convert(char(4),year(@EndDate)-1)))

end
else
begin
  -- Set Return District Id
  select @DistrictId = @pDistrictId

  -- Check for District Letters being in Use
  select DistrictId
    from District
   where DistrictCode = @pDistrictCode
     and DistrictId != @DistrictId

  if @@rowcount > 0
  begin
    select @pDistrictCode = null
  end

  -- Check for District Being Deleted
  if rtrim(ISNULL(@pDistrictName,'')) = ''
  begin
    -- DeActivate District
    update District
       set Active = 0
     where DistrictId = @pDistrictId
  end
  else
  begin
    update District
       set DistrictCode = rtrim(@pDistrictCode),
           Name = rtrim(@pDistrictName),
	   Address1 = rtrim(@pDistrictAddr1),
	   Address2 = rtrim(@pDistrictAddr2),
	   Address3 = rtrim(@pDistrictAddr3),
	   City = rtrim(@pDistrictCity),
	   State = rtrim(@pDistrictState),
	   Zipcode = rtrim(@pDistrictZip),
	   PhoneNumber = rtrim(@pPhoneNumber),
	   Fax = rtrim(@pFax),
           EMail = rtrim(@pEMail),
           NextCometId = @pNextCometId,
	   RequiredApprovalLevel = @pApprovalLevel,
           BAName = @pBAName,
           UseGrossPrices = @pUseGrossPrices,
           POLayoutId = @pPOLayoutId,
           AccountingFormatId = @pAccountingFormatId,
           TextbookPercentage = @TextbookPercentage
    where DistrictId = @pDistrictId
  end

  -- Update Session Table
  Update SessionTable
     set DistrictId = @DistrictId
   where SessionId = @pSessionId
end

exec sp_SetBudgetYear @pSessionId

select @rDistrictId = ISNULL(@DistrictId,0)
```
