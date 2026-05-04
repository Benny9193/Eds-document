# Table: `dbo.VoipOperationInstances`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipOperationInstanceID` | int | NO |  | YES |
| 2 | `VoipOperationTypeID` | smallint | NO |  |  |
| 3 | `VoipOperationStatusID` | smallint | NO |  |  |
| 4 | `VoipOperationStateID` | smallint | NO |  |  |
| 5 | `SourceNodeID` | int | NO |  |  |
| 6 | `TargetNodeID` | int | YES |  |  |
| 7 | `IsAutoConfigured` | bit | NO |  |  |
| 8 | `Frequency` | int | NO |  |  |
| 9 | `LifeTimeUtc` | datetime | YES |  |  |
| 10 | `IpSlaOperationNumber` | int | YES |  |  |
| 11 | `OperationName` | nvarchar(max) | YES |  |  |
| 12 | `Description` | nvarchar(max) | YES |  |  |
| 13 | `StatusMessage` | nvarchar(max) | YES |  |  |
| 14 | `DateChangedUtc` | datetime | NO | `(getutcdate())` |  |
| 15 | `LastOperationResultRecordTimeUtc` | datetime | YES |  |  |
| 16 | `Deleted` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_VoipOperationInstances_VoipOperationStateID` | `VoipOperationStateID` | [`dbo.VoipOperationStates.VoipOperationStateID`](dbo.VoipOperationStates.md) | NO_ACTION | NO_ACTION |
| `FK_VoipOperationInstances_VoipOperationStatusID` | `VoipOperationStatusID` | [`dbo.VoipOperationStatuses.VoipOperationStatusID`](dbo.VoipOperationStatuses.md) | NO_ACTION | NO_ACTION |
| `FK_VoipOperationInstances_VoipOperationTypeID` | `VoipOperationTypeID` | [`dbo.VoipOperationTypes.VoipOperationTypeID`](dbo.VoipOperationTypes.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.VoipOperationParameters`](dbo.VoipOperationParameters.md) | `VoipOperationInstanceID` | `VoipOperationInstanceID` | NO_ACTION | NO_ACTION |
| [`dbo.VoipOperationResults_Daily`](dbo.VoipOperationResults_Daily.md) | `VoipOperationInstanceID` | `VoipOperationInstanceID` | NO_ACTION | NO_ACTION |
| [`dbo.VoipOperationResults_Detail`](dbo.VoipOperationResults_Detail.md) | `VoipOperationInstanceID` | `VoipOperationInstanceID` | NO_ACTION | NO_ACTION |
| [`dbo.VoipOperationResults_Hourly`](dbo.VoipOperationResults_Hourly.md) | `VoipOperationInstanceID` | `VoipOperationInstanceID` | NO_ACTION | NO_ACTION |
| [`dbo.VoipOperationThresholds`](dbo.VoipOperationThresholds.md) | `VoipOperationInstanceID` | `VoipOperationInstanceID` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `NI_VoipOperationInstances_SourceNodeID` | no | NONCLUSTERED | `SourceNodeID`, `Deleted` | `TargetNodeID`, `VoipOperationTypeID`, `VoipOperationStatusID`, `VoipOperationStateID` |
| `NI_VoipOperationInstances_VoipOperationStateID` | no | NONCLUSTERED | `VoipOperationStateID` |  |
| `NI_VoipOperationInstances_VoipOperationStatusID` | no | NONCLUSTERED | `VoipOperationStatusID` |  |
| `NI_VoipOperationInstances_VoipOperationTypeID` | no | NONCLUSTERED | `VoipOperationTypeID` |  |
