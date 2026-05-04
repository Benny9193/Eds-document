# View: `dbo.vw_TMLineItems`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `BidImportId` | int | NO |  |  |
| 3 | `Title` | varchar(255) | NO |  |  |
| 4 | `ItemCode` | varchar(50) | YES |  |  |
| 5 | `Description` | varchar(512) | NO |  |  |
| 6 | `UnitCode` | varchar(20) | NO |  |  |
| 7 | `BidPrice` | decimal(33,13) | YES |  |  |
| 8 | `Alternate` | varchar(512) | NO |  |  |
| 9 | `SortSeq` | varchar(64) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidImports` | USER_TABLE |
| `BidItems` | USER_TABLE |
| `Bids` | USER_TABLE |
| `Headings` | USER_TABLE |
| `Items` | USER_TABLE |
| `Keywords` | USER_TABLE |
| `Units` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_TMLineItems] as
select BidImports.BidHeaderId, BidImports.BidImportId, isnull(Headings.Title,'') Title, Items.ItemCode, isnull(Items.Description,'') Description, isnull(Units.Code,'') UnitCode, BidItems.Price - ROUND(BidItems.Price * Bids.BidDiscountRate / 100,2) BidPrice, ISNULL(BidItems.Alternate,'') Alternate, Items.SortSeq
  from Bids with (nolock)
  join BidImports on BidImports.BidImportId = Bids.BidImportId
  join BidItems on BidItems.BidId = Bids.BidId
  join Items on Items.ItemId = BidItems.ItemId
  join Units on Units.UnitId = Items.UnitId
  left outer join Headings on Headings.HeadingId = Items.HeadingId
  left outer join Keywords on Keywords.KeywordId = Items.KeywordId
 where Bids.Active = 1
```
