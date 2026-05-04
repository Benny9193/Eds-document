# View: `dbo.vw_BidTradesVendorsAnswersBySession`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidImportId` | int | NO |  |  |
| 2 | `BidTradeCountyId` | int | NO |  |  |
| 3 | `Sequence` | int | YES |  |  |
| 4 | `QuestionText` | varchar(max) | NO |  |  |
| 5 | `BidAnswer` | varchar(512) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidImports` | USER_TABLE |
| `BidQuestions` | USER_TABLE |
| `BidTradeCounties` | USER_TABLE |
| `BidTrades` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Category` | USER_TABLE |
| `Counties` | USER_TABLE |
| `District` | USER_TABLE |
| `SessionTable` | USER_TABLE |
| `States` | USER_TABLE |
| `TMAwards` | USER_TABLE |
| `Trades` | USER_TABLE |
| `Vendors` | USER_TABLE |
| `vw_BidAnswers` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_BidTradesVendorsAnswersBySession] as
select BidImports.BidImportId, BidTradeCounties.BidTradeCountyId, ba.Sequence, ba.QuestionText, ba.BidAnswer
  from SessionTable with (nolock)
  join Budgets on Budgets.BudgetId = SessionTable.BudgetId
  join District on District.DistrictId = Budgets.DistrictId
  join States on States.code = District.State
  join Counties on Counties.Name = District.County
               and Counties.StateId = States.StateId
  join BidTradeCounties on BidTradeCounties.CountyId = Counties.CountyId
  join BidTrades on BidTrades.BidTradeId = BidTradeCounties.BidTradeId
  join Trades on Trades.TradeId = BidTrades.TradeId
  join BidHeaders on BidHeaders.StateId = States.StateId
                 and BidTrades.BidHeaderId = BidHeaders.BidHeaderId
  join Category on Category.CategoryId = BidHeaders.CategoryId
               and Category.Type in (3, 4)
  join TMAwards on TMAwards.BidHeaderId = BidHeaders.BidHeaderId
               and TMAwards.BidTradeCountyId = BidTradeCounties.BidTradeCountyId
               and TMAwards.Active = 1
  join Vendors on Vendors.VendorId = TMAwards.VendorId
  join BidImports on BidImports.BidImportId = TMAwards.BidImportId
  join vw_BidAnswers ba on ba.BidImportId = BidImports.BidImportId
                       and ba.BidTradeId = BidTrades.BidTradeId
                       and ba.CountyId = Counties.CountyId
  join BidQuestions bq on bq.BidQuestionId = ba.BidQuestionId
 where BidHeaders.Active = 1
```
