# Table: `dbo.CustomPropertyMetadata`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 6

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `TargetTable` | nvarchar(128) | NO |  | YES |
| 2 | `Name` | nvarchar(128) | NO |  | YES |
| 3 | `ColumnType` | nvarchar(128) | NO |  |  |
| 4 | `MaxLength` | int | NO |  |  |
| 5 | `StorageMethod` | int | NO |  |  |
| 6 | `Description` | nvarchar(max) | YES |  |  |
| 7 | `TargetEntity` | nvarchar(400) | NO |  |  |
| 8 | `Mandatory` | bit | NO | `((0))` |  |
| 9 | `Default` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
