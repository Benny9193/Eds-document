# Table: `dbo.AgentManagement_InstallPackageMappings`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 11

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SourceDistro` | nvarchar(32) | NO |  | YES |
| 2 | `SourceVersionRange` | nvarchar(64) | NO |  | YES |
| 3 | `TargetDistro` | nvarchar(32) | NO |  |  |
| 4 | `TargetVersion` | nvarchar(32) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
