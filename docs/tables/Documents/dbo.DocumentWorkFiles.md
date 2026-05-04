# Table: `dbo.DocumentWorkFiles`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 17740

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO |  | YES |
| 2 | `Datestamp` | datetime | NO | `(getdate())` |  |
| 3 | `SessionId` | uniqueidentifier | YES |  |  |
| 4 | `Name` | varchar(255) | YES |  |  |
| 5 | `FileName` | varchar(1024) | YES |  |  |
| 6 | `FileTypeId` | uniqueidentifier | NO |  |  |
| 7 | `PageCount` | int | YES |  |  |
| 8 | `FileSize` | bigint | YES |  |  |
| 9 | `FileData` | varbinary(max) | YES |  |  |
| 10 | `deletedAt` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
