# View: `dbo.SearchItemsKeywordsView`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `Title` | varchar(255) | YES |  |  |
| 3 | `Description` | varchar(4096) | YES |  |  |
| 4 | `HeadingId` | int | YES |  |  |
| 5 | `Keyword` | varchar(50) | YES |  |  |
| 6 | `KeywordId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidItems` | USER_TABLE |
| `Bids` | USER_TABLE |
| `Headings` | USER_TABLE |
| `Items` | USER_TABLE |
| [`dbo.Keywords`](dbo.Keywords.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[SearchItemsKeywordsView] as
select BidHeaders.BidHeaderId, Headings.Title, Headings.Description, Items.HeadingId, Keywords.Keyword, Keywords.KeywordId
  from BidHeaders with (nolock)
  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
           and Bids.Active = 1
  join BidItems on BidItems.BidId = Bids.BidId
  join Items on Items.ItemId = BidItems.ItemId
            and Items.Active = 1
  join Headings on Headings.HeadingId = Items.HeadingId
               and Headings.Active = 1
  left outer join dbo.Keywords Keywords on Keywords.KeywordId = Items.KeywordId
                                                and Keywords.Active = 1
 group by BidHeaders.BidHeaderId, Headings.Title, Headings.Description, Items.HeadingId, Keywords.KeywordId, Keywords.Keyword
```
