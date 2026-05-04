# Table: `dbo.ThresholdsNames`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 4

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | int | NO |  | YES |
| 2 | `EntityType` | nvarchar(150) | NO |  |  |
| 3 | `Name` | nvarchar(150) | NO |  |  |
| 4 | `DisplayName` | nvarchar(500) | NO |  |  |
| 5 | `DefaultThresholdOperator` | int | NO |  |  |
| 6 | `RecalculationNeeded` | bit | NO | `((0))` |  |
| 7 | `ThresholdOrder` | int | NO |  |  |
| 8 | `Unit` | nvarchar(150) | YES | `(NULL)` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.Thresholds`](dbo.Thresholds.md) | `ThresholdNameId` | `Id` | NO_ACTION | NO_ACTION |

## Indexes

_No non-PK indexes._
