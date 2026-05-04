# Table: `dbo.BidReawards`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 524

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidReawardId` | int | NO |  | YES |
| 2 | `BidHeaderId` | int | NO |  |  |
| 3 | `ReawardDate` | datetime | NO |  |  |
| 4 | `EffectiveFrom` | datetime | NO |  |  |
| 5 | `EffectiveUntil` | datetime | NO |  |  |
| 6 | `Comments` | varchar(4096) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
