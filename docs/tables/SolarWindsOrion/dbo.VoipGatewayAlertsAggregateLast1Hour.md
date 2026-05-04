# View: `dbo.VoipGatewayAlertsAggregateLast1Hour`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipGatewayID` | int | YES |  |  |
| 2 | `NodeID` | int | YES |  |  |
| 3 | `Status` | int | YES |  |  |
| 4 | `StatusName` | nvarchar(50) | YES |  |  |
| 5 | `LastResultRecordTimeUtc` | datetime | YES |  |  |
| 6 | `DateTime` | datetime | YES |  |  |
| 7 | `LastResultRecordTime` | datetime | YES |  |  |
| 8 | `Caption` | nvarchar(255) | YES |  |  |
| 9 | `SysName` | nvarchar(255) | YES |  |  |
| 10 | `TrunkCount` | int | YES |  |  |
| 11 | `MinUtilization` | int | YES |  |  |
| 12 | `MaxUtilization` | int | YES |  |  |
| 13 | `AvgUtilization` | int | YES |  |  |
| 14 | `MinVoiceIncomingUtilization` | int | YES |  |  |
| 15 | `MaxVoiceIncomingUtilization` | int | YES |  |  |
| 16 | `AvgVoiceIncomingUtilization` | int | YES |  |  |
| 17 | `MinVoiceOutgoingUtilization` | int | YES |  |  |
| 18 | `MaxVoiceOutgoingUtilization` | int | YES |  |  |
| 19 | `AvgVoiceOutgoingUtilization` | int | YES |  |  |
| 20 | `MinDataIncomingUtilization` | int | YES |  |  |
| 21 | `MaxDataIncomingUtilization` | int | YES |  |  |
| 22 | `AvgDataIncomingUtilization` | int | YES |  |  |
| 23 | `MinDataOutgoingUtilization` | int | YES |  |  |
| 24 | `MaxDataOutgoingUtilization` | int | YES |  |  |
| 25 | `AvgDataOutgoingUtilization` | int | YES |  |  |
| 26 | `MinChannelCount` | int | YES |  |  |
| 27 | `MaxChannelCount` | int | YES |  |  |
| 28 | `AvgChannelCount` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VoipGatewayEndpointAlertsAggregateLast1Hour` | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[VoipGatewayAlertsAggregateLast1Hour] AS
	
SELECT VoipGatewayID,
       MIN(NodeID) as NodeID,
       MIN([Status]) as [Status],
       MIN(StatusName) as StatusName,
       MAX(LastResultRecordTimeUtc) as LastResultRecordTimeUtc,
       MAX([DateTime]) as [DateTime],
       MAX(LastResultRecordTime) as LastResultRecordTime,
       MIN(Caption) as Caption,
       MIN([SysName]) as [SysName],

	   COUNT(VoipGatewayEndpointID) as TrunkCount,

      MIN(MinUtilization) AS MinUtilization,
      MAX(MaxUtilization) AS MaxUtilization,
      AVG(AvgUtilization) AS AvgUtilization,
      MIN(MinVoiceIncomingUtilization) AS MinVoiceIncomingUtilization,
      MAX(MaxVoiceIncomingUtilization) AS MaxVoiceIncomingUtilization,
      AVG(AvgVoiceIncomingUtilization) AS AvgVoiceIncomingUtilization,
      MIN(MinVoiceOutgoingUtilization) AS MinVoiceOutgoingUtilization,
      MAX(MaxVoiceOutgoingUtilization) AS MaxVoiceOutgoingUtilization,
      AVG(AvgVoiceOutgoingUtilization) AS AvgVoiceOutgoingUtilization,
      MIN(MinDataIncomingUtilization) AS MinDataIncomingUtilization,
      MAX(MaxDataIncomingUtilization) AS MaxDataIncomingUtilization,
      AVG(AvgDataIncomingUtilization) AS AvgDataIncomingUtilization,
      MIN(MinDataOutgoingUtilization) AS MinDataOutgoingUtilization,
      MAX(MaxDataOutgoingUtilization) AS MaxDataOutgoingUtilization,
      AVG(AvgDataOutgoingUtilization) AS AvgDataOutgoingUtilization,
      MIN(MinChannelCount) AS MinChannelCount,
      MAX(MaxChannelCount) AS MaxChannelCount,
      AVG(AvgChannelCount) AS AvgChannelCount	  
	  
  FROM VoipGatewayEndpointAlertsAggregateLast1Hour
  GROUP BY VoipGatewayID
```
