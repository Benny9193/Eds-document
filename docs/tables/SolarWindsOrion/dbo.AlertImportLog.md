# Table: `dbo.AlertImportLog`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ImportID` | uniqueidentifier | NO |  |  |
| 2 | `Name` | nvarchar(1024) | NO |  |  |
| 3 | `Description` | nvarchar(max) | NO |  |  |
| 4 | `Status` | bit | NO |  |  |
| 5 | `ObjectType` | nvarchar(50) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
