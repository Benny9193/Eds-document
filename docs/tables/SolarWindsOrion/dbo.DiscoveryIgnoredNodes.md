# Table: `dbo.DiscoveryIgnoredNodes`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | int | NO |  | YES |
| 2 | `EngineID` | int | NO |  |  |
| 3 | `IPAddress` | nvarchar(40) | NO |  |  |
| 4 | `Caption` | nvarchar(255) | YES |  |  |
| 5 | `IsIgnored` | bit | NO |  |  |
| 6 | `DateAdded` | datetime | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.DiscoveryIgnoredInterfaces`](dbo.DiscoveryIgnoredInterfaces.md) | `IgnoredNodeID` | `ID` | NO_ACTION | NO_ACTION |
| [`dbo.DiscoveryIgnoredVolumes`](dbo.DiscoveryIgnoredVolumes.md) | `IgnoredNodeID` | `ID` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_DiscoveryIgnoredNodes` | no | NONCLUSTERED | `EngineID`, `IPAddress` |  |
