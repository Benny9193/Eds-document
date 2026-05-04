# View: `dbo.VolumesForecastCapacity`

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
| 6 | `InstanceCaption` | nvarchar(75) | YES |  |  |
| 7 | `ThresholdType` | smallint | NO |  |  |
| 8 | `Timestamp` | datetime | NO |  |  |
| 9 | `MinDateTime` | datetime | NO |  |  |
| 10 | `MaxDateTime` | datetime | NO |  |  |
| 11 | `CurrentValue` | real | YES |  |  |
| 12 | `WarningThreshold` | float | YES |  |  |
| 13 | `CriticalThreshold` | float | YES |  |  |
| 14 | `Capacitythreshold` | int | YES |  |  |
| 15 | `Aavg` | real | YES |  |  |
| 16 | `Bavg` | real | YES |  |  |
| 17 | `Apeak` | real | YES |  |  |
| 18 | `Bpeak` | real | YES |  |  |
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
| [`dbo.ForecastMetrics`](dbo.ForecastMetrics.md) | USER_TABLE |
| [`dbo.Settings`](dbo.Settings.md) | USER_TABLE |
| [`dbo.Volumes`](dbo.Volumes.md) | USER_TABLE |
| [`dbo.VolumeUsage_ForecastCoefficients`](dbo.VolumeUsage_ForecastCoefficients.md) | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.VolumesPercentDiskUsedForecastCapacity`](dbo.VolumesPercentDiskUsedForecastCapacity.md) | VIEW |

## Definition

```sql
CREATE VIEW [dbo].[VolumesForecastCapacity] AS

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
		,Capacitythreshold
		,Aavg
		,Bavg
		,Apeak
		,Bpeak
		,(CASE WHEN (WarningThreshold IS NULL OR Aavg IS NULL OR Bavg is NULL OR Bavg=0 ) THEN NULL 
			   WHEN (Bavg < 0 AND CurrentValue < WarningThreshold) THEN NULL
			   ELSE Floor(((WarningThreshold - Aavg)/Bavg - ndays)) END) AS DaysToWarningAvg
		,(CASE WHEN (CriticalThreshold IS NULL OR Aavg IS NULL OR Bavg is NULL OR Bavg=0 ) THEN NULL 
			   WHEN (Bavg < 0 AND CurrentValue < CriticalThreshold) THEN NULL
			   ELSE Floor(((CriticalThreshold - Aavg)/Bavg - ndays)) END) AS DaysToCriticalAvg
		,(CASE WHEN (Capacitythreshold IS NULL OR Aavg IS NULL OR Bavg is NULL OR Bavg=0 ) THEN NULL 
			   WHEN (Bavg < 0 AND CurrentValue <  Capacitythreshold) THEN NULL
			   ELSE Floor(((Capacitythreshold - Aavg)/Bavg - ndays)) END) AS DaysToCapacityAvg
		,(CASE WHEN (WarningThreshold IS NULL OR Apeak IS NULL OR Bpeak is NULL OR Bpeak=0 ) THEN NULL 
			   WHEN (Bpeak < 0 AND CurrentValue < WarningThreshold) THEN NULL
			   ELSE Floor(((WarningThreshold - Apeak)/Bpeak - ndays)) END) AS DaysToWarningPeak
		,(CASE WHEN (CriticalThreshold IS NULL OR Apeak IS NULL OR Bpeak is NULL OR Bpeak=0) THEN NULL 
			   WHEN (Bpeak < 0 AND CurrentValue < CriticalThreshold) THEN NULL
			   ELSE Floor(((CriticalThreshold - Apeak)/Bpeak - ndays)) END) AS DaysToCriticalPeak
		,(CASE WHEN (Capacitythreshold IS NULL OR Apeak IS NULL OR Bpeak is NULL OR Bpeak=0) THEN NULL
			   WHEN (Bpeak < 0 AND CurrentValue < Capacitythreshold) THEN NULL
			   ELSE Floor(((Capacitythreshold - Apeak)/Bpeak - ndays)) END) AS DaysToCapacityPeak
	FROM
	(
		SELECT cfc.NodeID
			   ,v.[VolumeID] AS InstanceId
			   ,v.Caption
			   ,fm.[EntityType] 
			   ,fm.[Id] AS MetricId
			   ,fm.[Name] AS MetricName
			   ,ISNULL (fm.[ThresholdType], 0) AS ThresholdType
			   ,cfc.[Timestamp] AS [Timestamp]
			   ,cfc.MinDateTime AS [MinDateTime]
			   ,cfc.MaxDateTime AS [MaxDateTime]
			   ,v.[VolumePercentUsed] AS CurrentValue
			   ,Floor(( CASE WHEN (fcs.[WarningThreshold] IS NOT NULL) THEN fcs.[WarningThreshold]
						WHEN (fm.[ThresholdType] IS NULL OR fm.[ThresholdType]=0) THEN ls.[GlobalWarningThreshold]
						ELSE NULL END 
				)) AS WarningThreshold
				,Floor(( CASE WHEN (fcs.[CriticalThreshold] IS NOT NULL) THEN fcs.[CriticalThreshold]
						WHEN (fm.[ThresholdType] IS NULL OR fm.[ThresholdType]=0) THEN ls.[GlobalCriticalThreshold]
						ELSE NULL END 
				)) AS CriticalThreshold				  
				, ISNULL(fcs.[CapacityThreshold], ls.[GlobalCapacityThreshold]) AS Capacitythreshold  
				,(CASE WHEN fm.[Name] = N'Forecast.Metric.PercentDiskUsed' THEN cfc.[PercentDiskUsedAavg]
						 ELSE NULL END) AS Aavg
				,(CASE WHEN fm.[Name] = N'Forecast.Metric.PercentDiskUsed' THEN cfc.[PercentDiskUsedBavg]
						 ELSE NULL END) AS Bavg
				,(CASE WHEN fm.[Name] = N'Forecast.Metric.PercentDiskUsed' THEN cfc.[PercentDiskUsedApeak]
						 ELSE NULL END) AS Apeak
				,(CASE WHEN fm.[Name] = N'Forecast.Metric.PercentDiskUsed' THEN cfc.[PercentDiskUsedBpeak]
						 ELSE NULL END) AS Bpeak
				,(DATEDIFF(day, cfc.[Timestamp], CurrentTime)) AS ndays
		FROM [dbo].[VolumeUsage_ForecastCoefficients] AS cfc WITH (NOLOCK)
		CROSS JOIN (SELECT Id 
						   ,Name 
						   ,EntityType 
						   ,ThresholdType
						   ,GETUTCDATE() AS CurrentTime
						   ,NULL AS ThresholdName
					FROM [dbo].[ForecastMetrics] 
					WHERE (EntityType = N'Orion.Volumes' AND [Name] = N'Forecast.Metric.PercentDiskUsed' )) fm 
		CROSS APPLY (SELECT 
			ISNULL((SELECT TOP 1 sts.CurrentValue FROM [dbo].[ForecastMetrics] AS fmm WITH (NOLOCK)
				INNER JOIN [dbo].[Settings] AS sts WITH (NOLOCK) ON sts.[SettingID] LIKE fmm.[CriticalThresholdSettingID]
				WHERE fmm.EntityType = N'Orion.Volumes'),0) GlobalCriticalThreshold,
			ISNULL((SELECT TOP 1 sts.CurrentValue FROM [dbo].[ForecastMetrics] AS fmm WITH (NOLOCK)
					INNER JOIN [dbo].[Settings] AS sts WITH (NOLOCK) ON sts.[SettingID] LIKE fmm.[WarningThresholdSettingID]
					WHERE fmm.EntityType = N'Orion.Volumes'),0) GlobalWarningThreshold,
			ISNULL((SELECT TOP 1 sts.CurrentValue FROM [dbo].[ForecastMetrics] AS fmm WITH (NOLOCK)
					INNER JOIN [dbo].[Settings] AS sts WITH (NOLOCK) ON sts.[SettingID] LIKE fmm.[CapacityThresholdSettingID]
					WHERE fmm.EntityType = N'Orion.Volumes'),100) GlobalCapacityThreshold
		)ls
		JOIN [dbo].[Volumes] AS v ON cfc.[VolumeID] = v.[VolumeID]
		LEFT JOIN ForecastCapacitySettings AS fcs ON v.[VolumeID] = fcs.[InstanceId] AND fcs.[MetricId] = fm.[Id]
	) AS ForecastThresholds
```
