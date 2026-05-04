# View: `dbo.vw_ARUsers`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Tagged` | int | NO |  |  |
| 2 | `SessionId` | int | NO |  |  |
| 3 | `UserId` | int | NO |  |  |
| 4 | `UserNumber` | int | NO |  |  |
| 5 | `Attention` | varchar(50) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `SessionTable` | USER_TABLE |
| `Users` | USER_TABLE |
| `dbo.uf_UserInApprovalChain` | SQL_SCALAR_FUNCTION |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_ARUsers] as 
select 1 Tagged, SessionTable.SessionId, Users.UserId, isnull(Users.CometId,0) UserNumber, isnull(Users.Attention,'') Attention
  from Users with (nolock)
  join SessionTable on SessionTable.DistrictId = Users.DistrictId
 where Users.Active = 1
--   and exists(select Top 1 RequisitionId from Requisitions with (nolock) join UserAccounts on UserAccounts.UserAccountId = Requisitions.UserAccountId and UserAccounts.AccountId = Accounts.AccountId where Requisitions.BudgetId = SessionTable.BudgetId)
   and case isnull(SessionTable.RepUserId,0) when 0 then dbo.uf_UserInApprovalChain(SessionTable.UserId, Users.UserId, '') else 1 end = 1
```
