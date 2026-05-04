# Table: `dbo.ContainerMemberDefinitions`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ContainerMemberDefinitionID` | int | NO |  | YES |
| 2 | `ContainerID` | int | NO |  | YES |
| 3 | `Name` | nvarchar(1024) | YES |  |  |
| 4 | `Entity` | nvarchar(400) | YES |  |  |
| 5 | `FromClause` | nvarchar(max) | YES |  |  |
| 6 | `Expression` | nvarchar(max) | YES |  |  |
| 7 | `Definition` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_ContainerMemberDefinitions_Containers` | `ContainerID` | [`dbo.Containers.ContainerID`](dbo.Containers.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ContainerMemberDefinitions_Entity` | no | NONCLUSTERED | `Entity` | `ContainerID` |
