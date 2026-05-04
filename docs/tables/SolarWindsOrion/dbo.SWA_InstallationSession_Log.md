# Table: `dbo.SWA_InstallationSession_Log`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | int | NO |  | YES |
| 2 | `OrionServerSessionId` | int | NO |  |  |
| 3 | `EventName` | varchar(150) | NO |  |  |
| 4 | `EventId` | uniqueidentifier | NO |  |  |
| 5 | `OccuredOn` | datetimeoffset | NO |  |  |
| 6 | `AcceptedOn` | datetimeoffset | YES |  |  |
| 7 | `Data` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_InstallationSession_OrionServer_OrionServerId` | no | NONCLUSTERED | `OrionServerSessionId` |  |
