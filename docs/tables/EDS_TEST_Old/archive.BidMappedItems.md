# Table: `archive.BidMappedItems`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `archive`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidMappedItemId` | uniqueidentifier | NO |  |  |
| 2 | `BidHeaderId` | int | NO |  |  |
| 3 | `OrigItemId` | int | NO |  |  |
| 4 | `NewItemId` | int | NO |  |  |
| 5 | `ReasonCode` | varchar(20) | YES |  |  |
| 6 | `MapDate` | datetime | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
