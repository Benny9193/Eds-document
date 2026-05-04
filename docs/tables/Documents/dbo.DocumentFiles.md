# Table: `dbo.DocumentFiles`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 602149

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `DocumentId` | uniqueidentifier | NO |  |  |
| 3 | `Datestamp` | datetime | NO | `(getdate())` |  |
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

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `SKI_DocumentDate_IdDeleted` | no | NONCLUSTERED | `DocumentId`, `Datestamp` | `Id`, `deletedAt` |
| `SKI_ID_DateStampAccepted` | no | NONCLUSTERED | `Id` | `Datestamp`, `AcceptedAt` |
