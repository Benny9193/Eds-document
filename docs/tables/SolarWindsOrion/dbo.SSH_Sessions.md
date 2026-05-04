# Table: `dbo.SSH_Sessions`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ClientId` | nvarchar(36) | NO |  | YES |
| 2 | `HostName` | nvarchar(256) | NO |  |  |
| 3 | `Username` | nvarchar(max) | NO |  |  |
| 4 | `Password` | nvarchar(max) | NO |  |  |
| 5 | `SSHPort` | int | NO |  |  |
| 6 | `EngineId` | int | NO |  |  |
| 7 | `NodeId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
