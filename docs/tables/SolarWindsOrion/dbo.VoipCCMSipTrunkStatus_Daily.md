# Table: `dbo.VoipCCMSipTrunkStatus_Daily`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `Id` | int | NO |  | YES |
| 2 | `SipTrunkId` | int | YES |  |  |
| 3 | `VoipCCMMonitoringId` | int | NO |  |  |
| 4 | `StatusAny_DurationInMinutes` | int | NO |  |  |
| 5 | `StatusRegistered_DurationInMinutes` | int | NO |  |  |
| 6 | `StatusUnRegistered_DurationInMinutes` | int | NO |  |  |
| 7 | `StatusRejected_DurationInMinutes` | int | NO |  |  |
| 8 | `StatusPartiallyRegistered_DurationInMinutes` | int | NO |  |  |
| 9 | `StatusUnknown_DurationInMinutes` | int | NO |  |  |
| 10 | `RecordTimeUtc` | datetime | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_VoipCCMSipTrunkStatus_Daily_SipTrunkId` | no | NONCLUSTERED | `SipTrunkId` |  |
