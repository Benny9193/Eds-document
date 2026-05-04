# Table: `dbo.AuditingActionTypes`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 68

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ActionTypeID` | int | NO |  | YES |
| 2 | `ActionType` | nvarchar(50) | NO |  |  |
| 3 | `ActionTypeDisplayName` | nvarchar(255) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `UX_AuditingActionTypes_ActionType` | YES | NONCLUSTERED | `ActionType` |  |
