# Table: `archive.PricingMap`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `archive`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO |  |  |
| 2 | `BidHeaderId` | int | NO |  |  |
| 3 | `ItemId` | int | NO |  |  |
| 4 | `MappedItemId` | int | NO |  |  |
| 5 | `ItemCode` | varchar(50) | YES |  |  |
| 6 | `PackedItemCode` | varchar(50) | YES |  |  |
| 7 | `BidPrice` | money | NO |  |  |
| 8 | `CatalogPrice` | money | NO |  |  |
| 9 | `BidItemId` | int | YES |  |  |
| 10 | `VendorId` | int | NO |  |  |
| 11 | `VendorItemCode` | varchar(50) | YES |  |  |
| 12 | `PackedVendorItemCode` | varchar(50) | YES |  |  |
| 13 | `ManufacturerPartNumber` | varchar(50) | YES |  |  |
| 14 | `PackedManufacturerPartNumber` | varchar(50) | YES |  |  |
| 15 | `UnitId` | int | NO |  |  |
| 16 | `UnitCode` | varchar(16) | NO |  |  |
| 17 | `Alternate` | varchar(512) | YES |  |  |
| 18 | `ItemDescription` | varchar(1024) | YES |  |  |
| 19 | `SortSeq` | varchar(64) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
