# View: `dbo.vw_CategoriesAndVendors`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `UserId` | int | NO |  |  |
| 2 | `DistrictId` | int | NO |  |  |
| 3 | `CategoryName` | varchar(50) | YES |  |  |
| 4 | `VendorName` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `Bids` | USER_TABLE |
| `BidsCatalogList` | USER_TABLE |
| `Category` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictCategories` | USER_TABLE |
| `DistrictPP` | USER_TABLE |
| `PPCategory` | USER_TABLE |
| `PricePlans` | USER_TABLE |
| `Users` | USER_TABLE |
| `Vendors` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
--select * from vw_CategoriesAndVendors where UserId = 203086 order by UserId, DistrictId, CategoryName, VendorName
create   view  [dbo].[vw_CategoriesAndVendors] as
select Users.UserId, District.DistrictId, Category.Name CategoryName, case isnull(Vendors.Name,'') when '' then 'See Online' else Vendors.Name end VendorName
  from Users with (nolock)
  join District on District.DistrictId = Users.DistrictId
  join DistrictPP on DistrictPP.DistrictId = District.DistrictId
  join PPCategory on PPCategory.PricePlanId = DistrictPP.PricePlanId
  join PricePlans on PricePlans.PricePlanId = PPCategory.PricePlanId
                 and PricePlans.Code not like '+%'
  join DistrictCategories on DistrictCategories.DistrictId = District.DistrictId
                         and DistrictCategories.CategoryId = PPCategory.CategoryId
                         and DistrictCategories.Active = 1
  join Category on Category.CategoryId = DistrictCategories.CategoryId
               and Category.Active = 1
               and Category.Type = 1
  left outer join Vendors on Vendors.Active = 1
              and Vendors.VendorId != 7691
              and Vendors.VendorId in 
    (select Bids.VendorId 
       from BidHeaders with (nolock)
       join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
                and Bids.Active = 1
       join BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
       join DistrictPP dpp on dpp.DistrictId = District.DistrictId
                      and dpp.PricePlanId = BidHeaders.PricePlanId
       join PPCategory ppc on ppc.PricePlanId = dpp.PricePlanId
       join PricePlans pp on pp.PricePlanId = ppc.PricePlanId
                      and pp.Code not like '+%'
       join DistrictCategories dc on dc.DistrictId = District.DistrictId
                              and dc.CategoryId = ppc.CategoryId
                              and dc.Active = 1
      where BidHeaders.CategoryId = ppc.CategoryId
        and BidHeaders.PricePlanId = pp.PricePlanId
        and BidHeaders.CategoryId = Category.CategoryId
        and BidHeaders.Active = 1
        and BidHeaders.BidType = 1
        and GETDATE() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil)
 group by Users.UserId, District.DistrictId, Category.Name, case isnull(Vendors.Name,'') when '' then 'See Online' else Vendors.Name end
```
