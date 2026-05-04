# Table: `dbo.FED_RemoteInformationServices`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `InstanceSiteId` | int | NO |  | YES |
| 2 | `Uri` | nvarchar(250) | NO |  |  |
| 3 | `Tag` | nvarchar(20) | YES |  |  |
| 4 | `Enabled` | bit | NO | `((1))` |  |
| 5 | `SchemaVersion` | int | NO | `((1))` |  |
| 6 | `AlwaysIncludeEntities` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
