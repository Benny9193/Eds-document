# Table: `dbo.VoipCCMH323Devices`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `H323DeviceID` | int | NO |  | YES |
| 2 | `VoipCCMMonitoringID` | int | NO |  |  |
| 3 | `H323DeviceIndex` | int | NO |  |  |
| 4 | `Name` | nvarchar(50) | NO |  |  |
| 5 | `Description` | nvarchar(50) | NO |  |  |
| 6 | `Status` | int | NO |  |  |
| 7 | `StatusReason` | int | NO |  |  |
| 8 | `IpAddress` | nvarchar(50) | NO |  |  |
| 9 | `LastStatusUpdatedUTC` | datetime | YES |  |  |
| 10 | `LastRegisteredUTC` | datetime | YES |  |  |
| 11 | `ProductType` | int | NO |  |  |
| 12 | `RegionID` | int | YES |  |  |
| 13 | `IpAddressV4` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
