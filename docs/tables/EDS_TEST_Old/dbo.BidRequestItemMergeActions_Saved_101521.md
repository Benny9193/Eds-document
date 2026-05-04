# Table: `dbo.BidRequestItemMergeActions_Saved_101521`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 27298

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidRequestItemMergeActionsId` | int | NO |  |  |
| 2 | `BidRequestItemId` | int | YES |  |  |
| 3 | `DestinationBidRequestItemId` | int | YES |  |  |
| 4 | `Merged` | tinyint | YES |  |  |
| 5 | `rowguid` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
