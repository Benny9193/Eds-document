# View: `dbo.vw_SessionCategoryVendors`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SessionId` | int | NO |  |  |
| 2 | `CategoryId` | int | NO |  |  |
| 3 | `CategoryName` | varchar(50) | YES |  |  |
| 4 | `VendorId` | int | NO |  |  |
| 5 | `VendorName` | varchar(50) | YES |  |  |
| 6 | `WebURL` | varchar(255) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `Bids` | USER_TABLE |
| `BidsCatalogList` | USER_TABLE |
| `Catalog` | USER_TABLE |
| `Category` | USER_TABLE |
| `CXmlSession` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictCategories` | USER_TABLE |
| `DistrictPP` | USER_TABLE |
| `PPCatalogs` | USER_TABLE |
| `PPCategory` | USER_TABLE |
| `SessionTable` | USER_TABLE |
| `Vendors` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[vw_SessionCategoryVendors] as
select SessionTable.SessionId, Category.CategoryId, Category.Name CategoryName, Vendors.VendorId, Vendors.Name VendorName, MAX(Catalog.WebLink) WebURL
  from SessionTable with (nolock)
  join District on District.DistrictId = SessionTable.DistrictId
  join DistrictPP on DistrictPP.DistrictId = District.DistrictId
  join PPCategory on PPCategory.PricePlanId = DistrictPP.PricePlanId
  join Category on Category.CategoryId = PPCategory.CategoryId
               and Category.Type = 1
  join BidHeaders on BidHeaders.CategoryId = PPCategory.CategoryId
                 and BidHeaders.PricePlanId = PPCategory.PricePlanId
                 and BidHeaders.Active = 1
                 and GETDATE() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
                 and BidHeaders.BidType = 1
  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
           and Bids.Active = 1
  join Vendors on Vendors.VendorId = Bids.VendorId
              and Vendors.VendorId != 7691
              and Vendors.Active = 1
  left outer join BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
  left outer join Catalog on Catalog.CatalogId = BidsCatalogList.CatalogId
                         and Catalog.Active = 1
  left outer join CXmlSession on CXmlSession.SessionId = SessionTable.SessionId
 where coalesce(CXmlSession.CategoryId,Category.CategoryId) = Category.CategoryId
 group by SessionTable.SessionId, Category.CategoryId, Category.Name, Vendors.VendorId, Vendors.Name
union (
  select SessionTable.SessionId, Category.CategoryId, Category.Name CategoryName, Vendors.VendorId, Vendors.Name VendorName, MAX(Catalog.WebLink) WebURL
    from SessionTable with (nolock)
    join District on District.DistrictId = SessionTable.DistrictId
    join DistrictPP on DistrictPP.DistrictId = District.DistrictId
    join PPCatalogs on PPCatalogs.PricePlanId = DistrictPP.PricePlanId
    join Category on Category.CategoryId = PPCatalogs.CategoryId
                 and Category.Type = 1
    join DistrictCategories on DistrictCategories.DistrictId = District.DistrictId
                           and DistrictCategories.CategoryId = Category.CategoryId
                           and DistrictCategories.Active = 1
                           and DistrictCategories.AllowAddenda = 1
    join Catalog on Catalog.CatalogId = PPCatalogs.CatalogId
                and Catalog.Active = 1
    join Vendors on Vendors.VendorId = Catalog.VendorId
                and Vendors.Active = 1
    left outer join CXmlSession on CXmlSession.SessionId = SessionTable.SessionId
   where coalesce(CXmlSession.CategoryId,Category.CategoryId) = Category.CategoryId
   group by SessionTable.SessionId, Category.CategoryId, Category.Name, Vendors.VendorId, Vendors.Name
)
```
