# Table: `dbo.ActionsAssignments`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 96

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ActionAssignmentID` | int | NO |  | YES |
| 2 | `ActionID` | int | NO |  |  |
| 3 | `ParentID` | int | NO |  |  |
| 4 | `EnvironmentType` | nvarchar(50) | NO |  |  |
| 5 | `CategoryType` | nvarchar(50) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.ActionAssignmentProperties`](dbo.ActionAssignmentProperties.md) | `ActionAssignmentID` | `ActionAssignmentID` | CASCADE | NO_ACTION |

## Indexes

_No non-PK indexes._
