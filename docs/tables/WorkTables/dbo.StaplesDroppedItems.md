# Table: `dbo.StaplesDroppedItems`

**Database:** `WorkTables` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 239

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ItemId` | int | YES |  |  |
| 2 | `CrossRefId` | int | YES |  |  |
| 3 | `VendorId` | int | YES |  |  |
| 4 | `VendorItemCode` | varchar(50) | NO |  |  |
| 5 | `BidHeaderId` | int | YES |  |  |
| 6 | `BidPrice` | money | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
