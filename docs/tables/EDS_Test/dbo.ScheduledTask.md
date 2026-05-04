# Table: `dbo.ScheduledTask`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 12

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `TaskId` | int | NO |  | YES |
| 2 | `TaskName` | nvarchar(255) | NO |  |  |
| 3 | `Description` | nvarchar(max) | YES |  |  |
| 4 | `ScheduleExpression` | nvarchar(255) | NO |  |  |
| 5 | `TaskType` | nvarchar(50) | NO |  |  |
| 6 | `Status` | nvarchar(50) | NO | `('Pending')` |  |
| 7 | `LastRunTime` | datetime | YES |  |  |
| 8 | `NextRunTime` | datetime | YES |  |  |
| 9 | `MaxRetries` | int | NO | `((3))` |  |
| 10 | `CurrentRetries` | int | NO | `((0))` |  |
| 11 | `CreatedBy` | nvarchar(100) | NO |  |  |
| 12 | `CreatedAt` | datetime | NO | `(getdate())` |  |
| 13 | `UpdatedBy` | nvarchar(100) | YES |  |  |
| 14 | `UpdatedAt` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
