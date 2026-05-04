# Table: `dbo.BidHeaderDocuments`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidHeaderDocumentId` | int | NO |  | YES |
| 2 | `BidHeaderId` | int | NO |  |  |
| 3 | `DocumentDate` | datetime | YES |  |  |
| 4 | `DocumentTitle` | varchar(255) | NO |  |  |
| 5 | `DocumentFile` | varchar(255) | YES |  |  |
| 6 | `DocumentData` | text(2147483647) | YES |  |  |
| 7 | `DisplaySeq` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
