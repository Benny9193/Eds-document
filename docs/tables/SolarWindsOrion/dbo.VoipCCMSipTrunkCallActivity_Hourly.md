# Table: `dbo.VoipCCMSipTrunkCallActivity_Hourly`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipCCMMonitoringId` | int | NO |  | YES |
| 2 | `SipTrunkId` | int | NO |  | YES |
| 3 | `RecordTimeUtc` | datetime | NO |  | YES |
| 4 | `CallsActive` | int | NO |  |  |
| 5 | `CallsAttempted` | int | NO |  |  |
| 6 | `CallsCompleted` | int | NO |  |  |
| 7 | `CallsInProgress` | int | NO |  |  |
| 8 | `VideoCallsActive` | int | NO |  |  |
| 9 | `VideoCallsCompleted` | int | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
