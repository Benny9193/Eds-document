# Table: `dbo.PricingConsolidatedOrderCounts`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 401387

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

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
