# Table: `dbo.TrapActions`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `TrapActionID` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `TrapRuleID` | uniqueidentifier | NO |  |  |
| 3 | `SortOrder` | int | NO | `((9999))` |  |
| 4 | `TrapActionType` | varchar(50) | NO | `('')` |  |
| 5 | `Title` | nvarchar(1023) | YES |  |  |
| 6 | `Target` | nvarchar(max) | YES |  |  |
| 7 | `Parameter1` | nvarchar(max) | YES |  |  |
| 8 | `Parameter2` | nvarchar(max) | YES |  |  |
| 9 | `Parameter3` | nvarchar(max) | YES |  |  |
| 10 | `Parameter4` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
