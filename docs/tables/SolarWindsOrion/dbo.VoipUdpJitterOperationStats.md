# View: `dbo.VoipUdpJitterOperationStats`

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
| 6 | `MinMOS` | float | YES |  |  |
| 7 | `MaxMOS` | float | YES |  |  |
| 8 | `AvgMOS` | float | YES |  |  |
| 9 | `MinJitter` | float | YES |  |  |
| 10 | `MaxJitter` | float | YES |  |  |
| 11 | `AvgJitter` | float | YES |  |  |
| 12 | `MinLatency` | float | YES |  |  |
| 13 | `MaxLatency` | float | YES |  |  |
| 14 | `AvgLatency` | float | YES |  |  |
| 15 | `MaxPacketLoss` | float | YES |  |  |
| 16 | `MinPacketLoss` | float | YES |  |  |
| 17 | `AvgPacketLoss` | float | YES |  |  |
| 18 | `RecordTimeUtc` | datetime | NO |  |  |
| 19 | `Weight` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VoipOperationTypes` | USER_TABLE |
| [`dbo.VoipJitterOperationResults_Daily`](dbo.VoipJitterOperationResults_Daily.md) | USER_TABLE |
| [`dbo.VoipJitterOperationResults_Detail`](dbo.VoipJitterOperationResults_Detail.md) | USER_TABLE |
| [`dbo.VoipJitterOperationResults_Hourly`](dbo.VoipJitterOperationResults_Hourly.md) | USER_TABLE |
| [`dbo.VoipMosOperationResults_Daily`](dbo.VoipMosOperationResults_Daily.md) | USER_TABLE |
| [`dbo.VoipMosOperationResults_Detail`](dbo.VoipMosOperationResults_Detail.md) | USER_TABLE |
| [`dbo.VoipMosOperationResults_Hourly`](dbo.VoipMosOperationResults_Hourly.md) | USER_TABLE |
| [`dbo.VoipOperationInstances`](dbo.VoipOperationInstances.md) | USER_TABLE |
| [`dbo.VoipOperationResults_Daily`](dbo.VoipOperationResults_Daily.md) | USER_TABLE |
| [`dbo.VoipOperationResults_Detail`](dbo.VoipOperationResults_Detail.md) | USER_TABLE |
| [`dbo.VoipOperationResults_Hourly`](dbo.VoipOperationResults_Hourly.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[VoipUdpJitterOperationStats]
AS
WITH [RequiredOperationTypes] ([VoipOperationTypeId])
AS(
	SELECT [VoipOperationTypes].[VoipOperationTypeID] 
			FROM [VoipOperationTypes]
			WHERE [VoipOperationTypes].[OperationType] IN('VoIP UDP Jitter')
)
SELECT [OperationInstances].[VoipOperationInstanceID]
	  ,[OperationInstances].[VoipOperationTypeID]	
	  ,[OperationResultDetail].[RoundTripTime] AS [MinRoundTripTime]
	  ,[OperationResultDetail].[RoundTripTime] AS [MaxRoundTripTime]
	  ,[OperationResultDetail].[RoundTripTime] AS [AvgRoundTripTime]
	  ,[MosOperationResults].[MOS] AS [MinMOS]
	  ,[MosOperationResults].[MOS] AS [MaxMOS]
	  ,[MosOperationResults].[MOS] AS [AvgMOS]
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
LEFT JOIN [dbo].[VoipMosOperationResults_Detail] [MosOperationResults]
	ON [OperationResultDetail].[VoipOperationInstanceID] = [MosOperationResults].[VoipOperationInstanceID] 
	AND [OperationResultDetail].[RecordTimeUtc] = [MosOperationResults].[RecordTimeUtc]
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
	  ,[MosOperationResults].[MinMOS] AS [MinMOS]
	  ,[MosOperationResults].[MaxMOS] AS [MaxMOS]
	  ,[MosOperationResults].[AvgMOS] AS [AvgMOS]
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
LEFT JOIN [dbo].[VoipMosOperationResults_Hourly] [MosOperationResults]
	ON [OperationResultDetail].[VoipOperationInstanceID] = [MosOperationResults].[VoipOperationInstanceID] 
	AND [OperationResultDetail].[RecordTimeUtc] = [MosOperationResults].[RecordTimeUtc]
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
	  ,[MosOperationResults].[MinMOS] AS [MinMOS]
	  ,[MosOperationResults].[MaxMOS] AS [MaxMOS]
	  ,[MosOperationResults].[AvgMOS] AS [AvgMOS]
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
LEFT JOIN [dbo].[VoipMosOperationResults_Daily] [MosOperationResults]
	ON [OperationResultDetail].[VoipOperationInstanceID] = [MosOperationResults].[VoipOperationInstanceID] 
	AND [OperationResultDetail].[RecordTimeUtc] = [MosOperationResults].[RecordTimeUtc]
LEFT JOIN [dbo].[VoipJitterOperationResults_Daily] [JitterOperationResultDetail]
	ON [OperationResultDetail].[VoipOperationInstanceID] = [JitterOperationResultDetail].[VoipOperationInstanceID]
	AND [OperationResultDetail].[RecordTimeUtc] = [JitterOperationResultDetail].[RecordTimeUtc] 
	
WHERE [OperationInstances].[VoipOperationTypeID] IN (SELECT [RequiredOperationTypes].[VoipOperationTypeId] FROM [RequiredOperationTypes])
```
