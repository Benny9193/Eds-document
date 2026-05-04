# Table: `archive.FreezeItems`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `archive`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO |  |  |
| 2 | `ItemId` | int | NO |  |  |
| 3 | `CrossRefId` | int | NO |  |  |
| 4 | `VendorId` | int | NO |  |  |
| 5 | `VendorItemCode` | varchar(50) | YES |  |  |
| 6 | `BidHeaderId` | int | NO |  |  |
| 7 | `GrossPrice` | money | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
