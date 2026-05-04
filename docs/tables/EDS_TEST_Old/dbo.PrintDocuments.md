# Table: `dbo.PrintDocuments`

**Database:** `EDS_TEST_Old` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PrintDocumentId` | int | NO |  | YES |
| 2 | `Created` | datetime | YES | `(getdate())` |  |
| 3 | `Printed` | datetime | YES |  |  |
| 4 | `RequestedBy` | int | YES |  |  |
| 5 | `DistrictId` | int | YES |  |  |
| 6 | `SchoolId` | int | YES |  |  |
| 7 | `UserId` | int | YES |  |  |
| 8 | `DocumentName` | varchar(50) | YES |  |  |
| 9 | `DocumentType` | varchar(50) | YES |  |  |
| 10 | `DocumentLength` | int | YES |  |  |
| 11 | `DocumentPages` | int | YES |  |  |
| 12 | `DocumentBody` | varbinary(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
