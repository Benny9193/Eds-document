# View: `dbo.VoipCallDetails`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `CallManagerSysName` | nvarchar(255) | YES |  |  |
| 3 | `CallManagerName` | nvarchar(255) | YES |  |  |
| 4 | `ID` | int | NO |  |  |
| 5 | `CcmID` | int | NO |  |  |
| 6 | `CallID` | int | NO |  |  |
| 7 | `DisplayName` | nvarchar(250) | YES |  |  |
| 8 | `DateTime` | datetime | YES |  |  |
| 9 | `DateTimeOrigination` | datetime | YES |  |  |
| 10 | `DateTimeDisconnect` | datetime | YES |  |  |
| 11 | `CallingPartyNumber` | nvarchar(50) | NO |  |  |
| 12 | `OriginalCalledPartyNumber` | nvarchar(50) | NO |  |  |
| 13 | `FinalCalledPartyNumber` | nvarchar(50) | NO |  |  |
| 14 | `Duration` | int | NO |  |  |
| 15 | `OrigDeviceName` | nvarchar(129) | YES |  |  |
| 16 | `OrigCCMPhoneMacAddress` | varchar(50) | YES |  |  |
| 17 | `OrigCCMPhoneStatusDescription` | nvarchar(255) | YES |  |  |
| 18 | `OrigCCMPhoneIPAddress` | varchar(50) | YES |  |  |
| 19 | `OrigCCMPhoneExtension` | nvarchar(50) | YES |  |  |
| 20 | `OrigCCMRegionName` | nvarchar(50) | YES |  |  |
| 21 | `DestDeviceName` | nvarchar(129) | YES |  |  |
| 22 | `DestCCMPhoneMacAddress` | varchar(50) | YES |  |  |
| 23 | `DestCCMPhoneStatusDescription` | nvarchar(255) | YES |  |  |
| 24 | `DestCCMPhoneIPAddress` | varchar(50) | YES |  |  |
| 25 | `DestCCMPhoneExtension` | nvarchar(50) | YES |  |  |
| 26 | `DestCCMRegionName` | nvarchar(50) | YES |  |  |
| 27 | `OrigCause_value` | int | NO |  |  |
| 28 | `DestCause_value` | int | NO |  |  |
| 29 | `OrigJitter` | int | YES |  |  |
| 30 | `OrigLatency` | int | YES |  |  |
| 31 | `OrigMOS` | float | YES |  |  |
| 32 | `OrigPacketLoss` | int | YES |  |  |
| 33 | `OrigNumberPacketsSent` | int | YES |  |  |
| 34 | `DestJitter` | int | YES |  |  |
| 35 | `DestLatency` | int | YES |  |  |
| 36 | `DestMOS` | float | YES |  |  |
| 37 | `DestPacketLoss` | int | YES |  |  |
| 38 | `DestNumberPacketsSent` | int | YES |  |  |
| 39 | `OriginGatewayDeviceName` | nvarchar(50) | YES |  |  |
| 40 | `OriginGatewayIPAddress` | nvarchar(50) | YES |  |  |
| 41 | `OriginGatewayStatus` | int | YES |  |  |
| 42 | `DestGatewayDeviceName` | nvarchar(50) | YES |  |  |
| 43 | `DestGatewayIPAddress` | nvarchar(50) | YES |  |  |
| 44 | `DestGatewayStatus` | int | YES |  |  |
| 45 | `OrigIPAddressFromCDR` | nvarchar(50) | YES |  |  |
| 46 | `DestIPAddressFromCDR` | nvarchar(50) | YES |  |  |
| 47 | `OrigRegionID` | int | YES |  |  |
| 48 | `DestRegionID` | int | YES |  |  |
| 49 | `OrigLegCallIdentifier` | int | NO |  |  |
| 50 | `DestLegIdentifier` | int | NO |  |  |
| 51 | `OrigIpAddr` | int | YES |  |  |
| 52 | `DestIpAddr` | int | YES |  |  |
| 53 | `LastRedirectDn` | nvarchar(50) | NO |  |  |
| 54 | `LastRedirectRedirectReason` | int | NO |  |  |
| 55 | `OrigConversationId` | int | NO |  |  |
| 56 | `DestConversationId` | int | NO |  |  |
| 57 | `OrigDateTimeStamp` | datetime | YES |  |  |
| 58 | `DestDateTimeStamp` | datetime | YES |  |  |
| 59 | `OrigCalledPartyRedirectReason` | int | NO |  |  |
| 60 | `DestGatewayID` | int | YES |  |  |
| 61 | `DestPhoneID` | int | YES |  |  |
| 62 | `OrigPhoneID` | int | YES |  |  |
| 63 | `OrigGatewayID` | int | YES |  |  |
| 64 | `CallSuccess` | bit | NO |  |  |
| 65 | `ZeroDurationCall` | bit | NO |  |  |
| 66 | `ConferenceCall` | bit | NO |  |  |
| 67 | `AvayaConditionCode` | char(1) | YES |  |  |
| 68 | `CallWithIssue` | bit | NO |  |  |
| 69 | `OrigFailedCall` | int | NO |  |  |
| 70 | `DestFailedCall` | int | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `dbo.IsDroppedcall` | SQL_SCALAR_FUNCTION |
| [`dbo.Nodes`](dbo.Nodes.md) | VIEW |
| [`dbo.VoipCCMGatewayDetails`](dbo.VoipCCMGatewayDetails.md) | VIEW |
| [`dbo.VoipCCMMonitoring`](dbo.VoipCCMMonitoring.md) | USER_TABLE |
| [`dbo.VoipCCMPhoneDetails`](dbo.VoipCCMPhoneDetails.md) | VIEW |
| [`dbo.VoipCCMRegions`](dbo.VoipCCMRegions.md) | USER_TABLE |
| [`dbo.VoipCDRs`](dbo.VoipCDRs.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[VoipCallDetails]
AS
SELECT        Nodes.NodeID, Nodes.SysName AS CallManagerSysName, Nodes.Caption AS CallManagerName, CDRs.ID, CDRs.VoipCCMMonitoringID AS CcmID, 
                         CDRs.GlobalCallID_callId AS CallID, CDRs.DisplayName, CDRs.DateTime, CDRs.DateTimeOrigination, CDRs.DateTimeDisconnect, CDRs.CallingPartyNumber, 
                         CDRs.OriginalCalledPartyNumber, CDRs.FinalCalledPartyNumber, CDRs.Duration, CDRs.OrigDeviceName, 
                         OrigCCMPhones.PhoneMacAddress AS OrigCCMPhoneMacAddress, OrigCCMPhones.StatusDescription AS OrigCCMPhoneStatusDescription, 
                         OrigCCMPhones.IPAddress AS OrigCCMPhoneIPAddress, OrigCCMPhones.Extension AS OrigCCMPhoneExtension, 
                         OrigCCMRegions.RegionName AS OrigCCMRegionName, CDRs.DestDeviceName, DestCCMPhones.PhoneMacAddress AS DestCCMPhoneMacAddress, 
                         DestCCMPhones.StatusDescription AS DestCCMPhoneStatusDescription, DestCCMPhones.IPAddress AS DestCCMPhoneIPAddress, 
                         DestCCMPhones.Extension AS DestCCMPhoneExtension, DestCCMRegions.RegionName AS DestCCMRegionName, CDRs.OrigCause_value, 
                         CDRs.DestCause_value, CDRs.OrigJitter, CDRs.OrigLatency, CDRs.OrigMOS, CDRs.OrigPacketLoss, CDRs.OrigNumberPacketsSent, CDRs.DestJitter, 
                         CDRs.DestLatency, CDRs.DestMOS, CDRs.DestPacketLoss, CDRs.DestNumberPacketsSent, 
                         OriginCCMGateway.GatewayDeviceName AS OriginGatewayDeviceName, OriginCCMGateway.IPAddress AS OriginGatewayIPAddress, 
                         OriginCCMGateway.Status AS OriginGatewayStatus, DestCCMGateway.GatewayDeviceName AS DestGatewayDeviceName, 
                         DestCCMGateway.IPAddress AS DestGatewayIPAddress, DestCCMGateway.Status AS DestGatewayStatus, CDRs.OrigIPAddressFromCDR, 
                         CDRs.DestIPAddressFromCDR, CDRs.OrigRegionID, CDRs.DestRegionID, CDRs.OrigLegCallIdentifier, CDRs.DestLegIdentifier, CDRs.OrigIpAddr, CDRs.DestIpAddr, 
                         CDRs.LastRedirectDn, CDRs.LastRedirectRedirectReason, CDRs.OrigConversationId, CDRs.DestConversationId, 
                         CDRs.OrigDateTimeStampUTC AS OrigDateTimeStamp, CDRs.DestDateTimeStampUTC AS DestDateTimeStamp, CDRs.OrigCalledPartyRedirectReason, 
                         CDRs.DestGatewayID, CDRs.DestPhoneID, CDRs.OrigPhoneID, CDRs.OrigGatewayID, CDRs.CallSuccess, CDRs.ZeroDurationCall, CDRs.ConferenceCall, 
                         CDRs.AvayaConditionCode, CDRs.CallWithIssue, CASE WHEN dbo.IsDroppedcall(CDRs.OrigCause_value) = 1 THEN 1 ELSE 0 END AS OrigFailedCall, 
                         CASE WHEN dbo.IsDroppedcall(CDRs.DestCause_value) = 1 THEN 1 ELSE 0 END AS DestFailedCall
FROM            dbo.VoipCDRs AS CDRs LEFT OUTER JOIN
                         dbo.VoipCCMRegions AS OrigCCMRegions ON OrigCCMRegions.RegionID = CDRs.OrigRegionID LEFT OUTER JOIN
                         dbo.VoipCCMRegions AS DestCCMRegions ON DestCCMRegions.RegionID = CDRs.DestRegionID INNER JOIN
                         dbo.VoipCCMMonitoring AS CCMMonitoring ON CCMMonitoring.ID = CDRs.VoipCCMMonitoringID INNER JOIN
                         dbo.Nodes AS Nodes ON Nodes.NodeID = CCMMonitoring.NodeID LEFT OUTER JOIN
                         dbo.VoipCCMPhoneDetails AS OrigCCMPhones ON OrigCCMPhones.PhoneID = CDRs.OrigPhoneID LEFT OUTER JOIN
                         dbo.VoipCCMPhoneDetails AS DestCCMPhones ON DestCCMPhones.PhoneID = CDRs.DestPhoneID LEFT OUTER JOIN
                         dbo.VoipCCMGatewayDetails AS OriginCCMGateway ON OriginCCMGateway.GatewayID = CDRs.OrigGatewayID LEFT OUTER JOIN
                         dbo.VoipCCMGatewayDetails AS DestCCMGateway ON DestCCMGateway.GatewayID = CDRs.DestGatewayID
WHERE        (CCMMonitoring.Deleted = 0)
```
