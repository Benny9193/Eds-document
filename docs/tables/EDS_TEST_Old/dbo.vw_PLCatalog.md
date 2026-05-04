# View: `dbo.vw_PLCatalog`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ItemId` | int | NO |  |  |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `BidId` | int | NO |  |  |
| 4 | `BidItemId` | int | YES |  |  |
| 5 | `CrossRefId` | int | NO |  |  |
| 6 | `AwardId` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Awards`](dbo.Awards.md) | USER_TABLE |
| [`dbo.BidHeaders`](dbo.BidHeaders.md) | USER_TABLE |
| [`dbo.Bids`](dbo.Bids.md) | USER_TABLE |
| [`dbo.CrossRefs`](dbo.CrossRefs.md) | USER_TABLE |
| [`dbo.Items`](dbo.Items.md) | USER_TABLE |
| [`dbo.vw_CatalogPricing`](dbo.vw_CatalogPricing.md) | VIEW |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_ItemPricing`](dbo.vw_ItemPricing.md) | VIEW |

## Definition

```sql
create   view  [dbo].[vw_PLCatalog]   as
select Items.ItemId, BidHeaders.BidHeaderId, Bids.BidId, null BidItemId, CrossRefs.CrossRefId, Awards.AwardId
  from dbo.Items with (nolock)
  join dbo.BidHeaders on BidHeaders.CategoryId = Items.CategoryId
                 and BidHeaders.EffectiveFrom is not null
                 and BidHeaders.EffectiveUntil is not null
                 and BidHeaders.Active = 1
  join dbo.CrossRefs on CrossRefs.CrossRefId =
    (select top 1 cp.CrossRefId
       from dbo.vw_CatalogPricing cp with (nolock)
      where cp.BidHeaderId = BidHeaders.BidHeaderId
        and cp.ItemId = Items.ItemId
      order by cp.NetPrice, cp.CrossRefId)
  join dbo.Bids on Bids.BidId = 
    (select top 1 cp.BidId
       from dbo.vw_CatalogPricing cp with (nolock)
      where cp.BidHeaderId = BidHeaders.BidHeaderId
        and cp.ItemId = Items.ItemId
      order by cp.NetPrice, cp.CrossRefId)
  join dbo.Awards on Awards.BidId = Bids.BidId
             and Awards.Active = 1
```
