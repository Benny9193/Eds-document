# Table: `dbo.PostCatalogHeader`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 3610

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Catalog-post pipeline run header (~3.6K rows). One row per (`CatalogId`, post run) with `PostDateStart` / `PostDateComplete`. Per-event detail in `PostCatalogDetail`.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PostCatalogHeaderId` | int | NO |  | YES |
| 2 | `CatalogId` | int | YES |  |  |
| 3 | `PostDateStart` | datetime | YES |  |  |
| 4 | `PostDateComplete` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
