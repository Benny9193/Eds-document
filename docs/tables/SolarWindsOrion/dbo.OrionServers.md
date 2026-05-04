# Table: `dbo.OrionServers`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 1

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `OrionServerID` | int | NO |  | YES |
| 2 | `ServerType` | nvarchar(20) | NO |  |  |
| 3 | `HostName` | nvarchar(255) | NO |  |  |
| 4 | `FQDN` | nvarchar(2048) | YES |  |  |
| 5 | `NodeID` | int | YES |  |  |
| 6 | `AgentAutoDeploy` | bit | NO | `((1))` |  |
| 7 | `SWAKeepAlive` | datetime | NO | `('1900-01-01T00:00:00')` |  |
| 8 | `SWAVersion` | varchar(20) | NO | `('0.0.0.0')` |  |
| 9 | `Details` | nvarchar(max) | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `CI_HostName` | no | CLUSTERED | `OrionServerID`, `HostName` |  |
| `I_OrionServers_ServerType_HostName_incl` | no | NONCLUSTERED | `ServerType`, `HostName` | `OrionServerID`, `SWAKeepAlive`, `SWAVersion` |
