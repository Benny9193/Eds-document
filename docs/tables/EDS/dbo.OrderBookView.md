# View: `dbo.OrderBookView`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `OrderBookId` | int | NO |  |  |
| 2 | `PricePlanDescription` | varchar(255) | YES |  |  |
| 3 | `Category` | varchar(255) | YES |  |  |
| 4 | `PricePlanId` | int | YES |  |  |
| 5 | `CategoryId` | int | YES |  |  |
| 6 | `AwardId` | int | YES |  |  |
| 7 | `BookType` | varchar(11) | NO |  |  |
| 8 | `Active` | int | YES |  |  |
| 9 | `BidHeaderId` | int | YES |  |  |
| 10 | `DistrictId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.OrderBooks`](dbo.OrderBooks.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[OrderBookView] as
select OrderBookId, PricePlanDescription, Category, PricePlanId, CategoryId, AwardId, 
case Type 
  when 'O' then 'Order Book' 
  when 'B' then 'Budget Book' 
  else 'Unknown' end BookType, 
Active, BidHeaderId, DistrictId
from dbo.OrderBooks with (nolock)
```
