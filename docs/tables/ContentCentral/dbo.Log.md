# Table: `dbo.Log`

**Database:** `ContentCentral` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1501

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `LogID` | int | NO |  | YES |
| 2 | `EventID` | int | YES |  |  |
| 3 | `Priority` | int | NO |  |  |
| 4 | `Severity` | nvarchar(32) | NO |  |  |
| 5 | `Title` | nvarchar(256) | NO |  |  |
| 6 | `Timestamp` | datetime | NO |  |  |
| 7 | `MachineName` | nvarchar(32) | NO |  |  |
| 8 | `AppDomainName` | nvarchar(512) | NO |  |  |
| 9 | `ProcessID` | nvarchar(256) | NO |  |  |
| 10 | `ProcessName` | nvarchar(512) | NO |  |  |
| 11 | `ThreadName` | nvarchar(512) | YES |  |  |
| 12 | `Win32ThreadId` | nvarchar(128) | YES |  |  |
| 13 | `Message` | nvarchar(max) | YES |  |  |
| 14 | `FormattedMessage` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.CategoryLog`](dbo.CategoryLog.md) | `LogID` | `LogID` | NO_ACTION | NO_ACTION |

## Indexes

_No non-PK indexes._
