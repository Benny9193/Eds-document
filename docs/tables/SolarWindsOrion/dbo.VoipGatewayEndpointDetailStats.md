# View: `dbo.VoipGatewayEndpointDetailStats`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `IfIndex` | int | NO |  |  |
| 2 | `IfName` | nvarchar(100) | NO |  |  |
| 3 | `EndPointType` | int | NO |  |  |
| 4 | `VoipGatewayEndpointID` | int | NO |  |  |
| 5 | `VoipGatewayID` | int | NO |  |  |
| 6 | `RecordTimeUtc` | datetime | NO |  |  |
| 7 | `DateTime` | datetime | YES |  |  |
| 8 | `RecordTime` | datetime | YES |  |  |
| 9 | `MinUtilization` | float | NO |  |  |
| 10 | `MaxUtilization` | float | NO |  |  |
| 11 | `AvgUtilization` | float | NO |  |  |
| 12 | `MinVoiceIncomingUtilization` | float | NO |  |  |
| 13 | `MaxVoiceIncomingUtilization` | float | NO |  |  |
| 14 | `AvgVoiceIncomingUtilization` | float | NO |  |  |
| 15 | `MinVoiceOutgoingUtilization` | float | NO |  |  |
| 16 | `MaxVoiceOutgoingUtilization` | float | NO |  |  |
| 17 | `AvgVoiceOutgoingUtilization` | float | NO |  |  |
| 18 | `MinDataIncomingUtilization` | float | NO |  |  |
| 19 | `MaxDataIncomingUtilization` | float | NO |  |  |
| 20 | `AvgDataIncomingUtilization` | float | NO |  |  |
| 21 | `MinDataOutgoingUtilization` | float | NO |  |  |
| 22 | `MaxDataOutgoingUtilization` | float | NO |  |  |
| 23 | `AvgDataOutgoingUtilization` | float | NO |  |  |
| 24 | `MinChannelCount` | float | NO |  |  |
| 25 | `MaxChannelCount` | float | NO |  |  |
| 26 | `AvgChannelCount` | float | NO |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VoipGatewayEndpoints` | USER_TABLE |
| `VoipGatewayEndpointStats` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[VoipGatewayEndpointDetailStats] AS
	
SELECT        VoipGatewayEndpoints.IfIndex, 
VoipGatewayEndpoints.IfName, 
VoipGatewayEndpoints.EndPointType, 
 VoipGatewayEndpoints.VoipGatewayEndpointID, 
 VoipGatewayEndpoints.VoipGatewayID, 
 VoipGatewayEndpointStats.RecordTimeUtc, 
 DATEADD(minute, DATEDIFF(minute, GETUTCDATE(), GETDATE()), VoipGatewayEndpointStats.RecordTimeUtc) AS [DateTime],
 DATEADD(minute, DATEDIFF(minute, GETUTCDATE(), GETDATE()), VoipGatewayEndpointStats.RecordTimeUtc) AS RecordTime,
 ISNULL(100* VoipGatewayEndpointStats.MinUtilization / NULLIF(VoipGatewayEndpointStats.MinChannelCount,0),0) AS MinUtilization, 
 ISNULL(100* VoipGatewayEndpointStats.MaxUtilization / NULLIF(VoipGatewayEndpointStats.MaxChannelCount,0),0) AS MaxUtilization, 
 ISNULL(100* VoipGatewayEndpointStats.AvgUtilization / NULLIF(VoipGatewayEndpointStats.AvgChannelCount,0),0) AS AvgUtilization, 
 ISNULL(100* VoipGatewayEndpointStats.MinVoiceIncomingUtilization / NULLIF(VoipGatewayEndpointStats.MinChannelCount,0),0) AS MinVoiceIncomingUtilization, 
 ISNULL(100* VoipGatewayEndpointStats.MaxVoiceIncomingUtilization / NULLIF(VoipGatewayEndpointStats.MaxChannelCount,0),0) AS MaxVoiceIncomingUtilization, 
 ISNULL(100* VoipGatewayEndpointStats.AvgVoiceIncomingUtilization / NULLIF(VoipGatewayEndpointStats.AvgChannelCount,0),0) AS AvgVoiceIncomingUtilization, 
 ISNULL(100* VoipGatewayEndpointStats.MinVoiceOutgoingUtilization / NULLIF(VoipGatewayEndpointStats.MinChannelCount,0),0) AS MinVoiceOutgoingUtilization, 
 ISNULL(100* VoipGatewayEndpointStats.MaxVoiceOutgoingUtilization / NULLIF(VoipGatewayEndpointStats.MaxChannelCount,0),0) AS MaxVoiceOutgoingUtilization, 
 ISNULL(100* VoipGatewayEndpointStats.AvgVoiceOutgoingUtilization / NULLIF(VoipGatewayEndpointStats.AvgChannelCount,0),0) AS AvgVoiceOutgoingUtilization, 
 ISNULL(100* VoipGatewayEndpointStats.MinDataIncomingUtilization / NULLIF(VoipGatewayEndpointStats.MinChannelCount,0),0) AS MinDataIncomingUtilization, 
 ISNULL(100* VoipGatewayEndpointStats.MaxDataIncomingUtilization / NULLIF(VoipGatewayEndpointStats.MaxChannelCount,0),0) AS MaxDataIncomingUtilization, 
 ISNULL(100* VoipGatewayEndpointStats.AvgDataIncomingUtilization / NULLIF(VoipGatewayEndpointStats.AvgChannelCount,0),0) AS AvgDataIncomingUtilization, 
 ISNULL(100* VoipGatewayEndpointStats.MinDataOutgoingUtilization / NULLIF(VoipGatewayEndpointStats.MinChannelCount,0),0) AS MinDataOutgoingUtilization, 
 ISNULL(100* VoipGatewayEndpointStats.MaxDataOutgoingUtilization / NULLIF(VoipGatewayEndpointStats.MaxChannelCount,0),0) AS MaxDataOutgoingUtilization, 
 ISNULL(100* VoipGatewayEndpointStats.AvgDataOutgoingUtilization / NULLIF(VoipGatewayEndpointStats.AvgChannelCount,0),0) AS AvgDataOutgoingUtilization, 
 VoipGatewayEndpointStats.MinChannelCount, 
 VoipGatewayEndpointStats.MaxChannelCount, 
 VoipGatewayEndpointStats.AvgChannelCount
FROM            VoipGatewayEndpoints 
INNER JOIN      VoipGatewayEndpointStats ON VoipGatewayEndpoints.VoipGatewayEndpointID = VoipGatewayEndpointStats.VoipGatewayEndpointID
```
