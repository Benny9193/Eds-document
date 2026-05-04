# Table: `dbo.SWA_InstallationSession_OrionServer`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | int | NO |  | YES |
| 2 | `SessionId` | int | NO |  |  |
| 3 | `Hostname` | varchar(100) | NO |  |  |
| 4 | `Stage` | varchar(50) | NO |  |  |
| 5 | `StageProgress` | varchar(50) | NO |  |  |
| 6 | `PreInstallState` | varchar(50) | NO |  |  |
| 7 | `Message` | nvarchar(500) | YES |  |  |
| 8 | `PreflightChecks` | nvarchar(max) | YES |  |  |
| 9 | `Download` | nvarchar(max) | YES |  |  |
| 10 | `Installation` | nvarchar(max) | YES |  |  |
| 11 | `KeepAlive` | datetimeoffset | YES |  |  |
| 12 | `OrionServerType` | varchar(50) | NO |  |  |
| 13 | `IsHighAvailability` | bit | NO | `((0))` |  |
| 14 | `UpdatedOn` | datetimeoffset | NO | `(sysdatetimeoffset())` |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_InstallationSession_SessionId` | no | NONCLUSTERED | `SessionId` |  |
| `UX_InstallationSession_Hostname` | YES | NONCLUSTERED | `SessionId`, `Hostname` |  |
