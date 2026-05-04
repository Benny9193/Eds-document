# Table: `dbo.CPULoad_Statistics`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 115

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  | YES |
| 2 | `TimeFrameID` | int | NO |  | YES |
| 3 | `MinDateTime` | datetime | NO |  |  |
| 4 | `MaxDateTime` | datetime | NO |  |  |
| 5 | `Timestamp` | datetime | NO |  |  |
| 6 | `AvgLoadMin` | smallint | YES |  |  |
| 7 | `AvgLoadMax` | smallint | YES |  |  |
| 8 | `AvgLoadMean` | real | YES |  |  |
| 9 | `AvgLoadStDev` | real | YES |  |  |
| 10 | `AvgLoadCount` | int | NO |  |  |
| 11 | `AvgPercentMemoryUsedMin` | real | YES |  |  |
| 12 | `AvgPercentMemoryUsedMax` | real | YES |  |  |
| 13 | `AvgPercentMemoryUsedMean` | real | YES |  |  |
| 14 | `AvgPercentMemoryUsedStDev` | real | YES |  |  |
| 15 | `AvgPercentMemoryUsedCount` | int | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
