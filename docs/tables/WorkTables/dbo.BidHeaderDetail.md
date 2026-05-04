# Table: `dbo.BidHeaderDetail`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 29454

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
| 8 | `rowguid` | uniqueidentifier | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
