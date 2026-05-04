# Table: `dbo.CatalogImports`

**Database:** `Catalogs` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 405

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Catalog-import job audit (~405 rows) — one row per upload run, capturing source, status, and outcome counts.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CatalogImportId` | int | NO |  | YES |
| 2 | `Imported` | datetime | NO | `(getdate())` |  |
| 3 | `CatalogId` | int | NO |  |  |
| 4 | `XmlDoc` | varchar(max) | YES |  |  |
| 5 | `Mode` | int | YES |  |  |
| 6 | `ExistingCount` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
