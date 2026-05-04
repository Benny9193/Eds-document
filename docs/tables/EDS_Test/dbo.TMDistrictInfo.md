# View: `dbo.TMDistrictInfo`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `TMSurveyId` | int | NO |  |  |
| 2 | `Name` | varchar(50) | YES |  |  |
| 3 | `County` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `District` | USER_TABLE |
| `TMSurvey` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[TMDistrictInfo] as
select TMSurvey.TMSurveyId, District.Name, District.County
  from TMSurvey with (nolock)
  join District on District.DistrictId = TMSurvey.DistrictId
```
