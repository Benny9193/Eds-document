# View: `dbo.filterCategories`

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `reguserId` | int | NO |  |  |
| 2 | `filterStatus` | varchar(9) | NO |  |  |
| 3 | `CategoryName` | varchar(50) | NO |  |  |
| 4 | `CategoryId` | int | YES |  |  |
| 5 | `Id` | bigint | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `vendorbidsviewByUser` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE view [dbo].[filterCategories] as
select reguserId, filterStatus, CategoryName, CategoryId, cast(regUserId as bigint) + (cast(CategoryId as bigint) * 0x100000000) + (cast(case filterStatus when 'Available' then 1 when 'Closed' then 2 when 'Future' then 3 else 0 end as bigint) * 0x1000000000000) Id
  from vendorbidsviewByUser with (nolock)
 group by regUserId, filterStatus, CategoryName, CategoryId, cast(regUserId as bigint) + (cast(CategoryId as bigint) * 0x100000000) + (cast(case filterStatus when 'Available' then 1 when 'Closed' then 2 when 'Future' then 3 else 0 end as bigint) * 0x1000000000000)
```
