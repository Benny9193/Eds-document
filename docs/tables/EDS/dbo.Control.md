# Table: `dbo.Control`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ControlId` | int | NO |  | YES |
| 2 | `LastPriceUpdateStart` | datetime | YES |  |  |
| 3 | `LastPriceUpdateEnd` | datetime | YES |  |  |
| 4 | `ControlYear` | int | YES |  |  |
| 5 | `RTKBaseYear` | int | YES |  |  |
| 6 | `BillingYear` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
