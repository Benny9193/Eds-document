# Table: `archive.BidHeaderDetail`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `archive`
**Approx rows:** 26252593

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderDetailId` | bigint | NO |  |  |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `DetailId` | int | YES |  |  |
| 4 | `BidRequestItemId` | int | YES |  |  |
| 5 | `Quantity` | int | YES |  |  |
| 6 | `DateAdded` | datetime | YES |  |  |
| 7 | `BidHeaderKey` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
