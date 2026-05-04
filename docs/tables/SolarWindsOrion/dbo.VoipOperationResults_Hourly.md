# Table: `dbo.VoipOperationResults_Hourly`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipOperationInstanceID` | int | NO |  | YES |
| 2 | `RecordTimeUtc` | datetime | NO |  | YES |
| 3 | `MinRoundTripTime` | int | YES |  |  |
| 4 | `AvgRoundTripTime` | int | YES |  |  |
| 5 | `MaxRoundTripTime` | int | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_VoipOperationResults_Hourly_VoipOperationInstanceID` | `VoipOperationInstanceID` | [`dbo.VoipOperationInstances.VoipOperationInstanceID`](dbo.VoipOperationInstances.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `NI_VoipOperationResults_Hourly_VoipOperationInstanceID` | no | NONCLUSTERED | `VoipOperationInstanceID` |  |
