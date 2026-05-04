# View: `dbo.vw_DetailOnBid`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DetailId` | int | YES |  |  |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `BidAwardDate` | datetime | YES |  |  |
| 4 | `EffectiveFrom` | datetime | YES |  |  |
| 5 | `EffectiveUntil` | datetime | YES |  |  |
| 6 | `ReadyToUseDate` | datetime | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaderDetail` | USER_TABLE |
| `BidHeaders` | USER_TABLE |
| `BidRequestItems` | USER_TABLE |
| `PricePlans` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_ReqDetail`](dbo.vw_ReqDetail.md) | VIEW |
| [`dbo.vw_ReqDetail_BK20241205`](dbo.vw_ReqDetail_BK20241205.md) | VIEW |
| [`dbo.vw_ReqDetail_BK20241227`](dbo.vw_ReqDetail_BK20241227.md) | VIEW |

## Definition

```sql
CREATE       view  [dbo].[vw_DetailOnBid] as
select bhd.DetailId, bh1.BidHeaderId, bh1.BidAwardDate, bh1.EffectiveFrom, bh1.EffectiveUntil, bh1.ReadyToUseDate
  from BidHeaderDetail bhd
  join BidRequestItems bri on bri.BidRequestItemId = bhd.BidRequestItemId
                          and bri.Active = 1
  join BidHeaders bh1 on bh1.BidHeaderId = bhd.BidHeaderId
  				     and bh1.Active = 1
				     and getdate() between bh1.EffectiveFrom and bh1.EffectiveUntil
--				     and getdate() between isnull(bh1.EffectiveFrom,GETDATE()) and isnull(bh1.EffectiveUntil,getdate())
  join PricePlans on PricePlans.PricePlanId = bh1.PricePlanId
                 and PricePlans.Code != 'ZZ'
```
