# Table: `dbo.ResponseTime_Statistics`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 330

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  | YES |
| 2 | `TimeFrameID` | int | NO |  | YES |
| 3 | `MinDateTime` | datetime | NO |  |  |
| 4 | `MaxDateTime` | datetime | NO |  |  |
| 5 | `Timestamp` | datetime | NO |  |  |
| 6 | `AvgResponseTimeMin` | smallint | YES |  |  |
| 7 | `AvgResponseTimeMax` | smallint | YES |  |  |
| 8 | `AvgResponseTimeMean` | real | YES |  |  |
| 9 | `AvgResponseTimeStDev` | real | YES |  |  |
| 10 | `AvgResponseTimeCount` | int | NO |  |  |
| 11 | `PercentLossMin` | smallint | YES |  |  |
| 12 | `PercentLossMax` | smallint | YES |  |  |
| 13 | `PercentLossMean` | real | YES |  |  |
| 14 | `PercentLossStDev` | real | YES |  |  |
| 15 | `PercentLossCount` | int | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
