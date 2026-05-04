# View: `dbo.VoipRegionQualityAggregate30Mins`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `RegionID` | int | NO |  |  |
| 3 | `CCMMonitoringID` | int | NO |  |  |
| 4 | `RegionName` | nvarchar(50) | YES |  |  |
| 5 | `MinJitter` | int | YES |  |  |
| 6 | `MinLatency` | int | YES |  |  |
| 7 | `MinMOS` | float | YES |  |  |
| 8 | `MinPacketLoss` | int | YES |  |  |
| 9 | `MaxJitter` | int | YES |  |  |
| 10 | `MaxLatency` | int | YES |  |  |
| 11 | `MaxMOS` | float | YES |  |  |
| 12 | `MaxPacketLoss` | int | YES |  |  |
| 13 | `AvgJitter` | float | YES |  |  |
| 14 | `AvgLatency` | float | YES |  |  |
| 15 | `AvgMOS` | float | YES |  |  |
| 16 | `AvgPacketLoss` | float | YES |  |  |
| 17 | `FailedCallPercentage` | float | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `dbo.IsDroppedcall` | SQL_SCALAR_FUNCTION |
| [`dbo.VoipCallDetailsAlert`](dbo.VoipCallDetailsAlert.md) | VIEW |
| [`dbo.VoipCCMRegions`](dbo.VoipCCMRegions.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW dbo.VoipRegionQualityAggregate30Mins
AS
	SELECT 
		0 as NodeID,
		Region.RegionID AS RegionID,
		Region.CcmID AS CCMMonitoringID,
		Region.RegionName as RegionName,
		MIN(Region.Jitter) MinJitter,
		MIN(Region.Latency) AS MinLatency,
		MIN(Region.MOS) AS MinMOS,
		MIN(Region.PacketLoss) AS MinPacketLoss,
		MAX(Region.Jitter) MaxJitter,
		MAX(Region.Latency) AS MaxLatency,
		MAX(Region.MOS) AS MaxMOS,
		MAX(Region.PacketLoss) AS MaxPacketLoss,
		AVG(CAST(Region.Jitter AS float)) AS AvgJitter,
		AVG(CAST(Region.Latency AS float)) AS AvgLatency,
		AVG(CAST(Region.MOS AS float)) AS AvgMOS,
		AVG(CAST(Region.PacketLoss AS float)) AS AvgPacketLoss,
		(AVG(CAST(Region.FailedCall AS float))* 100) AS FailedCallPercentage
	FROM (	SELECT 
						 Region.RegionID AS RegionID
						,CallDet.CcmID as CcmID
						,CallDet.CallID as CallID
						,CallDet.Pkid as Pkid
						,CallDet.DateTimeOrigination as DateTimeOrigination
						,CallDet.DateTimeDisconnect as DateTimeDisconnect
						,CallDet.CallingPartyNumber as CallingPartyNumber
						,CallDet.OriginalCalledPartyNumber as OriginalCalledPartyNumber
						,CallDet.FinalCalledPartyNumber as FinalCalledPartyNumber
						,CallDet.OrigDeviceName as DeviceName
						,CallDet.OrigIpAddr as IpAddress
						,CallDet.OrigCCMRegionName as RegionName
						,CallDet.OrigJitter as Jitter
						,CallDet.OrigLatency as Latency
						,CASE WHEN (CallDet.OrigMOS < 1 OR CallDet.OrigMOS >5 ) THEN NULL ELSE CallDet.OrigMOS  END as MOS
						,CallDet.OrigPacketLoss as PacketLoss
						,CASE WHEN dbo.IsDroppedcall(CallDet.OrigCause_value) = 1 THEN 1 ELSE 0 END as FailedCall
										
					FROM dbo.VoipCallDetailsAlert CallDet
					JOIN dbo.VoipCCMRegions Region ON
						CallDet.OrigCCMRegionName = Region.RegionName 
						AND CallDet.CcmID =Region.VoipCCMMonitoringID 
					WHERE (DATEADD(MINUTE, DATEDIFF(MINUTE, GETDATE(), GETUTCDATE()),CallDet.DateTimeDisconnect) > DATEADD(MINUTE, -30, GETUTCDATE()))		

				UNION ALL
					
						SELECT 
						Region.RegionID AS RegionID
						,CallDet.CcmID as CcmID
						,CallDet.CallID as CallID
						,CallDet.Pkid as Pkid
						,CallDet.DateTimeOrigination as DateTimeOrigination
						,CallDet.DateTimeDisconnect as DateTimeDisconnect
						,CallDet.CallingPartyNumber as CallingPartyNumber
						,CallDet.OriginalCalledPartyNumber as OriginalCalledPartyNumber
						,CallDet.FinalCalledPartyNumber as FinalCalledPartyNumber
						,CallDet.DestDeviceName as DeviceName
						,CallDet.DestIpAddr as IpAddress
						,CallDet.DestCCMRegionName as RegionName
						,CallDet.DestJitter as Jitter
						,CallDet.DestLatency as Latency
						,CASE WHEN (CallDet.DestMOS < 1 OR CallDet.DestMOS > 5) THEN NULL ELSE CallDet.DestMOS END  as MOS
						,CallDet.DestPacketLoss as PacketLoss
						,CASE WHEN dbo.IsDroppedcall(CallDet.DestCause_value) = 1 THEN 1 ELSE 0 END as FailedCall
					FROM dbo.VoipCallDetailsAlert CallDet
					JOIN dbo.VoipCCMRegions Region ON
						CallDet.DestCCMRegionName = Region.RegionName 
						AND CallDet.CcmID =Region.VoipCCMMonitoringID 
					WHERE (DATEADD(MINUTE, DATEDIFF(MINUTE, GETDATE(), GETUTCDATE()),CallDet.DateTimeDisconnect) > DATEADD(MINUTE, -30, GETUTCDATE()))		
			) Region
	GROUP BY Region.RegionID,Region.CcmID,Region.RegionName
```
