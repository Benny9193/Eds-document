# Table: `dbo.Zonals`

**Database:** `Documents` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 4

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `DocumentTypeId` | uniqueidentifier | YES |  |  |
| 3 | `ZonalName` | varchar(50) | YES |  |  |
| 4 | `SourceFolder` | varchar(1024) | YES |  |  |
| 5 | `SplitFolder` | varchar(1024) | YES |  |  |
| 6 | `ProcessedFolder` | varchar(1024) | YES |  |  |
| 7 | `RejectedFolder` | varchar(1024) | YES |  |  |
| 8 | `deletedAt` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
