# Table: `dbo.VoipOperationStates`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 7

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipOperationStateID` | smallint | NO |  | YES |
| 2 | `OperationState` | varchar(100) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.VoipOperationInstances`](dbo.VoipOperationInstances.md) | `VoipOperationStateID` | `VoipOperationStateID` | NO_ACTION | NO_ACTION |

## Indexes

_No non-PK indexes._
