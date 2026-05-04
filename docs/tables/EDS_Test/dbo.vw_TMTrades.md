# View: `dbo.vw_TMTrades`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `TMSurveyId` | int | NO |  |  |
| 2 | `TradeId` | int | NO |  |  |
| 3 | `TMYear` | int | YES |  |  |
| 4 | `CountyId` | int | NO |  |  |
| 5 | `Description` | varchar(255) | NO |  |  |
| 6 | `PrevTradeId` | int | YES |  |  |
| 7 | `NextTradeId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `vw_TMCountyTrades` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE   view  [dbo].[vw_TMTrades] as
  select ct.TMSurveyId, ct.BidTradeId TradeId, ct.TMYear, ct.CountyId, ct.Description, lag(ct.BidTradeId) over(partition by ct.TMSurveyId order by ct.Description) PrevTradeId, lead(ct.BidTradeId) over(partition by ct.TMSurveyId order by ct.Description) NextTradeId
    from vw_TMCountyTrades ct
   where ct.VendorCount > 0
/*select TMSurvey.TMSurveyId, TMVendors.TradeId, TMVendors.TMYear, TMSurvey.CountyId, Trades.Description,
       (select Top 1 tmv.TradeId 
          from TMVendors tmv with (nolock)
          join Trades tr on tr.TradeId = tmv.TradeId
         where TMV.TMYear = TMVendors.TMYear
           and TMV.CountyId = TMSurvey.CountyId
           and tr.Description < Trades.Description
         order by tr.Description desc) PrevTradeId,
       (select Top 1 tmv.TradeId 
          from TMVendors tmv with (nolock)
          join Trades tr on tr.TradeId = tmv.TradeId
         where TMV.TMYear = TMVendors.TMYear
           and TMV.CountyId = TMSurvey.CountyId
           and tr.Description > Trades.Description
         order by tr.Description ) NextTradeId
  from TMSurvey
  join TMVendors on TMVendors.CountyId = TMSurvey.CountyId
  join Trades on Trades.TradeId = TMVendors.TradeId
 group by TMSurvey.TMSurveyId, TMVendors.TradeId, TMVendors.TMYear, TMSurvey.CountyId, Trades.Description
 */
```
