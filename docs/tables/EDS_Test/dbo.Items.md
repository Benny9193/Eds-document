# Table: `dbo.Items`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 30147867

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ItemId` | int | NO |  | YES |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `CategoryId` | int | YES |  |  |
| 4 | `ItemCode` | varchar(50) | YES |  |  |
| 5 | `Description` | varchar(512) | YES |  |  |
| 6 | `UnitId` | int | YES |  |  |
| 7 | `ParentCatalogId` | int | YES |  |  |
| 8 | `HeadingId` | int | YES |  |  |
| 9 | `RTK` | tinyint | YES |  |  |
| 10 | `SortSeq` | varchar(64) | YES |  |  |
| 11 | `EditionId` | int | YES |  |  |
| 12 | `CopyrightYear` | int | YES |  |  |
| 13 | `PackedCode` | varchar(50) | YES | `('([dbo].[uf_PackCode]([ItemCode]))')` |  |
| 14 | `DateDeactivated` | datetime | YES |  |  |
| 15 | `DistrictId` | int | YES |  |  |
| 16 | `BrandName` | varchar(50) | YES |  |  |
| 17 | `ManufacturorNumber` | varchar(50) | YES |  |  |
| 18 | `VendorId` | int | YES |  |  |
| 19 | `VendorPartNumber` | varchar(50) | YES |  |  |
| 20 | `ItemsPerUnit` | varchar(50) | YES |  |  |
| 21 | `ListPrice` | money | YES |  |  |
| 22 | `ExtraDetail` | varchar(1024) | YES |  |  |
| 23 | `ShortDescription` | varchar(60) | YES |  |  |
| 24 | `KeywordId` | int | YES |  |  |
| 25 | `AlternateItemCode` | varchar(50) | YES |  |  |
| 26 | `SectionId` | int | YES |  |  |
| 27 | `UOMDivisor` | int | YES |  |  |
| 28 | `RedirectedItemId` | int | YES |  |  |
| 29 | `ListPriceSource` | int | YES |  |  |
| 30 | `FullDescription` | varchar(1536) | YES |  |  |
| 31 | `CrossRefText` | varchar(768) | YES |  |  |
| 32 | `StandardItem` | tinyint | YES |  |  |
| 33 | `BidderToSupplyVendor` | tinyint | YES |  |  |
| 34 | `BidderToSupplyVendorPartNbr` | tinyint | YES |  |  |
| 35 | `ManufacturerId` | int | YES |  |  |
| 36 | `VendorToSupplyManufacturer` | tinyint | YES |  |  |
| 37 | `ProductLineId` | int | YES |  |  |
| 38 | `HeadingKeywordId` | bigint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `_dta_index_Items_12_1509632471__K1_K6_K15_K8_K24_5_10` | no | NONCLUSTERED | `ItemId`, `UnitId`, `DistrictId`, `HeadingId`, `KeywordId` | `Description`, `SortSeq` |
| `_dta_index_Items_7_1509632471__K1_K24_K6_K15_K18_K11_K7_K3_K8_4_5_10_12_16_17_19_20_22` | no | NONCLUSTERED | `ItemId`, `KeywordId`, `UnitId`, `DistrictId`, `VendorId`, `EditionId`, `ParentCatalogId`, `CategoryId`, `HeadingId` | `ItemCode`, `Description`, `SortSeq`, `CopyrightYear`, `BrandName`, `ManufacturorNumber`, `VendorPartNumber`, `ItemsPerUnit`, `ExtraDetail` |
| `DPA_RECIDX_18` | no | NONCLUSTERED | `VendorId` | `CategoryId` |
| `SK_CategoryPackedcode_ItemIdActiveItemCodeDescUnitParentHeadingRTKSortDist` | no | NONCLUSTERED | `CategoryId`, `PackedCode` | `ItemId`, `Active`, `ItemCode`, `Description`, `UnitId`, `ParentCatalogId`, `HeadingId`, `RTK`, `SortSeq`, `DistrictId` |
| `SK_CategoryUnit` | no | NONCLUSTERED | `CategoryId`, `UnitId` |  |
| `SK_Heading` | no | NONCLUSTERED | `HeadingId` | `ItemId` |
| `SK_ItemActiveDistrict` | no | NONCLUSTERED | `ItemId`, `Active`, `DistrictId` |  |
| `SK_ItemCodeCategory` | no | NONCLUSTERED | `ItemCode`, `CategoryId` |  |
| `SK_ItemHeading` | no | NONCLUSTERED | `Active` | `ItemId`, `HeadingId` |
| `SK_ItemItemCodeCategory` | no | NONCLUSTERED | `ItemId`, `ItemCode`, `CategoryId` |  |
| `SKI_ActiveCategory_Heading` | no | NONCLUSTERED | `Active`, `CategoryId` | `HeadingId` |
| `SKI_ActiveHeading_ItemItemcodeDescrUnitSortseq` | no | NONCLUSTERED | `Active`, `HeadingId` | `ItemId`, `ItemCode`, `Description`, `UnitId`, `SortSeq`, `DistrictId`, `ListPrice` |
| `ski_CategoryDistrictActive_Heading` | no | NONCLUSTERED | `CategoryId`, `DistrictId`, `Active` | `HeadingId`, `ItemId` |
| `SKI_HeadingActiveCategoryDistrict_Item` | no | NONCLUSTERED | `HeadingId`, `Active`, `CategoryId`, `DistrictId` | `ItemId` |
| `SKI_Item_CategoryHeadingKeywordItemCodeUnit` | YES | NONCLUSTERED | `ItemId` | `CategoryId`, `ItemCode`, `UnitId`, `HeadingId`, `KeywordId` |
| `SKI_ItemCategoryActive_HeadingKeyword` | YES | NONCLUSTERED | `ItemId`, `CategoryId`, `Active` | `HeadingId`, `KeywordId`, `DistrictId` |
| `SKI_ItemCode` | no | NONCLUSTERED | `ItemCode` | `SortSeq` |
