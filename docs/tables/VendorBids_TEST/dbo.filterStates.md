# View: `dbo.filterStates`

**Database:** `VendorBids_TEST` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `reguserId` | int | NO |  |  |
| 2 | `filterStatus` | int | YES |  |  |
| 3 | `State` | char(2) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `vendorbidsviewByUser` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE view [dbo].[filterStates] as
select reguserId, null filterStatus, State
  from vendorbidsviewByUser with (nolock)
 group by regUserId, /*filterStatus,*/ State
```
