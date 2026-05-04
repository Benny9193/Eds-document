# View: `dbo.vw_LastBidAwardDate`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `LastAwardDate` | varchar(30) | NO |  |  |
| 3 | `LastAwardDateSort` | varchar(30) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `Bids` | USER_TABLE |
| `Category` | USER_TABLE |
| `TMAwards` | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_RptMarkedReadyEmailBlastStats`](dbo.vw_RptMarkedReadyEmailBlastStats.md) | VIEW |

## Definition

```sql
CREATE     view  [dbo].[vw_LastBidAwardDate]
AS
select BidHeaders.BidHeaderId, 
       isnull(convert(varchar, 
       ( 
       Case Category.[Type]
       When 3 Then -- Trades bid
         (select top 1 TMAwards.DateModified
          from TMAwards 
          where TMAwards.Active=1 and TMAwards.BidHeaderId=BidHeaders.BidHeaderId and TMAwards.VendorId != 7691 
          order by TMAwards.DateModified desc
          ) 
       Else -- all other bids e.g. Items Bid and MSRP
         (select top 1 Bids.DateModified
          from Bids 
          where Bids.Active=1 and Bids.BidHeaderId=BidHeaders.BidHeaderId and Bids.VendorId != 7691 
          order by Bids.DateModified desc
          ) 
       End 
       )
       , 1),'Not Awarded') LastAwardDate,
       isnull(convert(varchar, 
       ( 
       Case Category.[Type]
       When 3 Then -- Trades bid
         (select top 1 TMAwards.DateModified
          from TMAwards 
          where TMAwards.Active=1 and TMAwards.BidHeaderId=BidHeaders.BidHeaderId and TMAwards.VendorId != 7691 
          order by TMAwards.DateModified desc
          ) 
       Else -- all other bids e.g. Items Bid and MSRP
         (select top 1 Bids.DateModified
          from Bids 
          where Bids.Active=1 and Bids.BidHeaderId=BidHeaders.BidHeaderId and Bids.VendorId != 7691 
          order by Bids.DateModified desc
          ) 
       End 
       )
       , 112),'') LastAwardDateSort
FROM BidHeaders
Join Category ON Category.CategoryId = BidHeaders.CategoryId
--Where BidHeaders.BidHeaderId = 7565
```
