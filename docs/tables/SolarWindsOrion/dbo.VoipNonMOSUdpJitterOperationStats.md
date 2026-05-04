# View: `dbo.VoipNonMOSUdpJitterOperationStats`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipOperationInstanceID` | int | YES |  |  |
| 2 | `VoipOperationTypeID` | smallint | YES |  |  |
| 3 | `MinRoundTripTime` | int | YES |  |  |
| 4 | `MaxRoundTripTime` | int | YES |  |  |
| 5 | `AvgRoundTripTime` | int | YES |  |  |
| 6 | `MinJitter` | float | YES |  |  |
| 7 | `MaxJitter` | float | YES |  |  |
| 8 | `AvgJitter` | float | YES |  |  |
| 9 | `MinLatency` | float | YES |  |  |
| 10 | `MaxLatency` | float | YES |  |  |
| 11 | `AvgLatency` | float | YES |  |  |
| 12 | `MaxPacketLoss` | float | YES |  |  |
| 13 | `MinPacketLoss` | float | YES |  |  |
| 14 | `AvgPacketLoss` | float | YES |  |  |
| 15 | `RecordTimeUtc` | datetime | NO |  |  |
| 16 | `Weight` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VoipOperationTypes` | USER_TABLE |
| [`dbo.VoipJitterOperationResults_Daily`](dbo.VoipJitterOperationResults_Daily.md) | USER_TABLE |
| [`dbo.VoipJitterOperationResults_Detail`](dbo.VoipJitterOperationResults_Detail.md) | USER_TABLE |
| [`dbo.VoipJitterOperationResults_Hourly`](dbo.VoipJitterOperationResults_Hourly.md) | USER_TABLE |
| [`dbo.VoipOperationInstances`](dbo.VoipOperationInstances.md) | USER_TABLE |
| [`dbo.VoipOperationResults_Daily`](dbo.VoipOperationResults_Daily.md) | USER_TABLE |
| [`dbo.VoipOperationResults_Detail`](dbo.VoipOperationResults_Detail.md) | USER_TABLE |
| [`dbo.VoipOperationResults_Hourly`](dbo.VoipOperationResults_Hourly.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[VoipNonMOSUdpJitterOperationStats]
AS
WITH [RequiredOperationTypes] ([VoipOperationTypeId])
AS(
	SELECT [VoipOperationTypes].[VoipOperationTypeID] 
			FROM [VoipOperationTypes]
			WHERE [VoipOperationTypes].[OperationType] IN('UDP Jitter')
)
SELECT [OperationInstances].[VoipOperationInstanceID]
	  ,[OperationInstances].[VoipOperationTypeID]	
	  ,[OperationResultDetail].[RoundTripTime] AS [MinRoundTripTime]
	  ,[OperationResultDetail].[RoundTripTime] AS [MaxRoundTripTime]
	  ,[OperationResultDetail].[RoundTripTime] AS [AvgRoundTripTime]
	  ,[JitterOperationResultDetail].[Jitter] AS [MinJitter]
	  ,[JitterOperationResultDetail].[Jitter] AS [MaxJitter]
	  ,[JitterOperationResultDetail].[Jitter] AS [AvgJitter]
	  ,[JitterOperationResultDetail].[Latency] AS [MinLatency]
	  ,[JitterOperationResultDetail].[Latency] AS [MaxLatency]
	  ,[JitterOperationResultDetail].[Latency] AS [AvgLatency]
	  ,[JitterOperationResultDetail].[PacketLoss] AS [MaxPacketLoss]
	  ,[JitterOperationResultDetail].[PacketLoss] AS [MinPacketLoss]
	  ,[JitterOperationResultDetail].[PacketLoss] AS [AvgPacketLoss]
	  ,[OperationResultDetail].[RecordTimeUtc]
	  ,[OperationInstances].Frequency AS [Weight]	
FROM [dbo].[VoipOperationResults_Detail] [OperationResultDetail]
LEFT JOIN [dbo].[VoipOperationInstances] [OperationInstances] 
	ON [OperationResultDetail].[VoipOperationInstanceID] = [OperationInstances].[VoipOperationInstanceID]
LEFT JOIN [dbo].[VoipJitterOperationResults_Detail] [JitterOperationResultDetail]
	ON [OperationResultDetail].[VoipOperationInstanceID] = [JitterOperationResultDetail].[VoipOperationInstanceID]
	AND [OperationResultDetail].[RecordTimeUtc] = [JitterOperationResultDetail].[RecordTimeUtc] 
	
WHERE [OperationInstances].[VoipOperationTypeID] IN (SELECT [RequiredOperationTypes].[VoipOperationTypeId] FROM [RequiredOperationTypes])

UNION ALL

SELECT [OperationInstances].[VoipOperationInstanceID]
	  ,[OperationInstances].[VoipOperationTypeID]
	  ,[OperationResultDetail].[MinRoundTripTime] AS [MinRoundTripTime]
	  ,[OperationResultDetail].[MaxRoundTripTime] AS [MaxRoundTripTime]
	  ,[OperationResultDetail].[AvgRoundTripTime] AS [AvgRoundTripTime]
	  ,[JitterOperationResultDetail].[MinJitter] AS [MinJitter]
	  ,[JitterOperationResultDetail].[MaxJitter] AS [MaxJitter]
	  ,[JitterOperationResultDetail].[AvgJitter] AS [AvgJitter]
	  ,[JitterOperationResultDetail].[MinLatency] AS [MinLatency]
	  ,[JitterOperationResultDetail].[MaxLatency] AS [MaxLatency]
	  ,[JitterOperationResultDetail].[AvgLatency] AS [AvgLatency]
	  ,[JitterOperationResultDetail].[MaxPacketLoss] AS [MaxPacketLoss]
	  ,[JitterOperationResultDetail].[MinPacketLoss] AS [MinPacketLoss]
	  ,[JitterOperationResultDetail].[AvgPacketLoss] AS [AvgPacketLoss]
	  ,[OperationResultDetail].[RecordTimeUtc]
	  ,3600 AS [Weight]	--1 hour in seconds
FROM [dbo].[VoipOperationResults_Hourly] [OperationResultDetail]
LEFT JOIN [dbo].[VoipOperationInstances] [OperationInstances] 
	ON [OperationResultDetail].[VoipOperationInstanceID] = [OperationInstances].[VoipOperationInstanceID]
LEFT JOIN [dbo].[VoipJitterOperationResults_Hourly] [JitterOperationResultDetail]
	ON [OperationResultDetail].[VoipOperationInstanceID] = [JitterOperationResultDetail].[VoipOperationInstanceID]
	AND [OperationResultDetail].[RecordTimeUtc] = [JitterOperationResultDetail].[RecordTimeUtc] 
	
WHERE [OperationInstances].[VoipOperationTypeID] IN (SELECT [RequiredOperationTypes].[VoipOperationTypeId] FROM [RequiredOperationTypes])

UNION ALL

SELECT [OperationInstances].[VoipOperationInstanceID]
	  ,[OperationInstances].[VoipOperationTypeID]
	  ,[OperationResultDetail].[MinRoundTripTime] AS [MinRoundTripTime]
	  ,[OperationResultDetail].[MaxRoundTripTime] AS [MaxRoundTripTime]
	  ,[OperationResultDetail].[AvgRoundTripTime] AS [AvgRoundTripTime]
	  ,[JitterOperationResultDetail].[MinJitter] AS [MinJitter]
	  ,[JitterOperationResultDetail].[MaxJitter] AS [MaxJitter]
	  ,[JitterOperationResultDetail].[AvgJitter] AS [AvgJitter]
	  ,[JitterOperationResultDetail].[MinLatency] AS [MinLatency]
	  ,[JitterOperationResultDetail].[MaxLatency] AS [MaxLatency]
	  ,[JitterOperationResultDetail].[AvgLatency] AS [AvgLatency]
	  ,[JitterOperationResultDetail].[MaxPacketLoss] AS [MaxPacketLoss]
	  ,[JitterOperationResultDetail].[MinPacketLoss] AS [MinPacketLoss]
	  ,[JitterOperationResultDetail].[AvgPacketLoss] AS [AvgPacketLoss]
	  ,[OperationResultDetail].[RecordTimeUtc]
	  ,86400 AS [Weight]	--1 day in seconds
FROM [dbo].[VoipOperationResults_Daily] [OperationResultDetail]
LEFT JOIN [dbo].[VoipOperationInstances] [OperationInstances] 
	ON [OperationResultDetail].[VoipOperationInstanceID] = [OperationInstances].[VoipOperationInstanceID]
LEFT JOIN [dbo].[VoipJitterOperationResults_Daily] [JitterOperationResultDetail]
	ON [OperationResultDetail].[VoipOperationInstanceID] = [JitterOperationResultDetail].[VoipOperationInstanceID]
	AND [OperationResultDetail].[RecordTimeUtc] = [JitterOperationResultDetail].[RecordTimeUtc] 
	
WHERE [OperationInstances].[VoipOperationTypeID] IN (SELECT [RequiredOperationTypes].[VoipOperationTypeId] FROM [RequiredOperationTypes])
```
