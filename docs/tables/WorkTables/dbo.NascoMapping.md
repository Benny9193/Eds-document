# Table: `dbo.NascoMapping`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 45

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Name` | varchar(50) | YES |  |  |
| 2 | `VendorId` | int | NO |  |  |
| 3 | `BidHeaderId` | int | YES |  |  |
| 4 | `OldName` | varchar(50) | YES |  |  |
| 5 | `OldCatalogId` | int | NO |  |  |
| 6 | `NewName` | varchar(50) | YES |  |  |
| 7 | `NewCatalogId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
