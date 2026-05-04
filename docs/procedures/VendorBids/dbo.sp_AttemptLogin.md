# Procedure: `dbo.sp_AttemptLogin`

_Generated on 2026-05-04T14:49:11.325Z_

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_AttemptLogin` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2005-10-06 16:34:56 |
| Modified | 2018-01-22 19:34:54 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pLogin` | IN | varchar(50) |  |
| 2 | `@pPassword` | IN | varchar(50) |  |
| 3 | `@pUserName` | IN | varchar(50) |  |
| 4 | `@pIPAddress` | IN | varchar(50) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Registrations` | USER_TABLE |  |
| `VendorSessions` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE   procedure dbo.sp_AttemptLogin @pLogin varchar(50), @pPassword varchar(50), @pUserName varchar(50), @pIPAddress varchar(50)
as
declare @RegistrationId int,
	@SessionId int

  set nocount on

  select top 1 @RegistrationId = RegistrationId
    from Registrations
   where Code = rtrim(@pLogin)
     and Password = rtrim(@pPassword)
   order by RegistrationId

  if @@rowcount = 1
  begin
    insert VendorSessions (RegistrationId, SessionUser, StartTime, IPAddress)
      values (@RegistrationId, @pUserName, getdate(), @pIPAddress)

    select @SessionId = SCOPE_IDENTITY()
  end

  set nocount off

--  select @SessionId SessionId

  return
```
