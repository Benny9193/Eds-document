# Table: `dbo.VoipOperationParameterTypes`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 32

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipOperationParameterTypeID` | smallint | NO |  | YES |
| 2 | `VoipDataTypeID` | smallint | NO |  |  |
| 3 | `OperationParameterType` | varchar(100) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_VoipOperationParameterTypes_VoipDataTypeID` | `VoipDataTypeID` | [`dbo.VoipDataTypes.VoipDataTypeID`](dbo.VoipDataTypes.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.VoipOperationParameters`](dbo.VoipOperationParameters.md) | `VoipOperationParameterTypeID` | `VoipOperationParameterTypeID` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `NI_VoipOperationParameterTypes_VoipDataTypeID` | no | NONCLUSTERED | `VoipDataTypeID` |  |
