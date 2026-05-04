# View: `dbo.OrderBookDetailView`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `OrderBookDetailId` | int | NO |  |  |
| 2 | `OrderBookId` | int | NO |  |  |
| 3 | `ItemCode` | varchar(50) | YES |  |  |
| 4 | `UnitCode` | varchar(20) | YES |  |  |
| 5 | `GrossPrice` | money | YES |  |  |
| 6 | `CatalogPage` | varchar(4) | YES |  |  |
| 7 | `CatalogYear` | varchar(2) | YES |  |  |
| 8 | `VendorName` | varchar(255) | YES |  |  |
| 9 | `VendorItemCode` | varchar(50) | YES |  |  |
| 10 | `TotalQuantity` | int | NO |  |  |
| 11 | `TotalRequisitions` | int | NO |  |  |
| 12 | `ExpandAll` | tinyint | YES |  |  |
| 13 | `Weight` | int | NO |  |  |
| 14 | `SortSeq` | varchar(64) | YES |  |  |
| 15 | `Active` | tinyint | YES |  |  |
| 16 | `Alternate` | varchar(1024) | YES |  |  |
| 17 | `VendorId` | int | YES |  |  |
| 18 | `VendorCode` | varchar(16) | YES |  |  |
| 19 | `ItemDescription` | varchar(512) | YES |  |  |
| 20 | `HeadingId` | int | YES |  |  |
| 21 | `HeadingCode` | varchar(16) | YES |  |  |
| 22 | `HeadingTitle` | varchar(255) | YES |  |  |
| 23 | `HeadingDescription` | varchar(4096) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `Headings` | USER_TABLE |
| `Items` | USER_TABLE |
| `Units` | USER_TABLE |
| `Vendors` | USER_TABLE |
| [`dbo.OrderBookDetail`](dbo.OrderBookDetail.md) | USER_TABLE |
| [`dbo.OrderBooks`](dbo.OrderBooks.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[OrderBookDetailView] as

SELECT OrderBookDetailId, OrderBooks.OrderBookId, Items.ItemCode AS ItemCode, Units.Code UnitCode, OrderBookDetail.GrossPrice, OrderBookDetail.CatalogPage, OrderBookDetail.CatalogYear, OrderBookDetail.VendorName, OrderBookDetail.VendorItemCode, /*TotalQuantity*/ 0 TotalQuantity, /*TotalRequisitions*/ 0 TotalRequisitions, Headings.ExpandAll AS ExpandAll, /*Weight*/ 0 Weight, Items.SortSeq AS SortSeq, OrderBookDetail.Active AS Active, OrderBookDetail.Alternate, OrderBookDetail.VendorId, Vendors.Code VendorCode, Items.Description AS ItemDescription, Items.HeadingId AS HeadingId, Headings.Code as HeadingCode, Headings.Title AS HeadingTitle, Headings.Description AS HeadingDescription 
FROM dbo.OrderBookDetail OrderBookDetail with (nolock)
join dbo.OrderBooks OrderBooks on OrderBooks.OrderBookId = OrderBookDetail.OrderBookId
LEFT JOIN Items ON OrderBookDetail.ItemId = Items.ItemId
LEFT JOIN Units on Units.UnitId = Items.UnitId
LEFT JOIN Headings ON Items.HeadingId = Headings.HeadingId
left outer join Vendors on Vendors.VendorId = OrderBookDetail.VendorId
```
