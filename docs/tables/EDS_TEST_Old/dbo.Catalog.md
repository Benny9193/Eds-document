# Table: `dbo.Catalog`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 3838

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CatalogId` | int | NO |  | YES |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `CategoryId` | int | YES |  |  |
| 4 | `VendorId` | int | YES |  |  |
| 5 | `Name` | varchar(50) | YES |  |  |
| 6 | `DisplayedVendorName` | varchar(50) | YES |  |  |
| 7 | `ImportFormat` | tinyint | YES |  |  |
| 8 | `Prefix` | varchar(10) | YES |  |  |
| 9 | `NextNumber` | int | YES |  |  |
| 10 | `VendorFormat` | int | YES |  |  |
| 11 | `Description` | varchar(255) | YES |  |  |
| 12 | `CrossRefLetter` | char(1) | YES |  |  |
| 13 | `DropSeq` | varchar(16) | YES |  |  |
| 14 | `CatalogYear` | char(2) | YES |  |  |
| 15 | `EffectiveFrom` | datetime | YES |  |  |
| 16 | `EffectiveUntil` | datetime | YES |  |  |
| 17 | `CreateDate` | datetime | YES |  |  |
| 18 | `PostDate` | datetime | YES |  |  |
| 19 | `WebDesc` | varchar(50) | YES |  |  |
| 20 | `WebLink` | varchar(255) | YES |  |  |
| 21 | `NotValidForOB` | tinyint | YES |  |  |
| 22 | `AlertMsg` | varchar(1024) | YES |  |  |
| 23 | `BeginDefault` | datetime | YES |  |  |
| 24 | `PackExp` | varchar(1024) | YES |  |  |
| 25 | `PackReplace` | varchar(1024) | YES |  |  |
| 26 | `Index` | int | YES |  |  |
| 27 | `Page1` | int | YES |  |  |
| 28 | `MaxPage` | int | YES |  |  |
| 29 | `PDFAvailable` | tinyint | YES |  |  |
| 30 | `pdfDirectory` | varchar(1024) | YES |  |  |
| 31 | `BasePath` | varchar(255) | YES |  |  |
| 32 | `BaseCatalogId` | int | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_Catalog_Category` | `CategoryId` | [`dbo.Category.CategoryId`](dbo.Category.md) | NO_ACTION | CASCADE |
| `FK_Catalog_Vendors` | `VendorId` | [`dbo.Vendors.VendorId`](dbo.Vendors.md) | NO_ACTION | CASCADE |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_ActiveVendorPost` | no | NONCLUSTERED | `Active`, `VendorId`, `PostDate` |  |
| `SKI_CategoryActiveYear_IdVendorName` | no | NONCLUSTERED | `CategoryId`, `Active`, `CatalogYear` | `CatalogId`, `VendorId`, `Name`, `DisplayedVendorName` |
| `SKI_VendorCategoryActiveYearCatalog_Name` | no | NONCLUSTERED | `VendorId`, `CategoryId`, `Active`, `CatalogYear`, `CatalogId` | `Name` |
