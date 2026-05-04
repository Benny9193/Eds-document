# View: `dbo.PPCategoryView`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PricePlanId` | int | YES |  |  |
| 2 | `CategoryId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.PPCatalogs`](dbo.PPCatalogs.md) | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| `dbo.sp_AddPPCatalog` | SQL_STORED_PROCEDURE |

## Definition

```sql
create   view  [dbo].[PPCategoryView] as

select distinct PricePlanId, CategoryId from dbo.PPCatalogs
```
