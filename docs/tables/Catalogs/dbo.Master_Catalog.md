# Table: `dbo.Master Catalog`

**Database:** `Catalogs` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 144403830

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Consolidated cross-vendor master catalog used as the import target for catalog file processing (~144M rows — the largest table on the server). Read-heavy; rebuilt by the catalog-import pipeline.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SysID` | int | NO |  | YES |
| 2 | `VendorItemCode` | varchar(50) | YES |  |  |
| 3 | `Description` | varchar(512) | YES |  |  |
| 4 | `PageNumber` | int | YES |  |  |
| 5 | `Price` | money | YES |  |  |
| 6 | `UnitCode` | varchar(16) | YES |  |  |
| 7 | `CatalogPrice` | money | YES |  |  |
| 8 | `Manufacturor` | varchar(50) | YES |  |  |
| 9 | `ManufacturorPartNumber` | varchar(50) | YES |  |  |
| 10 | `AlternatePartNumber` | varchar(50) | YES |  |  |
| 11 | `CatalogId` | int | YES |  |  |
| 12 | `PackedCode` | varchar(50) | YES |  |  |
| 13 | `Status` | tinyint | YES |  |  |
| 14 | `Skip` | tinyint | YES |  |  |
| 15 | `ItemId` | int | YES |  |  |
| 16 | `CrossRefId` | int | YES |  |  |
| 17 | `DontAdd` | tinyint | YES |  |  |
| 18 | `NewItemId` | int | YES |  |  |
| 19 | `GrossPrice` | money | YES |  |  |
| 20 | `Heading` | varchar(255) | YES |  |  |
| 21 | `Keyword` | varchar(1024) | YES |  |  |
| 22 | `NoDiscount` | int | YES |  |  |
| 23 | `RTK` | tinyint | YES |  |  |
| 24 | `AdditionalShipping` | tinyint | YES |  |  |
| 25 | `ImageURL` | varchar(300) | YES |  |  |
| 26 | `ItemPackedCode` | varchar(50) | YES |  |  |
| 27 | `MatchKey` | varchar(150) | YES |  |  |
| 28 | `MSDSURL` | varchar(300) | YES |  |  |
| 29 | `UniqueItemNumber` | varchar(50) | YES |  |  |
| 30 | `UPC_ISBN` | varchar(20) | YES |  |  |
| 31 | `FullDescription` | varchar(4096) | YES |  |  |
| 32 | `UNSPSC` | varchar(20) | YES |  |  |
| 33 | `PerishableItem` | tinyint | YES |  |  |
| 34 | `PrescriptionRequired` | tinyint | YES |  |  |
| 35 | `DigitallyDelivered` | tinyint | YES |  |  |
| 36 | `MinimumOrderQuantity` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_Catalog_CrossRefAddShip` | no | NONCLUSTERED | `CatalogId` | `CrossRefId`, `AdditionalShipping` |
| `SK_CatalogCrossRef` | no | NONCLUSTERED | `CatalogId`, `CrossRefId` |  |
| `SK_CatalogItem` | no | NONCLUSTERED | `CatalogId`, `ItemId` |  |
| `SK_DescPageCatPriceCrossRefGrossPriceNoDiscount` | no | NONCLUSTERED | `CatalogId` | `Description`, `PageNumber`, `CatalogPrice`, `CrossRefId`, `GrossPrice`, `NoDiscount` |
| `SKI_Catalog_SysIdManufacturerPartNumber` | no | NONCLUSTERED | `CatalogId` | `SysID`, `ManufacturorPartNumber` |
| `SKI_Catalog_SysVICUniqueUOM` | no | NONCLUSTERED | `CatalogId` | `SysID`, `VendorItemCode`, `UniqueItemNumber`, `UnitCode` |
| `SKI_CatalogCrossRefUnique_Etal` | no | NONCLUSTERED | `CatalogId`, `CrossRefId`, `UniqueItemNumber` | `VendorItemCode`, `Description`, `PageNumber`, `UnitCode`, `CatalogPrice`, `Manufacturor`, `ManufacturorPartNumber`, `ItemId`, `GrossPrice`, `NoDiscount`, `SysID` |
| `SKI_CatalogItem_DescUOMMPNHeadingUnique` | no | NONCLUSTERED | `CatalogId`, `ItemId` | `Description`, `UnitCode`, `ManufacturorPartNumber`, `Heading`, `UniqueItemNumber` |
| `SKI_CatalogRTK_Item` | no | NONCLUSTERED | `CatalogId`, `RTK` | `ItemId` |
| `SKI_CatalogUnique_` | no | NONCLUSTERED | `CatalogId`, `UniqueItemNumber` | `SysID`, `Description`, `UnitCode`, `CatalogPrice`, `CrossRefId`, `GrossPrice`, `NoDiscount` |
| `SKI_CatalogUnique_UPCSysId` | no | NONCLUSTERED | `CatalogId`, `UniqueItemNumber` | `UPC_ISBN`, `SysID` |
| `SKI_UPCCatalog_SysId` | no | NONCLUSTERED | `UPC_ISBN`, `CatalogId` | `SysID` |
