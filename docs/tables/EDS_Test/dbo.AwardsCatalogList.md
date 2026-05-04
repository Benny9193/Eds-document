# Table: `dbo.AwardsCatalogList`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 82267

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `AwardCatalogId` | int | NO |  | YES |
| 2 | `AwardId` | int | YES |  |  |
| 3 | `CatalogId` | int | YES |  |  |
| 4 | `DiscountRate` | decimal(9,5) | YES |  |  |
| 5 | `DateModified` | datetime | YES |  |  |
| 6 | `BidImportCatalogId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `_dta_index_AwardsCatalogList_9_1464392286__K3_K2_K4` | no | NONCLUSTERED | `CatalogId`, `AwardId`, `DiscountRate` |  |
| `SK_Award` | no | NONCLUSTERED | `AwardId` |  |
| `SK_AwardCatalog` | no | NONCLUSTERED | `AwardId`, `CatalogId` |  |
