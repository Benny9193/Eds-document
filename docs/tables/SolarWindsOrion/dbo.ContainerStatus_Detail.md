# Table: `dbo.ContainerStatus_Detail`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ContainerStatusID` | bigint | NO |  | YES |
| 2 | `ContainerID` | int | NO |  | YES |
| 3 | `DateTime` | datetime | NO |  |  |
| 4 | `Status` | int | NO |  |  |
| 5 | `PercentAvailability` | int | NO |  |  |
| 6 | `PercentMembersAvailability` | int | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_ContainerStatus_Detail_Containers` | `ContainerID` | [`dbo.Containers.ContainerID`](dbo.Containers.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ContainerStatus_Detail_DateTime` | no | NONCLUSTERED | `DateTime` |  |
