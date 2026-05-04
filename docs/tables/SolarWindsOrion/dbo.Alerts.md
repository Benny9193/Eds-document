# Table: `dbo.Alerts`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `EngineID` | int | NO | `((0))` | YES |
| 2 | `AlertID` | int | NO |  | YES |
| 3 | `AlertName` | nvarchar(255) | YES |  |  |
| 4 | `Enabled` | bit | NO | `((0))` |  |
| 5 | `AlertDescription` | nvarchar(max) | YES |  |  |
| 6 | `StartTime` | datetime | YES |  |  |
| 7 | `EndTime` | datetime | YES |  |  |
| 8 | `DOW` | varchar(max) | YES |  |  |
| 9 | `NetObjects` | varchar(max) | YES |  |  |
| 10 | `PropertyID` | int | YES |  |  |
| 11 | `Trigger` | varchar(100) | YES |  |  |
| 12 | `Reset` | varchar(100) | YES |  |  |
| 13 | `Sustained` | int | YES |  |  |
| 14 | `TriggerSubjectTemplate` | nvarchar(max) | YES |  |  |
| 15 | `TriggerMessageTemplate` | nvarchar(max) | YES |  |  |
| 16 | `ResetSubjectTemplate` | nvarchar(max) | YES |  |  |
| 17 | `ResetMessageTemplate` | nvarchar(max) | YES |  |  |
| 18 | `Frequency` | int | YES |  |  |
| 19 | `EMailAddresses` | varchar(max) | YES |  |  |
| 20 | `ReplyName` | varchar(max) | YES |  |  |
| 21 | `ReplyAddress` | varchar(max) | YES |  |  |
| 22 | `LogFile` | varchar(max) | YES |  |  |
| 23 | `LogMessage` | nvarchar(max) | YES |  |  |
| 24 | `ShellTrigger` | varchar(max) | YES |  |  |
| 25 | `ShellReset` | varchar(max) | YES |  |  |
| 26 | `SuppressionType` | char(3) | YES |  |  |
| 27 | `Suppression` | varchar(max) | YES |  |  |
| 28 | `NotifyEnabled` | bit | NO | `((1))` |  |
| 29 | `NotificationSettings` | nvarchar(max) | YES |  |  |
| 30 | `Reverted` | bit | NO | `((0))` |  |
| 31 | `TimeStamp` | timestamp | NO |  |  |
| 32 | `AlertDefID` | uniqueidentifier | NO | `(newid())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_Alerts` | no | NONCLUSTERED | `AlertID` |  |
