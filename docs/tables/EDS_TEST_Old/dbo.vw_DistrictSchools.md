# View: `dbo.vw_DistrictSchools`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DistrictId` | int | YES |  |  |
| 2 | `SchoolId` | int | NO |  |  |
| 3 | `Name` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.School`](dbo.School.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_DistrictSchools] as
SELECT School.DistrictId, School.SchoolId, School.Name
FROM dbo.School with (nolock)
WHERE Active = 1
--ORDER BY Name
```
