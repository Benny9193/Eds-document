# View: `dbo.ItemsBidHeaderView`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `ItemId` | int | NO |  |  |
| 3 | `ItemCode` | varchar(565) | YES |  |  |
| 4 | `SortSeq` | varchar(64) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.BidHeaders`](dbo.BidHeaders.md) | USER_TABLE |
| [`dbo.Items`](dbo.Items.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[ItemsBidHeaderView]  
as
select dbo.BidHeaders.BidHeaderId, dbo.Items.ItemId, dbo.Items.ItemCode + ' - ' + dbo.Items.[Description] ItemCode, dbo.Items.SortSeq
from dbo.Items with (nolock)
join dbo.BidHeaders on dbo.BidHeaders.CategoryId = dbo.Items.CategoryId
```
