# Table: `dbo.ActiveAlerts`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `AlertID` | int | NO |  | YES |
| 2 | `AlertTime` | datetime | YES |  |  |
| 3 | `ObjectType` | char(1) | YES |  |  |
| 4 | `ObjectID` | int | NO |  | YES |
| 5 | `ObjectName` | nvarchar(50) | YES |  |  |
| 6 | `NodeID` | int | NO |  |  |
| 7 | `NodeName` | nvarchar(50) | YES |  |  |
| 8 | `EventMessage` | nvarchar(max) | YES |  |  |
| 9 | `PropertyID` | int | NO |  | YES |
| 10 | `MonitoredProperty` | varchar(50) | YES |  |  |
| 11 | `CurrentValue` | nvarchar(255) | YES |  |  |
| 12 | `TriggerValue` | nvarchar(255) | YES |  |  |
| 13 | `ResetValue` | nvarchar(255) | YES |  |  |
| 14 | `EngineID` | int | YES |  |  |
| 15 | `AlertNotes` | nvarchar(max) | YES |  |  |
| 16 | `ExpireTime` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ActiveAlerts` | no | CLUSTERED | `AlertID`, `ObjectType`, `ObjectID`, `PropertyID` |  |
