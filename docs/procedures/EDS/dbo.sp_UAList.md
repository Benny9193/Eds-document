# Procedure: `dbo.sp_UAList`

_Generated on 2026-05-04T14:49:07.327Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_UAList` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2001-08-24 14:40:45 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pSessionId` | IN | varchar(255) |  |
| 2 | `@pUserId` | IN | varchar(255) |  |
| 3 | `@pAccountId` | IN | varchar(255) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `SessionTable` | USER_TABLE |  |
| `Users` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE   procedure sp_UAList @pSessionId varchar(255), @pUserId varchar(255), @pAccountId varchar(255) AS

declare @SessionId int,
	@ApprovalLevel int,
	@DynamicSelect varchar(4096)

select  @SessionId = convert(int,@pSessionId)

select @ApprovalLevel = ISNULL(Users.ApprovalLevel,0)
  from SessionTable
  join Users on Users.UserId = SessionTable.UserId
 where SessionTable.SessionId = @SessionId

select @DynamicSelect = 'declare @PriorUsers varchar(4096)  SELECT distinct Users.UserId, Users.Attention,
         max(ISNULL(UserAccounts.AllocationAmount,0)) as AllocationAmount,   
         max(ISNULL(UserAccounts.AllocationAvailable,0)) as AllocationAvailable,
         Accounts.Code as AccountCode
    FROM dbo.UserAccounts
    JOIN Users on Users.UserId = UserAccounts.UserId
    JOIN School on School.SchoolId = Users.SchoolId
    JOIN dbo.Accounts on Accounts.AccountId = UserAccounts.AccountId
    JOIN SessionTable on SessionTable.BudgetId = UserAccounts.BudgetId
     and dbo.uf_UserInApprovalChain(SessionTable.UserId, Users.UserId, @PriorUsers) = 1
   WHERE SessionTable.SessionId = ' + @pSessionId

if @ApprovalLevel = 0
begin
  select @DynamicSelect = @DynamicSelect + ' AND SessionTable.UserId = UserAccounts.UserId'
end

if convert(int,@pUserId) <> 0
begin
  select @DynamicSelect = @DynamicSelect + ' AND UserAccounts.UserId = ' + @pUserId
end

if convert(int,@pAccountId) <> 0
begin
  select @DynamicSelect = @DynamicSelect + ' AND UserAccounts.AccountId = ' + @pAccountId
end

select @DynamicSelect = @DynamicSelect + ' GROUP BY Users.UserId, Users.Attention, Accounts.Code ORDER BY Users.Attention, Accounts.Code'

EXECUTE(@DynamicSelect)
```
