# Table: `dbo.VoipOperationTypesThresholds`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 24

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipOperationTypesThresholdID` | int | NO |  | YES |
| 2 | `VoipOperationTypeID` | smallint | NO |  |  |
| 3 | `VoipThresholdTypeID` | smallint | NO |  |  |
| 4 | `WarningLevel` | float | YES |  |  |
| 5 | `ErrorLevel` | float | YES |  |  |
| 6 | `MaxLevel` | float | YES |  |  |
| 7 | `DefaultWarningLevel` | float | NO |  |  |
| 8 | `DefaultErrorLevel` | float | NO |  |  |
| 9 | `DefaultMaxLevel` | float | NO |  |  |
| 10 | `DateChangedUtc` | datetime | NO | `(getutcdate())` |  |
| 11 | `Deleted` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_VoipOperationTypesThresholds_VoipOperationTypeID` | `VoipOperationTypeID` | [`dbo.VoipOperationTypes.VoipOperationTypeID`](dbo.VoipOperationTypes.md) | NO_ACTION | NO_ACTION |
| `FK_VoipOperationTypesThresholds_VoipThresholdTypeID` | `VoipThresholdTypeID` | [`dbo.VoipThresholdTypes.VoipThresholdTypeID`](dbo.VoipThresholdTypes.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `NI_VoipOperationTypesThresholds_VoipOperationTypeID` | no | NONCLUSTERED | `VoipOperationTypeID` |  |
| `NI_VoipOperationTypesThresholds_VoipThresholdTypeID` | no | NONCLUSTERED | `VoipThresholdTypeID` |  |
