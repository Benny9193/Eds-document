# Cross-database inbound references: `Catalogs`

_Generated on 2026-05-04T13:15:40.543Z_

**Target database:** `Catalogs`

[← back to dependencies index](../README.md)

Routines, views, and triggers in *other* databases that reach into this database.

## Summary

| Source database | Distinct edges |
|-----------------|----------------|
| `EDS` | 5 |

## ← `EDS`

| Source routine | Source kind | Target object | Reference text | Detected by |
|----------------|-------------|---------------|----------------|-------------|
| [`dbo.sp_CatalogImport`](../../procedures/EDS/dbo.sp_CatalogImport.md) | Procedure | `dbo.CatalogXML` | `Catalogs.dbo.CatalogXML` | sed, text |
| [`dbo.sp_CatalogImporterXML`](../../procedures/EDS/dbo.sp_CatalogImporterXML.md) | Procedure | `dbo.CatalogImports` | `Catalogs.dbo.CatalogImports` | sed, text |
| [`dbo.sp_CatalogImporterXML`](../../procedures/EDS/dbo.sp_CatalogImporterXML.md) | Procedure | `dbo.Master Catalog` | `Catalogs.dbo.[Master Catalog]` | sed, text |
| [`dbo.sp_UnpostCatalog`](../../procedures/EDS/dbo.sp_UnpostCatalog.md) | Procedure | `dbo.Master Catalog` | `Catalogs.dbo.[Master Catalog]` | sed, text |
| `dbo.vw_CatalogCompare` | View | `dbo.Master Catalog` | `catalogs.dbo.[Master Catalog]` | sed, text |

## Source queries

See per-source-database `outbound.md` and the top-level `README.md` for the full method.
