# Procedure: `dbo.sp_RegistrationsUpdate`

_Generated on 2026-05-04T14:49:11.336Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_RegistrationsUpdate` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2011-05-03 18:14:07 |
| Modified | 2018-01-22 20:57:18 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidSchedule` | USER_TABLE |  |
| `BidScheduleCats` | USER_TABLE |  |
| `regcalendar` | USER_TABLE |  |
| `registrations` | USER_TABLE |  |
| `regusers` | USER_TABLE |  |
| `states` | USER_TABLE |  |
| `vendorcategoryPP` | unresolved |  |
| `vendorcontacts` | unresolved |  |
| `Vendors` | unresolved |  |
| `dbo.vendorcontacts` | unresolved | `eds` |
| `dbo.vendors` | unresolved | `eds` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE  procedure [dbo].[sp_RegistrationsUpdate] 
as

set nocount on

-- insert new vendors  Note: the password for new vendors is set to the vendor code
insert registrations (active, vendorid, code, password, email, name, address1, address2, address3, city, state, zipcode, phone, fax, contact)
select vendors.active, vendors.vendorid, vendors.code, vendors.code, vendors.email, vendors.name, vendors.address1, vendors.address2, vendors.address3, vendors.city, vendors.state, vendors.zipcode, vendors.phone, vendors.fax, ''
  from (SELECT * FROM eds.dbo.vendors where Vendors.Active = 1 and isnull(rtrim(Vendors.code),'') != '' and Vendors.Code != '0000') AS Vendors 
  left outer join registrations on registrations.vendorId = Vendors.VendorId
 where registrations.registrationid is null
/*select vendors.active, vendors.vendorid, vendors.code, vendors.code, vendors.email, vendors.name, vendors.address1, vendors.address2, vendors.address3, vendors.city, vendors.state, vendors.zipcode, vendors.phone, vendors.fax, ''
  from OPENROWSET('SQLOLEDB','sqlbox.ed-data.com';'EDSIQWebUser';'Ed-DataUser!',
   'SELECT * FROM eds.dbo.vendors where Vendors.Active = 1 and isnull(rtrim(Vendors.code),'''') != '''' and Vendors.Code != ''0000''') AS Vendors 
  left outer join registrations on registrations.vendorId = Vendors.VendorId
 where registrations.registrationid is null
*/
-- insert new vendors  Note: the password for new vendors is set to the vendor code
insert regusers (active, registrationid, password, email, name, address1, address2, city, state, zipcode, phone, fax, vendorcontactid)
select vendors.active, registrations.registrationid, vendors.code, vendors.email, vendors.name, vendors.address1, vendors.address2, vendors.city, vendors.state, vendors.zipcode, vendors.phone, vendors.fax, vendors.vendorcontactid
  from (SELECT vendorcontacts.*, Vendors.code, isnull(vendorcontacts.firstname,'') + ' ' + isnull(vendorcontacts.lastname,'') name, states.code state FROM eds.dbo.vendorcontacts join Vendors on Vendors.VendorId = VendorContacts.VendorId left outer join states on states.stateid = vendorcontacts.stateid where Vendorcontacts.Active = 1 and isnull(rtrim(Vendors.code),'') != '' and Vendors.Code != '0000') AS Vendors 
  join registrations on registrations.vendorId = Vendors.VendorId
  left outer join regusers on regusers.registrationid = registrations.registrationid
                          and regusers.vendorcontactid = vendors.vendorcontactid
 where regusers.reguserId is null
/*select vendors.active, registrations.registrationid, vendors.code, vendors.email, vendors.name, vendors.address1, vendors.address2, vendors.city, vendors.state, vendors.zipcode, vendors.phone, vendors.fax, vendors.vendorcontactid
  from OPENROWSET('SQLOLEDB','sqlbox.ed-data.com';'EDSIQWebUser';'Ed-DataUser!',
   'SELECT vendorcontacts.*, Vendors.code, isnull(vendorcontacts.firstname,'''') + '' '' + isnull(vendorcontacts.lastname,'''') name, states.code state FROM eds.dbo.vendorcontacts join Vendors on Vendors.VendorId = VendorContacts.VendorId left outer join states on states.stateid = vendorcontacts.stateid where Vendorcontacts.Active = 1 and isnull(rtrim(Vendors.code),'''') != '''' and Vendors.Code != ''0000''') AS Vendors 
  join registrations on registrations.vendorId = Vendors.VendorId
  left outer join regusers on regusers.registrationid = registrations.registrationid
                          and regusers.vendorcontactid = vendors.vendorcontactid
 where regusers.reguserId is null
*/
-- deactivate deleted vendors contacts
update regusers set active = 0
--select *
  from registrations
  join regusers on regusers.registrationid = registrations.registrationid
  left outer join (SELECT vendorcontacts.* FROM eds.dbo.vendors join vendorcontacts on vendorcontacts.vendorid = vendors.vendorid and vendorcontacts.active = 1 where isnull(rtrim(Vendors.code),'') != '' and Vendors.Code != '0000') AS Vendors on Vendors.VendorId = registrations.vendorid
 where vendors.vendorid is null
   and registrations.active = 1
/*update regusers set active = 0
--select *
  from registrations
  join regusers on regusers.registrationid = registrations.registrationid
  left outer join OPENROWSET('SQLOLEDB','sqlbox.ed-data.com';'EDSIQWebUser';'Ed-DataUser!',
   'SELECT vendorcontacts.* FROM eds.dbo.vendors join vendorcontacts on vendorcontacts.vendorid = vendors.vendorid and vendorcontacts.active = 1 where isnull(rtrim(Vendors.code),'''') != '''' and Vendors.Code != ''0000''') AS Vendors on Vendors.VendorId = registrations.vendorid
 where vendors.vendorid is null
   and registrations.active = 1
*/
-- deactivate deleted vendors
update registrations set active = 0
--select *
  from registrations
  left outer join (SELECT * FROM eds.dbo.vendors where Vendors.Active = 1 and isnull(rtrim(Vendors.code),'') != '' and Vendors.Code != '0000') AS Vendors on Vendors.VendorId = registrations.vendorid
 where vendors.vendorid is null
   and registrations.active = 1
/*update registrations set active = 0
--select *
  from registrations
  left outer join OPENROWSET('SQLOLEDB','sqlbox.ed-data.com';'EDSIQWebUser';'Ed-DataUser!',
   'SELECT * FROM eds.dbo.vendors where Vendors.Active = 1 and isnull(rtrim(Vendors.code),'''') != '''' and Vendors.Code != ''0000''') AS Vendors on Vendors.VendorId = registrations.vendorid
 where vendors.vendorid is null
   and registrations.active = 1
*/

-- update vendor information from selected fields ==== copy updates FROM Vendor TO Registrations ====
-- Reminder: the password is maintained in the registration table NOT the vendor table
update registrations
set registrations.active = vendors.active,
    registrations.code = vendors.code,  
    registrations.email = vendors.email,
    registrations.name = vendors.name
--select registrations.active, vendors.active, registrations.code, vendors.code, registrations.email, vendors.email, registrations.name, vendors.name
  from registrations
  join (SELECT * FROM eds.dbo.vendors where Vendors.Active = 1 and isnull(rtrim(Vendors.code),'') != '' and Vendors.Code != '0000') AS Vendors on Vendors.VendorId = registrations.vendorid
 where isnull(registrations.active,0)    <> isnull(vendors.active,0)    or 
       isnull(registrations.code,'')     <> isnull(vendors.code,'')     or 
       isnull(registrations.email,'')    <> isnull(vendors.email,'')    or 
       isnull(registrations.name,'')     <> isnull(vendors.name,'')
/*update registrations
set registrations.active = vendors.active,
    registrations.code = vendors.code,  
    registrations.email = vendors.email,
    registrations.name = vendors.name
--select registrations.active, vendors.active, registrations.code, vendors.code, registrations.email, vendors.email, registrations.name, vendors.name
  from registrations
  join OPENROWSET('SQLOLEDB','sqlbox.ed-data.com';'EDSIQWebUser';'Ed-DataUser!',
   'SELECT * FROM eds.dbo.vendors where Vendors.Active = 1 and isnull(rtrim(Vendors.code),'''') != '''' and Vendors.Code != ''0000''') AS Vendors on Vendors.VendorId = registrations.vendorid
 where isnull(registrations.active,0)    <> isnull(vendors.active,0)    or 
       isnull(registrations.code,'')     <> isnull(vendors.code,'')     or 
       isnull(registrations.email,'')    <> isnull(vendors.email,'')    or 
       isnull(registrations.name,'')     <> isnull(vendors.name,'')
*/
update regusers
set active = vendorContacts.active,
    email = vendorContacts.email,
    password = vendorcontacts.password,
    name = vendorContacts.name
--select registrations.active, vendors.active, registrations.code, vendors.code, registrations.email, vendors.email, registrations.name, vendors.name
  from regusers
  join (SELECT *, isnull(vendorcontacts.firstname,'') + ' ' + isnull(vendorcontacts.lastname,'') name FROM eds.dbo.vendorcontacts where Vendorcontacts.Active = 1) AS Vendorcontacts on Vendorcontacts.VendorContactId = regusers.vendorcontactid
 where isnull(regusers.active,0)    <> isnull(vendorContacts.active,0)    or 
       isnull(regusers.password,'')     <> isnull(vendorContacts.password,'')     or 
       isnull(regusers.email,'')    <> isnull(vendorContacts.email,'')    or 
       isnull(regusers.name,'')     <> isnull(vendorContacts.name,'')
/*update regusers
set active = vendorContacts.active,
    email = vendorContacts.email,
    password = vendorcontacts.password,
    name = vendorContacts.name
--select registrations.active, vendors.active, registrations.code, vendors.code, registrations.email, vendors.email, registrations.name, vendors.name
  from regusers
  join OPENROWSET('SQLOLEDB','sqlbox.ed-data.com';'EDSIQWebUser';'Ed-DataUser!',
   'SELECT *, isnull(vendorcontacts.firstname,'''') + '' '' + isnull(vendorcontacts.lastname,'''') name FROM eds.dbo.vendorcontacts where Vendorcontacts.Active = 1') AS Vendorcontacts on Vendorcontacts.VendorContactId = regusers.vendorcontactid
 where isnull(regusers.active,0)    <> isnull(vendorContacts.active,0)    or 
       isnull(regusers.password,'')     <> isnull(vendorContacts.password,'')     or 
       isnull(regusers.email,'')    <> isnull(vendorContacts.email,'')    or 
       isnull(regusers.name,'')     <> isnull(vendorContacts.name,'')
*/
insert regcalendar (registrationid, requested, granted, bscid)
select registrations.registrationid, getdate(), getdate(), BidScheduleCats.BSCId
  from (SELECT vendors.vendorid, vcp.categoryid FROM eds.dbo.vendors join vendorcategoryPP vcp on vcp.vendorid = vendors.vendorid where Vendors.Active = 1 and isnull(rtrim(Vendors.code),'') != '' and Vendors.Code != '0000' group by vendors.vendorid, vcp.categoryid) AS VendorCats
  join registrations on registrations.vendorid = VendorCats.VendorId
  join BidScheduleCats on BidScheduleCats.CategoryId = VendorCats.CategoryId
  join BidSchedule on BidSchedule.BidScheduleId = BidScheduleCats.BidScheduleId
                  and BidSchedule.OpeningDate >= getdate()
  left outer join regcalendar on regcalendar.registrationid = registrations.registrationid
                             and regcalendar.bscid = BidScheduleCats.BSCId
 where regcalendar.regcalendarid is null
 group by registrations.registrationid, BidScheduleCats.BSCId
 order by registrations.registrationid, BidScheduleCats.BSCId
/*select registrations.registrationid, getdate(), getdate(), BidScheduleCats.BSCId
  from OPENROWSET('SQLOLEDB','sqlbox.ed-data.com';'EDSIQWebUser';'Ed-DataUser!',
   'SELECT vendors.vendorid, vcp.categoryid FROM eds.dbo.vendors join vendorcategoryPP vcp on vcp.vendorid = vendors.vendorid where Vendors.Active = 1 and isnull(rtrim(Vendors.code),'''') != '''' and Vendors.Code != ''0000'' group by vendors.vendorid, vcp.categoryid') AS VendorCats
  join registrations on registrations.vendorid = VendorCats.VendorId
  join BidScheduleCats on BidScheduleCats.CategoryId = VendorCats.CategoryId
  join BidSchedule on BidSchedule.BidScheduleId = BidScheduleCats.BidScheduleId
                  and BidSchedule.OpeningDate >= getdate()
  left outer join regcalendar on regcalendar.registrationid = registrations.registrationid
                             and regcalendar.bscid = BidScheduleCats.BSCId
 where regcalendar.regcalendarid is null
 group by registrations.registrationid, BidScheduleCats.BSCId
 order by registrations.registrationid, BidScheduleCats.BSCId
*/
set nocount off

return 1     -- any recommendations?
```
