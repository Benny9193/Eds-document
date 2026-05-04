# View: `dbo.VoipGatewayDetailStats`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipGatewayID` | int | NO |  |  |
| 2 | `TrunkCount` | int | YES |  |  |
| 3 | `RecordTimeUtc` | datetime | NO |  |  |
| 4 | `MinUtilization` | float | NO |  |  |
| 5 | `MaxUtilization` | float | NO |  |  |
| 6 | `AvgUtilization` | float | NO |  |  |
| 7 | `MinVoiceIncomingUtilization` | float | NO |  |  |
| 8 | `MaxVoiceIncomingUtilization` | float | NO |  |  |
| 9 | `AvgVoiceIncomingUtilization` | float | NO |  |  |
| 10 | `MinVoiceOutgoingUtilization` | float | NO |  |  |
| 11 | `MaxVoiceOutgoingUtilization` | float | NO |  |  |
| 12 | `AvgVoiceOutgoingUtilization` | float | NO |  |  |
| 13 | `MinDataIncomingUtilization` | float | NO |  |  |
| 14 | `MaxDataIncomingUtilization` | float | NO |  |  |
| 15 | `AvgDataIncomingUtilization` | float | NO |  |  |
| 16 | `MinDataOutgoingUtilization` | float | NO |  |  |
| 17 | `MaxDataOutgoingUtilization` | float | NO |  |  |
| 18 | `AvgDataOutgoingUtilization` | float | NO |  |  |
| 19 | `MinChannelCount` | float | YES |  |  |
| 20 | `MaxChannelCount` | float | YES |  |  |
| 21 | `AvgChannelCount` | float | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VoipGatewayEndpoints` | USER_TABLE |
| `VoipGatewayEndpointStats` | VIEW |

## Used by

| Object | Type |
|--------|------|
| [`dbo.VoipGatewayDetailCurrentStats`](dbo.VoipGatewayDetailCurrentStats.md) | VIEW |

## Definition

```sql
CREATE VIEW [dbo].[VoipGatewayDetailStats] AS
	
SELECT        
VoipGatewayEndpoints.VoipGatewayID, 
COUNT(*) AS TrunkCount, 
VoipGatewayEndpointStats.RecordTimeUtc AS RecordTimeUtc,

ISNULL(100* (SUM(VoipGatewayEndpointStats.MinUtilization) / NULLIF(SUM(VoipGatewayEndpointStats.MinChannelCount),0) ),0) AS MinUtilization , 
ISNULL(100* (SUM(VoipGatewayEndpointStats.MaxUtilization) / NULLIF(SUM(VoipGatewayEndpointStats.MaxChannelCount),0) ),0) AS MaxUtilization , 
ISNULL(100* (SUM(VoipGatewayEndpointStats.AvgUtilization)  / NULLIF(SUM(VoipGatewayEndpointStats.AvgChannelCount),0) ),0) AS AvgUtilization , 

ISNULL(100* (SUM(VoipGatewayEndpointStats.MinVoiceIncomingUtilization)  / NULLIF(SUM(VoipGatewayEndpointStats.MinChannelCount),0) ),0) AS MinVoiceIncomingUtilization, 
ISNULL(100* (SUM(VoipGatewayEndpointStats.MaxVoiceIncomingUtilization)  / NULLIF(SUM(VoipGatewayEndpointStats.MaxChannelCount),0) ),0) AS MaxVoiceIncomingUtilization, 
ISNULL(100* (SUM(VoipGatewayEndpointStats.AvgVoiceIncomingUtilization)  / NULLIF(SUM(VoipGatewayEndpointStats.AvgChannelCount),0) ),0) AS AvgVoiceIncomingUtilization, 

ISNULL(100* (SUM(VoipGatewayEndpointStats.MinVoiceOutgoingUtilization)  / NULLIF(SUM(VoipGatewayEndpointStats.MinChannelCount),0) ),0) AS MinVoiceOutgoingUtilization, 
ISNULL(100* (SUM(VoipGatewayEndpointStats.MaxVoiceOutgoingUtilization)  / NULLIF(SUM(VoipGatewayEndpointStats.MaxChannelCount),0) ),0) AS MaxVoiceOutgoingUtilization, 
ISNULL(100* (SUM(VoipGatewayEndpointStats.AvgVoiceOutgoingUtilization)  / NULLIF(SUM(VoipGatewayEndpointStats.AvgChannelCount),0) ),0) AS AvgVoiceOutgoingUtilization, 

ISNULL(100* (SUM(VoipGatewayEndpointStats.MinDataIncomingUtilization)  / NULLIF(SUM(VoipGatewayEndpointStats.MinChannelCount),0) ),0) AS MinDataIncomingUtilization, 
ISNULL(100* (SUM(VoipGatewayEndpointStats.MaxDataIncomingUtilization)  / NULLIF(SUM(VoipGatewayEndpointStats.MaxChannelCount),0) ),0) AS MaxDataIncomingUtilization, 
ISNULL(100* (SUM(VoipGatewayEndpointStats.AvgDataIncomingUtilization)  / NULLIF(SUM(VoipGatewayEndpointStats.AvgChannelCount),0) ),0) AS AvgDataIncomingUtilization,  

ISNULL(100* (SUM(VoipGatewayEndpointStats.MinDataOutgoingUtilization)  / NULLIF(SUM(VoipGatewayEndpointStats.MinChannelCount),0) ),0) AS MinDataOutgoingUtilization,  
ISNULL(100* (SUM(VoipGatewayEndpointStats.MaxDataOutgoingUtilization)  / NULLIF(SUM(VoipGatewayEndpointStats.MaxChannelCount),0) ),0) AS MaxDataOutgoingUtilization,  
ISNULL(100* (SUM(VoipGatewayEndpointStats.AvgDataOutgoingUtilization)  / NULLIF(SUM(VoipGatewayEndpointStats.AvgChannelCount),0) ),0) AS AvgDataOutgoingUtilization,  

AVG(VoipGatewayEndpointStats.MinChannelCount) AS MinChannelCount, 
AVG(VoipGatewayEndpointStats.MaxChannelCount) AS MaxChannelCount, 
AVG(VoipGatewayEndpointStats.AvgChannelCount) AS AvgChannelCount

FROM            VoipGatewayEndpoints INNER JOIN
                VoipGatewayEndpointStats ON VoipGatewayEndpoints.VoipGatewayEndpointID = VoipGatewayEndpointStats.VoipGatewayEndpointID
GROUP BY VoipGatewayEndpoints.VoipGatewayID, VoipGatewayEndpointStats.RecordTimeUtc
```
