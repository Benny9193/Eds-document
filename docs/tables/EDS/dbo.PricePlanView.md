# View: `dbo.PricePlanView`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PricePlanId` | int | NO |  |  |
| 2 | `Code` | varchar(20) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `PricePlans` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE   view  [dbo].[PricePlanView] as
  select PricePlanId, Code
    from PricePlans with (nolock)
   where Active = 1
```
