# View: `dbo.BidRequestItemsView`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidRequestItemId` | int | NO |  |  |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `ItemId` | int | NO |  |  |
| 4 | `ItemCode` | varchar(50) | YES |  |  |
| 5 | `Description` | varchar(512) | YES |  |  |
| 6 | `UnitCode` | varchar(20) | YES |  |  |
| 7 | `BidRequest` | int | YES |  |  |
| 8 | `RequisitionCount` | int | YES |  |  |
| 9 | `Active` | tinyint | YES |  |  |
| 10 | `SortSeq` | varchar(64) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.BidRequestItems`](dbo.BidRequestItems.md) | USER_TABLE |
| [`dbo.Items`](dbo.Items.md) | USER_TABLE |
| [`dbo.Units`](dbo.Units.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[BidRequestItemsView]  
AS
select dbo.BidRequestItems.BidRequestItemId, dbo.BidRequestItems.BidHeaderId,
       dbo.Items.ItemId, dbo.Items.ItemCode, dbo.Items.Description, 
       dbo.Units.Code UnitCode, dbo.BidRequestItems.BidRequest, 
       dbo.BidRequestItems.RequisitionCount, dbo.BidRequestItems.Active, dbo.Items.SortSeq
  from dbo.BidRequestItems with (nolock)
  join dbo.Items on dbo.Items.ItemId = dbo.BidRequestItems.ItemId
  join dbo.Units on dbo.Units.UnitId = dbo.Items.UnitId
```
