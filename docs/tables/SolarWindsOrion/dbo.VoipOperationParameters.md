# Table: `dbo.VoipOperationParameters`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipOperationParameterID` | int | NO |  | YES |
| 2 | `VoipOperationInstanceID` | int | NO |  |  |
| 3 | `VoipOperationParameterTypeID` | smallint | NO |  |  |
| 4 | `Value` | nvarchar(max) | NO |  |  |
| 5 | `DateChangedUtc` | datetime | NO | `(getutcdate())` |  |
| 6 | `Deleted` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_VoipOperationParameters_VoipOperationInstanceID` | `VoipOperationInstanceID` | [`dbo.VoipOperationInstances.VoipOperationInstanceID`](dbo.VoipOperationInstances.md) | NO_ACTION | NO_ACTION |
| `FK_VoipOperationParameters_VoipOperationParameterTypeID` | `VoipOperationParameterTypeID` | [`dbo.VoipOperationParameterTypes.VoipOperationParameterTypeID`](dbo.VoipOperationParameterTypes.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `NI_VoipOperationParameters_VoipOperationInstanceID` | no | NONCLUSTERED | `VoipOperationInstanceID`, `VoipOperationParameterTypeID` |  |
| `NI_VoipOperationParameters_VoipOperationParameterTypeID` | no | NONCLUSTERED | `VoipOperationParameterTypeID` |  |
