# Table: `dbo.SysLogRules`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SysLogRuleID` | uniqueidentifier | NO | `(newid())` | YES |
| 2 | `RuleName` | nvarchar(200) | YES | `('')` |  |
| 3 | `RuleEnabled` | bit | NO | `((0))` |  |
| 4 | `EngineID` | int | NO | `((0))` |  |
| 5 | `RulePriority` | int | YES | `((9999))` |  |
| 6 | `LastChange` | datetime | YES | `(getdate())` |  |
| 7 | `DaysOfWeek` | varchar(20) | YES | `('1,2,3,4,5,6,7')` |  |
| 8 | `StartTime` | datetime | YES | `((-2))` |  |
| 9 | `EndTime` | datetime | YES | `((-2))` |  |
| 10 | `SourceAddresses` | varchar(max) | YES | `('*')` |  |
| 11 | `Facilities` | varchar(80) | YES | `('*')` |  |
| 12 | `Severities` | varchar(20) | YES | `('*')` |  |
| 13 | `MessageTypes` | nvarchar(max) | YES | `('*')` |  |
| 14 | `MessageTemplates` | nvarchar(max) | YES | `('*')` |  |
| 15 | `DNSHostName` | nvarchar(max) | YES | `('*')` |  |
| 16 | `TriggerThreshold` | int | YES | `((0))` |  |
| 17 | `TriggerWindow` | real | YES | `((0))` |  |
| 18 | `SuppressDuration` | real | YES | `((0))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
