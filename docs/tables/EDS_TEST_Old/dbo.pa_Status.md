# View: `dbo.pa_Status`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SessionId` | int | YES |  |  |
| 2 | `StatusId` | int | YES |  |  |
| 3 | `Name` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `PendingApprovals` | USER_TABLE |
| `StatusTable` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[pa_Status] as
select PendingApprovals.SessionId, PendingApprovals.StatusId, StatusTable.Name
  from PendingApprovals with (nolock)
  join StatusTable on StatusTable.StatusId = PendingApprovals.StatusId
 group by PendingApprovals.SessionId, PendingApprovals.StatusId, StatusTable.Name
```
