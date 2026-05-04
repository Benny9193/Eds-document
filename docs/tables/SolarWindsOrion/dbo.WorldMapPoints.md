# Table: `dbo.WorldMapPoints`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | int | NO |  | YES |
| 2 | `Instance` | nvarchar(120) | NO |  |  |
| 3 | `InstanceID` | nvarchar(150) | YES |  |  |
| 4 | `Latitude` | float | YES |  |  |
| 5 | `Longitude` | float | YES |  |  |
| 6 | `AutoAdded` | bit | NO | `((0))` |  |
| 7 | `StreetAddress` | nvarchar(255) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_WorldMapPoints` | no | NONCLUSTERED | `Instance`, `InstanceID` |  |
