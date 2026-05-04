# Table: `dbo.OBPrices`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ItemId` | int | NO |  |  |
| 2 | `PackedCode` | varchar(50) | YES |  |  |
| 3 | `CrossRefId` | int | YES |  |  |
| 4 | `CrossRefIdBid` | int | YES |  |  |
| 5 | `BidPrice` | money | YES |  |  |
| 6 | `GrossPrice` | money | YES |  |  |
| 7 | `CatalogPrice` | money | YES |  |  |
| 8 | `AwardId` | int | NO |  |  |
| 9 | `VendorId` | int | NO |  |  |
| 10 | `PricePlanId` | int | YES |  |  |
| 11 | `CatalogId` | int | YES |  |  |
| 12 | `VendorItemCode` | varchar(50) | YES |  |  |
| 13 | `ParentCatalogId` | int | YES |  |  |
| 14 | `ItemCode` | varchar(50) | YES |  |  |
| 15 | `Description` | varchar(1024) | YES |  |  |
| 16 | `UnitId` | int | YES |  |  |
| 17 | `UnitCode` | varchar(20) | YES |  |  |
| 18 | `PriceId` | int | YES |  |  |
| 19 | `Page` | char(4) | YES |  |  |
| 20 | `DiscountRate` | decimal(9,5) | YES |  |  |
| 21 | `Name` | varchar(50) | YES |  |  |
| 22 | `VendorName` | varchar(50) | YES |  |  |
| 23 | `CategoryId` | int | YES |  |  |
| 24 | `PackedItemCode` | varchar(50) | YES |  |  |
| 25 | `BidItemId` | int | YES |  |  |
| 26 | `Alternate` | varchar(1024) | YES |  |  |
| 27 | `PackedVendorItemCode` | varchar(255) | YES |  |  |
| 28 | `CatalogYear` | char(2) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_Award` | no | NONCLUSTERED | `AwardId` |  |
| `SK_BidItem` | no | NONCLUSTERED | `BidItemId` |  |
| `SK_Category` | no | NONCLUSTERED | `CategoryId` |  |
| `SK_Item` | no | NONCLUSTERED | `ItemId` |  |
| `SK_PPCat` | no | NONCLUSTERED | `PricePlanId`, `CategoryId` |  |
| `SK_PricePlan` | no | NONCLUSTERED | `PricePlanId` |  |
| `SK_Vendor` | no | NONCLUSTERED | `VendorId` |  |
