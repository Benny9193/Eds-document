# Table: `dbo.AgentManagement_InstallPackages`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 11

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `PackageId` | nvarchar(32) | NO |  | YES |
| 2 | `Name` | nvarchar(255) | NO |  |  |
| 3 | `OsType` | nvarchar(32) | NO |  |  |
| 4 | `OsDistro` | nvarchar(32) | NO |  |  |
| 5 | `OsVersion` | nvarchar(32) | NO |  |  |
| 6 | `OsArchitecture` | nvarchar(16) | NO |  |  |
| 7 | `PackageType` | nvarchar(16) | NO |  |  |
| 8 | `PackageManagementTool` | nvarchar(32) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
