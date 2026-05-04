# Table: `dbo.VoipOperationResultHealthStats_Hourly`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipOperationInstanceID` | int | NO |  | YES |
| 2 | `RecordTimeUtc` | datetime | NO |  | YES |
| 3 | `VoipOperationStatusID` | smallint | NO |  | YES |
| 4 | `HealthCount` | int | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_VoipOperationResultHealthStats_Hourly_VoipOperationStatusID` | `VoipOperationStatusID` | [`dbo.VoipOperationStatuses.VoipOperationStatusID`](dbo.VoipOperationStatuses.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
