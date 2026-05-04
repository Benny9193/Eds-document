# Table: `dbo.TrapRules`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `TrapRuleID` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `RuleName` | nvarchar(200) | YES | `('')` |  |
| 3 | `RuleEnabled` | bit | NO | `((0))` |  |
| 4 | `EngineID` | int | NO | `((0))` |  |
| 5 | `RulePriority` | int | YES |  |  |
| 6 | `LastChange` | datetime | YES | `(getdate())` |  |
| 7 | `DaysOfWeek` | varchar(20) | YES | `('1,2,3,4,5,6,7')` |  |
| 8 | `StartTime` | datetime | YES | `((-2))` |  |
| 9 | `EndTime` | datetime | YES | `((-2))` |  |
| 10 | `SourceAddresses` | varchar(max) | YES | `('*')` |  |
| 11 | `Community` | nvarchar(250) | YES | `('*')` |  |
| 12 | `DNSHostName` | nvarchar(max) | YES | `('*')` |  |
| 13 | `TriggerThreshold` | int | YES | `((0))` |  |
| 14 | `TriggerWindow` | real | YES | `((0))` |  |
| 15 | `SuppressDuration` | real | YES | `((0))` |  |
| 16 | `TrapDetail` | nvarchar(max) | YES | `('*')` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
