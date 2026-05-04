# Table: `dbo.VoipPathHopOperationResults_Detail`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipOperationInstanceID` | int | NO |  | YES |
| 2 | `RecordTimeUtc` | datetime | NO |  | YES |
| 3 | `HopIndex` | int | NO |  | YES |
| 4 | `VoipMetricTypeID` | smallint | NO |  | YES |
| 5 | `Value` | float | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_VoipPathHopOperationResults_Detail_VoipMetricTypeID` | `VoipMetricTypeID` | [`dbo.VoipMetricTypes.VoipMetricTypeID`](dbo.VoipMetricTypes.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
