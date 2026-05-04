# View: `dbo.VoipGatewayEndpointAlertsAggregateLast1Hour`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipGatewayEndpointID` | int | NO |  |  |
| 2 | `VoipGatewayID` | int | YES |  |  |
| 3 | `IfIndex` | int | YES |  |  |
| 4 | `IfName` | nvarchar(100) | YES |  |  |
| 5 | `NodeID` | int | YES |  |  |
| 6 | `Status` | int | YES |  |  |
| 7 | `StatusName` | nvarchar(50) | YES |  |  |
| 8 | `LastResultRecordTimeUtc` | datetime | YES |  |  |
| 9 | `DateTime` | datetime | YES |  |  |
| 10 | `LastResultRecordTime` | datetime | YES |  |  |
| 11 | `Caption` | nvarchar(255) | YES |  |  |
| 12 | `SysName` | nvarchar(255) | YES |  |  |
| 13 | `MinUtilization` | int | YES |  |  |
| 14 | `MaxUtilization` | int | YES |  |  |
| 15 | `AvgUtilization` | int | YES |  |  |
| 16 | `MinVoiceIncomingUtilization` | int | YES |  |  |
| 17 | `MaxVoiceIncomingUtilization` | int | YES |  |  |
| 18 | `AvgVoiceIncomingUtilization` | int | YES |  |  |
| 19 | `MinVoiceOutgoingUtilization` | int | YES |  |  |
| 20 | `MaxVoiceOutgoingUtilization` | int | YES |  |  |
| 21 | `AvgVoiceOutgoingUtilization` | int | YES |  |  |
| 22 | `MinDataIncomingUtilization` | int | YES |  |  |
| 23 | `MaxDataIncomingUtilization` | int | YES |  |  |
| 24 | `AvgDataIncomingUtilization` | int | YES |  |  |
| 25 | `MinDataOutgoingUtilization` | int | YES |  |  |
| 26 | `MaxDataOutgoingUtilization` | int | YES |  |  |
| 27 | `AvgDataOutgoingUtilization` | int | YES |  |  |
| 28 | `MinChannelCount` | int | YES |  |  |
| 29 | `MaxChannelCount` | int | YES |  |  |
| 30 | `AvgChannelCount` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VoipGatewayDetails` | VIEW |
| `VoipGatewayEndpoints` | USER_TABLE |
| `VoipGatewayEndpointStats` | VIEW |

## Used by

| Object | Type |
|--------|------|
| [`dbo.VoipGatewayAlertsAggregateLast1Hour`](dbo.VoipGatewayAlertsAggregateLast1Hour.md) | VIEW |

## Definition

```sql
CREATE VIEW [dbo].[VoipGatewayEndpointAlertsAggregateLast1Hour] AS
	
	SELECT 
		Trunks.VoipGatewayEndpointID as VoipGatewayEndpointID,
		MIN(Trunks.VoipGatewayID) as VoipGatewayID,
        MIN(Trunks.IfIndex) as  IfIndex,
        MIN(Trunks.IfName) as IfName,

       MIN(VoipGatewayDetails.NodeID) as NodeID,
       MIN(VoipGatewayDetails.[Status]) as [Status],
       MIN(VoipGatewayDetails.StatusName) as StatusName,
       MAX(VoipGatewayDetails.LastResultRecordTimeUtc) as LastResultRecordTimeUtc,
       MAX(VoipGatewayDetails.[DateTime]) as [DateTime],
       MAX(VoipGatewayDetails.LastResultRecordTime) as LastResultRecordTime,
       MIN(VoipGatewayDetails.Caption) as Caption,
       MIN(VoipGatewayDetails.[SysName]) as [SysName],
		
		
		CAST(MIN(Trunks.MinUtilization) as int) AS MinUtilization,
		CAST(MAX(Trunks.MaxUtilization) as int) AS MaxUtilization,
		CAST(AVG(Trunks.AvgUtilization) as int) AS AvgUtilization,
		
		CAST(MIN(Trunks.MinVoiceIncomingUtilization)as int) AS MinVoiceIncomingUtilization,
		CAST(MAX(Trunks.MaxVoiceIncomingUtilization) as int) AS MaxVoiceIncomingUtilization,
		CAST(AVG(Trunks.AvgVoiceIncomingUtilization) as int) AS AvgVoiceIncomingUtilization,
		
		CAST(MIN(Trunks.MinVoiceOutgoingUtilization) as int) AS MinVoiceOutgoingUtilization,
		CAST(MAX(Trunks.MaxVoiceOutgoingUtilization) as int) AS MaxVoiceOutgoingUtilization,
		CAST(AVG(Trunks.AvgVoiceOutgoingUtilization) as int) AS AvgVoiceOutgoingUtilization,
		
		CAST(MIN(Trunks.MinDataIncomingUtilization) as int) AS MinDataIncomingUtilization,
		CAST(MAX(Trunks.MaxDataIncomingUtilization) as int) AS MaxDataIncomingUtilization,
		CAST(AVG(Trunks.AvgDataIncomingUtilization) as int) AS AvgDataIncomingUtilization,
		
		CAST(MIN(Trunks.MinDataOutgoingUtilization) as int) AS MinDataOutgoingUtilization,
		CAST(MAX(Trunks.MaxDataOutgoingUtilization) as int) AS MaxDataOutgoingUtilization,
		CAST(AVG(Trunks.AvgDataOutgoingUtilization) as int) AS AvgDataOutgoingUtilization,

		CAST(MIN(Trunks.MinChannelCount) as int) AS MinChannelCount,
		CAST(MAX(Trunks.MaxChannelCount) as int) AS MaxChannelCount,
		CAST(AVG(Trunks.AvgChannelCount) as int) AS AvgChannelCount
	FROM 
	
(SELECT
 VoipGatewayEndpoints.IfIndex, 
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
WHERE (VoipGatewayEndpointStats.RecordTimeUtc > DATEADD(hh, -1, GETUTCDATE()))	

)Trunks 

	JOIN VoipGatewayDetails ON Trunks.VoipGatewayID = VoipGatewayDetails.VoipGatewayID

	GROUP BY Trunks.VoipGatewayEndpointID
```
