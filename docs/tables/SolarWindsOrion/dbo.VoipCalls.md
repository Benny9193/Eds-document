# View: `dbo.VoipCalls`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CallID` | int | NO |  |  |
| 2 | `DateTime` | datetime | YES |  |  |
| 3 | `Duration` | int | NO |  |  |
| 4 | `OrigDeviceName` | nvarchar(129) | YES |  |  |
| 5 | `OrigCCMRegionName` | nvarchar(50) | YES |  |  |
| 6 | `DestDeviceName` | nvarchar(129) | YES |  |  |
| 7 | `DestCCMRegionName` | nvarchar(50) | YES |  |  |
| 8 | `OrigCause` | int | NO |  |  |
| 9 | `DestCause` | int | NO |  |  |
| 10 | `OrigJitter` | int | YES |  |  |
| 11 | `OrigLatency` | int | YES |  |  |
| 12 | `OrigMOS` | float | YES |  |  |
| 13 | `OrigPacketLoss` | int | YES |  |  |
| 14 | `DestJitter` | int | YES |  |  |
| 15 | `DestLatency` | int | YES |  |  |
| 16 | `DestMOS` | float | YES |  |  |
| 17 | `DestPacketLoss` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.VoipCCMMonitoring`](dbo.VoipCCMMonitoring.md) | USER_TABLE |
| [`dbo.VoipCCMRegions`](dbo.VoipCCMRegions.md) | USER_TABLE |
| [`dbo.VoipCDRs`](dbo.VoipCDRs.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[VoipCalls]
AS
SELECT
	CDRs.GlobalCallID_callId AS CallID,
	CDRs.DateTime,
	CDRs.Duration,
	CDRs.OrigDeviceName, 
	OrigCCMRegions.RegionName AS OrigCCMRegionName,
	CDRs.DestDeviceName,
	DestCCMRegions.RegionName AS DestCCMRegionName,
	CDRs.OrigCause_value AS OrigCause, 
    CDRs.DestCause_value AS DestCause,
	CDRs.OrigJitter,
	CDRs.OrigLatency,
	CDRs.OrigMOS,
	CDRs.OrigPacketLoss,
	CDRs.DestJitter, 
    CDRs.DestLatency,
	CDRs.DestMOS,
	CDRs.DestPacketLoss
FROM
	dbo.VoipCDRs AS CDRs
		LEFT OUTER JOIN dbo.VoipCCMRegions AS OrigCCMRegions ON OrigCCMRegions.RegionID = CDRs.OrigRegionID
		LEFT OUTER JOIN dbo.VoipCCMRegions AS DestCCMRegions ON DestCCMRegions.RegionID = CDRs.DestRegionID
		INNER JOIN dbo.VoipCCMMonitoring AS CCMMonitoring ON CCMMonitoring.ID = CDRs.VoipCCMMonitoringID
WHERE
	CCMMonitoring.Deleted = 0
```
