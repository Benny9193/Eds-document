# View: `dbo.pa_Accounts`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SessionId` | int | YES |  |  |
| 2 | `AccountId` | int | YES |  |  |
| 3 | `Code` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Accounts` | USER_TABLE |
| `PendingApprovals` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[pa_Accounts] as
select PendingApprovals.SessionId, PendingApprovals.AccountId, Accounts.Code
  from PendingApprovals with (nolock)
  join Accounts on Accounts.AccountId = PendingApprovals.AccountId
 group by PendingApprovals.SessionId, PendingApprovals.AccountId, Accounts.Code
```
