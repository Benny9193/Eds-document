# View: `dbo.SearchItemsView`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `ItemId` | int | NO |  |  |
| 3 | `ItemCode` | varchar(50) | YES |  |  |
| 4 | `Description` | varchar(512) | YES |  |  |
| 5 | `Code` | varchar(20) | YES |  |  |
| 6 | `Title` | varchar(255) | YES |  |  |
| 7 | `HeadingsDescription` | varchar(4096) | YES |  |  |
| 8 | `Keyword` | varchar(50) | YES |  |  |
| 9 | `SortSeq` | varchar(64) | YES |  |  |
| 10 | `HeadingId` | int | YES |  |  |
| 11 | `KeywordId` | int | YES |  |  |
| 12 | `BidPrice` | decimal(33,13) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidItems` | USER_TABLE |
| `Bids` | USER_TABLE |
| `Headings` | USER_TABLE |
| `Items` | USER_TABLE |
| `Units` | USER_TABLE |
| [`dbo.Keywords`](dbo.Keywords.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[SearchItemsView] as
select Bids.BidHeaderId, 
       Items.ItemId, Items.ItemCode, Items.Description, Units.Code, 
       Headings.Title, Headings.Description HeadingsDescription, 
       Keywords.Keyword, Items.SortSeq, 
       Items.HeadingId, Items.KeywordId,
       round((BidItems.Price - ((isnull(Bids.BidDiscountRate,0) * BidItems.Price) / 100)),2) BidPrice
  from Bids with (nolock)
  join BidItems on BidItems.BidId = Bids.BidId
               and isnull(BidItems.Price,0) != 0
  join Items on Items.ItemId = BidItems.ItemId
            and Items.Active = 1
  left outer join Units on Units.UnitId = Items.UnitId
  left outer join Headings on Headings.HeadingId = Items.HeadingId
                          and Headings.Active = 1
  left outer join dbo.Keywords Keywords on Keywords.KeywordId = Items.KeywordId
                                                and Keywords.Active = 1
 where Bids.Active = 1
 group by Bids.BidHeaderId, Items.ItemId, Items.ItemCode, Items.Description, Units.Code, Headings.Title, Headings.Description, Keywords.Keyword, Items.SortSeq, Items.HeadingId, Items.KeywordId, BidItems.Price, Bids.BidDiscountRate
```
