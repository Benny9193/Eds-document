# Table: `dbo.DiscoveryLogItems`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 859

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `BatchID` | uniqueidentifier | NO |  |  |
| 2 | `EntityType` | nvarchar(200) | NO |  |  |
| 3 | `DisplayName` | nvarchar(1024) | NO |  |  |
| 4 | `NetObjectID` | nvarchar(1024) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_DiscoveryLogItems` | no | CLUSTERED | `BatchID` |  |
