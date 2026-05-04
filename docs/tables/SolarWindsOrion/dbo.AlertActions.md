# Table: `dbo.AlertActions`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ActionID` | int | NO |  | YES |
| 2 | `AlertID` | int | YES |  |  |
| 3 | `SortOrder` | int | YES |  |  |
| 4 | `ActionType` | varchar(50) | YES |  |  |
| 5 | `Title` | nvarchar(max) | YES |  |  |
| 6 | `Target` | nvarchar(max) | YES |  |  |
| 7 | `FromAddress` | nvarchar(max) | YES |  |  |
| 8 | `TriggerMessage` | nvarchar(max) | YES |  |  |
| 9 | `ResetMessage` | nvarchar(max) | YES |  |  |
| 10 | `Extra1` | nvarchar(max) | YES |  |  |
| 11 | `Extra2` | nvarchar(max) | YES |  |  |
| 12 | `Extra3` | nvarchar(max) | YES |  |  |
| 13 | `Extra4` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_AlertActions` | no | NONCLUSTERED | `AlertID` |  |
| `IX_SortOrder` | no | NONCLUSTERED | `SortOrder` |  |
