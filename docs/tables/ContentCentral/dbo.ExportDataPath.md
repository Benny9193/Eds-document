# Table: `dbo.ExportDataPath`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `Name` | nvarchar(50) | NO |  |  |
| 3 | `Description` | nvarchar(128) | YES |  |  |
| 4 | `Path` | nvarchar(260) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.ExportDataTemplate`](dbo.ExportDataTemplate.md) | `ExportDataPathId` | `Id` | NO_ACTION | NO_ACTION |

## Indexes

_No non-PK indexes._
