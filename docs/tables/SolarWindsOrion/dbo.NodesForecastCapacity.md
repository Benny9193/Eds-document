# View: `dbo.NodesForecastCapacity`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `InstanceId` | int | NO |  |  |
| 3 | `EntityType` | nvarchar(150) | NO |  |  |
| 4 | `MetricId` | int | NO |  |  |
| 5 | `MetricName` | nvarchar(150) | NO |  |  |
| 6 | `InstanceCaption` | nvarchar(255) | YES |  |  |
| 7 | `ThresholdType` | smallint | NO |  |  |
| 8 | `Timestamp` | datetime | NO |  |  |
| 9 | `MinDateTime` | datetime | NO |  |  |
| 10 | `MaxDateTime` | datetime | NO |  |  |
| 11 | `CurrentValue` | real | YES |  |  |
| 12 | `WarningThreshold` | float | YES |  |  |
| 13 | `CriticalThreshold` | float | YES |  |  |
| 14 | `CapacityThreshold` | int | YES |  |  |
| 15 | `Aavg` | real | YES |  |  |
| 16 | `Bavg` | real | YES |  |  |
| 17 | `APeak` | real | YES |  |  |
| 18 | `BPeak` | real | YES |  |  |
| 19 | `DaysToWarningAvg` | float | YES |  |  |
| 20 | `DaysToCriticalAvg` | float | YES |  |  |
| 21 | `DaysToCapacityAvg` | float | YES |  |  |
| 22 | `DaysToWarningPeak` | float | YES |  |  |
| 23 | `DaysToCriticalPeak` | float | YES |  |  |
| 24 | `DaysToCapacityPeak` | float | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| `ForecastCapacitySettings` | USER_TABLE |
| `dbo.CPULoad_ForecastCoefficients` | unresolved |
| [`dbo.ForecastMetrics`](dbo.ForecastMetrics.md) | USER_TABLE |
| [`dbo.Nodes`](dbo.Nodes.md) | VIEW |
| [`dbo.NodesThresholds`](dbo.NodesThresholds.md) | VIEW |
| [`dbo.Settings`](dbo.Settings.md) | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.NodesCpuLoadForecastCapacity`](dbo.NodesCpuLoadForecastCapacity.md) | VIEW |
| [`dbo.NodesPercentMemoryUsedForecastCapacity`](dbo.NodesPercentMemoryUsedForecastCapacity.md) | VIEW |

## Definition

```sql
CREATE VIEW [dbo].[NodesForecastCapacity] AS

SELECT 
		NodeID
		,InstanceId
		,EntityType
		,MetricId
		,MetricName
		,Caption as InstanceCaption
		,ThresholdType
		,[Timestamp]
		,MinDateTime
		,MaxDateTime
		,CurrentValue
		,WarningThreshold
		,CriticalThreshold
		,CapacityThreshold
		,Aavg
		,Bavg
		,APeak
		,BPeak
		,(CASE WHEN (WarningThreshold IS NULL OR Aavg IS NULL OR Bavg is NULL OR Bavg=0 ) THEN NULL 
			   WHEN (Bavg < 0 AND CurrentValue < WarningThreshold) THEN NULL
			   ELSE Floor(((WarningThreshold - Aavg)/Bavg - ndays)) END) AS DaysToWarningAvg
		,(CASE WHEN (CriticalThreshold IS NULL OR Aavg IS NULL OR Bavg is NULL OR Bavg=0 ) THEN NULL 
			   WHEN (Bavg < 0 AND CurrentValue < CriticalThreshold) THEN NULL
			   ELSE Floor(((CriticalThreshold - Aavg)/Bavg - ndays)) END) AS DaysToCriticalAvg
		,(CASE WHEN (CapacityThreshold IS NULL OR Aavg IS NULL OR Bavg is NULL OR Bavg=0 ) THEN NULL 
			   WHEN (Bavg < 0 AND CurrentValue <  CapacityThreshold) THEN NULL
			   ELSE Floor(((CapacityThreshold - Aavg)/Bavg - ndays)) END) AS DaysToCapacityAvg
		,(CASE WHEN (WarningThreshold IS NULL OR APeak IS NULL OR BPeak is NULL OR BPeak=0 ) THEN NULL 
			   WHEN (BPeak < 0 AND CurrentValue < WarningThreshold) THEN NULL
			   ELSE Floor(((WarningThreshold - APeak)/BPeak - ndays)) END) AS DaysToWarningPeak
		,(CASE WHEN (CriticalThreshold IS NULL OR APeak IS NULL OR BPeak is NULL OR BPeak=0) THEN NULL 
			   WHEN (BPeak < 0 AND CurrentValue < CriticalThreshold) THEN NULL
			   ELSE Floor(((CriticalThreshold - APeak)/BPeak - ndays)) END) AS DaysToCriticalPeak
		,(CASE WHEN (CapacityThreshold IS NULL OR APeak IS NULL OR BPeak is NULL OR BPeak=0) THEN NULL
			   WHEN (BPeak < 0 AND CurrentValue < CapacityThreshold) THEN NULL
			   ELSE Floor(((CapacityThreshold - APeak)/BPeak - ndays)) END) AS DaysToCapacityPeak
	FROM
	(
		SELECT cfc.NodeID
			   ,nt.[InstanceId]
			   ,fm.[EntityType] 
			   ,fm.[Id] AS MetricId
			   ,fm.[Name] AS MetricName
			   ,n.Caption
			   ,ISNULL (fm.[ThresholdType], 0) AS ThresholdType
			   ,cfc.[Timestamp] AS [Timestamp]
			   ,cfc.MinDateTime AS [MinDateTime]
			   ,cfc.MaxDateTime AS [MaxDateTime]
			   ,nt.[CurrentValue]
			   ,Floor(( CASE WHEN (fcs.[WarningThreshold] IS NOT NULL) THEN fcs.[WarningThreshold]
						WHEN (fm.[ThresholdType] IS NULL OR fm.[ThresholdType]=0) THEN ls.[GlobalWarningThreshold]
						WHEN fm.[ThresholdType]=1 THEN nt.[Level1Value]
						ELSE NULL END 
				)) AS WarningThreshold
				,Floor(( CASE WHEN (fcs.[CriticalThreshold] IS NOT NULL) THEN fcs.[CriticalThreshold]
						WHEN (fm.[ThresholdType] IS NULL OR fm.[ThresholdType]=0) THEN ls.[GlobalCriticalThreshold]
						WHEN fm.[ThresholdType]=1 THEN nt.[Level2Value]
						ELSE NULL END 
				)) AS CriticalThreshold				  
				, ISNULL(fcs.[CapacityThreshold], ls.[GlobalCapacityThreshold]) AS CapacityThreshold  
				,(CASE WHEN fm.[Name] = N'Forecast.Metric.CpuLoad' THEN cfc.[CPULoadAavg]
						 WHEN fm.[Name] = N'Forecast.Metric.PercentMemoryUsed' THEN cfc.[PercentMemoryUsedAavg]
						 ELSE NULL END) AS Aavg
				,(CASE WHEN fm.[Name] = N'Forecast.Metric.CpuLoad' THEN cfc.[CPULoadBavg]
						 WHEN fm.[Name] = N'Forecast.Metric.PercentMemoryUsed' THEN cfc.[PercentMemoryUsedBavg]
						 ELSE NULL END) AS Bavg
				,(CASE WHEN fm.[Name] = N'Forecast.Metric.CpuLoad' THEN cfc.[CPULoadApeak]
						 WHEN fm.[Name] = N'Forecast.Metric.PercentMemoryUsed' THEN cfc.[PercentMemoryUsedApeak]
						 ELSE NULL END) AS APeak
				,(CASE WHEN fm.[Name] = N'Forecast.Metric.CpuLoad' THEN cfc.[CPULoadBpeak]
						 WHEN fm.[Name] = N'Forecast.Metric.PercentMemoryUsed' THEN cfc.[PercentMemoryUsedBpeak]
						 ELSE NULL END) AS BPeak
				, (DATEDIFF(day, cfc.[Timestamp], CurrentTime)) AS ndays
		FROM [dbo].[CPULoad_ForecastCoefficients] AS cfc WITH (NOLOCK)
		CROSS JOIN (SELECT Id 
						   ,Name 
						   ,EntityType 
						   ,ThresholdType
						   ,GETUTCDATE() AS CurrentTime
						   ,(CASE WHEN [Name] = N'Forecast.Metric.CpuLoad' THEN N'Nodes.Stats.CpuLoad'
								  WHEN [Name] = N'Forecast.Metric.PercentMemoryUsed' THEN N'Nodes.Stats.PercentMemoryUsed'
								  ELSE NULL END) AS ThresholdName
					FROM [dbo].[ForecastMetrics] 
					WHERE (EntityType = N'Orion.Nodes' AND ([Name] = N'Forecast.Metric.CpuLoad' OR [Name] = N'Forecast.Metric.PercentMemoryUsed'))) fm 
		CROSS APPLY (SELECT 
			ISNULL((SELECT TOP 1 sts.CurrentValue FROM [dbo].[ForecastMetrics] AS fmm WITH (NOLOCK)
				INNER JOIN [dbo].[Settings] AS sts WITH (NOLOCK) ON sts.[SettingID] LIKE fmm.[CriticalThresholdSettingID]
				WHERE fmm.EntityType = N'Orion.Nodes'),0) GlobalCriticalThreshold,
			ISNULL((SELECT TOP 1 sts.CurrentValue FROM [dbo].[ForecastMetrics] AS fmm WITH (NOLOCK)
					INNER JOIN [dbo].[Settings] AS sts WITH (NOLOCK) ON sts.[SettingID] LIKE fmm.[WarningThresholdSettingID]
					WHERE fmm.EntityType = N'Orion.Nodes'),0) GlobalWarningThreshold,
			ISNULL((SELECT TOP 1 sts.CurrentValue FROM [dbo].[ForecastMetrics] AS fmm WITH (NOLOCK)
					INNER JOIN [dbo].[Settings] AS sts WITH (NOLOCK) ON sts.[SettingID] LIKE fmm.[CapacityThresholdSettingID]
					WHERE fmm.EntityType = N'Orion.Nodes'),100) GlobalCapacityThreshold
		)ls
		JOIN [dbo].[NodesThresholds] AS nt ON cfc.[NodeID] = nt.[InstanceId] AND fm.[ThresholdName]= nt.[Name]
		LEFT JOIN ForecastCapacitySettings AS fcs ON nt.[InstanceId] = fcs.[InstanceId] AND fcs.[MetricId] = fm.[Id]
		LEFT JOIN [dbo].[Nodes] AS n ON nt.[InstanceId] = n.[NodeID]		
		WHERE nt.[InstanceId]> 0
	) AS ForecastThresholds
```
