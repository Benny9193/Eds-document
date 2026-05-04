# View: `dbo.pa_Category`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SessionId` | int | YES |  |  |
| 2 | `CategoryId` | int | YES |  |  |
| 3 | `Name` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Category` | USER_TABLE |
| `PendingApprovals` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[pa_Category] as
select PendingApprovals.SessionId, PendingApprovals.CategoryId, Category.Name
  from PendingApprovals with (nolock)
  join Category on Category.CategoryId = PendingApprovals.CategoryId
 group by PendingApprovals.SessionId, PendingApprovals.CategoryId, Category.Name
```
