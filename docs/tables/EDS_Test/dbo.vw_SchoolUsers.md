# View: `dbo.vw_SchoolUsers`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SchoolId` | int | YES |  |  |
| 2 | `UserId` | int | NO |  |  |
| 3 | `CometId` | varchar(58) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Users`](dbo.Users.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_SchoolUsers] as
SELECT Users.SchoolId, Users.UserId, right('0000' + cast(Users.CometId as varchar(10)),5) + ' - ' + rtrim(Users.Attention) as CometId
  FROM dbo.Users with (nolock)
 WHERE Users.Active = 1
--ORDER BY CometId
```
