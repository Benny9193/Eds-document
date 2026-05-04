# Procedure: `dbo.sp_CCSchoolMaint`

_Generated on 2026-05-04T13:04:00.321Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CCSchoolMaint` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2004-09-30 20:37:39 |
| Modified | 2015-11-24 23:37:29 |
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
| 14 | `@pAction` | IN | tinyint |  |
| 15 | `@pShippingId` | IN | int |  |
| 16 | `@pActive` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |
| `BudgetAccounts` | USER_TABLE |  |
| `Requisitions` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `ShipLocations` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |
| `Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_CCSchoolMaint] @pSessionId int, @pSchoolId int, @pSchoolName varchar(50), @pSchoolAddr1 varchar(255), @pSchoolAddr2 varchar(255), @pSchoolAddr3 varchar(255), @pSchoolCity varchar(255), @pSchoolState varchar(255), @pSchoolZip varchar(255), @pPhoneNumber varchar(255), @pFax varchar(255), @pEMail varchar(255), @pLocationCode varchar(255), @pAction tinyint, @pShippingId int, @pActive int AS

declare @DistrictId int,
	@SchoolId int,
	@ShippingId int,
	@References int,
	@AddressId int

select @DistrictId = ISNULL(DistrictId,0)
  from SessionTable
 where SessionId = @pSessionId

if @pAction = 1
begin
  insert ShipLocations (DistrictId, Active, Name, Address1, Address2, Address3, City, State, Zipcode, Phone, Fax, EMail, LocationCode)
    values (@DistrictId, 1, rtrim(@pSchoolName), rtrim(@pSchoolAddr1), rtrim(@pSchoolAddr2), rtrim(@pSchoolAddr3), rtrim(@pSchoolCity), rtrim(@pSchoolState), rtrim(@pSchoolZip), rtrim(@pPhoneNumber), rtrim(@pFax), rtrim(@pEmail), rtrim(@pLocationCode))

  select @ShippingId = Scope_Identity() --DCH 11/24/2015 @@IDENTITY

  insert School (DistrictId, Active, Name, Address1, Address2, Address3, City, State, Zipcode, PhoneNumber, Fax, EMail, ShippingId, LocationCode, AddressId)
    values (@DistrictId, 1, rtrim(@pSchoolName), rtrim(@pSchoolAddr1), rtrim(@pSchoolAddr2), rtrim(@pSchoolAddr3), rtrim(@pSchoolCity), rtrim(@pSchoolState), rtrim(@pSchoolZip), rtrim(@pPhoneNumber), rtrim(@pFax), rtrim(@pEmail), @ShippingId, rtrim(@pLocationCode), @ShippingId)

  select @SchoolId = Scope_Identity() --DCH 11/24/2015 @@IDENTITY
end
else
if @pAction = 3
begin
  -- Set Return School Id
  select @SchoolId = @pSchoolId

  select @ShippingId = ShippingId
    from School
   where SchoolId = @pSchoolId

    -- DeActivate User Accounts
    update UserAccounts
       set Active = 0
      from UserAccounts
      join Users on UserAccounts.UserId = Users.UserId
     where Users.SchoolId = @SchoolId

    select @References = @@rowcount

    -- DeActivate Budget Accounts
    update BudgetAccounts
       set Active = 0
      from BudgetAccounts
      join Accounts on Accounts.AccountId = BudgetAccounts.AccountId
     where Accounts.SchoolId = @SchoolId

    select @References = @References + @@rowcount

    -- DeActivate Accounts
    update Accounts
       set Active = 0
      from Accounts
     where SchoolId = @SchoolId

    select @References = @References + @@rowcount

    if @References = 0
    begin
      delete School
       where SchoolId = @SchoolId
    end
    else
    begin
      -- DeActivate Schools
      update School
         set Active = 0
       where SchoolId = @SchoolId
    end

    select @References = count(*)
      from School
     where ShippingId = @ShippingId

    select @References = @References + count(*)
      from Requisitions
     where ShippingId = @ShippingId

    if @References = 0
    begin
      delete ShipLocations
       where ShippingId = @ShippingId
    end
end
else
begin
    -- Set Return School Id
    select @SchoolId = @pSchoolId

    select @AddressId = AddressId
      from School
     where SchoolId = @pSchoolId

    update ShipLocations
       set Active = @pActive,
           Name = rtrim(@pSchoolName),
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
    where ShippingId = @AddressId

    update School
       set Active = @pActive,
           Name = rtrim(@pSchoolName),
	       Address1 = rtrim(@pSchoolAddr1),
	       Address2 = rtrim(@pSchoolAddr2),
	       Address3 = rtrim(@pSchoolAddr3),
	       City = rtrim(@pSchoolCity),
	       State = rtrim(@pSchoolState),
	       Zipcode = rtrim(@pSchoolZip),
	       PhoneNumber = rtrim(@pPhoneNumber),
	       Fax = rtrim(@pFax),
	       EMail = rtrim(@pEMail),
           LocationCode = rtrim(@pLocationCode),
           ShippingId = @pShippingId
    where SchoolId = @pSchoolId
end
```
