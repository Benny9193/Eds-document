# Table: `dbo.PricingUpdate`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 60312

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Per-bid incremental-recompute marker (~60K rows). One row per `BidHeaderId` with `LastUpdated` — used to drive incremental updates to downstream pricing tables (`PricingAddenda`, `CrossRefs`) when only a subset of bids has changed.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PricingUpdateId` | int | NO |  | YES |
| 2 | `BidHeaderId` | int | NO |  |  |
| 3 | `LastUpdated` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
