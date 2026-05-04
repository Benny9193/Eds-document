# View: `dbo.vw_Categories`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CategoryName` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Category` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create view vw_Categories
as
select top 200 Category.Name CategoryName
  from Category
 where Active = 1
 order by Category.Name
```
