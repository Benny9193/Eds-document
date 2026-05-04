# Table: `dbo.VoipCCMSipTrunkDestinations`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | int | NO |  | YES |
| 2 | `SipTrunkId` | int | NO |  |  |
| 3 | `SipTrunkGuid` | uniqueidentifier | NO |  |  |
| 4 | `VoipCCMMonitoringId` | int | NO |  |  |
| 5 | `IpAddress` | varchar(50) | YES |  |  |
| 6 | `Port` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_VoipCCMSipTrunkDestinations_SipTrunkId` | YES | NONCLUSTERED | `SipTrunkId`, `SipTrunkGuid`, `IpAddress`, `Port` |  |
