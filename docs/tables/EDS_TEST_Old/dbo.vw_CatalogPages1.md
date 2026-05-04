# View: `dbo.vw_CatalogPages1`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionId` | int | NO |  |  |
| 2 | `ItemId` | int | NO |  |  |
| 3 | `CatalogId` | int | NO |  |  |
| 4 | `Name` | varchar(50) | YES |  |  |
| 5 | `Page` | int | YES |  |  |
| 6 | `PDFAvailable` | tinyint | YES |  |  |
| 7 | `VendorItemCode` | varchar(50) | YES |  |  |
| 8 | `VendorId` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidItems` | USER_TABLE |
| `Bids` | USER_TABLE |
| `BidsCatalogList` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Catalog` | USER_TABLE |
| `CrossRefs` | USER_TABLE |
| `Items` | USER_TABLE |
| `Requisitions` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_CatalogPages1] as
    select Requisitions.RequisitionId, Items.ItemId, Catalog.CatalogId, Catalog.Name, case when isnull(BidItems.PageNo,0) = 0 then CrossRefs.Page else BidItems.PageNo end Page, Catalog.PDFAvailable, CrossRefs.VendorItemCode, Bids.VendorId
      from Requisitions with (nolock)
      join Budgets on Budgets.BudgetId = Requisitions.BudgetId
      join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId
      join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
               and Bids.Active = 1
      join BidItems on BidItems.BidId = Bids.BidId
      join Items on Items.ItemId = BidItems.ItemId
                and Items.Active = 1
      join BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
      join Catalog on Catalog.CatalogId = BidsCatalogList.CatalogId
                  and catalog.Active = 1
      join CrossRefs on CrossRefs.CatalogId = BidsCatalogList.CatalogId
                    and CrossRefs.Active = 1
                    and CrossRefs.CrossRefId = BidItems.CrossRefId
     group by Requisitions.RequisitionId, Items.ItemId, Catalog.CatalogId, Catalog.Name, case when isnull(BidItems.PageNo,0) = 0 then CrossRefs.Page else BidItems.PageNo end, Catalog.PDFAvailable, CrossRefs.VendorItemCode, Bids.VendorId
  union (
    select Requisitions.RequisitionId, Items.ItemId, Catalog.CatalogId, Catalog.Name, CrossRefs.Page, Catalog.PDFAvailable, CrossRefs.VendorItemCode, Bids.VendorId
      from Requisitions with (nolock)
      join Budgets on Budgets.BudgetId = Requisitions.BudgetId
      join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId
      join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
               and Bids.Active = 1
      join BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
      join Catalog on Catalog.CatalogId = BidsCatalogList.CatalogId
      join CrossRefs on CrossRefs.CatalogId = Catalog.CatalogId
                    and CrossRefs.Active = 1
      join Items on Items.ItemId = CrossRefs.ItemId
                and Items.Active = 1
     group by Requisitions.RequisitionId, Items.ItemId, Catalog.CatalogId, Catalog.Name, CrossRefs.Page, Catalog.PDFAvailable, CrossRefs.VendorItemCode, Bids.VendorId
  )
```
