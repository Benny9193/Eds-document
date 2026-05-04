# Table: `archive.DMSBidDocuments`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `archive`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO |  |  |
| 2 | `BidHeaderId` | int | YES |  |  |
| 3 | `BidNbr` | varchar(max) | YES |  |  |
| 4 | `DocType` | varchar(max) | YES |  |  |
| 5 | `DocId` | uniqueidentifier | YES |  |  |
| 6 | `DistrictVisible` | varchar(max) | YES |  |  |
| 7 | `PagesCaptured` | int | YES |  |  |
| 8 | `FileName` | varchar(1024) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
