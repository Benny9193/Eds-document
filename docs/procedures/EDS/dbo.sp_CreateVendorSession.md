# Procedure: `dbo.sp_CreateVendorSession`

_Generated on 2026-05-04T13:07:57.426Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CreateVendorSession` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2009-03-11 17:12:27 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pUser` | IN | varchar(255) |  |
| 2 | `@pUserName` | IN | varchar(255) |  |
| 3 | `@pIPAddress` | IN | varchar(255) |  |
| 4 | `@pjSession` | IN | varchar(128) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `DebugMsgs` | USER_TABLE |  |
| `vendors` | USER_TABLE |  |
| `vendorsessions` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE  procedure [dbo].[sp_CreateVendorSession] @pUser varchar(255), @pUserName varchar(255), @pIPAddress varchar(255), @pjSession varchar(128)
as
declare @SessionId int
set nocount on
insert vendorsessions (vendorid, UserName, starttime, ipaddress, jsession)
  select top 1 VendorId, @pUserName, getdate(), @pIPAddress, @pjSession
    from vendors
   where code = @pUser
     and active = 1

if @@rowcount = 0
begin
  insert DebugMsgs (Msg) values ('Unable to Locate User')
  raiserror('Unable to Locate User',16,1)
  return 0
end

select @SessionId = scope_identity()
if isnull(@SessionId,0) = 0
begin
  insert DebugMsgs (Msg) values ('Unable to Locate Session')
  raiserror('Unable to Locate Session',16,1)
  return 0
end
set nocount off

select @SessionId as SessionId
return @SessionId
```
