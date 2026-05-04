# Table: `dbo.Receiving`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ReceivingId` | int | NO |  | YES |
| 2 | `POId` | int | YES |  |  |
| 3 | `DetailId` | int | YES |  |  |
| 4 | `Quantity` | int | YES |  |  |
| 5 | `DateReceived` | datetime | YES |  |  |
| 6 | `Comments` | varchar(1023) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
