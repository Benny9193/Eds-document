# View: `dbo.vw_AVCategoriesBySession`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SessionId` | int | NO |  |  |
| 2 | `CategoryId` | int | NO |  |  |
| 3 | `CategoryName` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `vw_AVBidsVendorsCategoriesBySession` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE   view  [dbo].[vw_AVCategoriesBySession] as
select SessionId, CategoryId, CategoryName
  from vw_AVBidsVendorsCategoriesBySession with (nolock)
 group by SessionId, CategoryId, CategoryName
```
