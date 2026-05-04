# Table: `dbo.ActionDefinitions`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ActionDefID` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `AlertDefID` | uniqueidentifier | NO |  |  |
| 3 | `TriggerAction` | bit | NO | `((1))` |  |
| 4 | `ExecuteIfAcknowledged` | bit | NO | `((1))` |  |
| 5 | `TimeOffset` | int | NO | `((0))` |  |
| 6 | `RepeatInterval` | int | NO | `((0))` |  |
| 7 | `StartTime` | datetime | NO | `('12:00:00 AM')` |  |
| 8 | `EndTime` | datetime | NO | `('11:59:59 PM')` |  |
| 9 | `DOW` | varchar(25) | NO | `('1,2,3,4,5,6,7')` |  |
| 10 | `SortOrder` | int | NO | `((0))` |  |
| 11 | `ActionType` | varchar(50) | NO | `('')` |  |
| 12 | `Title` | nvarchar(1024) | NO | `('')` |  |
| 13 | `Target` | nvarchar(max) | YES |  |  |
| 14 | `Parameter1` | nvarchar(max) | YES |  |  |
| 15 | `Parameter2` | nvarchar(max) | YES |  |  |
| 16 | `Parameter3` | nvarchar(max) | YES |  |  |
| 17 | `Parameter4` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ActionDefinitions` | no | NONCLUSTERED | `AlertDefID` |  |
