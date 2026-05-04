# Table: `dbo.VoipCCMSipTrunkCallActivity_Detail`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipCCMMonitoringId` | int | NO |  | YES |
| 2 | `SipTrunkId` | int | NO |  | YES |
| 3 | `SipTrunkGuid` | uniqueidentifier | NO |  |  |
| 4 | `RecordTimeUtc` | datetime | NO |  | YES |
| 5 | `CallsActive` | int | NO |  |  |
| 6 | `CallsAttempted` | int | NO |  |  |
| 7 | `CallsCompleted` | int | NO |  |  |
| 8 | `CallsAttemptedCounter` | int | YES |  |  |
| 9 | `CallsCompletedCounter` | int | YES |  |  |
| 10 | `CallsInProgress` | int | NO |  |  |
| 11 | `VideoCallsActive` | int | NO |  |  |
| 12 | `VideoCallsCompleted` | int | NO |  |  |
| 13 | `VideoCallsCompletedCounter` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_RecordTimeUts_CallsAttempted_CallCompleted_VCallsCompleted` | no | NONCLUSTERED | `SipTrunkId` | `RecordTimeUtc`, `CallsAttempted`, `CallsCompleted`, `VideoCallsCompleted` |
