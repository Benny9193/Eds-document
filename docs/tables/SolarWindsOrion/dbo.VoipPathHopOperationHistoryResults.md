# Table: `dbo.VoipPathHopOperationHistoryResults`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipOperationInstanceID` | int | NO |  | YES |
| 2 | `SampleTimeUtc` | datetime | NO |  | YES |
| 3 | `BucketIndex` | int | NO |  | YES |
| 4 | `VoipMetricTypeID` | smallint | NO |  |  |
| 5 | `Value` | float | YES |  |  |
| 6 | `ResponseCode` | smallint | YES |  |  |
| 7 | `VoipOperationStatusID` | smallint | NO |  |  |
| 8 | `IpAddressV4` | int | NO |  | YES |
| 9 | `IpAddress` | varchar(15) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_VoipPathHopOperationHistoryResults_VoipMetricTypeID` | `VoipMetricTypeID` | [`dbo.VoipMetricTypes.VoipMetricTypeID`](dbo.VoipMetricTypes.md) | NO_ACTION | NO_ACTION |
| `FK_VoipPathHopOperationHistoryResults_VoipOperationStatuses` | `VoipOperationStatusID` | [`dbo.VoipOperationStatuses.VoipOperationStatusID`](dbo.VoipOperationStatuses.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
