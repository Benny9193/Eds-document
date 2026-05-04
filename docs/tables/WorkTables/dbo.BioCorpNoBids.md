# Table: `dbo.BioCorpNoBids`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 6556

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidPrice` | money | YES |  |  |
| 2 | `VendorId` | int | YES |  |  |
| 3 | `CatalogId` | int | YES |  |  |
| 4 | `CatalogPrice` | money | YES |  |  |
| 5 | `VendorItemCode` | varchar(50) | YES |  |  |
| 6 | `AwardId` | int | YES |  |  |
| 7 | `DetailId` | int | NO |  |  |
| 8 | `UseAllocations` | tinyint | NO |  |  |
| 9 | `AllocationAvailable` | money | NO |  |  |
| 10 | `RequisitionId` | int | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
