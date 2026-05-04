# Table: `dbo.VoipCCMGateways`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `GatewayID` | int | NO |  | YES |
| 2 | `VoipCCMMonitoringID` | int | NO |  |  |
| 3 | `GatewayIndex` | int | NO |  |  |
| 4 | `Name` | nvarchar(50) | NO |  |  |
| 5 | `Description` | nvarchar(50) | YES |  |  |
| 6 | `Status` | int | NO |  |  |
| 7 | `RegionID` | int | YES |  |  |
| 8 | `RegionIndex` | int | YES |  |  |
| 9 | `IpAddress` | nvarchar(50) | NO |  |  |
| 10 | `LastStatusUpdatedUTC` | datetime | YES |  |  |
| 11 | `LastRegisteredUTC` | datetime | YES |  |  |
| 12 | `ProductType` | nvarchar(50) | NO |  |  |
| 13 | `IpAddressV4` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
