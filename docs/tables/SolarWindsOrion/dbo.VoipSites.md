# Table: `dbo.VoipSites`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipSiteID` | int | NO |  | YES |
| 2 | `Name` | nvarchar(100) | NO |  |  |
| 3 | `IsHub` | bit | NO | `((0))` |  |
| 4 | `IsAutoConfigured` | bit | NO | `((1))` |  |
| 5 | `IPAddress` | varchar(255) | YES |  |  |
| 6 | `NodeID` | int | NO |  |  |
| 7 | `RegionID` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

| From | Column | Targets | On Delete | On Update |
|------|--------|---------|-----------|-----------|
| [`dbo.VoipSiteCapabilities`](dbo.VoipSiteCapabilities.md) | `VoipSiteID` | `VoipSiteID` | NO_ACTION | NO_ACTION |

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_VoipSites_NodeID` | no | NONCLUSTERED | `NodeID` |  |
