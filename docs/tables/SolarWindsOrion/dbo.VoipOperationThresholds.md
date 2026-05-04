# Table: `dbo.VoipOperationThresholds`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipOperationThresholdID` | int | NO |  | YES |
| 2 | `VoipOperationInstanceID` | int | NO |  |  |
| 3 | `VoipThresholdTypeID` | smallint | NO |  |  |
| 4 | `WarningLevel` | float | YES |  |  |
| 5 | `ErrorLevel` | float | YES |  |  |
| 6 | `MaxLevel` | float | YES |  |  |
| 7 | `DateChangedUtc` | datetime | NO | `(getutcdate())` |  |
| 8 | `Deleted` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_VoipOperationThresholds_VoipOperationInstanceID` | `VoipOperationInstanceID` | [`dbo.VoipOperationInstances.VoipOperationInstanceID`](dbo.VoipOperationInstances.md) | NO_ACTION | NO_ACTION |
| `FK_VoipOperationThresholds_VoipThresholdTypeID` | `VoipThresholdTypeID` | [`dbo.VoipThresholdTypes.VoipThresholdTypeID`](dbo.VoipThresholdTypes.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `NI_VoipOperationThresholds_VoipOperationInstanceID` | no | NONCLUSTERED | `VoipOperationInstanceID` |  |
| `NI_VoipOperationThresholds_VoipThresholdTypeID` | no | NONCLUSTERED | `VoipThresholdTypeID` |  |
