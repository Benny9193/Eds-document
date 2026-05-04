# Table: `dbo.IndexDefragmentationHistory`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 112

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | int | NO |  | YES |
| 2 | `TableName` | nvarchar(1024) | NO |  |  |
| 3 | `IndexName` | nvarchar(1024) | NO |  |  |
| 4 | `TotalDefragCount` | int | YES |  |  |
| 5 | `TotalDefragTime` | int | YES |  |  |
| 6 | `LastDefrag` | datetime | YES |  |  |
| 7 | `Penalty` | int | YES |  |  |
| 8 | `TotalPenalties` | int | YES |  |  |
| 9 | `LastFragmentationLevel` | real | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
