# View: `dbo.filterStatuses`

**Database:** `VendorBids` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `reguserId` | int | NO |  |  |
| 2 | `filterStatus` | varchar(9) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `vendorbidsviewByUser` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE view filterStatuses as
select reguserId, filterStatus
  from vendorbidsviewByUser with (nolock)
 group by regUserId, filterStatus
```
