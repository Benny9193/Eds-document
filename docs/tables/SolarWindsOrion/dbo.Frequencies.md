# Table: `dbo.Frequencies`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `FrequencyID` | int | NO |  | YES |
| 2 | `DisplayName` | nvarchar(255) | YES |  |  |
| 3 | `Description` | nvarchar(max) | YES |  |  |
| 4 | `CronExpression` | nvarchar(50) | YES |  |  |
| 5 | `Duration` | bigint | YES |  |  |
| 6 | `StartTime` | datetime | YES |  |  |
| 7 | `EndTime` | datetime | YES |  |  |
| 8 | `EnabledDuringTimePeriod` | bit | YES |  |  |
| 9 | `CronExpressionTimeZoneInfo` | nvarchar(255) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
