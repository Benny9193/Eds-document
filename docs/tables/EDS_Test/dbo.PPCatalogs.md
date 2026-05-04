# Table: `dbo.PPCatalogs`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1664

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PPCatalogId` | int | NO |  | YES |
| 2 | `PricePlanId` | int | YES |  |  |
| 3 | `CategoryId` | int | YES |  |  |
| 4 | `CatalogId` | int | YES |  |  |
| 5 | `DiscountRate` | decimal(5,2) | YES |  |  |
| 6 | `AwardId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_Cat` | no | NONCLUSTERED | `CategoryId` |  |
| `SK_CatalogId` | no | NONCLUSTERED | `CatalogId` |  |
| `SK_PPCat` | no | NONCLUSTERED | `PricePlanId`, `CategoryId`, `CatalogId` |  |
| `SK_PricePlan` | no | NONCLUSTERED | `PricePlanId` |  |
