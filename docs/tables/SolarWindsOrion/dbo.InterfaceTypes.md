# Table: `dbo.InterfaceTypes`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 231

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Name` | nvarchar(60) | NO |  |  |
| 2 | `Type` | int | NO |  | YES |
| 3 | `Description` | nvarchar(250) | NO |  |  |
| 4 | `MaxConnections` | int | NO |  |  |
| 5 | `WAN` | bit | NO |  |  |
| 6 | `LAN` | bit | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
