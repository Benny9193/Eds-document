# View: `dbo.TestFF`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`

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
| 9 | `CatalogId` | int | YES |  |  |
| 10 | `Name` | varchar(50) | YES |  |  |
| 11 | `CategoryId` | int | YES |  |  |
| 12 | `VendorId` | int | YES |  |  |
| 13 | `VendorName` | varchar(50) | YES |  |  |
| 14 | `PricePlanId` | int | YES |  |  |
| 15 | `AwardId` | int | NO |  |  |
| 16 | `DistrictId` | int | YES |  |  |
| 17 | `DiscountRate` | decimal(5,2) | YES |  |  |
| 18 | `PriceId` | uniqueidentifier | NO |  |  |
| 19 | `PricesDescription` | varchar(1024) | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Awards`](dbo.Awards.md) | USER_TABLE |
| [`dbo.BidItems`](dbo.BidItems.md) | USER_TABLE |
| [`dbo.Bids`](dbo.Bids.md) | USER_TABLE |
| [`dbo.Catalog`](dbo.Catalog.md) | USER_TABLE |
| [`dbo.Category`](dbo.Category.md) | USER_TABLE |
| [`dbo.CrossRefs`](dbo.CrossRefs.md) | USER_TABLE |
| [`dbo.DistrictPP`](dbo.DistrictPP.md) | USER_TABLE |
| [`dbo.Items`](dbo.Items.md) | USER_TABLE |
| [`dbo.PPCatalogs`](dbo.PPCatalogs.md) | USER_TABLE |
| [`dbo.PricePlans`](dbo.PricePlans.md) | USER_TABLE |
| `dbo.prices` | USER_TABLE |
| [`dbo.Units`](dbo.Units.md) | USER_TABLE |
| [`dbo.Vendors`](dbo.Vendors.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
create   view  [dbo].[TestFF]
AS
SELECT     dbo.Items.ItemId, dbo.Items.ItemCode, dbo.Items.Description, dbo.Items.UnitId, dbo.Units.Code, dbo.CrossRefs.CrossRefId, 
                      dbo.CrossRefs.CatalogPrice, dbo.CrossRefs.VendorItemCode, dbo.CrossRefs.CatalogId, dbo.[Catalog].Name, dbo.[Catalog].CategoryId, 
                      dbo.[Catalog].VendorId, dbo.Vendors.Name AS VendorName, dbo.PPCatalogs.PricePlanId, dbo.Awards.AwardId, dbo.DistrictPP.DistrictId, 
                      dbo.PPCatalogs.DiscountRate, dbo.prices.PriceId, dbo.prices.Description AS PricesDescription
FROM         dbo.PricePlans with (nolock) INNER JOIN
                      dbo.DistrictPP ON dbo.PricePlans.PricePlanId = dbo.DistrictPP.PricePlanId INNER JOIN
                      dbo.prices ON dbo.PricePlans.PricePlanId = dbo.prices.PricePlanId INNER JOIN
                      dbo.Category INNER JOIN
                      dbo.[Catalog] ON dbo.Category.CategoryId = dbo.[Catalog].CategoryId INNER JOIN
                      dbo.CrossRefs ON dbo.[Catalog].CatalogId = dbo.CrossRefs.CatalogId INNER JOIN
                      dbo.Items ON dbo.Category.CategoryId = dbo.Items.CategoryId AND dbo.CrossRefs.ItemId = dbo.Items.ItemId INNER JOIN
                      dbo.Awards INNER JOIN
                      dbo.BidItems ON dbo.Awards.AwardId = dbo.BidItems.AwardId INNER JOIN
                      dbo.Bids ON dbo.Awards.BidId = dbo.Bids.BidId AND dbo.BidItems.BidId = dbo.Bids.BidId ON dbo.Items.ItemId = dbo.BidItems.ItemId ON 
                      dbo.prices.CrossRefId = dbo.CrossRefs.CrossRefId AND dbo.prices.ItemId = dbo.Items.ItemId AND 
                      dbo.prices.AwardId = dbo.Awards.AwardId INNER JOIN
                      dbo.Units ON dbo.Items.UnitId = dbo.Units.UnitId INNER JOIN
                      dbo.Vendors ON dbo.prices.VendorId = dbo.Vendors.VendorId AND dbo.[Catalog].VendorId = dbo.Vendors.VendorId AND 
                      dbo.Awards.VendorId = dbo.Vendors.VendorId AND dbo.Bids.VendorId = dbo.Vendors.VendorId INNER JOIN
                      dbo.PPCatalogs ON dbo.PricePlans.PricePlanId = dbo.PPCatalogs.PricePlanId
```
