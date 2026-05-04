# View: `dbo.VoipGatewayQualityAggregate30Mins`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `GatewayID` | int | NO |  |  |
| 3 | `GatewayName` | nvarchar(50) | YES |  |  |
| 4 | `MinJitter` | int | YES |  |  |
| 5 | `MinLatency` | int | YES |  |  |
| 6 | `MinMOS` | float | YES |  |  |
| 7 | `MinPacketLoss` | int | YES |  |  |
| 8 | `MaxJitter` | int | YES |  |  |
| 9 | `MaxLatency` | int | YES |  |  |
| 10 | `MaxMOS` | float | YES |  |  |
| 11 | `MaxPacketLoss` | int | YES |  |  |
| 12 | `AvgJitter` | float | YES |  |  |
| 13 | `AvgLatency` | float | YES |  |  |
| 14 | `AvgMOS` | float | YES |  |  |
| 15 | `AvgPacketLoss` | float | YES |  |  |
| 16 | `FailedCallPercentage` | float | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `dbo.IsDroppedcall` | SQL_SCALAR_FUNCTION |
| [`dbo.VoipCallDetailsAlert`](dbo.VoipCallDetailsAlert.md) | VIEW |
| [`dbo.VoipCCMGateways`](dbo.VoipCCMGateways.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW dbo.VoipGatewayQualityAggregate30Mins
AS
	SELECT 
		0 as NodeID,
		Gateway.GatewayID AS GatewayID,
		Gateway.GatewayName as GatewayName,
		MIN(Gateway.Jitter) MinJitter,
		MIN(Gateway.Latency) AS MinLatency,
		MIN(Gateway.MOS) AS MinMOS,
		MIN(Gateway.PacketLoss) AS MinPacketLoss,
		MAX(Gateway.Jitter) MaxJitter,
		MAX(Gateway.Latency) AS MaxLatency,
		MAX(Gateway.MOS) AS MaxMOS,
		MAX(Gateway.PacketLoss) AS MaxPacketLoss,
		AVG(CAST(Gateway.Jitter AS float)) AS AvgJitter,
		AVG(CAST(Gateway.Latency AS float)) AS AvgLatency,
		AVG(CAST(Gateway.MOS AS float)) AS AvgMOS,
		AVG(CAST(Gateway.PacketLoss AS float)) AS AvgPacketLoss,
		(AVG(CAST(Gateway.FailedCall AS float))* 100) AS FailedCallPercentage
	FROM (	SELECT 
						 Gateway.GatewayID AS GatewayID
						,CallDet.CcmID as CcmID
						,CallDet.CallID as CallID
						,CallDet.Pkid as Pkid
						,CallDet.DateTimeOrigination as DateTimeOrigination
						,CallDet.DateTimeDisconnect as DateTimeDisconnect
						,CallDet.CallingPartyNumber as CallingPartyNumber
						,CallDet.OriginalCalledPartyNumber as OriginalCalledPartyNumber
						,CallDet.FinalCalledPartyNumber as FinalCalledPartyNumber
						,CallDet.OrigDeviceName as DeviceName
						,CallDet.OriginGatewayDeviceName as GatewayName
						,CallDet.OrigIpAddr as IpAddress
						,CallDet.OrigCCMPhoneExtension as PhoneExtension
						,CallDet.OrigCCMRegionName as RegionName
						,CallDet.OrigJitter as Jitter
						,CallDet.OrigLatency as Latency
						,CASE WHEN (CallDet.OrigMOS < 1 OR CallDet.OrigMOS >5 ) THEN NULL ELSE CallDet.OrigMOS  END as MOS
						,CallDet.OrigPacketLoss as PacketLoss
						,CASE WHEN dbo.IsDroppedcall(CallDet.OrigCause_value) = 1 THEN 1 ELSE 0 END as FailedCall
					FROM dbo.VoipCallDetailsAlert CallDet
					JOIN dbo.VoipCCMGateways Gateway ON
						CallDet.OriginGatewayDeviceName = Gateway.Name 
						AND CallDet.CcmID =Gateway.VoipCCMMonitoringID
					WHERE (DATEADD(MINUTE, DATEDIFF(MINUTE, GETDATE(), GETUTCDATE()),CallDet.DateTimeDisconnect) > DATEADD(MINUTE, -30, GETUTCDATE()))		

				UNION ALL
					
						SELECT 
						Gateway.GatewayID AS GatewayID
						,CallDet.CcmID as CcmID
						,CallDet.CallID as CallID
						,CallDet.Pkid as Pkid
						,CallDet.DateTimeOrigination as DateTimeOrigination
						,CallDet.DateTimeDisconnect as DateTimeDisconnect
						,CallDet.CallingPartyNumber as CallingPartyNumber
						,CallDet.OriginalCalledPartyNumber as OriginalCalledPartyNumber
						,CallDet.FinalCalledPartyNumber as FinalCalledPartyNumber
						,CallDet.DestDeviceName as DeviceName
						,CallDet.DestGatewayDeviceName as GatewayName
						,CallDet.DestIpAddr as IpAddress
						,CallDet.DestCCMPhoneExtension as PhoneExtension
						,CallDet.DestCCMRegionName as RegionName
						,CallDet.DestJitter as Jitter
						,CallDet.DestLatency as Latency
						,CASE WHEN (CallDet.DestMOS < 1 OR CallDet.DestMOS > 5) THEN NULL ELSE CallDet.DestMOS END  as MOS
						,CallDet.DestPacketLoss as PacketLoss
						,CASE WHEN dbo.IsDroppedcall(CallDet.DestCause_value) = 1 THEN 1 ELSE 0 END as FailedCall
					FROM dbo.VoipCallDetailsAlert CallDet
					JOIN dbo.VoipCCMGateways Gateway ON
						CallDet.DestGatewayDeviceName = Gateway.Name 
						AND CallDet.CcmID =Gateway.VoipCCMMonitoringID
					WHERE (DATEADD(MINUTE, DATEDIFF(MINUTE, GETDATE(), GETUTCDATE()),CallDet.DateTimeDisconnect) > DATEADD(MINUTE, -30, GETUTCDATE()))		
			) Gateway
	GROUP BY Gateway.GatewayID,Gateway.GatewayName
```
