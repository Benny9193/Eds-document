# Table: `dbo.VoipCDRDetails`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`
**Approx rows:** 0

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `CdrID` | int | YES |  |  |
| 2 | `Pkid` | uniqueidentifier | NO |  | YES |
| 3 | `DateTimeDisconnectUTC` | datetime | NO |  | YES |
| 4 | `VoipCCMMonitoringID` | int | NO |  | YES |
| 5 | `GlobalCallID_callId` | int | NO |  | YES |
| 6 | `OrigSpan` | int | NO |  |  |
| 7 | `OrigMediaTransportAddress_IP` | int | NO |  |  |
| 8 | `OrigMediaTransportAddress_Port` | int | NO |  |  |
| 9 | `DestSpan` | int | NO |  |  |
| 10 | `DestMediaTransportAddress_IP` | int | NO |  |  |
| 11 | `DestMediaTransportAddress_Port` | int | NO |  |  |
| 12 | `DateTimeConnectUTC` | datetime | NO |  |  |
| 13 | `OriginalCalledPartyNumberPartition` | nvarchar(50) | NO |  |  |
| 14 | `CallingPartyNumberPartition` | nvarchar(50) | NO |  |  |
| 15 | `FinalCalledPartyNumberPartition` | nvarchar(50) | NO |  |  |
| 16 | `LastRedirectDnPartition` | nvarchar(50) | NO |  |  |
| 17 | `OrigCallTerminationOnBehalfOf` | int | NO |  |  |
| 18 | `DestCallTerminationOnBehalfOf` | int | NO |  |  |
| 19 | `OrigCalledPartyRedirectOnBehalfOf` | int | NO |  |  |
| 20 | `LastRedirectRedirectOnBehalfOf` | int | NO |  |  |
| 21 | `JoinOnBehalfOf` | int | NO |  |  |
| 22 | `OrigPrecedenceLevel` | int | NO |  |  |
| 23 | `DestPrecedenceLevel` | int | NO |  |  |
| 24 | `OrigMediaCapPayloadCapability` | int | NO |  |  |
| 25 | `OrigVideoCapCodec` | int | NO |  |  |
| 26 | `DestMediaCapPayloadCapability` | int | NO |  |  |
| 27 | `DestVideoCapCodec` | int | NO |  |  |
| 28 | `IncomingProtocolID` | int | YES |  |  |
| 29 | `OutgoingProtocolID` | int | YES |  |  |

## Foreign keys (outgoing)

_None._

## Referenced by (incoming foreign keys)

_None._

## Indexes

_No non-PK indexes._
