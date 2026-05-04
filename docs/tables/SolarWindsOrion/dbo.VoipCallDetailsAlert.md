# View: `dbo.VoipCallDetailsAlert`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `ID` | int | NO |  |  |
| 3 | `CcmID` | int | NO |  |  |
| 4 | `CallID` | int | NO |  |  |
| 5 | `Pkid` | uniqueidentifier | NO |  |  |
| 6 | `DateTimeOrigination` | varchar(23) | YES |  |  |
| 7 | `DateTimeDisconnect` | varchar(23) | YES |  |  |
| 8 | `CallingPartyNumber` | nvarchar(50) | NO |  |  |
| 9 | `OriginalCalledPartyNumber` | nvarchar(50) | NO |  |  |
| 10 | `FinalCalledPartyNumber` | nvarchar(50) | NO |  |  |
| 11 | `Name` | nvarchar(104) | NO |  |  |
| 12 | `OrigIpAddr` | int | YES |  |  |
| 13 | `DestIpAddr` | int | YES |  |  |
| 14 | `OrigDeviceName` | nvarchar(129) | YES |  |  |
| 15 | `OrigPhoneName` | varchar(255) | YES |  |  |
| 16 | `OrigCCMPhoneMacAddress` | varchar(50) | YES |  |  |
| 17 | `OrigCCMPhoneStatusDescription` | nvarchar(255) | YES |  |  |
| 18 | `OrigCCMPhoneIPAddress` | varchar(50) | YES |  |  |
| 19 | `OrigCCMPhoneExtension` | nvarchar(50) | YES |  |  |
| 20 | `OrigCCMRegionName` | nvarchar(50) | YES |  |  |
| 21 | `DestDeviceName` | nvarchar(129) | YES |  |  |
| 22 | `DestPhoneName` | varchar(255) | YES |  |  |
| 23 | `DestCCMPhoneMacAddress` | varchar(50) | YES |  |  |
| 24 | `DestCCMPhoneStatusDescription` | nvarchar(255) | YES |  |  |
| 25 | `DestCCMPhoneIPAddress` | varchar(50) | YES |  |  |
| 26 | `DestCCMPhoneExtension` | nvarchar(50) | YES |  |  |
| 27 | `DestCCMRegionName` | nvarchar(50) | YES |  |  |
| 28 | `OrigCause_value` | int | NO |  |  |
| 29 | `DestCause_value` | int | NO |  |  |
| 30 | `OrigJitter` | int | YES |  |  |
| 31 | `OrigLatency` | int | YES |  |  |
| 32 | `OrigMOS` | float | YES |  |  |
| 33 | `OrigPacketLoss` | int | YES |  |  |
| 34 | `DestJitter` | int | YES |  |  |
| 35 | `DestLatency` | int | YES |  |  |
| 36 | `DestMOS` | float | YES |  |  |
| 37 | `DestPacketLoss` | int | YES |  |  |
| 38 | `AvayaConditionCode` | char(1) | YES |  |  |
| 39 | `OriginGatewayDeviceName` | nvarchar(50) | YES |  |  |
| 40 | `OriginGatewayRegion` | nvarchar(50) | YES |  |  |
| 41 | `OriginGatewayIPAddress` | nvarchar(50) | YES |  |  |
| 42 | `OriginGatewayStatus` | int | YES |  |  |
| 43 | `DestGatewayDeviceName` | nvarchar(50) | YES |  |  |
| 44 | `DestGatewayRegion` | nvarchar(50) | YES |  |  |
| 45 | `DestGatewayIPAddress` | nvarchar(50) | YES |  |  |
| 46 | `DestGatewayStatus` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Nodes`](dbo.Nodes.md) | VIEW |
| [`dbo.VoipCCMGatewayDetails`](dbo.VoipCCMGatewayDetails.md) | VIEW |
| [`dbo.VoipCCMMonitoring`](dbo.VoipCCMMonitoring.md) | USER_TABLE |
| [`dbo.VoipCCMPhoneDetails`](dbo.VoipCCMPhoneDetails.md) | VIEW |
| [`dbo.VoipCCMRegions`](dbo.VoipCCMRegions.md) | USER_TABLE |
| [`dbo.VoipCDRs`](dbo.VoipCDRs.md) | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.VoipCallManagerQualityAggregate1Hour`](dbo.VoipCallManagerQualityAggregate1Hour.md) | VIEW |
| [`dbo.VoipCallManagerQualityAggregate30Mins`](dbo.VoipCallManagerQualityAggregate30Mins.md) | VIEW |
| [`dbo.VoipGatewayQualityAggregate1Hour`](dbo.VoipGatewayQualityAggregate1Hour.md) | VIEW |
| [`dbo.VoipGatewayQualityAggregate30Mins`](dbo.VoipGatewayQualityAggregate30Mins.md) | VIEW |
| [`dbo.VoipPhoneQualityAggregate1Hour`](dbo.VoipPhoneQualityAggregate1Hour.md) | VIEW |
| [`dbo.VoipPhoneQualityAggregate30Mins`](dbo.VoipPhoneQualityAggregate30Mins.md) | VIEW |
| [`dbo.VoipRegionQualityAggregate1Hour`](dbo.VoipRegionQualityAggregate1Hour.md) | VIEW |
| [`dbo.VoipRegionQualityAggregate30Mins`](dbo.VoipRegionQualityAggregate30Mins.md) | VIEW |

## Definition

```sql
CREATE VIEW dbo.VoipCallDetailsAlert
AS 
SELECT DISTINCT
	Nodes.NodeID,
	CDRs.ID,
	CDRs.VoipCCMMonitoringID AS CcmID,
	CDRs.GlobalCallID_callId AS CallID,
	CDRs.Pkid,
	CONVERT(varchar(23), CDRs.DateTimeOrigination, 121) AS DateTimeOrigination,
	CONVERT(varchar(23), CDRs.DateTimeDisconnect, 121) AS DateTimeDisconnect,
	CDRs.CallingPartyNumber,
	CDRs.OriginalCalledPartyNumber,
	CDRs.FinalCalledPartyNumber,
	CDRs.CallingPartyNumber + ' -> ' + CDRs.FinalCalledPartyNumber AS Name,
	CDRs.OrigIpAddr,
	CDRs.DestIpAddr,
	CDRs.OrigDeviceName,
	OrigCCMPhones.PhoneDeviceName AS OrigPhoneName,
	OrigCCMPhones.PhoneMacAddress AS OrigCCMPhoneMacAddress,
	OrigCCMPhones.StatusDescription AS OrigCCMPhoneStatusDescription,
	OrigCCMPhones.IPAddress AS OrigCCMPhoneIPAddress,
	OrigCCMPhones.Extension AS OrigCCMPhoneExtension,
	OrigCCMRegions.RegionName AS OrigCCMRegionName,
	CDRs.DestDeviceName,
	DestCCMPhones.PhoneDeviceName AS DestPhoneName,
	DestCCMPhones.PhoneMacAddress AS DestCCMPhoneMacAddress,
	DestCCMPhones.StatusDescription AS DestCCMPhoneStatusDescription,
	DestCCMPhones.IPAddress AS DestCCMPhoneIPAddress,
	DestCCMPhones.Extension AS DestCCMPhoneExtension,
	DestCCMRegions.RegionName AS DestCCMRegionName,
	CDRs.OrigCause_value,
	CDRs.DestCause_value,
	CDRs.OrigJitter,
	CDRs.OrigLatency,
	CDRs.OrigMOS,
	CDRs.OrigPacketLoss,
	CDRs.DestJitter,
	CDRs.DestLatency,
	CDRs.DestMOS,
	CDRs.DestPacketLoss,
	CDRs.AvayaConditionCode,
	CASE
		WHEN OriginGateway.GatewayDeviceName IS NULL THEN OriginGateway.GatewayDeviceName
		ELSE OriginGateway.GatewayDeviceName
	END
	AS OriginGatewayDeviceName,

	CASE
		WHEN OriginGateway.GatewayRegion IS NULL THEN OriginGateway.GatewayRegion
		ELSE OriginGateway.GatewayRegion
	END 
	AS OriginGatewayRegion,

	CASE
		WHEN OriginGateway.IPAddress IS NULL THEN OriginGateway.IPAddress
		ELSE OriginGateway.IPAddress
	END 
	AS OriginGatewayIPAddress,

	CASE
		WHEN OriginGateway.Status IS NULL THEN OriginGateway.Status
		ELSE OriginGateway.Status
	END 
	AS OriginGatewayStatus,

	CASE
		WHEN OriginGateway.GatewayDeviceName IS NULL THEN DestGateway.GatewayDeviceName
		ELSE DestGateway.GatewayDeviceName
	END
	AS DestGatewayDeviceName,

	CASE
		WHEN DestGateway.GatewayRegion IS NULL THEN DestGateway.GatewayRegion
		ELSE DestGateway.GatewayRegion
	END 
	AS DestGatewayRegion,

	CASE
		WHEN DestGateway.IPAddress IS NULL THEN DestGateway.IPAddress
		ELSE DestGateway.IPAddress
	END 
	AS DestGatewayIPAddress,

	CASE
		WHEN DestGateway.Status IS NULL THEN DestGateway.Status
		ELSE DestGateway.Status
	END 
	AS DestGatewayStatus

FROM dbo.VoipCDRs AS CDRs
	LEFT OUTER JOIN dbo.VoipCCMRegions AS OrigCCMRegions 
		ON OrigCCMRegions.RegionID = CDRs.OrigRegionID
	LEFT OUTER JOIN dbo.VoipCCMRegions AS DestCCMRegions
		ON DestCCMRegions.RegionID = CDRs.DestRegionID
	INNER JOIN dbo.VoipCCMMonitoring AS CCMMonitoring
		ON CCMMonitoring.ID = CDRs.VoipCCMMonitoringID
	INNER JOIN dbo.Nodes AS Nodes
		ON Nodes.NodeID = CCMMonitoring.NodeID
	LEFT OUTER JOIN dbo.VoipCCMPhoneDetails AS OrigCCMPhones
		ON OrigCCMPhones.PhoneID = CDRs.OrigPhoneID
	LEFT OUTER JOIN dbo.VoipCCMPhoneDetails AS DestCCMPhones
		ON DestCCMPhones.PhoneID = CDRs.DestPhoneID
	LEFT OUTER JOIN dbo.VoipCCMGatewayDetails AS OriginGateway
		ON OriginGateway.GatewayID = CDRs.OrigGatewayID
	LEFT OUTER JOIN dbo.VoipCCMGatewayDetails AS DestGateway
		ON DestGateway.GatewayID = CDRs.DestGatewayID
	
WHERE CCMMonitoring.Deleted = 0 AND CDRs.DateTimeDisconnectUTC > DATEADD(hh, -24, GETUTCDATE())
```
