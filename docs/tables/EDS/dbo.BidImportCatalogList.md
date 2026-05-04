# Table: `dbo.BidImportCatalogList`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 32914

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Junction `BidImports` ↔ `Catalog` (~33K rows). Per-catalog discount terms a vendor has offered as part of a bid response. Resolves into `BidsCatalogList` once the response is accepted, and into `AwardsCatalogList` after award.

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
