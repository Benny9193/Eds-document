# Table: `dbo.Licensing_LicenseAssignments`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | int | NO |  | YES |
| 2 | `LicenseKey` | nvarchar(50) | NO |  |  |
| 3 | `LicenseVersion` | int | NO |  |  |
| 4 | `ProductName` | nvarchar(50) | NO |  |  |
| 5 | `OrionServerId` | int | YES |  |  |
| 6 | `OrionPoolId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
