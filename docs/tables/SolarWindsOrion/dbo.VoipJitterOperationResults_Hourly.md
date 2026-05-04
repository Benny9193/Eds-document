# Table: `dbo.VoipJitterOperationResults_Hourly`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipOperationInstanceID` | int | NO |  | YES |
| 2 | `RecordTimeUtc` | datetime | NO |  | YES |
| 3 | `MinJitterSD` | float | YES |  |  |
| 4 | `AvgJitterSD` | float | YES |  |  |
| 5 | `MaxJitterSD` | float | YES |  |  |
| 6 | `MinJitterDS` | float | YES |  |  |
| 7 | `AvgJitterDS` | float | YES |  |  |
| 8 | `MaxJitterDS` | float | YES |  |  |
| 9 | `MinJitter` | float | YES |  |  |
| 10 | `AvgJitter` | float | YES |  |  |
| 11 | `MaxJitter` | float | YES |  |  |
| 12 | `MinLatency` | float | YES |  |  |
| 13 | `AvgLatency` | float | YES |  |  |
| 14 | `MaxLatency` | float | YES |  |  |
| 15 | `MinPacketLossSD` | float | YES |  |  |
| 16 | `AvgPacketLossSD` | float | YES |  |  |
| 17 | `MaxPacketLossSD` | float | YES |  |  |
| 18 | `MinPacketLossDS` | float | YES |  |  |
| 19 | `AvgPacketLossDS` | float | YES |  |  |
| 20 | `MaxPacketLossDS` | float | YES |  |  |
| 21 | `MinPacketLoss` | float | YES |  |  |
| 22 | `AvgPacketLoss` | float | YES |  |  |
| 23 | `MaxPacketLoss` | float | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
