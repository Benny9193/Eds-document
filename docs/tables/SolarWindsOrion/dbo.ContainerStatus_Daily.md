# Table: `dbo.ContainerStatus_Daily`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ContainerStatusID` | bigint | NO |  | YES |
| 2 | `ContainerID` | int | NO |  |  |
| 3 | `DateTime` | datetime | NO |  |  |
| 4 | `PercentAvailability` | int | NO |  |  |
| 5 | `PercentMembersAvailability` | int | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_ContainerStatus_Daily_Containers` | `ContainerID` | [`dbo.Containers.ContainerID`](dbo.Containers.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.ContainerStatus_DailyData`](dbo.ContainerStatus_DailyData.md) | `ContainerStatusID` | `ContainerStatusID` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ContainerStatus_Daily` | no | NONCLUSTERED | `ContainerID` |  |
