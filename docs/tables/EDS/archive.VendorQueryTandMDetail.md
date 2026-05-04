# Table: `archive.VendorQueryTandMDetail`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `archive`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VendorQueryTandMDetailId` | int | NO |  |  |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `BidImportId` | int | YES |  |  |
| 4 | `VendorQueryTandMId` | int | YES |  |  |
| 5 | `AddDate` | datetime | YES |  |  |
| 6 | `SendDate` | datetime | YES |  |  |
| 7 | `TandMQueryType` | int | YES |  |  |
| 8 | `TandMQuery` | varchar(4000) | YES |  |  |
| 9 | `TandMQueryCounties` | varchar(1000) | YES |  |  |
| 10 | `TandMQueryNotes` | varchar(1000) | YES |  |  |
| 11 | `VendorId` | int | YES |  |  |
| 12 | `ResolvedFlag` | tinyint | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
