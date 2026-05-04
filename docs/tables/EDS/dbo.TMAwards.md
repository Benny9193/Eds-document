# Table: `dbo.TMAwards`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 94281

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Trades-bid awards (~94K rows). One row per (`BidHeaderId`, `BidTradeCountyId`, `VendorId`) — the awards layer for the trades / services bid track (mirrors `Awards` for commodity bids). `AwardAmount` and `AwardType` recorded.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `TMAwardId` | int | NO |  | YES |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `BidHeaderId` | int | NO |  |  |
| 4 | `BidTradeCountyId` | int | NO |  |  |
| 5 | `BidImportId` | int | YES |  |  |
| 6 | `VendorId` | int | YES |  |  |
| 7 | `AwardType` | varchar(50) | YES |  |  |
| 8 | `DateModified` | datetime | YES | `(getdate())` |  |
| 9 | `AwardAmount` | money | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_BidTradeCounty` | no | NONCLUSTERED | `BidHeaderId`, `BidTradeCountyId`, `Active`, `AwardAmount` | `BidImportId`, `VendorId` |
