# View: `dbo.vw_ReqVendors`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `RequisitionId` | int | NO |  |  |
| 2 | `VendorId` | int | NO |  |  |
| 3 | `VendorName` | varchar(50) | YES |  |  |
| 4 | `WebURL` | varchar(255) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `Bids` | USER_TABLE |
| `BidsCatalogList` | USER_TABLE |
| `Budgets` | USER_TABLE |
| `Catalog` | USER_TABLE |
| `Category` | USER_TABLE |
| `DistrictCategories` | USER_TABLE |
| `DistrictPP` | USER_TABLE |
| `PPCatalogs` | USER_TABLE |
| `Requisitions` | USER_TABLE |
| `Vendors` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE   view  [dbo].[vw_ReqVendors] as
select Requisitions.RequisitionId, Vendors.VendorId, Vendors.Name VendorName, MAX(Catalog.WebLink) WebURL
  from Requisitions with (nolock)
  join BidHeaders on BidHeaders.BidHeaderId = Requisitions.BidHeaderId
  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
           and Bids.Active = 1
  join BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
  join Catalog on Catalog.CatalogId = BidsCatalogList.CatalogId
              and Catalog.Active = 1
  join Vendors on Vendors.VendorId = Catalog.VendorId
              and Vendors.VendorId != 7691
              and Vendors.Active = 1
 group by Requisitions.RequisitionId, Vendors.VendorId, Vendors.Name
union (
select Requisitions.RequisitionId, Vendors.VendorId, Vendors.Name VendorName, MAX(Catalog.WebLink) WebURL
  from Requisitions with (nolock)
  join BidHeaders ParentBH on ParentBH.BidHeaderId = Requisitions.BidHeaderId
  join BidHeaders on BidHeaders.ParentBidHeaderId = ParentBH.BidHeaderId
  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
           and Bids.Active = 1
  join BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
  join Catalog on Catalog.CatalogId = BidsCatalogList.CatalogId
              and Catalog.Active = 1
  join Vendors on Vendors.VendorId = Catalog.VendorId
              and Vendors.VendorId != 7691
              and Vendors.Active = 1
 group by Requisitions.RequisitionId, Vendors.VendorId, Vendors.Name)
union (
  select Requisitions.RequisitionId, Vendors.VendorId, Vendors.Name VendorName, MAX(Catalog.WebLink) WebURL
    from Requisitions with (nolock)
    join Budgets on Budgets.BudgetId = Requisitions.BudgetId
    join DistrictCategories on DistrictCategories.DistrictId = Budgets.DistrictId
                           and DistrictCategories.CategoryId = Requisitions.CategoryId
                           and DistrictCategories.Active = 1
                           and DistrictCategories.AllowAddenda = 1
    join DistrictPP on DistrictPP.DistrictId = Budgets.DistrictId
    join PPCatalogs on PPCatalogs.CategoryId = Requisitions.CategoryId
                   and PPCatalogs.PricePlanId = DistrictPP.PricePlanId
    join Catalog on Catalog.CatalogId = PPCatalogs.CatalogId
                and Catalog.Active = 1
    join Category on Category.CategoryId = Catalog.CategoryId
                 and Category.Type = 1
    join Vendors on Vendors.VendorId = Catalog.VendorId
                and Vendors.Active = 1
   group by Requisitions.RequisitionId, Vendors.VendorId, Vendors.Name
)
union (
  select Requisitions.RequisitionId, Vendors.VendorId, Vendors.Name VendorName, MAX(Catalog.WebLink) WebURL
    from Requisitions with (nolock)
    join Budgets on Budgets.BudgetId = Requisitions.BudgetId
    join DistrictCategories on DistrictCategories.DistrictId = Budgets.DistrictId
                           and DistrictCategories.CategoryId = Requisitions.CategoryId
                           and DistrictCategories.Active = 1
    join Catalog on Catalog.CategoryId = Requisitions.CategoryId
                and Catalog.Active = 1
                and Catalog.Name = 'EDS'
    join Vendors on Vendors.VendorId = Catalog.VendorId
                and Vendors.Active = 1
   group by Requisitions.RequisitionId, Vendors.VendorId, Vendors.Name
)
```
