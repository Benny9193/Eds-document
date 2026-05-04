# View: `dbo.pa_School`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SessionId` | int | YES |  |  |
| 2 | `SchoolId` | int | YES |  |  |
| 3 | `Name` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `PendingApprovals` | USER_TABLE |
| `School` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[pa_School] as
select PendingApprovals.SessionId, PendingApprovals.SchoolId, School.Name
  from PendingApprovals with (nolock)
  join School on School.SchoolId = PendingApprovals.SchoolId
 group by PendingApprovals.SessionId, PendingApprovals.SchoolId, School.Name
```
