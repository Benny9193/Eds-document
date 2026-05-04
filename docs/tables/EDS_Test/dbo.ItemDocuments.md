# Table: `dbo.ItemDocuments`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ItemDocumentId` | bigint | NO |  | YES |
| 2 | `ItemId` | int | NO |  |  |
| 3 | `Description` | varchar(255) | YES |  |  |
| 4 | `FileName` | varchar(255) | YES |  |  |
| 5 | `DocumentType` | varchar(10) | YES |  |  |
| 6 | `DocumentSize` | bigint | YES |  |  |
| 7 | `DocumentDate` | datetime | YES |  |  |
| 8 | `DateUploaded` | datetime | NO | `(getdate())` |  |
| 9 | `DocumentId` | uniqueidentifier | NO | `(newid())` |  |
| 10 | `DocumentData` | varbinary(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
