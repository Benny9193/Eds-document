# Table: `dbo.VoipOperationStatuses`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 6

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipOperationStatusID` | smallint | NO |  | YES |
| 2 | `OperationStatus` | varchar(100) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.VoipOperationInstances`](dbo.VoipOperationInstances.md) | `VoipOperationStatusID` | `VoipOperationStatusID` | NO_ACTION | NO_ACTION |
| [`dbo.VoipOperationResultHealthStats_Daily`](dbo.VoipOperationResultHealthStats_Daily.md) | `VoipOperationStatusID` | `VoipOperationStatusID` | NO_ACTION | NO_ACTION |
| [`dbo.VoipOperationResultHealthStats_Hourly`](dbo.VoipOperationResultHealthStats_Hourly.md) | `VoipOperationStatusID` | `VoipOperationStatusID` | NO_ACTION | NO_ACTION |
| [`dbo.VoipOperationResults_Detail`](dbo.VoipOperationResults_Detail.md) | `VoipOperationStatusID` | `VoipOperationStatusID` | NO_ACTION | NO_ACTION |
| [`dbo.VoipPathHopOperationHistoryResults`](dbo.VoipPathHopOperationHistoryResults.md) | `VoipOperationStatusID` | `VoipOperationStatusID` | NO_ACTION | NO_ACTION |

## Indexes

_No non-PK indexes._
