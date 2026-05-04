# Table: `dbo.BidTradeCounties`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 42912

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidTradeCountyId` | int | NO |  | YES |
| 2 | `BidTradeId` | int | NO |  |  |
| 3 | `CountyId` | int | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_CountyTrade` | no | NONCLUSTERED | `CountyId`, `BidTradeId` | `BidTradeCountyId` |
| `SK_TradeCounty` | no | NONCLUSTERED | `BidTradeId`, `CountyId` |  |
