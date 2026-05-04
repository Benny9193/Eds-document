# View: `dbo.VoipNonPathOperationStats`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `VoipOperationInstanceID` | int | YES |  |  |
| 2 | `MinRoundTripTime` | int | YES |  |  |
| 3 | `MaxRoundTripTime` | int | YES |  |  |
| 4 | `AvgRoundTripTime` | int | YES |  |  |
| 5 | `RecordTimeUtc` | datetime | NO |  |  |
| 6 | `Weight` | int | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `VoipOperationTypes` | USER_TABLE |
| [`dbo.VoipOperationInstances`](dbo.VoipOperationInstances.md) | USER_TABLE |
| [`dbo.VoipOperationResults_Daily`](dbo.VoipOperationResults_Daily.md) | USER_TABLE |
| [`dbo.VoipOperationResults_Detail`](dbo.VoipOperationResults_Detail.md) | USER_TABLE |
| [`dbo.VoipOperationResults_Hourly`](dbo.VoipOperationResults_Hourly.md) | USER_TABLE |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[VoipNonPathOperationStats]
AS
	WITH [RequiredOperationTypes] ([VoipOperationTypeId])
	AS(
		SELECT [VoipOperationTypes].[VoipOperationTypeID] 
			 FROM [VoipOperationTypes]
			 WHERE [VoipOperationTypes].[OperationType] IN('DHCP', 'DNS', 'HTTP', 'FTP','TCP Connect', 'UDP Echo', 'ICMP Echo', 'ICMP Path Echo')
	)


	SELECT [OperationInstances].[VoipOperationInstanceID]
		  ,[OperationResultDetail].[RoundTripTime] AS [MinRoundTripTime]
		  ,[OperationResultDetail].[RoundTripTime] AS [MaxRoundTripTime]
		  ,[OperationResultDetail].[RoundTripTime] AS [AvgRoundTripTime]
		  ,[OperationResultDetail].[RecordTimeUtc]
		  ,[OperationInstances].Frequency AS [Weight]	
	FROM [dbo].[VoipOperationResults_Detail] [OperationResultDetail]
	LEFT JOIN [dbo].[VoipOperationInstances] [OperationInstances] ON [OperationResultDetail].[VoipOperationInstanceID] = [OperationInstances].[VoipOperationInstanceID]
	WHERE [OperationInstances].[VoipOperationTypeID] IN (SELECT [RequiredOperationTypes].[VoipOperationTypeId] FROM [RequiredOperationTypes])

	UNION ALL

	SELECT [OperationResultsHourly].[VoipOperationInstanceID]
		  ,[OperationResultsHourly].[MinRoundTripTime] AS [MinRoundTripTime]
		  ,[OperationResultsHourly].[MaxRoundTripTime] AS [MaxRoundTripTime]
		  ,[OperationResultsHourly].[AvgRoundTripTime] AS [AvgRoundTripTime]
		  ,[OperationResultsHourly].[RecordTimeUtc]
		  ,3600 AS [Weight] -- 1 hour in seconds
	FROM [dbo].[VoipOperationResults_Hourly] [OperationResultsHourly]
	LEFT JOIN [dbo].[VoipOperationInstances] [OperationInstances] ON [OperationResultsHourly].[VoipOperationInstanceID] = [OperationInstances].[VoipOperationInstanceID]
	WHERE [OperationInstances].[VoipOperationTypeID] IN (SELECT [RequiredOperationTypes].[VoipOperationTypeId] FROM [RequiredOperationTypes])

	UNION ALL

	SELECT [OperationResultsDaily].[VoipOperationInstanceID]
		  ,[OperationResultsDaily].[MinRoundTripTime] AS [MinRoundTripTime]
		  ,[OperationResultsDaily].[MaxRoundTripTime] AS [MaxRoundTripTime]
		  ,[OperationResultsDaily].[AvgRoundTripTime] AS [AvgRoundTripTime]
		  ,[OperationResultsDaily].[RecordTimeUtc]
		  ,86400 AS [Weight] -- 1 day in seconds -- 1 hour in seconds
	FROM [dbo].[VoipOperationResults_Daily] [OperationResultsDaily]
	LEFT JOIN [dbo].[VoipOperationInstances] [OperationInstances] ON [OperationResultsDaily].[VoipOperationInstanceID] = [OperationInstances].[VoipOperationInstanceID]
	WHERE [OperationInstances].[VoipOperationTypeID] IN (SELECT [RequiredOperationTypes].[VoipOperationTypeId] FROM [RequiredOperationTypes])
```
