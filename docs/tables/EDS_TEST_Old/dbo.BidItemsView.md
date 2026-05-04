# View: `dbo.BidItemsView`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidItemId` | int | NO |  |  |
| 2 | `BidId` | int | YES |  |  |
| 3 | `ItemCode` | varchar(50) | YES |  |  |
| 4 | `ItemDescription` | varchar(512) | YES |  |  |
| 5 | `Price` | money | YES |  |  |
| 6 | `Alternate` | varchar(512) | YES |  |  |
| 7 | `BidQuantity` | int | YES |  |  |
| 8 | `AwardId` | int | YES |  |  |
| 9 | `VendorItemCode` | varchar(50) | YES |  |  |
| 10 | `SortSeq` | varchar(64) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.BidItems`](dbo.BidItems.md) | USER_TABLE |
| [`dbo.Items`](dbo.Items.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[BidItemsView]  
as
select dbo.BidItems.BidItemId, dbo.BidItems.BidId, dbo.Items.ItemCode,
       dbo.Items.Description ItemDescription, dbo.BidItems.Price, dbo.BidItems.Alternate,
       dbo.BidItems.BidQuantity, dbo.BidItems.AwardId, dbo.BidItems.VendorItemCode,
       dbo.Items.SortSeq
  from dbo.BidItems with (nolock)
  join dbo.Items on dbo.Items.ItemId = dbo.BidItems.ItemId
```
