# Table: `dbo.BidImportCatalogList`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 32314

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidImportCatalogId` | int | NO |  | YES |
| 2 | `BidImportId` | int | YES |  |  |
| 3 | `CatalogId` | int | YES |  |  |
| 4 | `DiscountRate` | decimal(9,5) | YES |  |  |
| 5 | `DateModified` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_BidImportCatalog_Id` | no | NONCLUSTERED | `BidImportId`, `CatalogId` | `BidImportCatalogId`, `DiscountRate` |
| `SKI_CatalogBidImport_DiscountRateId` | no | NONCLUSTERED | `CatalogId`, `BidImportId` | `BidImportCatalogId`, `DiscountRate` |
