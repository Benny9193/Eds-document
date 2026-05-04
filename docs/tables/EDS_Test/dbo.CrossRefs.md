# Table: `dbo.CrossRefs`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 149041697

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CrossRefId` | int | NO |  | YES |
| 2 | `CrossRefId_Old` | int | YES |  |  |
| 3 | `Active` | tinyint | YES |  |  |
| 4 | `ItemId` | int | YES |  |  |
| 5 | `VendorItemCode` | varchar(50) | YES |  |  |
| 6 | `CatalogId` | int | YES |  |  |
| 7 | `CatalogPrice` | money | YES |  |  |
| 8 | `Page` | char(4) | YES |  |  |
| 9 | `CatalogYear` | char(2) | YES |  |  |
| 10 | `CrossRefLocation` | char(1) | YES |  |  |
| 11 | `PackedCode` | varchar(50) | YES | `('([dbo].[uf_PackCode]([VendorItemCode]))')` |  |
| 12 | `Manufacturor` | varchar(50) | YES |  |  |
| 13 | `ManufacturorPartNumber` | varchar(50) | YES |  |  |
| 14 | `DateDeactivated` | datetime | YES |  |  |
| 15 | `DateUpdated` | datetime | YES | `(getdate())` |  |
| 16 | `GrossPrice` | money | YES |  |  |
| 17 | `DoNotDiscount` | int | YES |  |  |
| 18 | `RTK_MSDSId` | int | YES |  |  |
| 19 | `RTK_MSDSNotNeeded` | tinyint | YES |  |  |
| 20 | `ReplacementCrossRefId` | int | YES |  |  |
| 21 | `AdditionalShipping` | tinyint | YES |  |  |
| 22 | `FullDescription` | varchar(4096) | YES |  |  |
| 23 | `UOM` | varchar(20) | YES |  |  |
| 24 | `MatchKey` | varchar(150) | YES |  |  |
| 25 | `ManufacturerId` | int | YES |  |  |
| 26 | `ProductLine` | varchar(50) | YES |  |  |
| 27 | `ManufacturerProductLineId` | int | YES |  |  |
| 28 | `ItemsPerUnit` | varchar(30) | YES |  |  |
| 29 | `MSDSFlag` | tinyint | YES |  |  |
| 30 | `MSDSRef` | varchar(255) | YES |  |  |
| 31 | `Heading` | varchar(50) | YES |  |  |
| 32 | `UniqueItemNumber` | varchar(50) | YES |  |  |
| 33 | `ShortDescription` | varchar(512) | YES |  |  |
| 34 | `keyword` | varchar(1024) | YES |  |  |
| 35 | `ImageURL` | varchar(1024) | YES |  |  |
| 36 | `UPC_ISBN` | varchar(20) | YES |  |  |
| 37 | `UNSPSC` | varchar(20) | YES |  |  |
| 38 | `ImageId` | bigint | YES |  |  |
| 39 | `PerishableItem` | bit | YES | `((0))` |  |
| 40 | `PrescriptionRequired` | bit | YES | `((0))` |  |
| 41 | `DigitallyDelivered` | tinyint | YES |  |  |
| 42 | `MinimumOrderQuantity` | int | YES |  |  |
| 43 | `HashKey` | varbinary(64) | YES |  |  |
| 44 | `ProductNames` | nvarchar(4000) | YES |  |  |
| 45 | `TypeAheads` | nvarchar(4000) | YES |  |  |
| 46 | `AIShortDesc` | nvarchar(1024) | YES |  |  |
| 47 | `AIFullDesc` | nvarchar(4000) | YES |  |  |
| 48 | `AIUNSPSC` | varchar(20) | YES |  |  |
| 49 | `AIDate` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `_dta_index_CrossRefs_12_389628481__K3_K1_K12` | no | NONCLUSTERED | `ItemId`, `CrossRefId`, `ManufacturorPartNumber` |  |
| `_dta_index_CrossRefs_7_389628481__K1_K2_K3_K5_K6_21` | no | NONCLUSTERED | `CrossRefId`, `Active`, `ItemId`, `CatalogId`, `CatalogPrice` | `AdditionalShipping` |
| `_dta_index_CrossRefs_7_389628481__K2_K3_K5_K1_K6` | no | NONCLUSTERED | `Active`, `ItemId`, `CatalogId`, `CrossRefId`, `CatalogPrice` |  |
| `_dta_index_CrossRefs_9_457768688__K1_K6_K7` | no | NONCLUSTERED | `CrossRefId`, `CatalogPrice`, `Page` |  |
| `_dta_index_CrossRefs_9_457768688__K2_K3_K1_K5_K6_K7_K4_K15_K16` | no | NONCLUSTERED | `Active`, `ItemId`, `CrossRefId`, `CatalogId`, `CatalogPrice`, `Page`, `VendorItemCode`, `GrossPrice`, `DoNotDiscount` |  |
| `CrossRefs_MinimumOrderQuantity_index` | no | NONCLUSTERED | `MinimumOrderQuantity` |  |
| `IX_CrossRefs_MSDSRef_ItemId` | no | NONCLUSTERED | `MSDSRef`, `ItemId`, `Active` |  |
| `SK_ActiveCatalogSDSRef` | no | NONCLUSTERED | `Active`, `CatalogId`, `MSDSRef` |  |
| `SK_AIDate` | no | NONCLUSTERED | `AIDate` |  |
| `SK_CatalogActiveLastUpdated` | no | NONCLUSTERED | `Active`, `CatalogId`, `DateUpdated` |  |
| `SK_CatItem` | no | NONCLUSTERED | `CatalogId`, `ItemId`, `Active` |  |
| `SK_Item` | no | NONCLUSTERED | `ItemId` | `CrossRefId` |
| `SKI_ActiveSDSRef_Catalog` | no | NONCLUSTERED | `Active`, `MSDSRef` | `CatalogId`, `ItemId`, `VendorItemCode`, `Manufacturor`, `ManufacturorPartNumber`, `ImageURL` |
| `SKI_AIDate_KashKey` | no | NONCLUSTERED | `AIDate` | `HashKey` |
| `ski_CatActiveManufacturerPartNumber_VICUPCSDManUnique` | no | NONCLUSTERED | `CatalogId`, `Active`, `ManufacturorPartNumber` | `VendorItemCode`, `UPC_ISBN`, `ShortDescription`, `Manufacturor`, `UniqueItemNumber` |
| `SKI_CrossRef_` | YES | NONCLUSTERED | `CrossRefId` | `Active`, `ItemId`, `VendorItemCode`, `CatalogId`, `Page`, `PackedCode` |
| `SKI_HashKey_CrossRefId` | no | NONCLUSTERED | `HashKey`, `CatalogId`, `Active` | `CrossRefId`, `Manufacturor`, `ManufacturorPartNumber`, `FullDescription`, `ShortDescription` |
| `SKI_ImageURLCatalogActive_VendorItemCodeUnique` | no | NONCLUSTERED | `ImageURL`, `CatalogId`, `Active` | `CrossRefId`, `VendorItemCode`, `UniqueItemNumber` |
| `SKI_ItemActive_Etc` | no | NONCLUSTERED | `ItemId`, `Active`, `CatalogId` | `CrossRefId`, `VendorItemCode`, `Page`, `PackedCode`, `CatalogYear`, `GrossPrice`, `CatalogPrice`, `DoNotDiscount` |
| `SKI_PackedCatalogActive_Item` | no | NONCLUSTERED | `PackedCode`, `CatalogId`, `Active` | `CrossRefId`, `ItemId` |
| `SKI_PackedItem_Page` | no | NONCLUSTERED | `PackedCode`, `Active`, `ItemId`, `CatalogId` | `Page`, `CatalogYear`, `Manufacturor`, `ManufacturorPartNumber`, `GrossPrice`, `DoNotDiscount` |
| `SKI_UniqueCatalog_ImageURLId` | no | NONCLUSTERED | `UniqueItemNumber`, `CatalogId` | `ImageURL`, `CrossRefId`, `Active` |
| `ski_VICCatalogActive_DateUpdatedCrossRefIdImageURL` | no | NONCLUSTERED | `VendorItemCode`, `CatalogId`, `Active` | `DateUpdated`, `CrossRefId`, `ImageURL` |
