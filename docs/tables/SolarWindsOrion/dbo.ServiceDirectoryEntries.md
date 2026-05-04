# Table: `dbo.ServiceDirectoryEntries`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 31

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ServiceId` | varchar(256) | NO |  |  |
| 2 | `ServiceLogicalInstanceId` | varchar(64) | NO |  |  |
| 3 | `OrionServerId` | varchar(64) | NO |  |  |
| 4 | `ServiceInstanceVersion` | varchar(24) | NO |  |  |
| 5 | `ServiceEndpointProperties` | nvarchar(max) | NO |  |  |
| 6 | `ConnectionType` | varchar(16) | NO |  |  |
| 7 | `ConnectionProperties` | nvarchar(max) | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_ServiceDirectoryEntries_ServiceId_ServiceLogicalInstanceId` | no | CLUSTERED | `ServiceId`, `ServiceLogicalInstanceId` |  |
