# Procedure: `dbo.sp_CatalogImport`

_Generated on 2026-05-04T13:04:00.314Z_

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to procedures index](../README.md)

## Summary

| Property | Value |
|----------|-------|
| Schema | `dbo` |
| Name | `sp_CatalogImport` |
| Kind | Procedure |
| sys.objects.type | `P` (SQL_STORED_PROCEDURE) |
| Created | 2011-10-27 12:48:14 |
| Modified | 2011-12-07 13:46:23 |
| Encrypted | no |

## Parameters

| # | Name | Mode | Type | Default |
|---|------|------|------|---------|
| 1 | `@pFileName` | IN | varchar(255) |  |
| 2 | `@pCatalogId` | IN | int |  |
| 3 | `@pXmlFieldMap` | IN | varchar(max) |  |
| 4 | `@pXML` | IN | varchar(max) |  |

## Depends on

| Object | Type | Cross-DB |
|--------|------|----------|
| `dbo.CatalogXML` | unresolved | `Catalogs` |

## Called by

_No other objects in this database reference it._

## Definition

```sql
CREATE procedure [dbo].[sp_CatalogImport] @pFileName varchar(255), @pCatalogId int, @pXmlFieldMap varchar(max), @pXML varchar(max)
as
insert Catalogs.dbo.CatalogXML (FileName, CatalogId, XMLData, XMLFieldMap)
  values (@pFileName, @pCatalogId, @pXML, @pXmlFieldMap)
```
