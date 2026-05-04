# View: `dbo.vw_VendorBlast_AwardedByBid`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorID` | int | YES |  |  |
| 2 | `BidHeaderId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Bids` | USER_TABLE |
| `TMAwards` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_VendorBlast_AwardedByBid] as
select Bids.VendorID, Bids.BidHeaderId
  from Bids with (nolock)
 where Bids.Active = 1
 group by Bids.VendorId, Bids.BidHeaderId
union (
  select TMAwards.VendorId, TMAwards.BidHeaderId
    from TMAwards with (nolock)
   where TMAwards.Active = 1
   group by TMAwards.VendorId, TMAwards.BidHeaderId
)
```
