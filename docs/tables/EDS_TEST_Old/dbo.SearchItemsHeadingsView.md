# View: `dbo.SearchItemsHeadingsView`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `Title` | varchar(255) | NO |  |  |
| 3 | `Description` | varchar(4096) | YES |  |  |
| 4 | `HeadingId` | int | YES |  |  |
| 5 | `SearchLetter` | varchar(1) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidItems` | USER_TABLE |
| `Bids` | USER_TABLE |
| `Headings` | USER_TABLE |
| `Items` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[SearchItemsHeadingsView] as
select Bids.BidHeaderId,
isnull(Headings.Title,'Last Year''s Addenda') Title, Headings.Description, Headings.HeadingId, isnull(substring(Headings.Title,1,1),'') SearchLetter /*, dbo.uf_SearchKeywords(Headings.HeadingId) HeadingsKeywords*/
/*
 (select top 1 Headings.Title from Headings where Headings.HeadingId = Items.HeadingId and Headings.Active = 1) Title, 
 (select top 1 Headings.Description from Headings where Headings.HeadingId = Items.HeadingId and Headings.Active = 1) Description, 
(select top 1 Headings.HeadingId from Headings where Headings.HeadingId = Items.HeadingId and Headings.Active = 1) HeadingId, 
isnull(substring( (select top 1 Headings.Title from Headings where Headings.HeadingId = Items.HeadingId and Headings.Active = 1),1,1),'') SearchLetter, 
dbo.uf_SearchKeywords( (select top 1 Headings.HeadingId from Headings where Headings.HeadingId = Items.HeadingId and Headings.Active = 1)) HeadingsKeywords
*/
  from Items with (nolock)
  join BidItems on BidItems.ItemId = Items.ItemId
               and isnull(BidItems.Price,0) != 0
  join Bids on Bids.BidId = BidItems.BidId
           and Bids.Active = 1
--           and Bids.VendorId != 7691
  left outer join Headings on Headings.HeadingId = Items.HeadingId
                          and Headings.Active = 1
 where Items.Active = 1
 group by Bids.BidHeaderId, Headings.Title, Headings.Description, Headings.HeadingId
-- group by Bids.BidHeaderId, Items.headingId, BidItems.Price
```
