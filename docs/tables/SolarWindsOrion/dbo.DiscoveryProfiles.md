# Table: `dbo.DiscoveryProfiles`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ProfileID` | int | NO |  | YES |
| 2 | `Name` | nvarchar(255) | NO |  |  |
| 3 | `Description` | nvarchar(255) | YES |  |  |
| 4 | `RunTimeInSeconds` | int | NO |  |  |
| 5 | `LastRun` | datetime | YES |  |  |
| 6 | `EngineID` | int | NO |  |  |
| 7 | `Status` | int | NO |  |  |
| 8 | `JobID` | uniqueidentifier | YES |  |  |
| 9 | `SIPPort` | int | NO |  |  |
| 10 | `HopCount` | smallint | NO |  |  |
| 11 | `SearchTimeout` | smallint | NO |  |  |
| 12 | `SNMPTimeout` | smallint | NO |  |  |
| 13 | `SNMPRetries` | smallint | NO |  |  |
| 14 | `RepeatInterval` | bigint | NO |  |  |
| 15 | `Active` | bit | NO |  |  |
| 16 | `DuplicateNodes` | bit | NO |  |  |
| 17 | `ImportUpInterface` | bit | NO |  |  |
| 18 | `ImportDownInterface` | bit | NO |  |  |
| 19 | `ImportShutdownInterface` | bit | NO |  |  |
| 20 | `SelectionMethod` | int | NO |  |  |
| 21 | `JobTimeout` | int | NO |  |  |
| 22 | `ScheduleRunAtTime` | datetime | YES |  |  |
| 23 | `ScheduleRunFrequency` | int | YES |  |  |
| 24 | `StatusDescription` | nvarchar(max) | YES |  |  |
| 25 | `PollESX` | bit | YES |  |  |
| 26 | `PluginConfigurations` | nvarchar(max) | YES |  |  |
| 27 | `SNMPOnly` | bit | YES |  |  |
| 28 | `IsHidden` | bit | NO | `((0))` |  |
| 29 | `IsAutoImport` | bit | NO | `((0))` |  |
| 30 | `CronSchedule` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
