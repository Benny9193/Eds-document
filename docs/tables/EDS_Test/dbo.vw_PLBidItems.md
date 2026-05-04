# View: `dbo.vw_PLBidItems`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ItemId` | int | NO |  |  |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `BidId` | int | NO |  |  |
| 4 | `BidItemId` | int | NO |  |  |
| 5 | `CrossRefId` | int | YES |  |  |
| 6 | `AwardId` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Awards`](dbo.Awards.md) | USER_TABLE |
| [`dbo.BidItems`](dbo.BidItems.md) | USER_TABLE |
| [`dbo.Bids`](dbo.Bids.md) | USER_TABLE |
| [`dbo.Items`](dbo.Items.md) | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_ItemPricing`](dbo.vw_ItemPricing.md) | VIEW |

## Definition

```sql
create   view  [dbo].[vw_PLBidItems] as
select Items.ItemId, Bids.BidHeaderId, Bids.BidId, BidItems.BidItemId, BidItems.CrossRefId, Awards.AwardId
  from dbo.Items with (nolock)
  join dbo.BidItems on BidItems.ItemId = Items.ItemId
  join dbo.Bids on Bids.BidId = BidItems.BidId
           and Bids.Active = 1
  join dbo.Awards on Awards.BidId = Bids.BidId
             and Awards.Active = 1
```
