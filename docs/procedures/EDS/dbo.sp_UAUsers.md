# Procedure: `dbo.sp_UAUsers`

_Generated on 2026-05-04T13:04:00.462Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_UAUsers` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2001-08-24 14:40:45 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | varchar(255) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `School` | USER_TABLE |  |
| `SessionTable` | USER_TABLE |  |
| `Users` | USER_TABLE |  |
| `dbo.Accounts` | USER_TABLE |  |
| `dbo.UserAccounts` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure sp_UAUsers @pSessionId varchar(255) AS

declare @SessionId int,
	@ApprovalLevel int

select @SessionId = convert(int,@pSessionId)

select @ApprovalLevel = ISNULL(Users.ApprovalLevel,0)
  from SessionTable
  join Users on Users.UserId = SessionTable.UserId
 where SessionTable.SessionId = @SessionId

if @ApprovalLevel > 0
begin
  SELECT distinct Users.UserId, Users.Attention
    FROM dbo.UserAccounts
    JOIN Users on Users.UserId = UserAccounts.UserId
    JOIN School on School.SchoolId = Users.SchoolId
    JOIN dbo.Accounts on Accounts.AccountId = UserAccounts.AccountId
    JOIN SessionTable on SessionTable.BudgetId = UserAccounts.BudgetId
     AND                 SessionTable.SchoolId = School.SchoolId
   WHERE SessionTable.SessionId = convert(int,@pSessionId)
   GROUP BY Users.UserId, Users.Attention
   ORDER BY Users.Attention
end
else
begin
  SELECT distinct Users.UserId, Users.Attention
    FROM dbo.UserAccounts
    JOIN Users on Users.UserId = UserAccounts.UserId
    JOIN School on School.SchoolId = Users.SchoolId
    JOIN dbo.Accounts on Accounts.AccountId = UserAccounts.AccountId
    JOIN SessionTable on SessionTable.BudgetId = UserAccounts.BudgetId
     AND                 SessionTable.SchoolId = School.SchoolId
     AND                 SessionTable.UserId = UserAccounts.UserId
   WHERE SessionTable.SessionId = convert(int,@pSessionId)
   GROUP BY Users.UserId, Users.Attention
   ORDER BY Users.Attention
end
```
