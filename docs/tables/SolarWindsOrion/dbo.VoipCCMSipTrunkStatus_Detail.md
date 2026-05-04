# Table: `dbo.VoipCCMSipTrunkStatus_Detail`

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
| 5 | `SipTrunkStatus` | int | NO |  |  |
| 6 | `RecordTimeUtc` | datetime | NO |  |  |
| 7 | `DurationInMinutes` | int | NO |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `IX_VoipCCMSipTrunkStatus_Detail_SipTrunkId` | no | NONCLUSTERED | `SipTrunkId` |  |
