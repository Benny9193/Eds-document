# Table: `dbo.uniqueCodes`

**Database:** `Catalogs` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 331388

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SysId` | int | NO |  | YES |
| 2 | `CatalogId` | int | NO |  |  |
| 3 | `VendorItemCode` | varchar(50) | NO |  |  |
| 4 | `ManufacturerPartNumber` | varchar(50) | YES |  |  |
| 5 | `UniqueItemCode` | varchar(50) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
