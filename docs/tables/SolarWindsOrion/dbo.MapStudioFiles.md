# Table: `dbo.MapStudioFiles`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 12

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `FileId` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `FileName` | nvarchar(max) | YES |  |  |
| 3 | `FileData` | varbinary(max) | YES |  |  |
| 4 | `Timestamp` | datetime | YES |  |  |
| 5 | `Owner` | nvarchar(50) | NO |  |  |
| 6 | `UpdateUser` | nvarchar(50) | YES |  |  |
| 7 | `IsDeleted` | bit | NO |  |  |
| 8 | `LockUser` | nvarchar(50) | YES |  |  |
| 9 | `FileType` | int | NO |  |  |
| 10 | `LockDate` | datetime | YES |  |  |
| 11 | `ComputerName` | nvarchar(50) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
