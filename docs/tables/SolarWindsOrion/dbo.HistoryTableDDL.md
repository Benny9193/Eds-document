# Table: `dbo.HistoryTableDDL`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 15

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `HistoryTableDDLID` | int | NO |  | YES |
| 2 | `TableNamePrefix` | varchar(100) | YES |  |  |
| 3 | `ObjectName` | varchar(256) | YES |  |  |
| 4 | `ObjectType` | varchar(100) | YES |  |  |
| 5 | `DDLScript` | varchar(max) | YES |  |  |
| 6 | `DatePartString` | varchar(20) | YES |  |  |
| 7 | `NumberOfDaysPerPartition` | int | YES |  |  |
| 8 | `NumberOfDaysAhead` | int | YES |  |  |
| 9 | `NumberOfDaysSettingId` | varchar(256) | YES |  |  |
| 10 | `DeleteBatchSize` | int | YES |  |  |
| 11 | `MinutesPerInsertBatch` | int | YES |  |  |
| 12 | `DateTimeColumn` | varchar(128) | YES |  |  |
| 13 | `UseUTC` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
