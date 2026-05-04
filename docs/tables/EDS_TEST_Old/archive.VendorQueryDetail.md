# Table: `archive.VendorQueryDetail`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `archive`
**Approx rows:** 39321

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorQueryDetailId` | int | NO |  |  |
| 2 | `BidResultsId` | int | YES |  |  |
| 3 | `BidHeaderId` | int | YES |  |  |
| 4 | `BidImportId` | int | YES |  |  |
| 5 | `VendorQueryId` | int | YES |  |  |
| 6 | `AddDate` | datetime | YES |  |  |
| 7 | `SendDate` | datetime | YES |  |  |
| 8 | `ItemQuery` | varchar(4000) | YES |  |  |
| 9 | `ItemQueryNotes` | varchar(1000) | YES |  |  |
| 10 | `VendorId` | int | YES |  |  |
| 11 | `DistrictName` | varchar(50) | YES |  |  |
| 12 | `ResolvedFlag` | tinyint | YES |  |  |
| 13 | `CommonVendorQueryId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
