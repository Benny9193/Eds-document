# Table: `dbo.VoipOperationResults_Detail`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipOperationInstanceID` | int | NO |  | YES |
| 2 | `VoipOperationResultTypeID` | smallint | NO |  |  |
| 3 | `VoipOperationStatusID` | smallint | NO |  |  |
| 4 | `LatestOperSense` | int | YES |  |  |
| 5 | `RecordTimeUtc` | datetime | NO |  | YES |
| 6 | `LatestCompletionTime` | int | YES |  |  |
| 7 | `RoundTripTime` | int | YES |  |  |
| 8 | `Collapsed` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_VoipOperationResults_Detail_VoipOperationInstanceID` | `VoipOperationInstanceID` | [`dbo.VoipOperationInstances.VoipOperationInstanceID`](dbo.VoipOperationInstances.md) | NO_ACTION | NO_ACTION |
| `FK_VoipOperationResults_Detail_VoipOperationResultTypeID` | `VoipOperationResultTypeID` | [`dbo.VoipOperationResultTypes.VoipOperationResultTypeID`](dbo.VoipOperationResultTypes.md) | NO_ACTION | NO_ACTION |
| `FK_VoipOperationResults_Detail_VoipOperationStatusID` | `VoipOperationStatusID` | [`dbo.VoipOperationStatuses.VoipOperationStatusID`](dbo.VoipOperationStatuses.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `NI_VoipOperationResults_Detail_VoipOperationInstanceID` | no | NONCLUSTERED | `VoipOperationInstanceID` |  |
| `NI_VoipOperationResults_Detail_VoipOperationResultTypeID` | no | NONCLUSTERED | `VoipOperationResultTypeID` |  |
| `NI_VoipOperationResults_Detail_VoipOperationStatusID` | no | NONCLUSTERED | `VoipOperationStatusID` |  |
