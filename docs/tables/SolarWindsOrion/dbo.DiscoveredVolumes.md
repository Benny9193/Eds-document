# Table: `dbo.DiscoveredVolumes`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 809

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ProfileID` | int | NO |  | YES |
| 2 | `DiscoveredNodeID` | int | NO |  | YES |
| 3 | `VolumeIndex` | int | NO |  | YES |
| 4 | `VolumeType` | int | NO |  |  |
| 5 | `VolumeDescription` | nvarchar(max) | YES |  |  |
| 6 | `IgnoredVolumeID` | int | YES |  |  |
| 7 | `DeviceId` | nvarchar(512) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
