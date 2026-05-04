# View: `dbo.vw_BidTradesVendorsAnswers`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidImportId` | int | NO |  |  |
| 2 | `BidTradeCountyId` | int | NO |  |  |
| 3 | `Sequence` | int | YES |  |  |
| 4 | `BidEntryDisplayLabel` | varchar(255) | YES |  |  |
| 5 | `BidAnswer` | varchar(4148) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidImports` | USER_TABLE |
| `BidQuestions` | USER_TABLE |
| `BidTradeCounties` | USER_TABLE |
| `BidTrades` | USER_TABLE |
| `Category` | USER_TABLE |
| `Counties` | USER_TABLE |
| `States` | USER_TABLE |
| `TMAwards` | USER_TABLE |
| `Trades` | USER_TABLE |
| `Vendors` | USER_TABLE |
| `vw_BidAnswers` | VIEW |
| `dbo.uf_FormatData` | SQL_SCALAR_FUNCTION |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_BidTradesVendorsAnswers] as
select BidImports.BidImportId, BidTradeCounties.BidTradeCountyId, ba.Sequence, ba.BidEntryDisplayLabel, dbo.uf_FormatData(bq.AnswerTypeMask, ba.BidAnswer) + case when ba.AnswerTypeId in (2,3,5) then '%' else '' end + case rtrim(isnull(ba.UOM,'')) when '' then '' else '/' + rtrim(ba.uom) end BidAnswer
  from States with (nolock)
  join Counties on Counties.StateId = States.StateId
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
                      and bq.ExtdCalcTypeId not in (4,5,6)
 where BidHeaders.Active = 1
```
