# Table: `dbo.NodeChildStatusParticipation`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `EntityType` | nvarchar(255) | NO |  | YES |
| 2 | `ModuleName` | nvarchar(20) | NO |  |  |
| 3 | `Enabled` | bit | NO |  |  |
| 4 | `Installed` | bit | NO |  |  |
| 5 | `Excluded` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
