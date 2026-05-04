# View: `dbo.vw_GetMSDSInfo`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `MSDSId` | int | NO |  |  |
| 2 | `ItemDescription` | varchar(60) | YES |  |  |
| 3 | `ItemList` | varchar(1024) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `MSDS` | USER_TABLE |
| `RTK_Items` | USER_TABLE |
| `dbo.ufn_GetMSDSSheet` | SQL_TABLE_VALUED_FUNCTION |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_GetMSDSInfo] as
select MSDS.MSDSId, coalesce(MSDS.AlternateDescription,(select top 1 RTK_Items.AlternateDesc from RTK_Items where RTK_Items.MSDSId = MSDS.MSDSId order by RTK_Items.ItemId),'') ItemDescription, ms.ItemList
	from MSDS
	cross apply dbo.ufn_GetMSDSSheet(MSDS.MSDSId) ms
```
