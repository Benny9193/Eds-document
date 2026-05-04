# Table: `dbo.DiscoveryIgnoredVolumes`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | int | NO |  | YES |
| 2 | `IgnoredNodeID` | int | NO |  |  |
| 3 | `Description` | nvarchar(max) | NO |  |  |
| 4 | `Type` | int | NO |  |  |
| 5 | `DateAdded` | datetime | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DiscoveryIgnoredVolumes_DiscoveryIgnoredNodes` | `IgnoredNodeID` | [`dbo.DiscoveryIgnoredNodes.ID`](dbo.DiscoveryIgnoredNodes.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
