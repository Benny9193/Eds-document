# Table: `dbo.ActionAssignmentProperties`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ActionAssignmentPropertyID` | int | NO |  | YES |
| 2 | `ActionAssignmentID` | int | NO |  |  |
| 3 | `PropertyName` | nvarchar(255) | NO |  |  |
| 4 | `PropertyValue` | nvarchar(max) | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_ActionAssignmentProperties_ActionsAssignments` | `ActionAssignmentID` | [`dbo.ActionsAssignments.ActionAssignmentID`](dbo.ActionsAssignments.md) | CASCADE | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
