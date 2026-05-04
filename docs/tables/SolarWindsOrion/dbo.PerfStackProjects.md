# Table: `dbo.PerfStackProjects`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `AccountID` | nvarchar(100) | NO |  | YES |
| 2 | `ProjectID` | nvarchar(50) | NO |  | YES |
| 3 | `DisplayName` | nvarchar(255) | NO |  |  |
| 4 | `UpdateDateTime` | datetime | YES |  |  |
| 5 | `CreateDateTime` | datetime | YES |  |  |
| 6 | `Description` | nvarchar(255) | YES |  |  |
| 7 | `Favorite` | bit | NO |  |  |
| 8 | `Data` | nvarchar(max) | YES |  |  |
| 9 | `ChartCount` | int | YES |  |  |
| 10 | `MetricCount` | int | YES |  |  |
| 11 | `MetricTypes` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
