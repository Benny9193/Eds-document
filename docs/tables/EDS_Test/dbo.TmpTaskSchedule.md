# Table: `dbo.TmpTaskSchedule`

**Database:** `EDS_Test` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 4884

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `TmpTaskScheduleId` | int | NO |  | YES |
| 2 | `SessionId` | int | NO |  |  |
| 3 | `ProjectTasksId` | int | NO |  |  |
| 4 | `TaskSeqNum` | int | YES |  |  |
| 5 | `TaskDescription` | varchar(60) | YES |  |  |
| 6 | `StartDate` | datetime | YES |  |  |
| 7 | `EndDate` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
