# Table: `dbo.VoipCDRs`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `ID` | int | NO |  |  |
| 2 | `Pkid` | uniqueidentifier | NO |  | YES |
| 3 | `VoipCCMMonitoringID` | int | NO |  | YES |
| 4 | `DateTimeDisconnectUTC` | datetime | NO |  | YES |
| 5 | `DateTimeOriginationUTC` | datetime | NO |  |  |
| 6 | `Duration` | int | NO |  |  |
| 7 | `GlobalCallID_callId` | int | NO |  | YES |
| 8 | `GlobalCallID_callManagerId` | int | NO |  |  |
| 9 | `CallingPartyNumber` | nvarchar(50) | NO |  |  |
| 10 | `OriginalCalledPartyNumber` | nvarchar(50) | NO |  |  |
| 11 | `FinalCalledPartyNumber` | nvarchar(50) | NO |  |  |
| 12 | `LastRedirectDn` | nvarchar(50) | NO |  |  |
| 13 | `OrigCalledPartyRedirectReason` | int | NO |  |  |
| 14 | `LastRedirectRedirectReason` | int | NO |  |  |
| 15 | `OrigDateTimeStampUTC` | datetime | YES |  |  |
| 16 | `OrigLegCallIdentifier` | int | NO |  |  |
| 17 | `OrigIpAddr` | int | YES |  |  |
| 18 | `OrigDeviceName` | nvarchar(129) | YES |  |  |
| 19 | `OrigCause_value` | int | NO |  |  |
| 20 | `OrigConversationId` | int | NO |  |  |
| 21 | `OrigRegionID` | int | YES |  |  |
| 22 | `OrigPhoneID` | int | YES |  |  |
| 23 | `OrigGatewayID` | int | YES |  |  |
| 24 | `OrigNumberPacketsSent` | int | YES |  |  |
| 25 | `OrigNumberOctetsSent` | int | YES |  |  |
| 26 | `OrigNumberPacketsReceived` | int | YES |  |  |
| 27 | `OrigNumberOctetsReceived` | int | YES |  |  |
| 28 | `OrigNumberPacketsLost` | int | YES |  |  |
| 29 | `OrigJitter` | int | YES |  |  |
| 30 | `OrigLatency` | int | YES |  |  |
| 31 | `OrigMOS` | float | YES |  |  |
| 32 | `OrigPacketLoss` | int | YES |  |  |
| 33 | `DestDateTimeStampUTC` | datetime | YES |  |  |
| 34 | `DestLegIdentifier` | int | NO |  |  |
| 35 | `DestIpAddr` | int | YES |  |  |
| 36 | `DestDeviceName` | nvarchar(129) | YES |  |  |
| 37 | `DestCause_value` | int | NO |  |  |
| 38 | `DestConversationId` | int | NO |  |  |
| 39 | `DestRegionID` | int | YES |  |  |
| 40 | `DestPhoneID` | int | YES |  |  |
| 41 | `DestGatewayID` | int | YES |  |  |
| 42 | `DestNumberPacketsSent` | int | YES |  |  |
| 43 | `DestNumberOctetsSent` | int | YES |  |  |
| 44 | `DestNumberPacketsReceived` | int | YES |  |  |
| 45 | `DestNumberOctetsReceived` | int | YES |  |  |
| 46 | `DestNumberPacketsLost` | int | YES |  |  |
| 47 | `DestJitter` | int | YES |  |  |
| 48 | `DestLatency` | int | YES |  |  |
| 49 | `DestMOS` | float | YES |  |  |
| 50 | `DestPacketLoss` | int | YES |  |  |
| 51 | `DisplayName` | nvarchar(250) | YES |  |  |
| 52 | `DateTime` | datetime | YES |  |  |
| 53 | `DateTimeOrigination` | datetime | YES |  |  |
| 54 | `DateTimeDisconnect` | datetime | YES |  |  |
| 55 | `OrigIPAddressFromCDR` | nvarchar(50) | YES |  |  |
| 56 | `DestIPAddressFromCDR` | nvarchar(50) | YES |  |  |
| 57 | `AvayaConditionCode` | char(1) | YES |  |  |
| 58 | `CallSuccess` | bit | NO | `((0))` |  |
| 59 | `ZeroDurationCall` | bit | NO | `((0))` |  |
| 60 | `ConferenceCall` | bit | NO | `((0))` |  |
| 61 | `CallWithIssue` | bit | NO | `((0))` |  |
| 62 | `SipTrunkId` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

| Name | Unique | Type | Columns | Included |
|------|--------|------|---------|----------|
| `NI_VoipCDRs_CCMID_DestPhoneID_OrigPhoneID` | no | NONCLUSTERED | `VoipCCMMonitoringID`, `DestPhoneID`, `OrigPhoneID` | `DateTimeDisconnect` |
| `NI_VoipCDRs_ID` | YES | NONCLUSTERED | `ID` |  |
| `NI_VoipCDRs_SipTrunkId` | no | NONCLUSTERED | `SipTrunkId` |  |
