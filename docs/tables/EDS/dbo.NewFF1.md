# View: `dbo.NewFF1`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ItemId` | int | NO |  |  |
| 2 | `ItemCode` | varchar(50) | YES |  |  |
| 3 | `Description` | varchar(512) | YES |  |  |
| 4 | `UnitId` | int | YES |  |  |
| 5 | `Code` | varchar(20) | YES |  |  |
| 6 | `CrossRefId` | int | NO |  |  |
| 7 | `CatalogPrice` | money | YES |  |  |
| 8 | `VendorItemCode` | varchar(50) | YES |  |  |
| 9 | `Page` | char(4) | YES |  |  |
| 10 | `BidPrice` | decimal(34,13) | YES |  |  |
| 11 | `CatalogId` | int | YES |  |  |
| 12 | `Name` | varchar(50) | YES |  |  |
| 13 | `CategoryId` | int | YES |  |  |
| 14 | `VendorId` | int | NO |  |  |
| 15 | `VendorName` | varchar(50) | YES |  |  |
| 16 | `PricePlanId` | int | YES |  |  |
| 17 | `AwardId` | int | NO |  |  |
| 18 | `DistrictId` | int | YES |  |  |
| 19 | `DiscountRate` | decimal(9,5) | YES |  |  |
| 20 | `PriceId` | uniqueidentifier | NO |  |  |
| 21 | `PricesDescription` | varchar(1024) | YES |  |  |
| 22 | `ParentCatalogId` | int | YES |  |  |
| 23 | `GrossPrice` | money | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Awards`](dbo.Awards.md) | USER_TABLE |
| [`dbo.Catalog`](dbo.Catalog.md) | USER_TABLE |
| [`dbo.Category`](dbo.Category.md) | USER_TABLE |
| [`dbo.CrossRefs`](dbo.CrossRefs.md) | USER_TABLE |
| [`dbo.DistrictPP`](dbo.DistrictPP.md) | USER_TABLE |
| [`dbo.Items`](dbo.Items.md) | USER_TABLE |
| [`dbo.PPCatalogs`](dbo.PPCatalogs.md) | USER_TABLE |
| `dbo.prices` | USER_TABLE |
| [`dbo.Units`](dbo.Units.md) | USER_TABLE |
| [`dbo.Vendors`](dbo.Vendors.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[NewFF1]  

AS
SELECT     dbo.Items.ItemId, dbo.Items.ItemCode, dbo.Items.Description, dbo.Items.UnitId, dbo.Units.Code, dbo.CrossRefs.CrossRefId, 
                      dbo.CrossRefs.CatalogPrice, dbo.prices.VendorItemCode, dbo.CrossRefs.Page, dbo.prices.BidPrice, dbo.prices.CatalogId, dbo.Catalog.Name, 
                      dbo.Items.CategoryId, dbo.prices.VendorId, dbo.Vendors.Name AS VendorName, dbo.Awards.PricePlanId, dbo.Awards.AwardId, dbo.DistrictPP.DistrictId, 
                      dbo.Awards.DiscountRate, dbo.prices.PriceId, dbo.prices.Description AS PricesDescription, dbo.CrossRefs.CatalogId AS ParentCatalogId, dbo.Prices.GrossPrice
FROM        dbo.Awards with (nolock) inner join
                      dbo.DistrictPP ON dbo.DistrictPP.PricePlanId = dbo.Awards.PricePlanId INNER JOIN
                      dbo.Category ON dbo.Category.CategoryId = dbo.Awards.CategoryId INNER JOIN
                      dbo.prices ON dbo.Prices.AwardId = dbo.Awards.AwardId INNER JOIN
		      dbo.Items on dbo.Items.ItemId = dbo.prices.ItemId  INNER JOIN
                      dbo.CrossRefs ON dbo.CrossRefs.CrossRefId = dbo.prices.CrossRefId INNER JOIN
                      dbo.Vendors ON dbo.Vendors.VendorId = dbo.prices.VendorId INNER JOIN
                      dbo.Catalog ON dbo.Catalog.CatalogId = dbo.CrossRefs.CatalogId INNER JOIN
                      dbo.Units ON dbo.Units.UnitId = dbo.Items.UnitId
INNER JOIN   dbo.PPCatalogs on dbo.PPCatalogs.CategoryId = dbo.Category.CategoryId
                           and dbo.PPCatalogs.CatalogId = dbo.Catalog.CatalogId
                           and dbo.PPCatalogs.PricePlanId = dbo.Prices.PricePlanId
```
