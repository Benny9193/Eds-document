# View: `dbo.BidItemView`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Title` | varchar(255) | YES |  |  |
| 2 | `Keyword` | varchar(50) | YES |  |  |
| 3 | `ItemCode` | varchar(50) | YES |  |  |
| 4 | `Description` | varchar(1024) | YES |  |  |
| 5 | `UnitCode` | varchar(20) | YES |  |  |
| 6 | `Alternate` | varchar(512) | YES |  |  |
| 7 | `VendorItemCode` | varchar(50) | YES |  |  |
| 8 | `SortSeq` | varchar(64) | YES |  |  |
| 9 | `HeadingId` | int | YES |  |  |
| 10 | `KeywordId` | int | YES |  |  |
| 11 | `ItemId` | int | NO |  |  |
| 12 | `BidHeaderId` | int | YES |  |  |
| 13 | `BidPrice` | decimal(29,9) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidItems` | USER_TABLE |
| `Bids` | USER_TABLE |
| `CrossRefs` | USER_TABLE |
| `Headings` | USER_TABLE |
| `Items` | USER_TABLE |
| `Units` | USER_TABLE |
| [`dbo.Keywords`](dbo.Keywords.md) | USER_TABLE |
| `dbo.uf_ItemDescription` | SQL_SCALAR_FUNCTION |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[BidItemView] as

select Headings.Title, Keywords.Keyword, Items.ItemCode, dbo.uf_ItemDescription(Items.ItemId) Description, Units.Code UnitCode, BidItems.Alternate, CrossRefs.VendorItemCode, Items.SortSeq, Items.HeadingId, Items.KeywordId, Items.ItemId, BidHeaders.BidHeaderId, isnull(BidItems.Price,0) - (isnull(BidItems.Price,0) * isnull(Bids.BidDiscountRate,0)) BidPrice
  from BidHeaders with (nolock)
  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
           and Bids.Active = 1
  join BidItems on BidItems.BidId = Bids.BidId
  join Items on Items.ItemId = BidItems.ItemId
  join Units on Units.UnitId = Items.UnitId
  left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
  left outer join Headings on Headings.HeadingId = Items.HeadingId
  left outer join dbo.Keywords Keywords on Keywords.KeywordId = Items.KeywordId
```
