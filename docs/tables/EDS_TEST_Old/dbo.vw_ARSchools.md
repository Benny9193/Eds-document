# View: `dbo.vw_ARSchools`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Tagged` | int | NO |  |  |
| 2 | `SessionId` | int | NO |  |  |
| 3 | `SchoolId` | int | NO |  |  |
| 4 | `SchoolName` | varchar(50) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `School` | USER_TABLE |
| `SessionTable` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_ARSchools] as 
select 1 Tagged, SessionTable.SessionId, School.SchoolId, isnull(School.Name,'') SchoolName
  from School with (nolock)
  join SessionTable on SessionTable.DistrictId = School.DistrictId
 where School.Active = 1
```
