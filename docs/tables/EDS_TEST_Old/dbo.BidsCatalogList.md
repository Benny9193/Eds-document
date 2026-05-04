# Table: `dbo.BidsCatalogList`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 81010

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidCatalogId` | int | NO |  | YES |
| 2 | `BidId` | int | YES |  |  |
| 3 | `CatalogId` | int | YES |  |  |
| 4 | `DiscountRate` | decimal(9,5) | YES |  |  |
| 5 | `BidImportCatalogId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `_dta_index_BidsCatalogList_7_171199710__K3_K1_K2` | no | NONCLUSTERED | `CatalogId`, `BidCatalogId`, `BidId` |  |
| `SK_Bid` | no | NONCLUSTERED | `BidId` | `BidCatalogId` |
| `SKI_Catalog_BidCatalogId` | no | NONCLUSTERED | `CatalogId` |  |
