# View: `dbo.vw_BidTrades`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `StateCode` | char(2) | YES |  |  |
| 2 | `StateName` | varchar(50) | YES |  |  |
| 3 | `CountyName` | varchar(50) | NO |  |  |
| 4 | `TradeName` | varchar(255) | YES |  |  |
| 5 | `BidTradeCountyId` | int | NO |  |  |
| 6 | `BidDate` | datetime | YES |  |  |
| 7 | `BidAwardDate` | datetime | YES |  |  |
| 8 | `EffectiveFrom` | datetime | YES |  |  |
| 9 | `EffectiveUntil` | datetime | YES |  |  |
| 10 | `BidHeaderId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidTradeCounties` | USER_TABLE |
| `BidTrades` | USER_TABLE |
| `Category` | USER_TABLE |
| `Counties` | USER_TABLE |
| `PricePlans` | USER_TABLE |
| `States` | USER_TABLE |
| `Trades` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_BidTrades] as
select States.code StateCode, States.Name StateName, Counties.Name CountyName, Trades.Description TradeName, BidTradeCounties.BidTradeCountyId, BidHeaders.BidDate, BidHeaders.BidAwardDate, BidHeaders.EffectiveFrom, BidHeaders.EffectiveUntil, BidHeaders.BidHeaderId
  from States with (nolock)
  join BidHeaders on BidHeaders.StateId = States.StateId
                 and BidHeaders.Active = 1
--                 and GETDATE() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
  join BidTrades on BidTrades.BidHeaderId = BidHeaders.BidHeaderId
  join BidTradeCounties on BidTradeCounties.BidTradeId = BidTrades.BidTradeId
  join Counties on Counties.CountyId = BidTradeCounties.CountyId
               and Counties.StateId = States.StateId
  join Trades on Trades.TradeId = BidTrades.TradeId
             and Trades.Active = 1
  join Category on Category.CategoryId = BidHeaders.CategoryId
               and Category.Type in (3,4)
  join PricePlans on PricePlans.PricePlanId = BidHeaders.PricePlanId
```
