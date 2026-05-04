# Procedure: `dbo.sp_AddSchool`

_Generated on 2026-05-04T14:49:07.202Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_AddSchool` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2001-10-05 08:09:34 |
| Modified | 2015-11-24 23:37:30 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | int |  |
| 2 | `@pSchoolId` | IN | int |  |
| 3 | `@pSchoolName` | IN | varchar(50) |  |
| 4 | `@pSchoolAddr1` | IN | varchar(255) |  |
| 5 | `@pSchoolAddr2` | IN | varchar(255) |  |
| 6 | `@pSchoolAddr3` | IN | varchar(255) |  |
| 7 | `@pSchoolCity` | IN | varchar(255) |  |
| 8 | `@pSchoolState` | IN | varchar(255) |  |
| 9 | `@pSchoolZip` | IN | varchar(255) |  |
| 10 | `@pPhoneNumber` | IN | varchar(255) |  |
| 11 | `@pFax` | IN | varchar(255) |  |
| 12 | `@pEMail` | IN | varchar(255) |  |
| 13 | `@pLocationCode` | IN | varchar(255) |  |
| 14 | `@rSchoolId` | INOUT | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |
| `BudgetAccounts` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `ShipLocations` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |
| `Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_AddSchool] @pSessionId int, @pSchoolId int, @pSchoolName varchar(50), @pSchoolAddr1 varchar(255), @pSchoolAddr2 varchar(255), @pSchoolAddr3 varchar(255), @pSchoolCity varchar(255), @pSchoolState varchar(255), @pSchoolZip varchar(255), @pPhoneNumber varchar(255), @pFax varchar(255), @pEMail varchar(255), @pLocationCode varchar(255), @rSchoolId int output AS

declare @DistrictId int,
	@SchoolId int,
	@ShippingId int

select @DistrictId = ISNULL(DistrictId,0)
  from SessionTable
 where SessionId = @pSessionId

if ISNULL(@pSchoolId,0) = 0
begin
  insert ShipLocations (DistrictId, Active, Name, Address1, Address2, Address3, City, State, Zipcode, Phone, Fax, EMail, LocationCode)
    values (@DistrictId, 1, rtrim(@pSchoolName), rtrim(@pSchoolAddr1), rtrim(@pSchoolAddr2), rtrim(@pSchoolAddr3), rtrim(@pSchoolCity), rtrim(@pSchoolState), rtrim(@pSchoolZip), rtrim(@pPhoneNumber), rtrim(@pFax), rtrim(@pEmail), rtrim(@pLocationCode))

  select @ShippingId = Scope_Identity() --DCH 11/24/2015 @@IDENTITY

  insert School (DistrictId, Active, Name, Address1, Address2, Address3, City, State, Zipcode, PhoneNumber, Fax, EMail, ShippingId, LocationCode)
    values (@DistrictId, 1, rtrim(@pSchoolName), rtrim(@pSchoolAddr1), rtrim(@pSchoolAddr2), rtrim(@pSchoolAddr3), rtrim(@pSchoolCity), rtrim(@pSchoolState), rtrim(@pSchoolZip), rtrim(@pPhoneNumber), rtrim(@pFax), rtrim(@pEmail), @ShippingId, rtrim(@pLocationCode))

  select @SchoolId = Scope_Identity() --DCH 11/24/2015 @@IDENTITY
end
else
begin
  -- Set Return School Id
  select @SchoolId = @pSchoolId

  select @ShippingId = ShippingId
    from School
   where SchoolId = @pSchoolId

  -- Check for School Being Deleted
  if rtrim(ISNULL(@pSchoolName,'')) = ''
  begin
    -- DeActivate User Accounts
    update UserAccounts
       set Active = 0
      from UserAccounts
      join Users on UserAccounts.UserId = Users.UserId
     where Users.SchoolId = @pSchoolId

    -- DeActivate Budget Accounts
    update BudgetAccounts
       set Active = 0
      from BudgetAccounts
      join Accounts on Accounts.AccountId = BudgetAccounts.AccountId
     where Accounts.SchoolId = @pSchoolId

    -- DeActivate Accounts
    update Accounts
       set Active = 0
      from Accounts
     where SchoolId = @pSchoolId

    -- DeActivate Schools
    update School
       set Active = 0
     where SchoolId = @pSchoolId
  end
  else
  begin
    update ShipLocations
       set Name = rtrim(@pSchoolName),
	   Address1 = rtrim(@pSchoolAddr1),
	   Address2 = rtrim(@pSchoolAddr2),
	   Address3 = rtrim(@pSchoolAddr3),
	   City = rtrim(@pSchoolCity),
	   State = rtrim(@pSchoolState),
	   Zipcode = rtrim(@pSchoolZip),
	   Phone = rtrim(@pPhoneNumber),
	   Fax = rtrim(@pFax),
	   EMail = rtrim(@pEMail),
           LocationCode = rtrim(@pLocationCode)
    where ShippingId = @ShippingId

    update School
       set Name = rtrim(@pSchoolName),
	   Address1 = rtrim(@pSchoolAddr1),
	   Address2 = rtrim(@pSchoolAddr2),
	   Address3 = rtrim(@pSchoolAddr3),
	   City = rtrim(@pSchoolCity),
	   State = rtrim(@pSchoolState),
	   Zipcode = rtrim(@pSchoolZip),
	   PhoneNumber = rtrim(@pPhoneNumber),
	   Fax = rtrim(@pFax),
	   EMail = rtrim(@pEMail),
           LocationCode = rtrim(@pLocationCode)
    where SchoolId = @pSchoolId
  end
end

select @rSchoolId = ISNULL(@SchoolId,0)
```
