# Table: `dbo.Actions`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 96

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ActionID` | int | NO |  | YES |
| 2 | `ActionTypeID` | nvarchar(50) | NO |  |  |
| 3 | `Title` | nvarchar(1024) | NO |  |  |
| 4 | `Description` | nvarchar(max) | YES |  |  |
| 5 | `Enabled` | bit | NO |  |  |
| 6 | `SortOrder` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
