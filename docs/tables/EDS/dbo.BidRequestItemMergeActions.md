# Table: `dbo.BidRequestItemMergeActions`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 36542

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Bid-request line dedup ledger (~37K rows). When two `BidRequestItems` are merged during request preparation, one row records the source and `DestinationBidRequestItemId` and a `Merged` flag. Lets the system keep the surviving line and trace where eliminated rows went.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidRequestItemMergeActionsId` | int | NO |  | YES |
| 2 | `BidRequestItemId` | int | YES |  |  |
| 3 | `DestinationBidRequestItemId` | int | YES |  |  |
| 4 | `Merged` | tinyint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
