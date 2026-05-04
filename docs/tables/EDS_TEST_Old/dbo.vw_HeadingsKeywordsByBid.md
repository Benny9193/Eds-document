# View: `dbo.vw_HeadingsKeywordsByBid`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `HeadingId` | int | NO |  |  |
| 3 | `HeadingTitle` | varchar(255) | NO |  |  |
| 4 | `KeywordId` | int | NO |  |  |
| 5 | `Keyword` | varchar(50) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `vw_ItemsByBid` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_HeadingsKeywordsByBid] as
select BidHeaderId, HeadingId, HeadingTitle, KeywordId, Keyword
  from vw_ItemsByBid
 group by BidHeaderId, HeadingId, HeadingTitle, KeywordId, Keyword
```
