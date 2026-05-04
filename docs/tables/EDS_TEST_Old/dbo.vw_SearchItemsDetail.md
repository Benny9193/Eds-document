# View: `dbo.vw_SearchItemsDetail`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionId` | int | NO |  |  |
| 2 | `HeadingId` | int | NO |  |  |
| 3 | `KeywordId` | int | NO |  |  |
| 4 | `BidItems_BidItemId` | int | YES |  |  |
| 5 | `Price` | decimal(34,13) | YES |  |  |
| 6 | `BidItems_Alternate` | varchar(512) | YES |  |  |
| 7 | `BidItems_VendorItemCode` | varchar(50) | YES |  |  |
| 8 | `ItemBidType` | varchar(32) | YES |  |  |
| 9 | `PageNo` | int | YES |  |  |
| 10 | `Items_ItemCode` | varchar(50) | YES |  |  |
| 11 | `Items_Description` | varchar(512) | YES |  |  |
| 12 | `Items_HeadingId` | int | YES |  |  |
| 13 | `Items_SortSeq` | varchar(64) | YES |  |  |
| 14 | `BidDiscountRate` | decimal(8,5) | YES |  |  |
| 15 | `Vendors_Name` | varchar(50) | YES |  |  |
| 16 | `Units_Code` | varchar(20) | YES |  |  |
| 17 | `DetailId` | int | YES |  |  |
| 18 | `Quantity` | int | YES |  |  |
| 19 | `ItemId` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidItems` | USER_TABLE |
| `Bids` | USER_TABLE |
| `BidsCatalogList` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Catalog` | USER_TABLE |
| `CrossRefs` | USER_TABLE |
| `Detail` | USER_TABLE |
| `Headings` | USER_TABLE |
| `Items` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `Units` | USER_TABLE |
| `Vendors` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_SearchItemsDetail] as
SELECT Requisitions.RequisitionId, Headings.HeadingId, ISNULL(Items.KeywordId,0) KeywordId, BidItems.BidItemId AS BidItems_BidItemId, round(isnull(BidItems.Price,0) - (isnull(BidItems.Price,0) * (isnull(Bids.BidDiscountRate,0) / 100)),2) Price, BidItems.Alternate AS BidItems_Alternate, BidItems.VendorItemCode AS BidItems_VendorItemCode,
ItemBidType, case isnull(BidItems.PageNo,0) when 0 then case isnull(BidItems.CrossRefId,0) when 0 then (select top 1 CrossRefs.Page from CrossRefs join Catalog on Catalog.CatalogId = CrossRefs.CatalogId join BidsCatalogList on BidsCatalogList.CatalogId = Catalog.CatalogId and BidsCatalogList.BidId = Bids.BidId where CrossRefs.ItemId = BidItems.ItemId order by Catalog.CatalogYear desc, Catalog.CatalogId desc) else (select top 1 CrossRefs.Page from CrossRefs where Crossrefs.CrossRefId = BidItems.CrossRefId) end else BidItems.PageNo end PageNo, Items.ItemCode AS Items_ItemCode, Items.Description AS Items_Description, Items.HeadingId AS Items_HeadingId,
Items.SortSeq AS Items_SortSeq, BidDiscountRate, Vendors.Name AS Vendors_Name, Units.Code AS Units_Code, DetailId, Quantity, Items.ItemId
  from Requisitions with (nolock)
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join Bids on Bids.BidHeaderId = Requisitions.BidHeaderId
           and Bids.Active = 1
  join BidItems on BidItems.BidId = Bids.BidId
               and isnull(BidItems.Price,0) != 0
  join Items on Items.ItemId = BidItems.ItemId
            and Items.Active = 1
  join Headings on Headings.HeadingId = Items.HeadingId
               and Headings.Active = 1
  join Vendors on Vendors.VendorId = Bids.VendorId
  join Units on Units.UnitId = Items.UnitId
  left outer join Detail on Detail.ItemId = Items.ItemId
                        and Detail.RequisitionId = Requisitions.RequisitionId
 where case isnull(Items.DistrictId,0) when 0 then Budgets.DistrictId else Items.DistrictId end = Budgets.DistrictId
union (
SELECT Requisitions.RequisitionId, Headings.HeadingId, ISNULL(Items.KeywordId,0) KeywordId, null AS BidItems_BidItemId, round(isnull(Items.ListPrice,0),2) Price, null AS BidItems_Alternate, null AS BidItems_VendorItemCode,
'' as ItemBidType, 0 PageNo, Items.ItemCode AS Items_ItemCode, Items.Description AS Items_Description, Items.HeadingId AS Items_HeadingId,
Items.SortSeq AS Items_SortSeq, 0 BidDiscountRate, 'Not Yet Bid' AS Vendors_Name, Units.Code AS Units_Code, DetailId, Quantity, Items.ItemId
  from Requisitions with (nolock)
  join Budgets on Budgets.BudgetId = Requisitions.BudgetId
  join Headings on Headings.CategoryId = Requisitions.CategoryId
               and Headings.Active = 1
  join Items on Items.HeadingId = Headings.HeadingId
            and Items.Active = 1
  join Units on Units.UnitId = Items.UnitId
  left outer join Detail on Detail.ItemId = Items.ItemId
                        and Detail.RequisitionId = Requisitions.RequisitionId
 where isnull(Requisitions.BidHeaderId,0) = 0
   and case isnull(Items.DistrictId,0) when 0 then Budgets.DistrictId else Items.DistrictId end = Budgets.DistrictId
)
union (
SELECT Requisitions.RequisitionId, Headings.HeadingId, ISNULL(Items.KeywordId,0) KeywordId, null AS BidItems_BidItemId, round(isnull(CrossRefs.GrossPrice,0) - (isnull(CrossRefs.GrossPrice,0) * (isnull(BidsCatalogList.DiscountRate,0) / 100)),2) Price, null AS BidItems_Alternate, CrossRefs.VendorItemCode AS BidItems_VendorItemCode,
'A' ItemBidType, CrossRefs.Page PageNo, Items.ItemCode AS Items_ItemCode, Items.Description AS Items_Description, Items.HeadingId AS Items_HeadingId,
Items.SortSeq AS Items_SortSeq, BidDiscountRate, Vendors.Name AS Vendors_Name, Units.Code AS Units_Code, DetailId, Quantity, Items.ItemId
  from Requisitions with (nolock)
  join Bids on Bids.BidHeaderId = Requisitions.BidHeaderId
           and Bids.Active = 1
  join BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
  join CrossRefs on CrossRefs.CatalogId = BidsCatalogList.CatalogId
                and Crossrefs.Active = 1
  join Catalog on Catalog.CatalogId = CrossRefs.CatalogId
               and Catalog.Active = 1
  join Items on Items.ItemId = CrossRefs.ItemId
            and Items.Active = 1
  join Headings on Headings.HeadingId = Items.HeadingId
               and Headings.Active = 1
  join Vendors on Vendors.VendorId = Bids.VendorId
  join Units on Units.UnitId = Items.UnitId
  left outer join Detail on Detail.ItemId = Items.ItemId
                        and Detail.RequisitionId = Requisitions.RequisitionId
 where Requisitions.CategoryId = 82 -- Math Manipulatives
)
```
