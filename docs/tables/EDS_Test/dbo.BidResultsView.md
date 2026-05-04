# View: `dbo.BidResultsView`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidResultsId` | int | NO |  |  |
| 2 | `BidImportId` | int | YES |  |  |
| 3 | `BidHeaderId` | int | YES |  |  |
| 4 | `BidRequestItemId` | int | YES |  |  |
| 5 | `CategoryId` | int | YES |  |  |
| 6 | `DistrictId` | int | YES |  |  |
| 7 | `ItemId` | int | YES |  |  |
| 8 | `ItemCode` | varchar(50) | YES |  |  |
| 9 | `Units` | varchar(16) | YES |  |  |
| 10 | `Alternate` | varchar(512) | YES |  |  |
| 11 | `Quantity` | int | YES |  |  |
| 12 | `ItemBidType` | char(1) | YES |  |  |
| 13 | `UnitPrice` | money | YES |  |  |
| 14 | `Cost` | money | YES |  |  |
| 15 | `VendorItemCode` | varchar(50) | YES |  |  |
| 16 | `QuantityBid` | int | YES |  |  |
| 17 | `ItemsPerUnit` | varchar(50) | YES |  |  |
| 18 | `UnitId` | int | YES |  |  |
| 19 | `Status` | varchar(51) | YES |  |  |
| 20 | `Comments` | varchar(1024) | YES |  |  |
| 21 | `Active` | int | YES |  |  |
| 22 | `ItemDescription` | varchar(1024) | YES |  |  |
| 23 | `SortSeq` | varchar(64) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidResults` | USER_TABLE |
| `Items` | USER_TABLE |
| `dbo.uf_ItemDescription` | SQL_SCALAR_FUNCTION |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[BidResultsView] as
select BidResults.BidResultsId, BidResults.BidImportId, BidResults.BidHeaderId, BidResults.BidRequestItemId, BidResults.CategoryId, BidResults.DistrictId, BidResults.ItemId,
BidResults.ItemCode, BidResults.Units, BidResults.Alternate, BidResults.Quantity, BidResults.ItemBidType, BidResults.UnitPrice, BidResults.Cost, BidResults.VendorItemCode,
BidResults.QuantityBid, BidResults.ItemsPerUnit, BidResults.UnitId,Status, BidResults.Comments, BidResults.Active, dbo.uf_ItemDescription(BidResults.ItemId) ItemDescription, Items.SortSeq
  from BidResults with (nolock)
  join Items on Items.ItemId = BidResults.ItemId
```
