# Table: `dbo.AlertDefinitions`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `AlertDefID` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `AlertName` | nvarchar(1024) | NO | `('')` |  |
| 3 | `AlertDescription` | nvarchar(max) | YES | `('')` |  |
| 4 | `Enabled` | bit | NO | `((0))` |  |
| 5 | `StartTime` | datetime | NO | `((0))` |  |
| 6 | `EndTime` | datetime | NO | `('11:59:59 PM')` |  |
| 7 | `DOW` | nvarchar(16) | NO | `('1,2,3,4,5,6,7')` |  |
| 8 | `TriggerQuery` | nvarchar(max) | NO | `('')` |  |
| 9 | `TriggerQueryDesign` | nvarchar(max) | NO | `('')` |  |
| 10 | `ResetQuery` | nvarchar(max) | NO | `('')` |  |
| 11 | `ResetQueryDesign` | nvarchar(max) | NO | `('')` |  |
| 12 | `SuppressionQuery` | nvarchar(max) | NO | `('')` |  |
| 13 | `SuppressionQueryDesign` | nvarchar(max) | NO | `('')` |  |
| 14 | `TriggerSustained` | bigint | NO | `((0))` |  |
| 15 | `ResetSustained` | bigint | NO | `((0))` |  |
| 16 | `LastExecuteTime` | datetime | NO | `((0))` |  |
| 17 | `ExecuteInterval` | bigint | NO | `((60))` |  |
| 18 | `BlockUntil` | datetime | NO | `((0))` |  |
| 19 | `ResponseTime` | bigint | NO | `((0))` |  |
| 20 | `LastErrorTime` | datetime | YES |  |  |
| 21 | `LastError` | nvarchar(max) | YES | `('')` |  |
| 22 | `ObjectType` | nvarchar(50) | NO | `('')` |  |
| 23 | `IgnoreTimeout` | bit | NO | `((1))` |  |
| 24 | `NotifyEnabled` | bit | NO | `((1))` |  |
| 25 | `NotificationSettings` | nvarchar(max) | YES |  |  |
| 26 | `Reverted` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
