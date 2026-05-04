# Cross-database inbound references: `EDS`

_Generated on 2026-05-04T13:15:40.535Z_

**Target database:** `EDS`

[← back to dependencies index](../README.md)

Routines, views, and triggers in *other* databases that reach into this database.

## Summary

| Source database | Distinct edges |
|-----------------|----------------|
| `Catalogs` | 198 |
| `NJ_RTK` | 31 |
| `VendorBids` | 34 |

## ← `Catalogs`

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

## ← `NJ_RTK`

| Source routine | Source kind | Target object | Reference text | Detected by |
|----------------|-------------|---------------|----------------|-------------|
| [`dbo.sp_refreshFacility`](../../procedures/NJ_RTK/dbo.sp_refreshFacility.md) | Procedure | `dbo.RTK_Sites` | `EDS.dbo.RTK_Sites` | sed, text |
| `dbo.vw_InventoryRange` | View | `dbo.RTK_Inventories` | `` | sed |
| `dbo.vw_InventoryRange` | View | `dbo.RTK_Inventories i where i` | `eds.dbo.RTK_Inventories i where i` | text |
| `dbo.vw_InventoryRange` | View | `dbo.RTK_Inventories i1 where i1` | `eds.dbo.RTK_Inventories i1 where i1` | text |
| `dbo.vw_InventoryRange` | View | `dbo.RTK_ReportItems` | `` | sed |
| `dbo.vw_InventoryRange` | View | `dbo.RTK_ReportItems ri where ri` | `eds.dbo.RTK_ReportItems ri where ri` | text |
| `dbo.vw_InventoryRange` | View | `dbo.RTK_Sites` | `` | sed |
| `dbo.vw_InventoryRange` | View | `dbo.RTK_Sites s` | `eds.dbo.RTK_Sites s` | text |
| `dbo.vw_reportedData` | View | `dbo.RTK_ContainerCodes` | `` | sed |
| `dbo.vw_reportedData` | View | `dbo.RTK_ContainerCodes cc on cc` | `EDS.dbo.RTK_ContainerCodes cc on cc` | text |
| `dbo.vw_reportedData` | View | `dbo.RTK_InventoryRangeCodes` | `` | sed |
| `dbo.vw_reportedData` | View | `dbo.RTK_InventoryRangeCodes irc on irc` | `EDS.dbo.RTK_InventoryRangeCodes irc on irc` | text |
| `dbo.vw_reportedData` | View | `dbo.RTK_MixtureCodes` | `` | sed |
| `dbo.vw_reportedData` | View | `dbo.RTK_MixtureCodes mc on mc` | `EDS.dbo.RTK_MixtureCodes mc on mc` | text |
| `dbo.vw_reportedData` | View | `dbo.RTK_UOMCodes` | `` | sed |
| `dbo.vw_reportedData` | View | `dbo.RTK_UOMCodes uc on uc` | `EDS.dbo.RTK_UOMCodes uc on uc` | text |
| `dbo.vw_RTKChanges` | View | `dbo.Category` | `` | sed |
| `dbo.vw_RTKChanges` | View | `dbo.Category on Category` | `EDS.dbo.Category on Category` | text |
| `dbo.vw_RTKChanges` | View | `dbo.DistrictCategories` | `` | sed |
| `dbo.vw_RTKChanges` | View | `dbo.DistrictCategories dc on dc` | `eds.dbo.DistrictCategories dc on dc` | text |
| `dbo.vw_RTKChanges` | View | `dbo.vw_RTKInfo` | `` | sed |
| `dbo.vw_RTKChanges` | View | `dbo.vw_RTKInfo ri` | `EDS.dbo.vw_RTKInfo ri` | text |
| `dbo.vw_RTKChangesOrig` | View | `dbo.vw_RTKInfo` | `` | sed |
| `dbo.vw_RTKChangesOrig` | View | `dbo.vw_RTKInfo ri` | `EDS.dbo.vw_RTKInfo ri` | text |
| `dbo.vw_RTKChangesOrig` | View | `dbo.vw_rtkinfo ri on ri` | `eds.dbo.vw_rtkinfo ri on ri` | text |
| `dbo.vw_RTKData` | View | `dbo.Category` | `` | sed |
| `dbo.vw_RTKData` | View | `dbo.Category on Category` | `EDS.dbo.Category on Category` | text |
| `dbo.vw_RTKData` | View | `dbo.DistrictCategories` | `` | sed |
| `dbo.vw_RTKData` | View | `dbo.DistrictCategories dc on dc` | `eds.dbo.DistrictCategories dc on dc` | text |
| `dbo.vw_RTKData` | View | `dbo.vw_RTKInfoAnnual` | `` | sed |
| `dbo.vw_RTKData` | View | `dbo.vw_RTKInfoAnnual ri` | `EDS.dbo.vw_RTKInfoAnnual ri` | text |

## ← `VendorBids`

| Source routine | Source kind | Target object | Reference text | Detected by |
|----------------|-------------|---------------|----------------|-------------|
| `dbo.BidMgrVendorbidsForImport` | View | `dbo.bidimports` | `` | sed |
| `dbo.BidMgrVendorbidsForImport` | View | `dbo.bidimports bi` | `eds.dbo.bidimports bi` | text |
| [`dbo.sp_NewVendorBid`](../../procedures/VendorBids/dbo.sp_NewVendorBid.md) | Procedure | `BidRequestItems` | `` | sed |
| [`dbo.sp_NewVendorBid`](../../procedures/VendorBids/dbo.sp_NewVendorBid.md) | Procedure | `BidRequestItems bri` | `eds..BidRequestItems bri` | text |
| [`dbo.sp_NewVendorBid`](../../procedures/VendorBids/dbo.sp_NewVendorBid.md) | Procedure | `dbo.uf_ItemDescription` | `eds.dbo.uf_ItemDescription` | sed, text |
| [`dbo.sp_NewVendorBid`](../../procedures/VendorBids/dbo.sp_NewVendorBid.md) | Procedure | `Items` | `` | sed |
| [`dbo.sp_NewVendorBid`](../../procedures/VendorBids/dbo.sp_NewVendorBid.md) | Procedure | `Items Items on Items` | `eds..Items Items on Items` | text |
| [`dbo.sp_NewVendorBid`](../../procedures/VendorBids/dbo.sp_NewVendorBid.md) | Procedure | `Units` | `` | sed |
| [`dbo.sp_NewVendorBid`](../../procedures/VendorBids/dbo.sp_NewVendorBid.md) | Procedure | `Units Units on Units` | `eds..Units Units on Units` | text |
| [`dbo.sp_RegistrationsUpdate`](../../procedures/VendorBids/dbo.sp_RegistrationsUpdate.md) | Procedure | `dbo.vendorcontacts` | `` | sed |
| [`dbo.sp_RegistrationsUpdate`](../../procedures/VendorBids/dbo.sp_RegistrationsUpdate.md) | Procedure | `dbo.vendorcontacts join Vendors on Vendors` | `eds.dbo.vendorcontacts join Vendors on Vendors` | text |
| [`dbo.sp_RegistrationsUpdate`](../../procedures/VendorBids/dbo.sp_RegistrationsUpdate.md) | Procedure | `dbo.vendorcontacts where Vendorcontacts` | `eds.dbo.vendorcontacts where Vendorcontacts` | text |
| [`dbo.sp_RegistrationsUpdate`](../../procedures/VendorBids/dbo.sp_RegistrationsUpdate.md) | Procedure | `dbo.vendors` | `` | sed |
| [`dbo.sp_RegistrationsUpdate`](../../procedures/VendorBids/dbo.sp_RegistrationsUpdate.md) | Procedure | `dbo.vendors join vendorcategoryPP vcp on vcp` | `eds.dbo.vendors join vendorcategoryPP vcp on vcp` | text |
| [`dbo.sp_RegistrationsUpdate`](../../procedures/VendorBids/dbo.sp_RegistrationsUpdate.md) | Procedure | `dbo.vendors join vendorcontacts on vendorcontacts` | `eds.dbo.vendors join vendorcontacts on vendorcontacts` | text |
| [`dbo.sp_RegistrationsUpdate`](../../procedures/VendorBids/dbo.sp_RegistrationsUpdate.md) | Procedure | `dbo.vendors where Vendors` | `eds.dbo.vendors where Vendors` | text |
| [`dbo.usp_ReturnBidDocumentStatus`](../../procedures/VendorBids/dbo.usp_ReturnBidDocumentStatus.md) | Procedure | `dbo.BidderCheckList` | `` | sed |
| [`dbo.usp_ReturnBidDocumentStatus`](../../procedures/VendorBids/dbo.usp_ReturnBidDocumentStatus.md) | Procedure | `dbo.BidderCheckList BidderCheckList on BidderCheckList` | `eds.dbo.BidderCheckList BidderCheckList on BidderCheckList` | text |
| [`dbo.usp_ReturnBidDocumentStatus`](../../procedures/VendorBids/dbo.usp_ReturnBidDocumentStatus.md) | Procedure | `dbo.vw_DMSVendorBidDocuments` | `` | sed |
| [`dbo.usp_ReturnBidDocumentStatus`](../../procedures/VendorBids/dbo.usp_ReturnBidDocumentStatus.md) | Procedure | `dbo.vw_DMSVendorBidDocuments vbd on vbd` | `EDS.dbo.vw_DMSVendorBidDocuments vbd on vbd` | text |
| [`dbo.usp_ReturnBidDocumentStatus`](../../procedures/VendorBids/dbo.usp_ReturnBidDocumentStatus.md) | Procedure | `dbo.vw_DMSVendorDocuments` | `` | sed |
| [`dbo.usp_ReturnBidDocumentStatus`](../../procedures/VendorBids/dbo.usp_ReturnBidDocumentStatus.md) | Procedure | `dbo.vw_DMSVendorDocuments vd on vd` | `EDS.dbo.vw_DMSVendorDocuments vd on vd` | text |
| `dbo.vendordocumentsviewByUser` | View | `dbo.BidDocumentTypes` | `` | sed |
| `dbo.vendordocumentsviewByUser` | View | `dbo.BidDocumentTypes on BidDocumentTypes` | `EDS.dbo.BidDocumentTypes on BidDocumentTypes` | text |
| `dbo.vendordocumentsviewByUser` | View | `dbo.BidHeaderCheckList` | `` | sed |
| `dbo.vendordocumentsviewByUser` | View | `dbo.BidHeaderCheckList on BidHeaderCheckList` | `EDS.dbo.BidHeaderCheckList on BidHeaderCheckList` | text |
| `dbo.vendordocumentsviewByUser` | View | `dbo.vw_DMSVendorDocuments` | `` | sed |
| `dbo.vendordocumentsviewByUser` | View | `dbo.vw_DMSVendorDocuments vd on vd` | `EDS.dbo.vw_DMSVendorDocuments vd on vd` | text |
| `dbo.vw_UploadedDocuments` | View | `dbo.BidderCheckList` | `` | sed |
| `dbo.vw_UploadedDocuments` | View | `dbo.BidderCheckList BidderCheckList` | `eds.dbo.BidderCheckList BidderCheckList` | text |
| `dbo.vw_UploadedDocuments` | View | `dbo.vw_DMSVendorBidDocuments` | `` | sed |
| `dbo.vw_UploadedDocuments` | View | `dbo.vw_DMSVendorBidDocuments vbd on vbd` | `EDS.dbo.vw_DMSVendorBidDocuments vbd on vbd` | text |
| `dbo.vw_UploadedDocuments` | View | `dbo.vw_DMSVendorDocuments` | `` | sed |
| `dbo.vw_UploadedDocuments` | View | `dbo.vw_DMSVendorDocuments vd on vd` | `EDS.dbo.vw_DMSVendorDocuments vd on vd` | text |

## Source queries

See per-source-database `outbound.md` and the top-level `README.md` for the full method.
