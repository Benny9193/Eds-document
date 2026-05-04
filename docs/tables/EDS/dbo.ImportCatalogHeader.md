# Table: `dbo.ImportCatalogHeader`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 2980

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Catalog-import pipeline run header (~3K rows). Symmetric to `PostCatalogHeader` but for the inbound side — `ImportDateStart` / `ImportDateComplete` per `CatalogId`. Detail rows live in `ImportCatalogDetail`.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ImportCatalogHeaderId` | int | NO |  | YES |
| 2 | `CatalogId` | int | YES |  |  |
| 3 | `ImportDateStart` | datetime | YES |  |  |
| 4 | `ImportDateComplete` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
