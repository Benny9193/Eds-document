# Table: `dbo.VoipThresholdTypes`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 6

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipThresholdTypeID` | smallint | NO |  | YES |
| 2 | `ThresholdType` | varchar(max) | YES |  |  |
| 3 | `IsReverse` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.VoipOperationThresholds`](dbo.VoipOperationThresholds.md) | `VoipThresholdTypeID` | `VoipThresholdTypeID` | NO_ACTION | NO_ACTION |
| [`dbo.VoipOperationTypesThresholds`](dbo.VoipOperationTypesThresholds.md) | `VoipThresholdTypeID` | `VoipThresholdTypeID` | NO_ACTION | NO_ACTION |

## Indexes

_No non-PK indexes._
