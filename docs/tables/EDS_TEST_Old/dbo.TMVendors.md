# Table: `dbo.TMVendors`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 16173

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `TMVendorId` | int | NO |  | YES |
| 2 | `TMYear` | int | NO |  |  |
| 3 | `VendorId` | int | YES |  |  |
| 4 | `VendorName` | varchar(50) | YES |  |  |
| 5 | `TradeId` | int | NO |  |  |
| 6 | `CountyId` | int | NO |  |  |
| 7 | `Sequence` | int | YES |  |  |
| 8 | `BidTradeId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
