# Table: `dbo.BidDocument`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 10511

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BidDocumentId` | int | NO |  | YES |
| 2 | `Active` | tinyint | YES |  |  |
| 3 | `DocumentTitle` | varchar(80) | YES |  |  |
| 4 | `DocumentFilename` | varchar(80) | YES |  |  |
| 5 | `DocumentType` | varchar(50) | YES |  |  |
| 6 | `DocumentBody` | text(2147483647) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
