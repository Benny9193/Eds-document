# Cross-database outbound references: `Catalogs`

_Generated on 2026-05-04T13:15:40.539Z_

**Source database:** `Catalogs`

[← back to dependencies index](../README.md)

Routines, views, and triggers in this database that reference objects in another database.
Detected by text-scanning `sys.sql_modules.definition` for three-part names like `[OtherDb].schema.object` or `OtherDb.schema.object`.

## Summary

| Target database | Distinct edges |
|-----------------|----------------|
| `EDS` | 198 |

## → `EDS`

| Source routine | Source kind | Target object | Reference text | Detected by |
|----------------|-------------|---------------|----------------|-------------|
| [`dbo.sp_CatalogPrepareForPost`](../../procedures/Catalogs/dbo.sp_CatalogPrepareForPost.md) | Procedure | `dbo.Catalog` | `EDS.dbo.Catalog` | sed, text |
| [`dbo.sp_CatalogPrepareForPost`](../../procedures/Catalogs/dbo.sp_CatalogPrepareForPost.md) | Procedure | `dbo.Catalog Catalog` | `eds.dbo.Catalog Catalog` | text |
| [`dbo.sp_CatalogPrepareForPost`](../../procedures/Catalogs/dbo.sp_CatalogPrepareForPost.md) | Procedure | `dbo.Catalog Catalog1 on Catalog1` | `eds.dbo.Catalog Catalog1 on Catalog1` | text |
| [`dbo.sp_CatalogPrepareForPost`](../../procedures/Catalogs/dbo.sp_CatalogPrepareForPost.md) | Procedure | `dbo.CrossRefs` | `` | sed |
| [`dbo.sp_CatalogPrepareForPost`](../../procedures/Catalogs/dbo.sp_CatalogPrepareForPost.md) | Procedure | `dbo.CrossRefs xr on xr` | `eds.dbo.CrossRefs xr on xr` | text |
| [`dbo.sp_CatalogPrepareForPost`](../../procedures/Catalogs/dbo.sp_CatalogPrepareForPost.md) | Procedure | `dbo.uf_PackCodeCatalog` | `eds.dbo.uf_PackCodeCatalog` | sed, text |
| [`dbo.sp_CatalogPrePostXRef`](../../procedures/Catalogs/dbo.sp_CatalogPrePostXRef.md) | Procedure | `dbo.Catalog` | `EDS.dbo.Catalog` | sed, text |
| [`dbo.sp_CatalogPrePostXRef`](../../procedures/Catalogs/dbo.sp_CatalogPrePostXRef.md) | Procedure | `dbo.Catalog Catalog on Catalog` | `eds.dbo.Catalog Catalog on Catalog` | text |
| [`dbo.sp_CatalogPrePostXRef`](../../procedures/Catalogs/dbo.sp_CatalogPrePostXRef.md) | Procedure | `dbo.Catalog Catalog1 on Catalog1` | `eds.dbo.Catalog Catalog1 on Catalog1` | text |
| [`dbo.sp_CatalogPrePostXRef`](../../procedures/Catalogs/dbo.sp_CatalogPrePostXRef.md) | Procedure | `dbo.CrossRefs` | `` | sed |
| [`dbo.sp_CatalogPrePostXRef`](../../procedures/Catalogs/dbo.sp_CatalogPrePostXRef.md) | Procedure | `dbo.CrossRefs Crossrefs on Crossrefs` | `eds.dbo.CrossRefs Crossrefs on Crossrefs` | text |
| [`dbo.sp_CreateHybrid`](../../procedures/Catalogs/dbo.sp_CreateHybrid.md) | Procedure | `dbo.Catalog` | `[EDS].[dbo].[Catalog]` | sed, text |
| [`dbo.sp_CreateHybrid`](../../procedures/Catalogs/dbo.sp_CreateHybrid.md) | Procedure | `dbo.Catalog catold on catold` | `EDS.dbo.Catalog catold on catold` | text |
| [`dbo.sp_MergeCatalogs`](../../procedures/Catalogs/dbo.sp_MergeCatalogs.md) | Procedure | `dbo.Catalog` | `[EDS].[dbo].[Catalog]` | sed, text |
| [`dbo.sp_MergeCatalogs`](../../procedures/Catalogs/dbo.sp_MergeCatalogs.md) | Procedure | `dbo.Catalog cattarget on cattarget` | `EDS.dbo.Catalog cattarget on cattarget` | text |
| [`dbo.sp_PostCatalog`](../../procedures/Catalogs/dbo.sp_PostCatalog.md) | Procedure | `Catalog` | `eds..Catalog` | sed, text |
| [`dbo.sp_PostCatalog`](../../procedures/Catalogs/dbo.sp_PostCatalog.md) | Procedure | `Catalog catalog` | `eds..Catalog catalog` | text |
| [`dbo.sp_PostCatalog`](../../procedures/Catalogs/dbo.sp_PostCatalog.md) | Procedure | `CrossRefs` | `eds..CrossRefs` | sed, text |
| [`dbo.sp_PostCatalog`](../../procedures/Catalogs/dbo.sp_PostCatalog.md) | Procedure | `CrossRefs crossrefs` | `EDS..CrossRefs crossrefs` | text |
| [`dbo.sp_PostCatalog`](../../procedures/Catalogs/dbo.sp_PostCatalog.md) | Procedure | `dbo.Catalog` | `EDS.dbo.Catalog` | sed, text |
| [`dbo.sp_PostCatalog`](../../procedures/Catalogs/dbo.sp_PostCatalog.md) | Procedure | `dbo.Catalog Catalog` | `eds.dbo.Catalog Catalog` | text |
| [`dbo.sp_PostCatalog`](../../procedures/Catalogs/dbo.sp_PostCatalog.md) | Procedure | `dbo.Catalog Catalog on Catalog` | `eds.dbo.Catalog Catalog on Catalog` | text |
| [`dbo.sp_PostCatalog`](../../procedures/Catalogs/dbo.sp_PostCatalog.md) | Procedure | `dbo.Catalog Catalog1 on Catalog1` | `eds.dbo.Catalog Catalog1 on Catalog1` | text |
| [`dbo.sp_PostCatalog`](../../procedures/Catalogs/dbo.sp_PostCatalog.md) | Procedure | `dbo.CrossRefs` | `eds.dbo.CrossRefs` | sed, text |
| [`dbo.sp_PostCatalog`](../../procedures/Catalogs/dbo.sp_PostCatalog.md) | Procedure | `dbo.CrossRefs Crossrefs on Crossrefs` | `eds.dbo.CrossRefs Crossrefs on Crossrefs` | text |
| [`dbo.sp_PostCatalog`](../../procedures/Catalogs/dbo.sp_PostCatalog.md) | Procedure | `dbo.CrossRefs xr on xr` | `eds.dbo.CrossRefs xr on xr` | text |
| [`dbo.sp_PostCatalog`](../../procedures/Catalogs/dbo.sp_PostCatalog.md) | Procedure | `dbo.Headings` | `EDS.dbo.Headings` | sed, text |
| [`dbo.sp_PostCatalog`](../../procedures/Catalogs/dbo.sp_PostCatalog.md) | Procedure | `dbo.Headings dsh` | `eds.dbo.Headings dsh` | text |
| [`dbo.sp_PostCatalog`](../../procedures/Catalogs/dbo.sp_PostCatalog.md) | Procedure | `dbo.Headings gh on gh` | `eds.dbo.Headings gh on gh` | text |
| [`dbo.sp_PostCatalog`](../../procedures/Catalogs/dbo.sp_PostCatalog.md) | Procedure | `dbo.Headings Headings on headings` | `eds.dbo.Headings Headings on headings` | text |
| [`dbo.sp_PostCatalog`](../../procedures/Catalogs/dbo.sp_PostCatalog.md) | Procedure | `dbo.Headings ON Headings` | `EDS.dbo.Headings ON Headings` | text |
| [`dbo.sp_PostCatalog`](../../procedures/Catalogs/dbo.sp_PostCatalog.md) | Procedure | `dbo.Items` | `eds.dbo.Items` | sed, text |
| [`dbo.sp_PostCatalog`](../../procedures/Catalogs/dbo.sp_PostCatalog.md) | Procedure | `dbo.Items Items` | `eds.dbo.Items Items` | text |
| [`dbo.sp_PostCatalog`](../../procedures/Catalogs/dbo.sp_PostCatalog.md) | Procedure | `dbo.Items Items on Items` | `eds.dbo.Items Items on Items` | text |
| [`dbo.sp_PostCatalog`](../../procedures/Catalogs/dbo.sp_PostCatalog.md) | Procedure | `dbo.Items Items with` | `eds.dbo.Items Items with` | text |
| [`dbo.sp_PostCatalog`](../../procedures/Catalogs/dbo.sp_PostCatalog.md) | Procedure | `dbo.PostCatalogDetail` | `[EDS].[dbo].[PostCatalogDetail]` | sed, text |
| [`dbo.sp_PostCatalog`](../../procedures/Catalogs/dbo.sp_PostCatalog.md) | Procedure | `dbo.PostCatalogHeader` | `[EDS].[dbo].[PostCatalogHeader]` | sed, text |
| [`dbo.sp_PostCatalog`](../../procedures/Catalogs/dbo.sp_PostCatalog.md) | Procedure | `dbo.uf_PackCode` | `eds.dbo.uf_PackCode` | sed, text |
| [`dbo.sp_PostCatalog`](../../procedures/Catalogs/dbo.sp_PostCatalog.md) | Procedure | `dbo.uf_PackCodeCatalog` | `eds.dbo.uf_PackCodeCatalog` | sed, text |
| [`dbo.sp_PostCatalog`](../../procedures/Catalogs/dbo.sp_PostCatalog.md) | Procedure | `dbo.Units` | `eds.dbo.Units` | sed, text |
| [`dbo.sp_PostCatalog`](../../procedures/Catalogs/dbo.sp_PostCatalog.md) | Procedure | `dbo.Units Units on isnull` | `eds.dbo.Units Units on isnull` | text |
| [`dbo.sp_PostCatalog`](../../procedures/Catalogs/dbo.sp_PostCatalog.md) | Procedure | `dbo.Units Units on Units` | `EDS.dbo.Units Units on Units` | text |
| [`dbo.sp_PostCatalog`](../../procedures/Catalogs/dbo.sp_PostCatalog.md) | Procedure | `Items` | `eds..Items` | sed, text |
| [`dbo.sp_PostCatalog`](../../procedures/Catalogs/dbo.sp_PostCatalog.md) | Procedure | `Items items` | `eds..Items items` | text |
| [`dbo.sp_PostCatalog6`](../../procedures/Catalogs/dbo.sp_PostCatalog6.md) | Procedure | `Catalog` | `eds..Catalog` | sed, text |
| [`dbo.sp_PostCatalog6`](../../procedures/Catalogs/dbo.sp_PostCatalog6.md) | Procedure | `Catalog catalog` | `eds..Catalog catalog` | text |
| [`dbo.sp_PostCatalog6`](../../procedures/Catalogs/dbo.sp_PostCatalog6.md) | Procedure | `CrossRefs` | `eds..CrossRefs` | sed, text |
| [`dbo.sp_PostCatalog6`](../../procedures/Catalogs/dbo.sp_PostCatalog6.md) | Procedure | `CrossRefs crossrefs` | `EDS..CrossRefs crossrefs` | text |
| [`dbo.sp_PostCatalog6`](../../procedures/Catalogs/dbo.sp_PostCatalog6.md) | Procedure | `dbo.Catalog` | `EDS.dbo.Catalog` | sed, text |
| [`dbo.sp_PostCatalog6`](../../procedures/Catalogs/dbo.sp_PostCatalog6.md) | Procedure | `dbo.Catalog Catalog` | `eds.dbo.Catalog Catalog` | text |
| [`dbo.sp_PostCatalog6`](../../procedures/Catalogs/dbo.sp_PostCatalog6.md) | Procedure | `dbo.Catalog Catalog on Catalog` | `eds.dbo.Catalog Catalog on Catalog` | text |
| [`dbo.sp_PostCatalog6`](../../procedures/Catalogs/dbo.sp_PostCatalog6.md) | Procedure | `dbo.Catalog Catalog1 on Catalog1` | `eds.dbo.Catalog Catalog1 on Catalog1` | text |
| [`dbo.sp_PostCatalog6`](../../procedures/Catalogs/dbo.sp_PostCatalog6.md) | Procedure | `dbo.CrossRefs` | `eds.dbo.CrossRefs` | sed, text |
| [`dbo.sp_PostCatalog6`](../../procedures/Catalogs/dbo.sp_PostCatalog6.md) | Procedure | `dbo.CrossRefs Crossrefs on Crossrefs` | `eds.dbo.CrossRefs Crossrefs on Crossrefs` | text |
| [`dbo.sp_PostCatalog6`](../../procedures/Catalogs/dbo.sp_PostCatalog6.md) | Procedure | `dbo.CrossRefs xr on xr` | `eds.dbo.CrossRefs xr on xr` | text |
| [`dbo.sp_PostCatalog6`](../../procedures/Catalogs/dbo.sp_PostCatalog6.md) | Procedure | `dbo.Headings` | `EDS.dbo.Headings` | sed, text |
| [`dbo.sp_PostCatalog6`](../../procedures/Catalogs/dbo.sp_PostCatalog6.md) | Procedure | `dbo.Headings dsh` | `eds.dbo.Headings dsh` | text |
| [`dbo.sp_PostCatalog6`](../../procedures/Catalogs/dbo.sp_PostCatalog6.md) | Procedure | `dbo.Headings gh on gh` | `eds.dbo.Headings gh on gh` | text |
| [`dbo.sp_PostCatalog6`](../../procedures/Catalogs/dbo.sp_PostCatalog6.md) | Procedure | `dbo.Headings Headings on headings` | `eds.dbo.Headings Headings on headings` | text |
| [`dbo.sp_PostCatalog6`](../../procedures/Catalogs/dbo.sp_PostCatalog6.md) | Procedure | `dbo.Headings ON Headings` | `EDS.dbo.Headings ON Headings` | text |
| [`dbo.sp_PostCatalog6`](../../procedures/Catalogs/dbo.sp_PostCatalog6.md) | Procedure | `dbo.Items` | `eds.dbo.Items` | sed, text |
| [`dbo.sp_PostCatalog6`](../../procedures/Catalogs/dbo.sp_PostCatalog6.md) | Procedure | `dbo.Items Items` | `eds.dbo.Items Items` | text |
| [`dbo.sp_PostCatalog6`](../../procedures/Catalogs/dbo.sp_PostCatalog6.md) | Procedure | `dbo.Items Items on Items` | `eds.dbo.Items Items on Items` | text |
| [`dbo.sp_PostCatalog6`](../../procedures/Catalogs/dbo.sp_PostCatalog6.md) | Procedure | `dbo.Items Items with` | `eds.dbo.Items Items with` | text |
| [`dbo.sp_PostCatalog6`](../../procedures/Catalogs/dbo.sp_PostCatalog6.md) | Procedure | `dbo.PostCatalogDetail` | `[EDS].[dbo].[PostCatalogDetail]` | sed, text |
| [`dbo.sp_PostCatalog6`](../../procedures/Catalogs/dbo.sp_PostCatalog6.md) | Procedure | `dbo.PostCatalogHeader` | `[EDS].[dbo].[PostCatalogHeader]` | sed, text |
| [`dbo.sp_PostCatalog6`](../../procedures/Catalogs/dbo.sp_PostCatalog6.md) | Procedure | `dbo.uf_PackCode` | `eds.dbo.uf_PackCode` | sed, text |
| [`dbo.sp_PostCatalog6`](../../procedures/Catalogs/dbo.sp_PostCatalog6.md) | Procedure | `dbo.uf_PackCodeCatalog` | `eds.dbo.uf_PackCodeCatalog` | sed, text |
| [`dbo.sp_PostCatalog6`](../../procedures/Catalogs/dbo.sp_PostCatalog6.md) | Procedure | `dbo.Units` | `eds.dbo.Units` | sed, text |
| [`dbo.sp_PostCatalog6`](../../procedures/Catalogs/dbo.sp_PostCatalog6.md) | Procedure | `dbo.Units Units on isnull` | `eds.dbo.Units Units on isnull` | text |
| [`dbo.sp_PostCatalog6`](../../procedures/Catalogs/dbo.sp_PostCatalog6.md) | Procedure | `dbo.Units Units on Units` | `EDS.dbo.Units Units on Units` | text |
| [`dbo.sp_PostCatalog6`](../../procedures/Catalogs/dbo.sp_PostCatalog6.md) | Procedure | `Items` | `eds..Items` | sed, text |
| [`dbo.sp_PostCatalog6`](../../procedures/Catalogs/dbo.sp_PostCatalog6.md) | Procedure | `Items items` | `eds..Items items` | text |
| [`dbo.sp_PostCatalogBackup`](../../procedures/Catalogs/dbo.sp_PostCatalogBackup.md) | Procedure | `Catalog` | `eds..Catalog` | sed, text |
| [`dbo.sp_PostCatalogBackup`](../../procedures/Catalogs/dbo.sp_PostCatalogBackup.md) | Procedure | `Catalog catalog` | `eds..Catalog catalog` | text |
| [`dbo.sp_PostCatalogBackup`](../../procedures/Catalogs/dbo.sp_PostCatalogBackup.md) | Procedure | `CrossRefs` | `eds..CrossRefs` | sed, text |
| [`dbo.sp_PostCatalogBackup`](../../procedures/Catalogs/dbo.sp_PostCatalogBackup.md) | Procedure | `CrossRefs crossrefs` | `EDS..CrossRefs crossrefs` | text |
| [`dbo.sp_PostCatalogBackup`](../../procedures/Catalogs/dbo.sp_PostCatalogBackup.md) | Procedure | `dbo.Catalog` | `EDS.dbo.Catalog` | sed, text |
| [`dbo.sp_PostCatalogBackup`](../../procedures/Catalogs/dbo.sp_PostCatalogBackup.md) | Procedure | `dbo.Catalog Catalog` | `eds.dbo.Catalog Catalog` | text |
| [`dbo.sp_PostCatalogBackup`](../../procedures/Catalogs/dbo.sp_PostCatalogBackup.md) | Procedure | `dbo.Catalog Catalog on Catalog` | `eds.dbo.Catalog Catalog on Catalog` | text |
| [`dbo.sp_PostCatalogBackup`](../../procedures/Catalogs/dbo.sp_PostCatalogBackup.md) | Procedure | `dbo.Catalog Catalog1 on Catalog1` | `eds.dbo.Catalog Catalog1 on Catalog1` | text |
| [`dbo.sp_PostCatalogBackup`](../../procedures/Catalogs/dbo.sp_PostCatalogBackup.md) | Procedure | `dbo.CrossRefs` | `eds.dbo.CrossRefs` | sed, text |
| [`dbo.sp_PostCatalogBackup`](../../procedures/Catalogs/dbo.sp_PostCatalogBackup.md) | Procedure | `dbo.CrossRefs Crossrefs on Crossrefs` | `eds.dbo.CrossRefs Crossrefs on Crossrefs` | text |
| [`dbo.sp_PostCatalogBackup`](../../procedures/Catalogs/dbo.sp_PostCatalogBackup.md) | Procedure | `dbo.CrossRefs xr on xr` | `eds.dbo.CrossRefs xr on xr` | text |
| [`dbo.sp_PostCatalogBackup`](../../procedures/Catalogs/dbo.sp_PostCatalogBackup.md) | Procedure | `dbo.Items` | `eds.dbo.Items` | sed, text |
| [`dbo.sp_PostCatalogBackup`](../../procedures/Catalogs/dbo.sp_PostCatalogBackup.md) | Procedure | `dbo.Items Items` | `eds.dbo.Items Items` | text |
| [`dbo.sp_PostCatalogBackup`](../../procedures/Catalogs/dbo.sp_PostCatalogBackup.md) | Procedure | `dbo.Items Items on Items` | `eds.dbo.Items Items on Items` | text |
| [`dbo.sp_PostCatalogBackup`](../../procedures/Catalogs/dbo.sp_PostCatalogBackup.md) | Procedure | `dbo.uf_PackCodeCatalog` | `eds.dbo.uf_PackCodeCatalog` | sed, text |
| [`dbo.sp_PostCatalogBackup`](../../procedures/Catalogs/dbo.sp_PostCatalogBackup.md) | Procedure | `dbo.Units` | `eds.dbo.Units` | sed, text |
| [`dbo.sp_PostCatalogBackup`](../../procedures/Catalogs/dbo.sp_PostCatalogBackup.md) | Procedure | `dbo.Units Units on isnull` | `eds.dbo.Units Units on isnull` | text |
| [`dbo.sp_PostCatalogBackup`](../../procedures/Catalogs/dbo.sp_PostCatalogBackup.md) | Procedure | `dbo.Units Units on Units` | `eds.dbo.Units Units on Units` | text |
| [`dbo.sp_PostCatalogBackup`](../../procedures/Catalogs/dbo.sp_PostCatalogBackup.md) | Procedure | `Items` | `eds..Items` | sed, text |
| [`dbo.sp_PostCatalogBackup`](../../procedures/Catalogs/dbo.sp_PostCatalogBackup.md) | Procedure | `Items items` | `eds..Items items` | text |
| [`dbo.sp_PostCatalogBG2013`](../../procedures/Catalogs/dbo.sp_PostCatalogBG2013.md) | Procedure | `Catalog` | `eds..Catalog` | sed, text |
| [`dbo.sp_PostCatalogBG2013`](../../procedures/Catalogs/dbo.sp_PostCatalogBG2013.md) | Procedure | `Catalog catalog` | `eds..Catalog catalog` | text |
| [`dbo.sp_PostCatalogBG2013`](../../procedures/Catalogs/dbo.sp_PostCatalogBG2013.md) | Procedure | `CrossRefs` | `eds..CrossRefs` | sed, text |
| [`dbo.sp_PostCatalogBG2013`](../../procedures/Catalogs/dbo.sp_PostCatalogBG2013.md) | Procedure | `Crossrefs CrossRefs` | `eds..Crossrefs CrossRefs` | text |
| [`dbo.sp_PostCatalogBG2013`](../../procedures/Catalogs/dbo.sp_PostCatalogBG2013.md) | Procedure | `dbo.Catalog` | `` | sed |
| [`dbo.sp_PostCatalogBG2013`](../../procedures/Catalogs/dbo.sp_PostCatalogBG2013.md) | Procedure | `dbo.Catalog Catalog on Catalog` | `eds.dbo.Catalog Catalog on Catalog` | text |
| [`dbo.sp_PostCatalogBG2013`](../../procedures/Catalogs/dbo.sp_PostCatalogBG2013.md) | Procedure | `dbo.Catalog Catalog1 on Catalog1` | `eds.dbo.Catalog Catalog1 on Catalog1` | text |
| [`dbo.sp_PostCatalogBG2013`](../../procedures/Catalogs/dbo.sp_PostCatalogBG2013.md) | Procedure | `dbo.CrossRefs` | `eds.dbo.CrossRefs` | sed, text |
| [`dbo.sp_PostCatalogBG2013`](../../procedures/Catalogs/dbo.sp_PostCatalogBG2013.md) | Procedure | `dbo.CrossRefs Crossrefs on Crossrefs` | `eds.dbo.CrossRefs Crossrefs on Crossrefs` | text |
| [`dbo.sp_PostCatalogBG2013`](../../procedures/Catalogs/dbo.sp_PostCatalogBG2013.md) | Procedure | `dbo.Items` | `eds.dbo.Items` | sed, text |
| [`dbo.sp_PostCatalogBG2013`](../../procedures/Catalogs/dbo.sp_PostCatalogBG2013.md) | Procedure | `dbo.Items Items` | `eds.dbo.Items Items` | text |
| [`dbo.sp_PostCatalogBG2013`](../../procedures/Catalogs/dbo.sp_PostCatalogBG2013.md) | Procedure | `dbo.Items Items on Items` | `eds.dbo.Items Items on Items` | text |
| [`dbo.sp_PostCatalogBG2013`](../../procedures/Catalogs/dbo.sp_PostCatalogBG2013.md) | Procedure | `dbo.Units` | `eds.dbo.Units` | sed, text |
| [`dbo.sp_PostCatalogBG2013`](../../procedures/Catalogs/dbo.sp_PostCatalogBG2013.md) | Procedure | `dbo.Units Units on isnull` | `eds.dbo.Units Units on isnull` | text |
| [`dbo.sp_PostCatalogBG2013`](../../procedures/Catalogs/dbo.sp_PostCatalogBG2013.md) | Procedure | `dbo.Units Units on Units` | `eds.dbo.Units Units on Units` | text |
| [`dbo.sp_PostCatalogBG2013`](../../procedures/Catalogs/dbo.sp_PostCatalogBG2013.md) | Procedure | `Items` | `eds..Items` | sed, text |
| [`dbo.sp_PostCatalogBG2013`](../../procedures/Catalogs/dbo.sp_PostCatalogBG2013.md) | Procedure | `Items items` | `eds..Items items` | text |
| [`dbo.sp_PostCatalogLarge`](../../procedures/Catalogs/dbo.sp_PostCatalogLarge.md) | Procedure | `Catalog` | `` | sed |
| [`dbo.sp_PostCatalogLarge`](../../procedures/Catalogs/dbo.sp_PostCatalogLarge.md) | Procedure | `Catalog catalog` | `eds..Catalog catalog` | text |
| [`dbo.sp_PostCatalogLarge`](../../procedures/Catalogs/dbo.sp_PostCatalogLarge.md) | Procedure | `dbo.Catalog` | `EDS.dbo.Catalog` | sed, text |
| [`dbo.sp_PostCatalogLarge`](../../procedures/Catalogs/dbo.sp_PostCatalogLarge.md) | Procedure | `dbo.Catalog Catalog on Catalog` | `eds.dbo.Catalog Catalog on Catalog` | text |
| [`dbo.sp_PostCatalogLarge`](../../procedures/Catalogs/dbo.sp_PostCatalogLarge.md) | Procedure | `dbo.Catalog Catalog1 on Catalog1` | `eds.dbo.Catalog Catalog1 on Catalog1` | text |
| [`dbo.sp_PostCatalogLarge`](../../procedures/Catalogs/dbo.sp_PostCatalogLarge.md) | Procedure | `dbo.CrossRefs` | `eds.dbo.CrossRefs` | sed, text |
| [`dbo.sp_PostCatalogLarge`](../../procedures/Catalogs/dbo.sp_PostCatalogLarge.md) | Procedure | `dbo.CrossRefs Crossrefs on Crossrefs` | `eds.dbo.CrossRefs Crossrefs on Crossrefs` | text |
| [`dbo.sp_PostCatalogLarge`](../../procedures/Catalogs/dbo.sp_PostCatalogLarge.md) | Procedure | `dbo.Items` | `eds.dbo.Items` | sed, text |
| [`dbo.sp_PostCatalogLarge`](../../procedures/Catalogs/dbo.sp_PostCatalogLarge.md) | Procedure | `dbo.Items Items on Items` | `eds.dbo.Items Items on Items` | text |
| [`dbo.sp_PostCatalogLarge`](../../procedures/Catalogs/dbo.sp_PostCatalogLarge.md) | Procedure | `dbo.Items Items with` | `eds.dbo.Items Items with` | text |
| [`dbo.sp_PostCatalogLarge`](../../procedures/Catalogs/dbo.sp_PostCatalogLarge.md) | Procedure | `dbo.uf_PackCodeCatalog` | `eds.dbo.uf_PackCodeCatalog` | sed, text |
| [`dbo.sp_PostCatalogLarge`](../../procedures/Catalogs/dbo.sp_PostCatalogLarge.md) | Procedure | `dbo.Units` | `eds.dbo.Units` | sed, text |
| [`dbo.sp_PostCatalogLarge`](../../procedures/Catalogs/dbo.sp_PostCatalogLarge.md) | Procedure | `dbo.Units Units on isnull` | `eds.dbo.Units Units on isnull` | text |
| [`dbo.sp_PostCatalogLarge`](../../procedures/Catalogs/dbo.sp_PostCatalogLarge.md) | Procedure | `dbo.Units Units on Units` | `eds.dbo.Units Units on Units` | text |
| [`dbo.sp_PostCatalogLarge`](../../procedures/Catalogs/dbo.sp_PostCatalogLarge.md) | Procedure | `Items` | `` | sed |
| [`dbo.sp_PostCatalogLarge`](../../procedures/Catalogs/dbo.sp_PostCatalogLarge.md) | Procedure | `Items items` | `eds..Items items` | text |
| [`dbo.sp_PostCatalogNew`](../../procedures/Catalogs/dbo.sp_PostCatalogNew.md) | Procedure | `Catalog` | `eds..Catalog` | sed, text |
| [`dbo.sp_PostCatalogNew`](../../procedures/Catalogs/dbo.sp_PostCatalogNew.md) | Procedure | `Catalog catalog` | `eds..Catalog catalog` | text |
| [`dbo.sp_PostCatalogNew`](../../procedures/Catalogs/dbo.sp_PostCatalogNew.md) | Procedure | `CrossRefs` | `eds..CrossRefs` | sed, text |
| [`dbo.sp_PostCatalogNew`](../../procedures/Catalogs/dbo.sp_PostCatalogNew.md) | Procedure | `CrossRefs crossrefs` | `EDS..CrossRefs crossrefs` | text |
| [`dbo.sp_PostCatalogNew`](../../procedures/Catalogs/dbo.sp_PostCatalogNew.md) | Procedure | `dbo.Catalog` | `EDS.dbo.Catalog` | sed, text |
| [`dbo.sp_PostCatalogNew`](../../procedures/Catalogs/dbo.sp_PostCatalogNew.md) | Procedure | `dbo.Catalog cat on cat` | `eds.dbo.Catalog cat on cat` | text |
| [`dbo.sp_PostCatalogNew`](../../procedures/Catalogs/dbo.sp_PostCatalogNew.md) | Procedure | `dbo.Catalog Catalog` | `eds.dbo.Catalog Catalog` | text |
| [`dbo.sp_PostCatalogNew`](../../procedures/Catalogs/dbo.sp_PostCatalogNew.md) | Procedure | `dbo.Catalog Catalog on Catalog` | `eds.dbo.Catalog Catalog on Catalog` | text |
| [`dbo.sp_PostCatalogNew`](../../procedures/Catalogs/dbo.sp_PostCatalogNew.md) | Procedure | `dbo.Catalog Catalog1 on Catalog1` | `eds.dbo.Catalog Catalog1 on Catalog1` | text |
| [`dbo.sp_PostCatalogNew`](../../procedures/Catalogs/dbo.sp_PostCatalogNew.md) | Procedure | `dbo.CrossRefs` | `eds.dbo.CrossRefs` | sed, text |
| [`dbo.sp_PostCatalogNew`](../../procedures/Catalogs/dbo.sp_PostCatalogNew.md) | Procedure | `dbo.CrossRefs CrossRefs on CrossRefs` | `eds.dbo.CrossRefs CrossRefs on CrossRefs` | text |
| [`dbo.sp_PostCatalogNew`](../../procedures/Catalogs/dbo.sp_PostCatalogNew.md) | Procedure | `dbo.CrossRefs xr on xr` | `eds.dbo.CrossRefs xr on xr` | text |
| [`dbo.sp_PostCatalogNew`](../../procedures/Catalogs/dbo.sp_PostCatalogNew.md) | Procedure | `dbo.Headings` | `EDS.dbo.Headings` | sed, text |
| [`dbo.sp_PostCatalogNew`](../../procedures/Catalogs/dbo.sp_PostCatalogNew.md) | Procedure | `dbo.Headings dsh` | `eds.dbo.Headings dsh` | text |
| [`dbo.sp_PostCatalogNew`](../../procedures/Catalogs/dbo.sp_PostCatalogNew.md) | Procedure | `dbo.Headings gh on gh` | `eds.dbo.Headings gh on gh` | text |
| [`dbo.sp_PostCatalogNew`](../../procedures/Catalogs/dbo.sp_PostCatalogNew.md) | Procedure | `dbo.Headings Headings on headings` | `eds.dbo.Headings Headings on headings` | text |
| [`dbo.sp_PostCatalogNew`](../../procedures/Catalogs/dbo.sp_PostCatalogNew.md) | Procedure | `dbo.Headings ON Headings` | `EDS.dbo.Headings ON Headings` | text |
| [`dbo.sp_PostCatalogNew`](../../procedures/Catalogs/dbo.sp_PostCatalogNew.md) | Procedure | `dbo.Items` | `eds.dbo.Items` | sed, text |
| [`dbo.sp_PostCatalogNew`](../../procedures/Catalogs/dbo.sp_PostCatalogNew.md) | Procedure | `dbo.Items Items` | `eds.dbo.Items Items` | text |
| [`dbo.sp_PostCatalogNew`](../../procedures/Catalogs/dbo.sp_PostCatalogNew.md) | Procedure | `dbo.Items Items on Items` | `eds.dbo.Items Items on Items` | text |
| [`dbo.sp_PostCatalogNew`](../../procedures/Catalogs/dbo.sp_PostCatalogNew.md) | Procedure | `dbo.Items on Items` | `eds.dbo.Items on Items` | text |
| [`dbo.sp_PostCatalogNew`](../../procedures/Catalogs/dbo.sp_PostCatalogNew.md) | Procedure | `dbo.PostCatalogDetail` | `[EDS].[dbo].[PostCatalogDetail]` | sed, text |
| [`dbo.sp_PostCatalogNew`](../../procedures/Catalogs/dbo.sp_PostCatalogNew.md) | Procedure | `dbo.PostCatalogHeader` | `[EDS].[dbo].[PostCatalogHeader]` | sed, text |
| [`dbo.sp_PostCatalogNew`](../../procedures/Catalogs/dbo.sp_PostCatalogNew.md) | Procedure | `dbo.uf_PackCode` | `eds.dbo.uf_PackCode` | sed, text |
| [`dbo.sp_PostCatalogNew`](../../procedures/Catalogs/dbo.sp_PostCatalogNew.md) | Procedure | `dbo.uf_PackCodeCatalog` | `eds.dbo.uf_PackCodeCatalog` | sed, text |
| [`dbo.sp_PostCatalogNew`](../../procedures/Catalogs/dbo.sp_PostCatalogNew.md) | Procedure | `dbo.Units` | `eds.dbo.Units` | sed, text |
| [`dbo.sp_PostCatalogNew`](../../procedures/Catalogs/dbo.sp_PostCatalogNew.md) | Procedure | `dbo.Units Units on isnull` | `eds.dbo.Units Units on isnull` | text |
| [`dbo.sp_PostCatalogNew`](../../procedures/Catalogs/dbo.sp_PostCatalogNew.md) | Procedure | `dbo.Units Units on Units` | `eds.dbo.Units Units on Units` | text |
| [`dbo.sp_PostCatalogNew`](../../procedures/Catalogs/dbo.sp_PostCatalogNew.md) | Procedure | `Items` | `eds..Items` | sed, text |
| [`dbo.sp_PostCatalogNew`](../../procedures/Catalogs/dbo.sp_PostCatalogNew.md) | Procedure | `Items items` | `eds..Items items` | text |
| [`dbo.sp_PostCatalogOrig`](../../procedures/Catalogs/dbo.sp_PostCatalogOrig.md) | Procedure | `Catalog` | `eds..Catalog` | sed, text |
| [`dbo.sp_PostCatalogOrig`](../../procedures/Catalogs/dbo.sp_PostCatalogOrig.md) | Procedure | `Catalog catalog` | `eds..Catalog catalog` | text |
| [`dbo.sp_PostCatalogOrig`](../../procedures/Catalogs/dbo.sp_PostCatalogOrig.md) | Procedure | `CrossRefs` | `eds..CrossRefs` | sed, text |
| [`dbo.sp_PostCatalogOrig`](../../procedures/Catalogs/dbo.sp_PostCatalogOrig.md) | Procedure | `CrossRefs crossrefs` | `EDS..CrossRefs crossrefs` | text |
| [`dbo.sp_PostCatalogOrig`](../../procedures/Catalogs/dbo.sp_PostCatalogOrig.md) | Procedure | `dbo.Catalog` | `EDS.dbo.Catalog` | sed, text |
| [`dbo.sp_PostCatalogOrig`](../../procedures/Catalogs/dbo.sp_PostCatalogOrig.md) | Procedure | `dbo.Catalog cat on cat` | `eds.dbo.Catalog cat on cat` | text |
| [`dbo.sp_PostCatalogOrig`](../../procedures/Catalogs/dbo.sp_PostCatalogOrig.md) | Procedure | `dbo.Catalog Catalog` | `eds.dbo.Catalog Catalog` | text |
| [`dbo.sp_PostCatalogOrig`](../../procedures/Catalogs/dbo.sp_PostCatalogOrig.md) | Procedure | `dbo.Catalog Catalog on Catalog` | `eds.dbo.Catalog Catalog on Catalog` | text |
| [`dbo.sp_PostCatalogOrig`](../../procedures/Catalogs/dbo.sp_PostCatalogOrig.md) | Procedure | `dbo.Catalog Catalog1 on Catalog1` | `eds.dbo.Catalog Catalog1 on Catalog1` | text |
| [`dbo.sp_PostCatalogOrig`](../../procedures/Catalogs/dbo.sp_PostCatalogOrig.md) | Procedure | `dbo.CrossRefs` | `eds.dbo.CrossRefs` | sed, text |
| [`dbo.sp_PostCatalogOrig`](../../procedures/Catalogs/dbo.sp_PostCatalogOrig.md) | Procedure | `dbo.CrossRefs Crossrefs on Crossrefs` | `eds.dbo.CrossRefs Crossrefs on Crossrefs` | text |
| [`dbo.sp_PostCatalogOrig`](../../procedures/Catalogs/dbo.sp_PostCatalogOrig.md) | Procedure | `dbo.CrossRefs xr on xr` | `eds.dbo.CrossRefs xr on xr` | text |
| [`dbo.sp_PostCatalogOrig`](../../procedures/Catalogs/dbo.sp_PostCatalogOrig.md) | Procedure | `dbo.Headings` | `EDS.dbo.Headings` | sed, text |
| [`dbo.sp_PostCatalogOrig`](../../procedures/Catalogs/dbo.sp_PostCatalogOrig.md) | Procedure | `dbo.Headings dsh` | `eds.dbo.Headings dsh` | text |
| [`dbo.sp_PostCatalogOrig`](../../procedures/Catalogs/dbo.sp_PostCatalogOrig.md) | Procedure | `dbo.Headings gh on gh` | `eds.dbo.Headings gh on gh` | text |
| [`dbo.sp_PostCatalogOrig`](../../procedures/Catalogs/dbo.sp_PostCatalogOrig.md) | Procedure | `dbo.Headings Headings on headings` | `eds.dbo.Headings Headings on headings` | text |
| [`dbo.sp_PostCatalogOrig`](../../procedures/Catalogs/dbo.sp_PostCatalogOrig.md) | Procedure | `dbo.Headings ON Headings` | `EDS.dbo.Headings ON Headings` | text |
| [`dbo.sp_PostCatalogOrig`](../../procedures/Catalogs/dbo.sp_PostCatalogOrig.md) | Procedure | `dbo.Items` | `eds.dbo.Items` | sed, text |
| [`dbo.sp_PostCatalogOrig`](../../procedures/Catalogs/dbo.sp_PostCatalogOrig.md) | Procedure | `dbo.Items Items` | `eds.dbo.Items Items` | text |
| [`dbo.sp_PostCatalogOrig`](../../procedures/Catalogs/dbo.sp_PostCatalogOrig.md) | Procedure | `dbo.Items Items on Items` | `EDS.dbo.Items Items on Items` | text |
| [`dbo.sp_PostCatalogOrig`](../../procedures/Catalogs/dbo.sp_PostCatalogOrig.md) | Procedure | `dbo.Items Items with` | `eds.dbo.Items Items with` | text |
| [`dbo.sp_PostCatalogOrig`](../../procedures/Catalogs/dbo.sp_PostCatalogOrig.md) | Procedure | `dbo.Items on Items` | `eds.dbo.Items on Items` | text |
| [`dbo.sp_PostCatalogOrig`](../../procedures/Catalogs/dbo.sp_PostCatalogOrig.md) | Procedure | `dbo.PostCatalogDetail` | `[EDS].[dbo].[PostCatalogDetail]` | sed, text |
| [`dbo.sp_PostCatalogOrig`](../../procedures/Catalogs/dbo.sp_PostCatalogOrig.md) | Procedure | `dbo.PostCatalogHeader` | `[EDS].[dbo].[PostCatalogHeader]` | sed, text |
| [`dbo.sp_PostCatalogOrig`](../../procedures/Catalogs/dbo.sp_PostCatalogOrig.md) | Procedure | `dbo.uf_PackCode` | `eds.dbo.uf_PackCode` | sed, text |
| [`dbo.sp_PostCatalogOrig`](../../procedures/Catalogs/dbo.sp_PostCatalogOrig.md) | Procedure | `dbo.uf_PackCodeCatalog` | `eds.dbo.uf_PackCodeCatalog` | sed, text |
| [`dbo.sp_PostCatalogOrig`](../../procedures/Catalogs/dbo.sp_PostCatalogOrig.md) | Procedure | `dbo.Units` | `eds.dbo.Units` | sed, text |
| [`dbo.sp_PostCatalogOrig`](../../procedures/Catalogs/dbo.sp_PostCatalogOrig.md) | Procedure | `dbo.Units Units on isnull` | `eds.dbo.Units Units on isnull` | text |
| [`dbo.sp_PostCatalogOrig`](../../procedures/Catalogs/dbo.sp_PostCatalogOrig.md) | Procedure | `dbo.Units Units on Units` | `EDS.dbo.Units Units on Units` | text |
| [`dbo.sp_PostCatalogOrig`](../../procedures/Catalogs/dbo.sp_PostCatalogOrig.md) | Procedure | `Items` | `eds..Items` | sed, text |
| [`dbo.sp_PostCatalogOrig`](../../procedures/Catalogs/dbo.sp_PostCatalogOrig.md) | Procedure | `Items items` | `eds..Items items` | text |
| [`dbo.sp_ProcessMiddletownCatalog`](../../procedures/Catalogs/dbo.sp_ProcessMiddletownCatalog.md) | Procedure | `dbo.BidHeaders` | `EDS.dbo.BidHeaders` | sed, text |
| [`dbo.sp_ProcessMiddletownCatalog`](../../procedures/Catalogs/dbo.sp_ProcessMiddletownCatalog.md) | Procedure | `dbo.BidImports` | `EDS.dbo.BidImports` | sed, text |
| [`dbo.sp_ProcessMiddletownCatalog`](../../procedures/Catalogs/dbo.sp_ProcessMiddletownCatalog.md) | Procedure | `dbo.BidRequestItems` | `[EDS].[dbo].[BidRequestItems]` | sed, text |
| [`dbo.sp_ProcessMiddletownCatalog`](../../procedures/Catalogs/dbo.sp_ProcessMiddletownCatalog.md) | Procedure | `dbo.BidResults` | `[EDS].[dbo].[BidResults]` | sed, text |
| [`dbo.sp_ProcessMiddletownCatalog`](../../procedures/Catalogs/dbo.sp_ProcessMiddletownCatalog.md) | Procedure | `dbo.Catalog` | `EDS.dbo.Catalog` | sed, text |
| [`dbo.sp_ProcessMiddletownCatalog`](../../procedures/Catalogs/dbo.sp_ProcessMiddletownCatalog.md) | Procedure | `dbo.Headings` | `EDS.dbo.Headings` | sed, text |
| [`dbo.sp_ProcessMiddletownCatalog`](../../procedures/Catalogs/dbo.sp_ProcessMiddletownCatalog.md) | Procedure | `dbo.Headings H ON H` | `EDS.dbo.Headings H ON H` | text |
| [`dbo.sp_ProcessMiddletownCatalog`](../../procedures/Catalogs/dbo.sp_ProcessMiddletownCatalog.md) | Procedure | `Items` | `eds..Items` | sed, text |
| [`dbo.sp_ProcessMiddletownCatalog`](../../procedures/Catalogs/dbo.sp_ProcessMiddletownCatalog.md) | Procedure | `Items items` | `eds..Items items` | text |
| [`dbo.sp_ProcessMiddletownCatalog`](../../procedures/Catalogs/dbo.sp_ProcessMiddletownCatalog.md) | Procedure | `Items items ON items` | `eds..Items items ON items` | text |
| [`dbo.sp_ReimportCatalog`](../../procedures/Catalogs/dbo.sp_ReimportCatalog.md) | Procedure | `dbo.uf_PackCodeCatalog` | `eds.dbo.uf_PackCodeCatalog` | sed, text |

## Source queries

- `sys.objects` joined to `sys.sql_modules` — full T-SQL definition of every procedure, function, view, and trigger.
- `sys.sql_expression_dependencies` — SQL Server's own resolved cross-DB references (used as a cross-check).
- Text-grep over the definition for `[<db>].` and `<db>.` patterns (after stripping comments).
