# Table: `dbo.DiscoveryIgnoredInterfaces`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | int | NO |  | YES |
| 2 | `IgnoredNodeID` | int | NO |  |  |
| 3 | `PhysicalAddress` | nvarchar(255) | NO |  |  |
| 4 | `Description` | nvarchar(512) | NO |  |  |
| 5 | `Caption` | nvarchar(1024) | NO |  |  |
| 6 | `Type` | int | NO |  |  |
| 7 | `IfxName` | nvarchar(255) | NO |  |  |
| 8 | `DateAdded` | datetime | NO |  |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_DiscoveryIgnoredInterfaces_DiscoveryIgnoredNodes` | `IgnoredNodeID` | [`dbo.DiscoveryIgnoredNodes.ID`](dbo.DiscoveryIgnoredNodes.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
