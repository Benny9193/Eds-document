# View: `dbo.vw_Views`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO |  |  |
| 2 | `Name` | varchar(255) | NO |  |  |
| 3 | `deletedAt` | datetime | YES |  |  |
| 4 | `DT_RowId` | uniqueidentifier | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Views` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create view vw_Views as
select [Views].*, [Views].Id as [DT_RowId]
  from [Views]
 where [Views].deletedAt is null
```
