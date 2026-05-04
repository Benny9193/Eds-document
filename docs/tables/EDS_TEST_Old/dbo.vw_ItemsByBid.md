# View: `dbo.vw_ItemsByBid`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `CategoryId` | int | YES |  |  |
| 3 | `ItemId` | int | NO |  |  |
| 4 | `ItemCode` | varchar(50) | NO |  |  |
| 5 | `ItemDescription` | varchar(1156) | NO |  |  |
| 6 | `UnitCode` | varchar(20) | NO |  |  |
| 7 | `HeadingId` | int | NO |  |  |
| 8 | `HeadingTitle` | varchar(255) | NO |  |  |
| 9 | `KeywordId` | int | NO |  |  |
| 10 | `Keyword` | varchar(50) | NO |  |  |
| 11 | `VendorId` | int | NO |  |  |
| 12 | `VendorName` | varchar(50) | NO |  |  |
| 13 | `SortSeq` | varchar(64) | YES |  |  |
| 14 | `NetPrice` | decimal(33,13) | YES |  |  |
| 15 | `CatalogName` | varchar(50) | NO |  |  |
| 16 | `CatalogPrice` | money | NO |  |  |
| 17 | `RequisitionId` | int | NO |  |  |
| 18 | `DetailId` | int | NO |  |  |
| 19 | `Quantity` | int | NO |  |  |
| 20 | `Alternate` | varchar(512) | NO |  |  |
| 21 | `ItemBidType` | varchar(32) | NO |  |  |
| 22 | `PageNo` | int | NO |  |  |
| 23 | `VendorItemCode` | varchar(50) | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidItems` | USER_TABLE |
| `Bids` | USER_TABLE |
| `Catalog` | USER_TABLE |
| `CrossRefs` | USER_TABLE |
| `Detail` | USER_TABLE |
| `Headings` | USER_TABLE |
| `Items` | USER_TABLE |
| `Keywords` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `Units` | USER_TABLE |
| `Vendors` | USER_TABLE |
| `vw_ItemDescription` | VIEW |

## Used by

| Object | Type |
|--------|------|
| [`dbo.vw_HeadingsKeywordsByBid`](dbo.vw_HeadingsKeywordsByBid.md) | VIEW |
| [`dbo.vw_KeywordsByBid`](dbo.vw_KeywordsByBid.md) | VIEW |
| [`dbo.vw_VendorsByBid`](dbo.vw_VendorsByBid.md) | VIEW |

## Definition

```sql
create   view  [dbo].[vw_ItemsByBid] as
select BidHeaders.BidHeaderId, Items.CategoryId, Items.ItemId, isnull(Items.ItemCode,'') ItemCode, isnull(id.ItemDescription,'') ItemDescription, isnull(Units.Code,'') UnitCode, isnull(Headings.HeadingId,0) HeadingId, isnull(Headings.Title,'') HeadingTitle, isnull(Keywords.KeywordId,0) KeywordId, isnull(Keywords.Keyword,'') Keyword, isnull(Vendors.VendorId,0) VendorId, ISNULL(Vendors.Name,'') VendorName, Items.SortSeq, isnull(BidItems.Price,0) - ROUND(isnull(BidItems.Price,0) * (isnull(Bids.BidDiscountRate,0) / 100),2) NetPrice, isnull(Catalog.Name,'') CatalogName, ISNULL(CrossRefs.CatalogPrice,0) CatalogPrice, Requisitions.RequisitionId, isnull(Detail.DetailId,0) DetailId, isnull(Detail.Quantity,0) Quantity, isnull(BidItems.Alternate,'') Alternate, isnull(BidItems.ItemBidType,'') ItemBidType, isnull(BidItems.PageNo,0) PageNo, ISNULL(BidItems.VendorItemCode,'') VendorItemCode
  from BidHeaders with (nolock)
  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
           and Bids.Active = 1
  join BidItems on BidItems.BidId = Bids.BidId
  join Items on Items.ItemId = BidItems.ItemId
            and Items.Active = 1
  join vw_ItemDescription id on id.ItemId = Items.ItemId
  join Units on Units.UnitId = Items.UnitId
  join Vendors on Vendors.VendorId = Bids.VendorId
              and Vendors.Active = 1
  join Requisitions on Requisitions.BidHeaderId = BidHeaders.BidHeaderId
  left outer join Headings on Headings.HeadingId = Items.HeadingId
  left outer join Keywords on Keywords.KeywordId = Items.KeywordId
  left outer join CrossRefs on CrossRefs.CrossRefId = BidItems.CrossRefId
  left outer join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
  left outer join Detail on Detail.ItemId = Items.ItemId
                        and Detail.RequisitionId = Requisitions.RequisitionId
 where Vendors.VendorId != 7691
```
