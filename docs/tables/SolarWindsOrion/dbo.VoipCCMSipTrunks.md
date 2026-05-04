# Table: `dbo.VoipCCMSipTrunks`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SipTrunkId` | int | NO |  | YES |
| 2 | `SipTrunkGuid` | uniqueidentifier | NO |  |  |
| 3 | `VoipCCMMonitoringId` | int | NO |  |  |
| 4 | `Name` | nvarchar(max) | YES |  |  |
| 5 | `Description` | nvarchar(max) | YES |  |  |
| 6 | `MTPOrigCodec` | varchar(255) | YES |  |  |
| 7 | `DefaultDtmfCapability` | int | YES |  |  |
| 8 | `DevicePool` | varchar(max) | YES |  |  |
| 9 | `Location` | varchar(max) | YES |  |  |
| 10 | `SipProfile` | varchar(max) | YES |  |  |
| 11 | `SecurityProfile` | varchar(max) | YES |  |  |
| 12 | `Deleted` | bit | YES | `((0))` |  |
| 13 | `LastStatusPollRecordTimeUtc` | datetime | YES |  |  |
| 14 | `LastCallActivityPollRecordTimeUtc` | datetime | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
