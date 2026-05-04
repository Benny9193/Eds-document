# View: `dbo.pa_Users`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SessionId` | int | YES |  |  |
| 2 | `UserId` | int | YES |  |  |
| 3 | `Attention` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `PendingApprovals` | USER_TABLE |
| `Users` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[pa_Users] as
select PendingApprovals.SessionId, PendingApprovals.UserId, Users.Attention
  from PendingApprovals with (nolock)
  join Users on Users.UserId = PendingApprovals.UserId
 group by PendingApprovals.SessionId, PendingApprovals.UserId, Users.Attention
```
