# Table: `dbo.VoipSiteCapabilities`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipSiteCapabilityID` | int | NO |  | YES |
| 2 | `VoipSiteID` | int | NO |  |  |
| 3 | `VoipOperationTypeID` | smallint | NO |  |  |
| 4 | `DateChangedUtc` | datetime | NO | `(getutcdate())` |  |
| 5 | `Deleted` | bit | NO | `((0))` |  |

## Foreign keys (outgoing)

| Name | Column | References | On Delete | On Update |
|------|--------|------------|-----------|-----------|
| `FK_VoipSiteCapabilities_VoipOperationTypeID` | `VoipOperationTypeID` | [`dbo.VoipOperationTypes.VoipOperationTypeID`](dbo.VoipOperationTypes.md) | NO_ACTION | NO_ACTION |
| `FK_VoipSiteCapabilities_VoipSiteID` | `VoipSiteID` | [`dbo.VoipSites.VoipSiteID`](dbo.VoipSites.md) | NO_ACTION | NO_ACTION |

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
