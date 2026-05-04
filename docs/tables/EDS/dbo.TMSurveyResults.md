# Table: `dbo.TMSurveyResults`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 98340

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Description

Trades-vendor survey responses (~98K rows). Per (`TMSurveyId`, `TMVendorId`, `BidTradeCountyId`) `Rating` and free-text `Comments` from district survey of trades vendors. Feeds vendor-performance scoring on the trades track.

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `TMSurveyResultId` | int | NO |  | YES |
| 2 | `TMSurveyId` | int | NO |  |  |
| 3 | `TMVendorId` | int | NO |  |  |
| 4 | `BidTradeCountyId` | int | YES |  |  |
| 5 | `Rating` | int | YES |  |  |
| 6 | `Comments` | varchar(max) | YES |  |  |
| 7 | `Updated` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SK_Survey_VendorBTCRateComments` | no | NONCLUSTERED | `TMSurveyId` | `TMVendorId`, `BidTradeCountyId`, `Rating`, `Comments` |
