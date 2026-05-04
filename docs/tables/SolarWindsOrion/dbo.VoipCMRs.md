# Table: `dbo.VoipCMRs`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipCCMMonitoringID` | int | NO |  |  |
| 2 | `GlobalCallID_callManagerId` | int | NO |  |  |
| 3 | `GlobalCallID_callId` | int | NO |  |  |
| 4 | `CallIdentifier` | int | NO |  |  |
| 5 | `DateTimeStampUTC` | datetime | NO |  |  |
| 6 | `NumberPacketsSent` | int | NO |  |  |
| 7 | `NumberOctetsSent` | int | NO |  |  |
| 8 | `NumberPacketsReceived` | int | NO |  |  |
| 9 | `NumberOctetsReceived` | int | NO |  |  |
| 10 | `NumberPacketsLost` | int | NO |  |  |
| 11 | `Jitter` | int | NO |  |  |
| 12 | `Latency` | int | NO |  |  |
| 13 | `MOS` | float | YES |  |  |
| 14 | `PacketLoss` | int | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `CI_VoipCMRs_DateTimeStampUTC` | no | CLUSTERED | `DateTimeStampUTC` |  |
| `NI_VoIPCMRs` | no | NONCLUSTERED | `GlobalCallID_callId`, `CallIdentifier`, `VoipCCMMonitoringID` |  |
