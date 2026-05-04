# Table: `dbo.FlagHouse Discontinues`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 19122

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderId` | int | YES |  |  |
| 2 | `ItemCode` | varchar(30) | YES |  |  |
| 3 | `Description` | nvarchar(max) | YES |  |  |
| 4 | `UnitCode` | nvarchar(255) | YES |  |  |
| 5 | `VendorItemCode` | varchar(30) | YES |  |  |
| 6 | `PackedCode` | varchar(30) | YES |  |  |
| 7 | `CatalogPrice` | money | YES |  |  |
| 8 | `BidPrice` | money | YES |  |  |
| 9 | `CatalogPage` | int | YES |  |  |
| 10 | `ItemBidType` | nvarchar(255) | YES |  |  |
| 11 | `Alternate` | nvarchar(max) | YES |  |  |
| 12 | `Flaghouse Awarded Item` | nvarchar(255) | YES |  |  |
| 13 | `New Item Number in SSL System OR Discontinued` | nvarchar(255) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
