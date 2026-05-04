# Table: `dbo.VoipOperationTypes`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 14

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipOperationTypeID` | smallint | NO |  | YES |
| 2 | `MinIosVersionSupport` | varchar(20) | YES |  |  |
| 3 | `OperationType` | nvarchar(100) | YES |  |  |
| 4 | `Supported` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.VoipOperationInstances`](dbo.VoipOperationInstances.md) | `VoipOperationTypeID` | `VoipOperationTypeID` | NO_ACTION | NO_ACTION |
| [`dbo.VoipOperationTypesThresholds`](dbo.VoipOperationTypesThresholds.md) | `VoipOperationTypeID` | `VoipOperationTypeID` | NO_ACTION | NO_ACTION |
| [`dbo.VoipSiteCapabilities`](dbo.VoipSiteCapabilities.md) | `VoipOperationTypeID` | `VoipOperationTypeID` | NO_ACTION | NO_ACTION |

## Indexes

_No non-PK indexes._
