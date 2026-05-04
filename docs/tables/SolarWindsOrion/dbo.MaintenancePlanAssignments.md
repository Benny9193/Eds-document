# Table: `dbo.MaintenancePlanAssignments`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | int | NO |  | YES |
| 2 | `EntityID` | int | NO |  |  |
| 3 | `MaintenancePlanID` | int | NO |  |  |
| 4 | `EntityUri` | nvarchar(400) | NO |  |  |
| 5 | `EntityType` | nvarchar(250) | NO |  |  |
| 6 | `Enabled` | bit | NO | `((1))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_MaintenancePlan_EntityID_EntityType_MaintenancePlanID` | YES | NONCLUSTERED | `EntityID`, `EntityType`, `MaintenancePlanID` |  |
