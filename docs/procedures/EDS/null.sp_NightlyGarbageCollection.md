# Procedure: `null.sp_NightlyGarbageCollection`

_Generated on 2026-05-04T13:04:00.219Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `null`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `null` |
| Name | `sp_NightlyGarbageCollection` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2002-11-22 06:50:37 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Requisitions` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |
| `Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
create procedure sp_NightlyGarbageCollection AS

-- Delete Empty User Accounts
delete UserAccounts
  from UserAccounts
  left outer join (
    select Users.UserId
      from Users
      left outer join UserAccounts on UserAccounts.UserId = Users.UserId
     where Users.Active = 0
       and Users.CometId is null
       ) ss on ss.UserId = UserAccounts.UserId
  left outer join Requisitions on Requisitions.UserAccountId = UserAccounts.UserAccountId
 where Requisitions.RequisitionId is null
   and UserAccounts.Active = 0

-- Delete Empty Users
Delete Users
  from Users
  left outer join UserAccounts on UserAccounts.UserId = Users.UserId
  left outer join Requisitions on Requisitions.UserAccountId = UserAccounts.UserAccountId  
 where Users.Active = 0
   and Users.CometId is null
```
