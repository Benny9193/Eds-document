# View: `dbo.vw_ARCategories`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Tagged` | int | NO |  |  |
| 2 | `SessionId` | int | NO |  |  |
| 3 | `CategoryId` | int | NO |  |  |
| 4 | `CategoryName` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Category` | USER_TABLE |
| `DistrictCategories` | USER_TABLE |
| `SessionTable` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_ARCategories] as 
select 1 Tagged, SessionTable.SessionId, Category.CategoryId, case isnull(rtrim(DistrictCategories.Title),'') when '' then isnull(Category.Name,'') else DistrictCategories.Title end CategoryName
  from Category with (nolock)
  join DistrictCategories on DistrictCategories.CategoryId = Category.CategoryId
                         and DistrictCategories.Active = 1
  join SessionTable on SessionTable.DistrictId = DistrictCategories.DistrictId
 where Category.Active = 1
```
