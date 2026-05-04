# Procedure: `dbo.sp_CreateNewBid`

_Generated on 2026-05-04T14:49:11.328Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CreateNewBid` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2008-09-24 12:10:24 |
| Modified | 2018-01-22 19:34:54 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pRegistrationId` | IN | int |  |
| 2 | `@pCalendarId` | IN | int |  |
| 3 | `@pPassword` | IN | varchar(255) |  |
| 4 | `@pSessionId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `bidcalendaritems` | USER_TABLE |  |
| `debugmsgs` | USER_TABLE |  |
| `vendorbiditems` | USER_TABLE |  |
| `vendorbids` | USER_TABLE |  |
| `vendorbidsjournal` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE   procedure [dbo].[sp_CreateNewBid] @pRegistrationId int, @pCalendarId int, @pPassword varchar(255), @pSessionId int
as
declare @VendorBidId int
set nocount on
insert into vendorbids (active, registrationid, calendarid, bidpwd)
  values (1, @pRegistrationId, @pCalendarId, null)

select @VendorBidId = scope_identity()

--Must do this AFTER we know the vendorbidid
update vendorbids
   set bidpwd = EncryptByPassPhrase(@pPassword, @pPassword, 1, cast(@VendorBidId as varbinary)) 
 where vendorbidid = @VendorBidId

insert debugmsgs (msg) values ('VB=' + CAST(@VendorBidId as varchar(50)) + ' Pwd=' + @pPassword)

insert into vendorbidsjournal (vendorbidid, sessionid, statusid, active)
  values (@VendorBidId, @pSessionId, 1, 1)

insert into vendorbiditems (vendorbidid, bidrequestitemid, itemid, itemcode, units, quantity, sortseq, description, shiplocations, heading, districtname, crossrefstext)
  select @VendorBidId, bidrequestitemid, itemid, itemcode, units, quantity, sortseq, description, shiplocations, heading, districtname, crossreftext
    from bidcalendaritems with (nolock)
   where calendarid = @pCalendarId

set nocount off
select @VendorBidId as VendorBidId
return @VendorBidId
```
