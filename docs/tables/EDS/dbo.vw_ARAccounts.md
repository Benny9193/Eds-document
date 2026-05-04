# View: `dbo.vw_ARAccounts`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Tagged` | int | NO |  |  |
| 2 | `SessionId` | int | NO |  |  |
| 3 | `AccountId` | int | NO |  |  |
| 4 | `AccountCode` | varchar(50) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Accounts` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `SessionTable` | USER_TABLE |
| `UserAccounts` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_ARAccounts] as 
select 1 Tagged, SessionTable.SessionId, Accounts.AccountId, isnull(Accounts.Code,'') AccountCode
  from Accounts with (nolock)
  join SessionTable on SessionTable.DistrictId = Accounts.DistrictId
 where Accounts.Active = 1
   and exists(select Top 1 RequisitionId from Requisitions with (nolock) join UserAccounts on UserAccounts.UserAccountId = Requisitions.UserAccountId and UserAccounts.AccountId = Accounts.AccountId where Requisitions.BudgetId = SessionTable.BudgetId)
```
