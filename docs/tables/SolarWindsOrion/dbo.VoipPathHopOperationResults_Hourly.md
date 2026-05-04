# Table: `dbo.VoipPathHopOperationResults_Hourly`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipOperationInstanceID` | int | NO |  | YES |
| 2 | `RecordTimeUtc` | datetime | NO |  | YES |
| 3 | `VoipPathID` | int | NO |  | YES |
| 4 | `HopIndex` | int | NO |  | YES |
| 5 | `VoipMetricTypeID` | smallint | NO |  | YES |
| 6 | `MinValue` | float | NO |  |  |
| 7 | `AvgValue` | float | NO |  |  |
| 8 | `MaxValue` | float | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_VoipPathHopOperationResults_Hourly_VoipMetricTypeID` | `VoipMetricTypeID` | [`dbo.VoipMetricTypes.VoipMetricTypeID`](dbo.VoipMetricTypes.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
