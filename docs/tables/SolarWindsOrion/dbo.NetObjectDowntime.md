# Table: `dbo.NetObjectDowntime`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 4230

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `EntityId` | varchar(50) | NO |  | YES |
| 2 | `NodeId` | int | NO |  |  |
| 3 | `DateTimeFrom` | datetime | NO |  | YES |
| 4 | `DateTimeUntil` | datetime | YES |  |  |
| 5 | `State` | tinyint | NO |  |  |
| 6 | `EntityType` | varchar(40) | NO |  | YES |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_NetObjectDowntime_EntityId_DateTimeUntil_EntityType` | no | NONCLUSTERED | `EntityId`, `DateTimeUntil`, `EntityType` | `DateTimeFrom` |
