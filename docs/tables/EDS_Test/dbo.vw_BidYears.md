# View: `dbo.vw_BidYears`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidYears` | varchar(11) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `dbo.BidInfoLookup` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE view [dbo].[vw_BidYears]
as
select top 10 BidYears
  from dbo.BidInfoLookup
 group by BidYears
 order by BidYears desc
```
