# View: `dbo.vw_HeadingsByBid`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `HeadingId` | int | NO |  |  |
| 3 | `HeadingTitle` | varchar(255) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidItems` | USER_TABLE |
| `Bids` | USER_TABLE |
| `Headings` | USER_TABLE |
| `Items` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_HeadingsByBid] as
select BidHeaders.BidHeaderId, Headings.HeadingId, Headings.Title HeadingTitle
--  from vw_ItemsByBid with (nolock)
  from BidHeaders with (nolock)
  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
           and Bids.Active = 1
  join BidItems on BidItems.BidId = Bids.BidId
  join Items on Items.ItemId = BidItems.ItemId
            and Items.Active = 1
  join Headings on Headings.HeadingId = Items.HeadingId
 group by BidHeaders.BidHeaderId, Headings.HeadingId, Headings.Title
```
