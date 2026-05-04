# Table: `dbo.AgentManagement_AgentPlugins`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 8

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `AgentId` | int | NO |  | YES |
| 2 | `PluginId` | varchar(128) | NO |  | YES |
| 3 | `Version` | varchar(32) | NO |  |  |
| 4 | `LastChangeUtc` | datetime | NO |  |  |
| 5 | `Status` | int | NO |  |  |
| 6 | `StatusMessage` | nvarchar(512) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
