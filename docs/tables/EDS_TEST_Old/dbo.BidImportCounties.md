# Table: `dbo.BidImportCounties`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 63063

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidImportCountyId` | int | NO |  | YES |
| 2 | `BidImportId` | int | NO |  |  |
| 3 | `BidTradeCountyId` | int | NO |  |  |
| 4 | `Active` | tinyint | YES |  |  |
| 5 | `DateModified` | datetime | NO | `(getdate())` |  |
| 6 | `Comments` | varchar(4096) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_Active_BidImportIdBidTRadeCountyId` | no | NONCLUSTERED | `Active` | `BidImportId`, `BidTradeCountyId` |
| `SKI_BidImportId_BidImportCountyIdBidTradeCountyId` | no | NONCLUSTERED | `BidImportId` | `BidImportCountyId`, `BidTradeCountyId` |
| `SKI_BidTRadeCountyIdActive_BidImportId` | no | NONCLUSTERED | `BidTradeCountyId`, `Active` | `BidImportId` |
