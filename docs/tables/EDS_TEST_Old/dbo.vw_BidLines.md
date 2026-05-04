# View: `dbo.vw_BidLines`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `BidImportId` | int | NO |  |  |
| 3 | `VendorId` | int | YES |  |  |
| 4 | `ItemCode` | varchar(50) | YES |  |  |
| 5 | `Description` | varchar(512) | YES |  |  |
| 6 | `Title` | varchar(255) | YES |  |  |
| 7 | `Keyword` | varchar(50) | YES |  |  |
| 8 | `UnitPrice` | decimal(11,2) | YES |  |  |
| 9 | `UOM` | varchar(20) | YES |  |  |
| 10 | `VendorItemCode` | varchar(50) | YES |  |  |
| 11 | `Alternate` | varchar(512) | YES |  |  |
| 12 | `HeadingId` | int | NO |  |  |
| 13 | `KeywordId` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
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
create   view  [dbo].[vw_BidLines] as
select BidHeaders.BidHeaderId, BidImports.BidImportId, BidImports.VendorId, Items.ItemCode, Items.Description, Headings.Title, Keywords.Keyword, cast(BidItems.Price - ROUND(BidItems.Price * Bids.BidDiscountRate / 100,2) as decimal(11,2)) UnitPrice, Units.Code UOM, BidItems.VendorItemCode, BidItems.Alternate, isnull(Headings.HeadingId,0) HeadingId, isnull(Keywords.KeywordId,0) KeywordId
  from BidHeaders
  join BidImports on BidImports.BidHeaderId = BidHeaders.BidHeaderId
  join Bids on Bids.BidImportId = BidImports.BidImportId
           and Bids.Active = 1
  join BidItems on BidItems.BidId = Bids.BidId
  join Items on Items.ItemId = BidItems.ItemId
  left outer join Units on Units.UnitId = Items.UnitId
  left outer join Headings on Headings.HeadingId = Items.HeadingId
  left outer join Keywords on Keywords.KeywordId = Items.KeywordId
```
