# Table: `dbo.BidTrades`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1591

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidTradeId` | int | NO |  | YES |
| 2 | `BidHeaderId` | int | NO |  |  |
| 3 | `TradeId` | int | NO |  |  |
| 4 | `Title` | varchar(255) | NO |  |  |
| 5 | `Specifications` | varchar(max) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.BidQuestions`](dbo.BidQuestions.md) | `BidTradeId` | `BidTradeId` | CASCADE | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_BidHeaderId` | no | NONCLUSTERED | `BidHeaderId` | `BidTradeId`, `TradeId`, `Title` |
