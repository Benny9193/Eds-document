# View: `dbo.VoipCCMSipTrunkDestinationsView`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `SipTrunkId` | int | NO |  |  |
| 2 | `SipTrunkGuid` | uniqueidentifier | NO |  |  |
| 3 | `VoipCCMMonitoringId` | int | NO |  |  |
| 4 | `IpAddress` | varchar(50) | YES |  |  |
| 5 | `Port` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.VoipCCMSipTrunkDestinations`](dbo.VoipCCMSipTrunkDestinations.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW dbo.VoipCCMSipTrunkDestinationsView
AS

SELECT SipTrunkId, SipTrunkGuid, VoipCCMMonitoringId, IpAddress, Port 
FROM dbo.VoipCCMSipTrunkDestinations
```
