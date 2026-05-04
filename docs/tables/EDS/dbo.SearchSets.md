# Table: `dbo.SearchSets`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 44494

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Saved search-filter criteria per session (~44K rows). One row per (`SessionId`, `CategoryId`, `CatalogId`) range describing the buyer's catalog-browse filter (`SearchBy`, `SearchStart`, `SearchEnd`). Transient session state.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SSId` | int | NO |  | YES |
| 2 | `SessionId` | int | YES |  |  |
| 3 | `CategoryId` | int | YES |  |  |
| 4 | `CatalogId` | int | YES |  |  |
| 5 | `SearchBy` | int | YES |  |  |
| 6 | `SearchStart` | varchar(255) | YES |  |  |
| 7 | `SearchEnd` | varchar(255) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_Session` | no | NONCLUSTERED | `SessionId` |  |
