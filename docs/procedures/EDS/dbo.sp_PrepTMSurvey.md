# Procedure: `dbo.sp_PrepTMSurvey`

_Generated on 2026-05-04T13:43:18.882Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_PrepTMSurvey` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2012-11-15 15:03:40 |
| Modified | 2013-10-06 23:15:25 |
| Encrypted | no |

## Parameters

_No parameters._

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `BidHeaders` | USER_TABLE |  |
| `BidTradeCounties` | USER_TABLE |  |
| `BidTrades` | USER_TABLE |  |
| `Counties` | USER_TABLE |  |
| `TMAwards` | USER_TABLE |  |
| `TMVendors` | USER_TABLE |  |
| `Trades` | USER_TABLE |  |
| `Vendors` | USER_TABLE |  |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_PrepTMSurvey] as
insert TMVendors (TMYear, VendorId, VendorName, TradeId, CountyId, Sequence)
select YEAR(getdate()), TMAwards.VendorId, Vendors.Name, Trades.TradeId, Counties.CountyId, case when TMAwards.AwardType like 'Primary%' then 1 when TMAwards.AwardType like 'Secondary%' then 2 else 99999999 end
  from TMAwards
  join BidHeaders on BidHeaders.BidHeaderId = TMAwards.BidHeaderId
                 and GETDATE() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
  join BidTradeCounties on BidTradeCounties.BidTradeCountyId = TMAwards.BidTradeCountyId
  join BidTrades on BidTrades.BidTradeId = BidTradeCounties.BidTradeId
                and BidTrades.BidHeaderId = TMAwards.BidHeaderId
  join Trades on Trades.TradeId = BidTrades.TradeId
  join Vendors on Vendors.VendorId = TMAwards.VendorId
  join Counties on Counties.CountyId = BidTradeCounties.CountyId
 where TMAwards.VendorId != 7691
   and TMAwards.Active = 1
 order by BidTradeCounties.BidTradeId, CountyId, AwardType
```
