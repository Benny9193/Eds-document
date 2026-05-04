# Table: `dbo.LazyUpgradeStatus`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | uniqueidentifier | NO |  | YES |
| 2 | `TypeID` | uniqueidentifier | NO |  |  |
| 3 | `Description` | nvarchar(255) | NO |  |  |
| 4 | `StartDateUtc` | datetime | YES |  |  |
| 5 | `LastUpdateDateUtc` | datetime | YES |  |  |
| 6 | `EndDateUtc` | datetime | YES |  |  |
| 7 | `InitialTotalRowCount` | bigint | NO |  |  |
| 8 | `MigratedRowCount` | bigint | NO |  |  |
| 9 | `TargetVersion` | int | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
