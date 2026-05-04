# Function: scalar: `dbo.uf_ActiveAccountList`

_Generated on 2026-05-04T13:04:24.212Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `uf_ActiveAccountList` |
| Kind | Function (scalar) |
| sys.objects.type | `FN` (SQL_SCALAR_FUNCTION) |
| Created | 2004-10-03 15:09:09 |
| Modified | 2009-03-25 06:55:28 |
| Encrypted | no |
| Returns | varchar(4000) |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pBudgetId` | IN | int |  |
| 2 | `@pUserId` | IN | int |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `Accounts` | USER_TABLE |  |
| `UserAccounts` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE function dbo.uf_ActiveAccountList (@pBudgetId int, @pUserId int)
returns varchar(4000)
as
begin
declare @RetVal varchar(4000),
	@AccountCode varchar(50),
	@AccountCount int

select @AccountCount = count(*)
  from UserAccounts
  join Accounts on Accounts.AccountId = UserAccounts.AccountId
               and Accounts.Active = 1
 where UserAccounts.UserId = @pUserId
   and UserAccounts.BudgetId = @pBudgetId

if @AccountCount = 0
begin
  select @RetVal = 'No Accounts'
end
else
if @AccountCount = 1
begin
  select top 1 @RetVal = Accounts.Code
    from UserAccounts
    join Accounts on Accounts.AccountId = UserAccounts.AccountId
                 and Accounts.Active = 1
   where UserAccounts.UserId = @pUserId
     and UserAccounts.BudgetId = @pBudgetId
end
else
if @AccountCount > 1
begin
  declare AcctCur cursor fast_forward read_only for
  select Accounts.Code
    from UserAccounts
    join Accounts on Accounts.AccountId = UserAccounts.AccountId
                 and Accounts.Active = 1
   where UserAccounts.UserId = @pUserId
     and UserAccounts.BudgetId = @pBudgetId
   order by Accounts.Code

  open AcctCur

  select @RetVal = null

  fetch next from AcctCur into @AccountCode

  while @@fetch_status = 0
  begin
    select @RetVal = isnull(@RetVal,'') + case isnull(@RetVal,'') when '' then '' else char(13) + char(10) end + rtrim(@AccountCode)
    fetch next from AcctCur into @AccountCode
  end

  close AcctCur
  deallocate AcctCur
end

return (@RetVal)
end
```
