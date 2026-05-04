# View: `dbo.VoipPhoneQualityAggregate30Mins`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `ID` | int | NO |  |  |
| 3 | `PhoneName` | nvarchar(129) | YES |  |  |
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
| [`dbo.VoipCCMPhones`](dbo.VoipCCMPhones.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW dbo.VoipPhoneQualityAggregate30Mins
AS
	SELECT 
		0 as NodeID,
		Phones.ID AS ID,
		Phones.PhoneName as PhoneName,
		MIN(Phones.Jitter) MinJitter,
		MIN(Phones.Latency) AS MinLatency,
		MIN(Phones.MOS) AS MinMOS,
		MIN(Phones.PacketLoss) AS MinPacketLoss,
		MAX(Phones.Jitter) MaxJitter,
		MAX(Phones.Latency) AS MaxLatency,
		MAX(Phones.MOS) AS MaxMOS,
		MAX(Phones.PacketLoss) AS MaxPacketLoss,
		AVG(CAST(Phones.Jitter as float)) AS AvgJitter,
		AVG(CAST(Phones.Latency as float)) AS AvgLatency,
		AVG(CAST(Phones.MOS as float)) AS AvgMOS,
		AVG(CAST(Phones.PacketLoss as float)) AS AvgPacketLoss,
		AVG(CAST(Phones.FailedCall as float))*100 AS FailedCallPercentage
		FROM ( SELECT 
				 Phone.ID AS ID
				,CallDet.CcmID as CcmID
				,CallDet.CallID as CallID
				,CallDet.Pkid as Pkid
				,CallDet.DateTimeOrigination as DateTimeOrigination
				,CallDet.DateTimeDisconnect as DateTimeDisconnect
				,CallDet.CallingPartyNumber as CallingPartyNumber
				,CallDet.OriginalCalledPartyNumber as OriginalCalledPartyNumber
				,CallDet.FinalCalledPartyNumber as FinalCalledPartyNumber
				,CallDet.OrigDeviceName as PhoneName
				,CallDet.OrigCCMPhoneMacAddress as PhoneMacAddress
				,CallDet.OrigCCMPhoneStatusDescription as PhoneStatusDescription
				,CallDet.OrigIpAddr as IpAddress
				,CallDet.OrigCCMPhoneExtension as PhoneExtension
				,CallDet.OrigCCMRegionName as RegionName
				,CallDet.OrigJitter as Jitter
				,CallDet.OrigLatency as Latency
				,CASE WHEN (CallDet.OrigMOS < 1 OR CallDet.OrigMOS > 5 ) THEN NULL ELSE CallDet.OrigMOS  END as MOS
				,CallDet.OrigPacketLoss as PacketLoss
				,CASE WHEN dbo.IsDroppedcall(CallDet.OrigCause_value) = 1 THEN 1 ELSE 0 END as FailedCall
				FROM dbo.VoipCallDetailsAlert CallDet
				JOIN dbo.VoipCCMPhones Phone ON
					CallDet.OrigDeviceName = Phone.Name 
					AND CallDet.CcmID =Phone.VoipCCMMonitoringID
				WHERE (DATEADD(MINUTE, DATEDIFF(MINUTE, GETDATE(), GETUTCDATE()),CallDet.DateTimeDisconnect) > DATEADD(MINUTE, -30, GETUTCDATE()))	

				UNION ALL
				
				SELECT 
				 Phone.ID AS ID
				,CallDet.CcmID as CcmID
				,CallDet.CallID as CallID
				,CallDet.Pkid as Pkid
				,CallDet.DateTimeOrigination as DateTimeOrigination
				,CallDet.DateTimeDisconnect as DateTimeDisconnect
				,CallDet.CallingPartyNumber as CallingPartyNumber
				,CallDet.OriginalCalledPartyNumber as OriginalCalledPartyNumber
				,CallDet.FinalCalledPartyNumber as FinalCalledPartyNumber
				,CallDet.DestDeviceName as PhoneName
				,CallDet.DestCCMPhoneMacAddress as PhoneMacAddress
				,CallDet.DestCCMPhoneStatusDescription as PhoneStatusDescription
				,CallDet.DestIpAddr as IpAddress
				,CallDet.DestCCMPhoneExtension as PhoneExtension
				,CallDet.DestCCMRegionName as RegionName
				,CallDet.DestJitter as Jitter
				,CallDet.DestLatency as Latency
				,CASE WHEN (CallDet.DestMOS < 1 OR CallDet.DestMOS > 5) THEN NULL ELSE CallDet.DestMOS END  as MOS
				,CallDet.DestPacketLoss as PacketLoss
				,CASE WHEN dbo.IsDroppedcall(CallDet.DestCause_value) = 1 THEN 1 ELSE 0 END as FailedCall
				FROM dbo.VoipCallDetailsAlert CallDet
				JOIN dbo.VoipCCMPhones Phone ON
					CallDet.DestDeviceName = Phone.Name 
					AND CallDet.CcmID =Phone.VoipCCMMonitoringID	
				WHERE (DATEADD(MINUTE, DATEDIFF(MINUTE, GETDATE(), GETUTCDATE()),CallDet.DateTimeDisconnect) > DATEADD(MINUTE, -30, GETUTCDATE()))
	     ) Phones
	GROUP BY Phones.ID,Phones.PhoneName
```
