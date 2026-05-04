# Table: `dbo.Imports`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 301

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ImportId` | int | NO |  | YES |
| 2 | `ImportType` | tinyint | YES |  |  |
| 3 | `ImportDate` | datetime | YES |  |  |
| 4 | `Comments` | varchar(255) | YES |  |  |
| 5 | `Records` | int | YES |  |  |
| 6 | `ErrorCount` | int | YES |  |  |
| 7 | `CategoryId` | int | YES |  |  |
| 8 | `CatalogId1` | int | YES |  |  |
| 9 | `CatalogId2` | int | YES |  |  |
| 10 | `CatalogId3` | int | YES |  |  |
| 11 | `CatalogId4` | int | YES |  |  |
| 12 | `CatalogId5` | int | YES |  |  |
| 13 | `CatalogId6` | int | YES |  |  |
| 14 | `PricePlanId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
