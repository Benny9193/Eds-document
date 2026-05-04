# View: `dbo.vw_LatestCrossRef`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `ItemId` | int | YES |  |  |
| 3 | `CrossRefId` | int | NO |  |  |
| 4 | `CatalogYear` | char(2) | YES |  |  |
| 5 | `CatalogPrice` | money | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Bids`](dbo.Bids.md) | USER_TABLE |
| [`dbo.BidsCatalogList`](dbo.BidsCatalogList.md) | USER_TABLE |
| [`dbo.Catalog`](dbo.Catalog.md) | USER_TABLE |
| [`dbo.CrossRefs`](dbo.CrossRefs.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_LatestCrossRef]  
as
select Bids.BidHeaderId, CrossRefs.ItemId, CrossRefs.CrossRefId, CrossRefs.CatalogYear, CrossRefs.CatalogPrice
  from dbo.CrossRefs with (nolock)
  join dbo.Catalog as cat on cat.CatalogId = CrossRefs.CatalogId
  join dbo.BidsCatalogList on BidsCatalogList.CatalogId = Cat.CatalogId
  join dbo.Bids on Bids.BidId = BidsCatalogList.BidId
 where CrossRefs.Active = 1
```
