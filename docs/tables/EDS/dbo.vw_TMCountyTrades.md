# View: `dbo.vw_TMCountyTrades`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `TMSurveyId` | int | NO |  |  |
| 2 | `BidTradeId` | int | NO |  |  |
| 3 | `Description` | varchar(255) | NO |  |  |
| 4 | `CountyId` | int | NO |  |  |
| 5 | `TMYear` | int | YES |  |  |
| 6 | `VendorCount` | int | YES |  |  |
| 7 | `PrevTradeId` | int | YES |  |  |
| 8 | `NextTradeId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidTradeCounties` | USER_TABLE |
| `BidTrades` | USER_TABLE |
| `Counties` | USER_TABLE |
| `TMSurvey` | USER_TABLE |
| `vw_TMTradesAwardedVendors` | VIEW |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_TMSurveys`](dbo.vw_TMSurveys.md) | VIEW |
| [`dbo.vw_TMTrades`](dbo.vw_TMTrades.md) | VIEW |

## Definition

```sql
--select * from vw_TMCountyTrades where TMSurveyId = 472 order by Description
--select * from Counties
CREATE   view  [dbo].[vw_TMCountyTrades] as
select TMSurvey.TMSurveyId, BidTrades.BidTradeId, BidTrades.Title Description, Counties.CountyId, year(getdate()) TMYear,
       (select count(*)
		  from BidTrades bt with (nolock)
		  join BidTradeCounties btc on btc.BidTradeId = bt.BidTradeId
				                   and btc.CountyId = TMSurvey.CountyId
		  join BidHeaders bh on bh.BidHeaderId = bt.BidHeaderId
						    and getdate() between bh.EffectiveFrom and bh.EffectiveUntil
		  join vw_TMTradesAwardedVendors av on av.BidHeaderId = bh.BidHeaderId
		                                   and av.BidTradeCountyId = btc.BidTradeCountyId
		 where bt.BidTradeId = BidTrades.BidTradeId ) VendorCount,
       PrevTrade.BidTradeId PrevTradeId,
	   NextTrade.BidTradeId NextTradeId
  from BidTrades with (nolock)
  join BidTradeCounties on BidTradeCounties.BidTradeId = BidTrades.BidTradeId
  join Counties on Counties.CountyId = BidTradeCounties.CountyId
  join TMSurvey on TMSurvey.CountyId = Counties.CountyId
  join BidHeaders on BidHeaders.BidHeaderId = BidTrades.BidHeaderId
                 and getdate() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
  outer apply ( select top 1 bt.BidTradeId
				  from BidTrades bt with (nolock)
				  join BidTradeCounties btc on btc.BidTradeId = bt.BidTradeId
				                           and btc.CountyId = TMSurvey.CountyId
				  join BidHeaders bh on bh.BidHeaderId = bt.BidHeaderId
								 and getdate() between bh.EffectiveFrom and bh.EffectiveUntil
				 where bt.Title < BidTrades.Title
				 order by bt.Title desc) PrevTrade
  outer apply ( select top 1 bt.BidTradeId
				  from BidTrades bt with (nolock)
				  join BidTradeCounties btc on btc.BidTradeId = bt.BidTradeId
				                           and btc.CountyId = TMSurvey.CountyId
				  join BidHeaders bh on bh.BidHeaderId = bt.BidHeaderId
								 and getdate() between bh.EffectiveFrom and bh.EffectiveUntil
				 where bt.Title > BidTrades.Title
				 order by bt.Title) NextTrade

 group by TMSurvey.TMSurveyId, TMSurvey.CountyId, BidTrades.BidTradeId, BidTrades.Title, Counties.CountyId, PrevTrade.BidTradeId, NextTrade.BidTradeId
```
