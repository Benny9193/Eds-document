# View: `dbo.vw_BidType`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `CategoryType` | int | YES |  |  |
| 3 | `Grouping` | varchar(50) | YES |  |  |
| 4 | `TradeCount` | int | YES |  |  |
| 5 | `ItemCount` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidRequestItems` | USER_TABLE |
| `BidTrades` | USER_TABLE |
| `Category` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_BidType] as
select BidHeaderId, Category.Type CategoryType, Category.Grouping,
       (select COUNT(*)
          from BidTrades with (nolock)
         where BidTrades.BidHeaderId = BidHeaders.BidHeaderId) TradeCount,
       (select COUNT(*)
          from BidRequestItems with (nolock)
         where BidRequestItems.BidHeaderId = BidHeaders.BidHeaderId
           and BidRequestItems.Active = 1) ItemCount
  from BidHeaders with (nolock)
  join Category on Category.CategoryId = BidHeaders.CategoryId
 where BidHeaders.Active = 1
```
