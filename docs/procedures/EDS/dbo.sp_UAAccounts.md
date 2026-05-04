# Procedure: `dbo.sp_UAAccounts`

_Generated on 2026-05-04T13:04:24.188Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_UAAccounts` |
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
| `dbo.uf_UserInApprovalChain` | SQL_SCALAR_FUNCTION |  |
| `dbo.UserAccounts` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE  procedure sp_UAAccounts @pSessionId varchar(255) AS

declare @SessionId int,
	@ApprovalLevel int,
	@PriorUsers varchar(4096)

select @SessionId = convert(int,@pSessionId)

select @ApprovalLevel = ISNULL(Users.ApprovalLevel,0)
  from SessionTable
  join Users on Users.UserId = SessionTable.UserId
 where SessionTable.SessionId = @SessionId

if @ApprovalLevel > 0
begin
  SELECT distinct Accounts.AccountId, Accounts.Code
    FROM dbo.UserAccounts
    JOIN Users on Users.UserId = UserAccounts.UserId
    JOIN School on School.SchoolId = Users.SchoolId
    JOIN dbo.Accounts on Accounts.AccountId = UserAccounts.AccountId
    JOIN SessionTable on SessionTable.BudgetId = UserAccounts.BudgetId
     and dbo.uf_UserInApprovalChain(SessionTable.UserId, Users.UserId, @PriorUsers) = 1
   WHERE SessionTable.SessionId = convert(int,@pSessionId)
   GROUP BY Accounts.AccountId, Accounts.Code
   ORDER BY Accounts.Code
end
else
begin
  SELECT distinct Accounts.AccountId, Accounts.Code
    FROM dbo.UserAccounts
    JOIN Users on Users.UserId = UserAccounts.UserId
    JOIN School on School.SchoolId = Users.SchoolId
    JOIN dbo.Accounts on Accounts.AccountId = UserAccounts.AccountId
    JOIN SessionTable on SessionTable.BudgetId = UserAccounts.BudgetId
     AND                 SessionTable.SchoolId = School.SchoolId
     AND                 SessionTable.UserId = UserAccounts.UserId
   WHERE SessionTable.SessionId = convert(int,@pSessionId)
   GROUP BY Accounts.AccountId, Accounts.Code
   ORDER BY Accounts.Code
end
```
