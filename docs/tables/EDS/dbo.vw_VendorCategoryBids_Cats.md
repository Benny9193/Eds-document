# View: `dbo.vw_VendorCategoryBids_Cats`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BudgetId` | int | NO |  |  |
| 2 | `CategoryId` | int | NO |  |  |
| 3 | `CategoryName` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `vw_VendorCategoryBids` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_VendorCategoryBids_Cats] as
select BudgetId, CategoryId, CategoryName
  from vw_VendorCategoryBids
 group by BudgetId, CategoryId, CategoryName
```
