# View: `dbo.vw_CatalogPricing`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ItemId` | int | YES |  |  |
| 2 | `CrossRefId` | int | NO |  |  |
| 3 | `BidHeaderId` | int | YES |  |  |
| 4 | `AwardCatalogId` | int | NO |  |  |
| 5 | `AwardId` | int | NO |  |  |
| 6 | `BidId` | int | NO |  |  |
| 7 | `NetPrice` | decimal(34,13) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Awards`](dbo.Awards.md) | USER_TABLE |
| [`dbo.AwardsCatalogList`](dbo.AwardsCatalogList.md) | USER_TABLE |
| [`dbo.BidHeaders`](dbo.BidHeaders.md) | USER_TABLE |
| [`dbo.Bids`](dbo.Bids.md) | USER_TABLE |
| [`dbo.Catalog`](dbo.Catalog.md) | USER_TABLE |
| [`dbo.CrossRefs`](dbo.CrossRefs.md) | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_PLCatalog`](dbo.vw_PLCatalog.md) | VIEW |

## Definition

```sql
create   view  [dbo].[vw_CatalogPricing]   as
select CrossRefs.ItemId, CrossRefs.CrossRefId, BidHeaders.BidHeaderId, AwardsCatalogList.AwardCatalogId, Awards.AwardId, Bids.BidId,
round(case isnull(CrossRefs.DoNotDiscount,0) 
        when 0 then isnull(CrossRefs.GrossPrice,0) - round(AwardsCatalogList.DiscountRate * isnull(CrossRefs.GrossPrice,0) / 100,2) 
        else CrossRefs.GrossPrice 
      end,2) NetPrice
  from dbo.CrossRefs with (nolock)
  join dbo.Catalog on Catalog.CatalogId = CrossRefs.CatalogId
              and Catalog.Active = 1
  join dbo.AwardsCatalogList on AwardsCatalogList.CatalogId = CrossRefs.CatalogId
  join dbo.Awards on Awards.AwardId = AwardsCatalogList.AwardId
             and Awards.Active = 1
  join dbo.Bids on Bids.BidId = Awards.BidId
           and Bids.Active = 1
  join dbo.BidHeaders on BidHeaders.BidHeaderId = Bids.BidHeaderId
--                 and BidHeaders.EffectiveUntil >= CAST('11/01/2008' as datetime)
                 and BidHeaders.Active = 1
 where CrossRefs.Active = 1
```
