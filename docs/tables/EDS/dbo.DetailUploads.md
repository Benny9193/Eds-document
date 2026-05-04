# Table: `dbo.DetailUploads`

**Database:** `EDS` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `DetailUploadId` | bigint | NO |  | YES |
| 2 | `DetailId` | bigint | YES |  |  |
| 3 | `Description` | varchar(50) | YES |  |  |
| 4 | `ClientFileName` | varchar(300) | YES |  |  |
| 5 | `ClientDateTime` | datetime2 | YES |  |  |
| 6 | `ClientSize` | bigint | YES |  |  |
| 7 | `DateUploaded` | datetime2 | NO | `(getdate())` |  |
| 8 | `DocId` | uniqueidentifier | YES | `(newid())` |  |
| 9 | `DocType` | varchar(50) | YES |  |  |
| 10 | `DocData` | varbinary(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
