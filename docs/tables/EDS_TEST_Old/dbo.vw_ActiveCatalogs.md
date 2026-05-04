# View: `dbo.vw_ActiveCatalogs`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `CategoryId` | int | NO |  |  |
| 3 | `CategoryName` | varchar(50) | YES |  |  |
| 4 | `CatalogId` | int | NO |  |  |
| 5 | `CatalogName` | varchar(50) | YES |  |  |
| 6 | `VendorId` | int | NO |  |  |
| 7 | `VendorName` | varchar(50) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `BidHeaders` | USER_TABLE |
| `Bids` | USER_TABLE |
| `BidsCatalogList` | USER_TABLE |
| `Catalog` | USER_TABLE |
| `Category` | USER_TABLE |
| `Vendors` | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create view vw_ActiveCatalogs as
select BidHeaders.BidHeaderId, Category.CategoryId, Category.Name CategoryName, Catalog.CatalogId, Catalog.Name CatalogName, Vendors.VendorId, Vendors.Name VendorName
  from BidHeaders
  join Bids on Bids.BidHeaderId = BidHeaders.BidHeaderId 
           and Bids.Active = 1
		   and Bids.VendorId != 7691
  join Vendors on Vendors.VendorId = Bids.VendorId
  join Category on Category.CategoryId = BidHeaders.CategoryId
  join BidsCatalogList on BidsCatalogList.BidId = Bids.BidId
  join Catalog on Catalog.CatalogId = BidsCatalogList.CatalogId
 where getdate() between BidHeaders.EffectiveFrom and BidHeaders.EffectiveUntil
```
