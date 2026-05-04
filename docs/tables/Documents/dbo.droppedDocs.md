# Table: `dbo.droppedDocs`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 3195

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO |  |  |
| 2 | `DocumentId` | uniqueidentifier | NO |  |  |
| 3 | `Datestamp` | datetime | NO |  |  |
| 4 | `Version` | bigint | YES |  |  |
| 5 | `Name` | varchar(255) | YES |  |  |
| 6 | `FileName` | varchar(1024) | YES |  |  |
| 7 | `FileTypeId` | uniqueidentifier | NO |  |  |
| 8 | `PageCount` | int | YES |  |  |
| 9 | `FileSize` | bigint | YES |  |  |
| 10 | `FileData` | varbinary(max) | YES |  |  |
| 11 | `SourceId` | uniqueidentifier | YES |  |  |
| 12 | `AcceptedAt` | datetime | YES |  |  |
| 13 | `AcceptedById` | uniqueidentifier | YES |  |  |
| 14 | `deletedAt` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
