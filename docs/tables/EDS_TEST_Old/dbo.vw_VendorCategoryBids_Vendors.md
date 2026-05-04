# View: `dbo.vw_VendorCategoryBids_Vendors`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BudgetId` | int | NO |  |  |
| 2 | `VendorId` | int | NO |  |  |
| 3 | `VendorName` | varchar(50) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `vw_VendorCategoryBids` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_VendorCategoryBids_Vendors] as
select BudgetId, VendorId, VendorName
  from vw_VendorCategoryBids
 group by BudgetId, VendorId, VendorName
```
