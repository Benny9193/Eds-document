# View: `dbo.vw_TMSurveyData`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `TMSurveyResultId` | int | NO |  |  |
| 2 | `TMSurveyId` | int | NO |  |  |
| 3 | `TMVendorId` | int | NO |  |  |
| 4 | `Rating` | int | YES |  |  |
| 5 | `Comments` | varchar(max) | YES |  |  |
| 6 | `Name` | varchar(50) | YES |  |  |
| 7 | `Sequence` | varchar(50) | YES |  |  |
| 8 | `TradeId` | int | NO |  |  |
| 9 | `BidTradeId` | int | NO |  |  |
| 10 | `Title` | varchar(255) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidTradeCounties` | USER_TABLE |
| `BidTrades` | USER_TABLE |
| `TMSurvey` | USER_TABLE |
| `TMSurveyResults` | USER_TABLE |
| `Vendors` | USER_TABLE |
| `vw_TMTradesAwardedVendors` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
--select * from vw_TMSurveyData where TMSurveyId = 642

CREATE   view  [dbo].[vw_TMSurveyData] as
select sr.TMSurveyResultId, sr.TMSurveyId, sr.TMVendorId, sr.Rating, sr.Comments, Vendors.Name, av.AwardType Sequence, BidTrades.TradeId, BidTrades.BidTradeId, av.Title
  from TMSurveyResults sr with (nolock)
  join TMSurvey on TMSurvey.TMSurveyId = sr.TMSurveyId
  join BidTradeCounties on BidTradeCounties.BidTradeCountyId = sr.BidTradeCountyId
  join vw_TMTradesAwardedVendors av on av.VendorId = sr.TMVendorId
                                   and av.BidTradeCountyId = BidTradeCounties.BidTradeCountyId
  join Vendors on Vendors.VendorId = av.VendorId
  join BidTrades on BidTrades.BidTradeId = BidTradeCounties.BidTradeId
```
