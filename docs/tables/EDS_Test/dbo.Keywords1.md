# View: `dbo.Keywords1`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `KeywordId` | int | NO |  |  |
| 2 | `Active` | int | YES |  |  |
| 3 | `CategoryId` | int | YES |  |  |
| 4 | `HeadingId` | int | YES |  |  |
| 5 | `DistrictId` | int | YES |  |  |
| 6 | `Keyword` | varchar(50) | YES |  |  |
| 7 | `rowguid` | uniqueidentifier | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Keywords`](dbo.Keywords.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[Keywords1] as
select * from dbo.Keywords with (nolock)
```
