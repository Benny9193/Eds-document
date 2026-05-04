# View: `dbo.vw_BidPricing`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `ItemId` | int | NO |  |  |
| 3 | `ItemCode` | varchar(50) | YES |  |  |
| 4 | `ItemDescription` | varchar(1156) | YES |  |  |
| 5 | `UOM` | varchar(20) | YES |  |  |
| 6 | `VendorItemCode` | varchar(50) | NO |  |  |
| 7 | `ItemBidType` | varchar(32) | NO |  |  |
| 8 | `Alternate` | varchar(512) | NO |  |  |
| 9 | `PageNo` | int | NO |  |  |
| 10 | `NetPrice` | decimal(33,13) | NO |  |  |
| 11 | `SortSeq` | varchar(64) | YES |  |  |
| 12 | `VendorName` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidItems` | USER_TABLE |
| `Bids` | USER_TABLE |
| `Items` | USER_TABLE |
| `Units` | USER_TABLE |
| `Vendors` | USER_TABLE |
| `vw_ItemDescription` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_BidPricing] as
select BidHeaders.BidHeaderId, Items.ItemId, Items.ItemCode, id.ItemDescription, Units.Code UOM, isnull(BidItems.VendorItemCode,'') VendorItemCode, isnull(BidItems.ItemBidType,'') ItemBidType, isnull(BidItems.Alternate,'') Alternate, isnull(BidItems.PageNo,'') PageNo, isnull(BidItems.Price - round(BidItems.Price * Bids.BidDiscountRate / 100,2),0) NetPrice, Items.SortSeq, Vendors.Name VendorName
  from BidHeaders with (nolock)
  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
           and Bids.Active = 1
  join BidItems on BidItems.BidId = Bids.BidId
  join Items on Items.ItemId = BidItems.ItemId
            and Items.Active = 1
  join Units on Units.UnitId = Items.UnitId
  join Vendors on Vendors.VendorId = Bids.VendorId
  join vw_ItemDescription id on id.ItemId = Items.ItemId
```
