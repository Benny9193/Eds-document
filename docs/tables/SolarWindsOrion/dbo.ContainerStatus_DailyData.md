# Table: `dbo.ContainerStatus_DailyData`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ContainerStatusID` | bigint | NO |  | YES |
| 2 | `Status` | int | NO |  | YES |
| 3 | `Count` | int | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_ContainerStatus_DailyData_ContainerStatus_Daily` | `ContainerStatusID` | [`dbo.ContainerStatus_Daily.ContainerStatusID`](dbo.ContainerStatus_Daily.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
