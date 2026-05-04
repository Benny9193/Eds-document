# Table: `archive.TMAwards`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `archive`
**Approx rows:** 29335

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `TMAwardId` | int | NO |  |  |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `BidHeaderId` | int | NO |  |  |
| 4 | `BidTradeCountyId` | int | NO |  |  |
| 5 | `BidImportId` | int | YES |  |  |
| 6 | `VendorId` | int | YES |  |  |
| 7 | `AwardType` | varchar(50) | YES |  |  |
| 8 | `DateModified` | datetime | YES |  |  |
| 9 | `AwardAmount` | money | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
