# Table: `dbo.Cortex_Documents`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1295

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ElementId` | bigint | NO |  | YES |
| 2 | `DocTypeId` | int | NO |  | YES |
| 3 | `OwnerPartitionId` | int | NO |  |  |
| 4 | `LastWriteTime` | datetime2 | NO |  |  |
| 5 | `DeletedDate` | datetime2 | YES |  |  |
| 6 | `Data` | nvarchar(max) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
