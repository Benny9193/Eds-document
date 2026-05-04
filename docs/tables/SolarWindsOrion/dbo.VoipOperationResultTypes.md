# Table: `dbo.VoipOperationResultTypes`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 4

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipOperationResultTypeID` | smallint | NO |  | YES |
| 2 | `OperationResultType` | varchar(100) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.VoipOperationResults_Detail`](dbo.VoipOperationResults_Detail.md) | `VoipOperationResultTypeID` | `VoipOperationResultTypeID` | NO_ACTION | NO_ACTION |

## Indexes

_No non-PK indexes._
