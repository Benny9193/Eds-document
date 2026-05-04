# Procedure: `dbo.usp_FindEmail_BK`

_Generated on 2026-05-04T13:07:57.767Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `usp_FindEmail_BK` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2024-08-14 23:31:34 |
| Modified | 2024-08-14 23:31:34 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@PassedList` | IN | varchar(max) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `District` | USER_TABLE |  |
| `DistrictContacts` | USER_TABLE |  |
| `DistrictContactTypes` | USER_TABLE |  |
| `School` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `VendorContacts` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE Procedure dbo.usp_FindEmail_BK @PassedList varchar(max)
as
declare @EmailList table(Email varchar(255))
declare @Results table(Type varchar(50), DV varchar(50), Locator varchar(256),Email varchar(255), Phone varchar(50))

insert @EmailList(Email)
select trim(value) from string_split(@PassedList,',')

insert @Results(Type, DV, Locator, Email
, Phone)
select 'District User', District.Name, right('00000' + cast(Users.CometId as varchar),5) + ' ' + trim(Users.Attention) + ' at ' + trim(School.Name), Users.Email, District.PhoneNumber
  from @EmailList el
  join Users on trim(Users.Email) = el.Email
            and Users.Active = 1
  join District on District.DistrictId = Users.DistrictId
               and District.Active = 1
  join School on School.SchoolId = Users.SchoolId
             and School.Active = 1

insert @Results(Type, DV, Locator, Email, Phone)
select 'District Contact', District.Name, DistrictContactTypes.Description, DistrictContacts.eMail, DistrictContacts.Phone
  from @EmailList el
  join DistrictContacts on trim(DistrictContacts.eMail) = el.Email
  join District on District.DistrictId = DistrictContacts.DistrictId
               and District.Active = 1
  join DistrictContactTypes on DistrictContactTypes.DistrictContactTypeId = DistrictContacts.DistrictContactTypeId

insert @Results(Type, DV, Locator, Email, Phone)
select 'Vendor Contact', Vendors.Name, VendorContacts.FullName, VendorContacts.eMail, VendorContacts.Phone
  from @EmailList el
  join VendorContacts on trim(VendorContacts.eMail) = el.Email
  join Vendors on Vendors.VendorId = VendorContacts.VendorId
              and Vendors.Active = 1

insert @Results(Type, DV, Locator, Email, Phone)
select 'Not Located', '', '', el.Email, ''
  from @EmailList el
  outer apply (Select top 1 R.Email from @Results r where r.Email = el.Email) mr
 where mr.Email is null

select * from @Results order by Email, Type, DV, Locator
```
