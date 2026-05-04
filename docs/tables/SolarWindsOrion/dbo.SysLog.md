# Table: `dbo.SysLog`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `MsgID` | bigint | NO |  | YES |
| 2 | `EngineID` | int | NO | `((0))` |  |
| 3 | `DateTime` | datetime | NO | `(getdate())` |  |
| 4 | `IP` | varchar(50) | NO | `('0.0.0.0')` |  |
| 5 | `Acknowledged` | tinyint | NO | `((0))` |  |
| 6 | `SysLogFacility` | tinyint | NO | `((0))` |  |
| 7 | `SysLogSeverity` | tinyint | NO | `((0))` |  |
| 8 | `Hostname_ANSI` | varchar(255) | NO | `('')` |  |
| 9 | `Hostname_UNICODE` | nvarchar(255) | YES |  |  |
| 10 | `NodeID` | bigint | NO | `((0))` |  |
| 11 | `MessageType_ANSI` | varchar(100) | NO | `('')` |  |
| 12 | `MessageType_UNICODE` | nvarchar(100) | YES |  |  |
| 13 | `Message_ANSI` | varchar(1024) | NO | `('')` |  |
| 14 | `Message_UNICODE` | nvarchar(1024) | YES |  |  |
| 15 | `SysLogTag_ANSI` | varchar(100) | NO | `('')` |  |
| 16 | `SysLogTag_UNICODE` | nvarchar(100) | YES |  |  |
| 17 | `FirstIPInMessage` | varchar(50) | NO | `('')` |  |
| 18 | `SecIPInMessage` | varchar(50) | NO | `('')` |  |
| 19 | `MacInMessage` | varchar(12) | NO | `('')` |  |
| 20 | `TimeStamp` | timestamp | NO |  |  |
| 21 | `Hostname` | nvarchar(255) | NO |  |  |
| 22 | `Message` | nvarchar(1024) | NO |  |  |
| 23 | `MessageType` | nvarchar(100) | NO |  |  |
| 24 | `SysLogTag` | nvarchar(100) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_SysLog_DateTime` | no | CLUSTERED | `DateTime` |  |
| `IX_SysLog_TimeStamp` | no | NONCLUSTERED | `TimeStamp` |  |
