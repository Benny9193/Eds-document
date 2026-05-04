# Table: `dbo.AddendumItems`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ItemId` | int | NO |  | YES |
| 2 | `ItemCode` | varchar(15) | YES |  |  |
| 3 | `Description` | varchar(255) | YES |  |  |
| 4 | `UnitId` | int | YES |  |  |
| 5 | `UnitCode` | varchar(20) | YES |  |  |
| 6 | `PriceId` | int | YES |  |  |
| 7 | `CatalogPrice` | decimal(9,2) | YES |  |  |
| 8 | `Page` | int | YES |  |  |
| 9 | `BidPrice` | decimal(9,2) | YES |  |  |
| 10 | `CatalogId` | int | YES |  |  |
| 11 | `CatalogName` | varchar(30) | YES |  |  |
| 12 | `CategoryId` | int | YES |  |  |
| 13 | `VendorId` | int | YES |  |  |
| 14 | `VendorName` | varchar(30) | YES |  |  |
| 15 | `DistrictId` | int | YES |  |  |
| 16 | `ContractId` | int | YES |  |  |
| 17 | `ContractNumber` | varchar(20) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
