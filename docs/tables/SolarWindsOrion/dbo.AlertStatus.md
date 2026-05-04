# Table: `dbo.AlertStatus`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `AlertDefID` | uniqueidentifier | NO |  | YES |
| 2 | `ActiveObject` | varchar(150) | NO |  | YES |
| 3 | `ObjectType` | nvarchar(50) | NO | `('')` |  |
| 4 | `State` | tinyint | NO | `((0))` |  |
| 5 | `WorkingState` | tinyint | NO | `((0))` |  |
| 6 | `ObjectName` | nvarchar(255) | NO | `('')` |  |
| 7 | `AlertMessage` | nvarchar(255) | NO | `('')` |  |
| 8 | `TriggerTimeStamp` | datetime | NO | `(getdate())` |  |
| 9 | `TriggerTimeOffset` | int | NO | `((0))` |  |
| 10 | `TriggerCount` | int | NO | `((0))` |  |
| 11 | `ResetTimeStamp` | datetime | NO | `((-2))` |  |
| 12 | `Acknowledged` | tinyint | NO | `((0))` |  |
| 13 | `AcknowledgedBy` | nvarchar(100) | NO | `('')` |  |
| 14 | `AcknowledgedTime` | datetime | NO | `((-2))` |  |
| 15 | `LastUpdate` | datetime | NO | `(getdate())` |  |
| 16 | `AlertNotes` | nvarchar(max) | NO | `('')` |  |
| 17 | `Notes` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
