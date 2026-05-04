# Table: `dbo.SysLogActions`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SysLogRuleID` | uniqueidentifier | NO |  | YES |
| 2 | `SysLogActionID` | uniqueidentifier | NO | `(newid())` | YES |
| 3 | `SortOrder` | int | NO | `((9999))` | YES |
| 4 | `SysLogActionType` | varchar(50) | NO | `('')` |  |
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

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_SysLogActions` | no | NONCLUSTERED | `SysLogRuleID` |  |
