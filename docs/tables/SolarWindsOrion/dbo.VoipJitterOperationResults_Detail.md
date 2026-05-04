# Table: `dbo.VoipJitterOperationResults_Detail`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipOperationInstanceID` | int | NO |  | YES |
| 2 | `RecordTimeUtc` | datetime | NO |  | YES |
| 3 | `JitterSD` | float | YES |  |  |
| 4 | `JitterDS` | float | YES |  |  |
| 5 | `Jitter` | float | YES |  |  |
| 6 | `Latency` | float | YES |  |  |
| 7 | `PacketLossSD` | float | YES |  |  |
| 8 | `PacketLossDS` | float | YES |  |  |
| 9 | `PacketLoss` | float | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
