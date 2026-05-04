# View: `dbo.vw_BidTradesBySession_Test`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SessionId` | int | NO |  |  |
| 2 | `Description` | varchar(255) | YES |  |  |
| 3 | `TradeTitle` | varchar(255) | NO |  |  |
| 4 | `PackageNumber` | int | NO |  |  |
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
| `Budgets` | USER_TABLE |
| `Category` | USER_TABLE |
| `Counties` | USER_TABLE |
| `District` | USER_TABLE |
| `PricePlans` | USER_TABLE |
| `SessionTable` | USER_TABLE |
| `States` | USER_TABLE |
| `TMAwards` | USER_TABLE |
| `Trades` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE   view  [dbo].[vw_BidTradesBySession_Test] as
select SessionTable.SessionId, Trades.Description, BidTrades.Title TradeTitle, /*Trades.PackageNumber*/ 0 PackageNumber, BidTradeCounties.BidTradeCountyId, BidHeaders.BidDate, BidHeaders.BidAwardDate, BidHeaders.EffectiveFrom, BidHeaders.EffectiveUntil, BidHeaders.BidHeaderId
  from SessionTable with (nolock)
  join Budgets on Budgets.BudgetId = SessionTable.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
  join States on States.code = District.State
  join BidHeaders on BidHeaders.StateId = States.StateId
                 and BidHeaders.Active = 1
                 and GETDATE() between case when Sessiontable.ApprovalLevel > 5 then dateadd(month,-2,BidHeaders.EffectiveFrom) else BidHeaders.EffectiveFrom end and BidHeaders.EffectiveUntil
  join BidTrades on BidTrades.BidHeaderId = BidHeaders.BidHeaderId
  join BidTradeCounties on BidTradeCounties.BidTradeId = BidTrades.BidTradeId
  join Counties on Counties.CountyId = BidTradeCounties.CountyId
               and Counties.StateId = States.StateId
               and (Counties.Name = District.County
			        or Counties.Name = 'Statewide')
  join Trades on Trades.TradeId = BidTrades.TradeId
             and Trades.Active = 1
  join Category on Category.CategoryId = BidHeaders.CategoryId
               and Category.Type in (3,4)
               and Category.Grouping = 'Trades'
  join PricePlans on PricePlans.PricePlanId = BidHeaders.PricePlanId
 where exists(select TMAwards.TMAwardId
                from TMAwards with (nolock)
               where TMAwards.BidHeaderId = BidHeaders.BidHeaderId
                 and TMAwards.Active = 1
                 and TMAwards.VendorId not IN (7691, 7692)
				 and TMAwards.BidTradeCountyId = BidTradeCounties.BidTradeCountyId)
```
