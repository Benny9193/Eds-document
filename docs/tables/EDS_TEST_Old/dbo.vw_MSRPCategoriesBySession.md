# View: `dbo.vw_MSRPCategoriesBySession`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SessionId` | int | NO |  |  |
| 2 | `CategoryId` | int | NO |  |  |
| 3 | `CategoryName` | varchar(50) | YES |  |  |
| 4 | `BidHeaderId` | varchar(8000) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `BidImports` | USER_TABLE |
| `BidManufacturers` | USER_TABLE |
| `Bids` | USER_TABLE |
| `Category` | USER_TABLE |
| `District` | USER_TABLE |
| `DistrictCategories` | USER_TABLE |
| `DistrictPP` | USER_TABLE |
| `Manufacturers` | USER_TABLE |
| `PPCategory` | USER_TABLE |
| `SessionTable` | USER_TABLE |
| `Vendors` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE   view  [dbo].[vw_MSRPCategoriesBySession] as
select SessionId, CategoryId, CategoryName, String_Agg(cast(BidHeaderId as varchar),',') BidHeaderId
  from (
select SessionTable.SessionId, 
       Category.CategoryId, Category.Name CategoryName,
       BidHeaders.BidHeaderId BidHeaderId
--       BidHeaders.BidMessage
  from SessionTable with (nolock)
  join District on District.DistrictId = SessionTable.DistrictId
  join DistrictPP on DistrictPP.DistrictId = District.DistrictId
  join DistrictCategories on DistrictCategories.DistrictId = District.DistrictId
                         and DistrictCategories.Active = 1
  join PPCategory on PPCategory.PricePlanId = DistrictPP.PricePlanId
                 and PPCategory.CategoryId = DistrictCategories.CategoryId
  join Category on Category.CategoryId = PPCategory.CategoryId
               and Category.Active = 1
               and Category.Type = 5
  join BidHeaders on BidHeaders.CategoryId = Category.CategoryId
                 and BidHeaders.PricePlanId = DistrictPP.PricePlanId
                 and GETDATE() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
                 and BidHeaders.Active = 1
                 and BidHeaders.BidType = 1
  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId
           and Bids.Active = 1
  join BidImports on BidImports.BidImportId = Bids.BidImportId
                 and BidImports.Active = 1
  join BidManufacturers on BidManufacturers.BidId = Bids.BidId
  join Manufacturers on Manufacturers.ManufacturerId = BidManufacturers.ManufacturerId
                    and Manufacturers.Active = 1
  join Vendors on Vendors.VendorId = Bids.VendorId
              and Vendors.Active = 1
              and Vendors.VendorId != 7691
 group by SessionTable.SessionId, 
       Category.CategoryId, Category.Name,
       BidHeaders.BidHeaderId--,
--       BidHeaders.BidMessage
) ss
 group by SessionId, CategoryId, CategoryName
```
