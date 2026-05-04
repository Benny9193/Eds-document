# Table: `dbo.PricingConsolidatedOrderCounts`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 401387

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Demand-history counts feeding the consolidated-pricing analytics pipeline (~401K rows). One row per (`BidHeaderId`, `ItemId`) with `OrderCount` — used to weight bid evaluation by realized buying patterns.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PCOCId` | bigint | NO |  | YES |
| 2 | `BidHeaderId` | int | NO |  |  |
| 3 | `ItemId` | int | NO |  |  |
| 4 | `OrderCount` | int | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_BidHeaderIdItemId` | no | NONCLUSTERED | `BidHeaderId`, `ItemId` |  |
