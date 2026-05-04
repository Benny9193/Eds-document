# Table: `dbo.StackFilterProperty`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 3

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | int | NO |  |  |
| 2 | `SystemUuid` | uniqueidentifier | YES |  |  |
| 3 | `UiOrder` | int | YES |  |  |
| 4 | `UserOverride` | bit | YES |  |  |
| 5 | `AlwaysAdded` | bit | YES |  |  |
| 6 | `Stack` | nvarchar(20) | NO |  |  |
| 7 | `FilterPropertyJson` | nvarchar(max) | YES |  |  |
| 8 | `Comment` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
