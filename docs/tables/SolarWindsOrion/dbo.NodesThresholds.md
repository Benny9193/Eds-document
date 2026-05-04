# View: `dbo.NodesThresholds`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `EntityType` | nvarchar(150) | NO |  |  |
| 2 | `InstanceId` | int | NO |  |  |
| 3 | `Name` | nvarchar(150) | NO |  |  |
| 4 | `ThresholdType` | int | NO |  |  |
| 5 | `ThresholdOperator` | int | NO |  |  |
| 6 | `CurrentValue` | real | YES |  |  |
| 7 | `Level1Value` | float | YES |  |  |
| 8 | `Level1Formula` | nvarchar(max) | YES |  |  |
| 9 | `IsLevel1State` | int | YES |  |  |
| 10 | `Level2Value` | float | YES |  |  |
| 11 | `Level2Formula` | nvarchar(max) | YES |  |  |
| 12 | `IsLevel2State` | int | YES |  |  |
| 13 | `GlobalWarningValue` | real | YES |  |  |
| 14 | `GlobalCriticalValue` | real | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.Nodes`](dbo.Nodes.md) | VIEW |
| [`dbo.Settings`](dbo.Settings.md) | USER_TABLE |
| `dbo.sw_ThresholdsReached` | SQL_SCALAR_FUNCTION |
| [`dbo.Thresholds`](dbo.Thresholds.md) | USER_TABLE |
| [`dbo.ThresholdsLevelSettings`](dbo.ThresholdsLevelSettings.md) | USER_TABLE |
| [`dbo.ThresholdsNames`](dbo.ThresholdsNames.md) | USER_TABLE |

## Used by

| Object | Type |
|--------|------|
| [`dbo.NodesCpuLoadThreshold`](dbo.NodesCpuLoadThreshold.md) | VIEW |
| [`dbo.NodesForecastCapacity`](dbo.NodesForecastCapacity.md) | VIEW |
| [`dbo.NodesPercentLossThreshold`](dbo.NodesPercentLossThreshold.md) | VIEW |
| [`dbo.NodesPercentMemoryUsedThreshold`](dbo.NodesPercentMemoryUsedThreshold.md) | VIEW |
| [`dbo.NodesResponseTimeThreshold`](dbo.NodesResponseTimeThreshold.md) | VIEW |
| [`dbo.NodesThresholdsAlerts`](dbo.NodesThresholdsAlerts.md) | VIEW |

## Definition

```sql
CREATE VIEW [dbo].[NodesThresholds] AS
	SELECT 
		 EntityType
		,InstanceId
		,Name
		,ThresholdType
		,ThresholdOperator
		,CurrentValue
		,Level1Value
		,Level1Formula
		,[dbo].[sw_ThresholdsReached](CurrentValue, ThresholdOperator, Level1Value) AS IsLevel1State
		,Level2Value
		,Level2Formula
		,[dbo].[sw_ThresholdsReached](CurrentValue, ThresholdOperator, Level2Value) AS IsLevel2State
		,GlobalWarningValue
		,GlobalCriticalValue
	FROM
	(
		SELECT n.NodeID AS InstanceId, tn.EntityType, tn.Name 
			,ISNULL (t.ThresholdType, 0) AS ThresholdType
			,t.WarningFormula AS Level1Formula
			,t.CriticalFormula AS Level2Formula
			,ISNULL (t.Warning, ls.Level1Default) AS Level1Value
			,ISNULL (t.Critical, ls.Level2Default) AS Level2Value
			,ISNULL (t.ThresholdOperator, tn.DefaultThresholdOperator) AS ThresholdOperator
			,( CASE WHEN tn.Name IS NULL THEN 0
					WHEN tn.Name = N'Nodes.Stats.ResponseTime' THEN n.[AvgResponseTime]
					WHEN tn.Name = N'Nodes.Stats.CpuLoad' THEN n.[CPULoad]
					WHEN tn.Name = N'Nodes.Stats.PercentMemoryUsed' THEN n.[PercentMemoryUsed]
					WHEN tn.Name = N'Nodes.Stats.PercentLoss' THEN n.[PercentLoss]
					ELSE 0 END 
			 ) AS CurrentValue
			,ls.Level1Default as GlobalWarningValue
			,ls.Level2Default as GlobalCriticalValue
		FROM [dbo].[Nodes] AS n WITH (NOLOCK) 
		CROSS JOIN (SELECT Id, Name, EntityType, DefaultThresholdOperator FROM [dbo].[ThresholdsNames] 
			WHERE EntityType = N'Orion.Nodes') tn 
		CROSS APPLY (SELECT 
			ISNULL((SELECT TOP 1 sts.CurrentValue FROM [dbo].[ThresholdsLevelSettings] AS tls WITH (NOLOCK)
				INNER JOIN [dbo].[Settings] AS sts WITH (NOLOCK) ON sts.SettingID = tls.SettingID
				WHERE tls.ThresholdLevel=1 AND tls.EntityType=N'Orion.Nodes' AND tls.Name=tn.Name),0) Level1Default, 
			ISNULL((SELECT TOP 1 sts.CurrentValue FROM [dbo].[ThresholdsLevelSettings] AS tls WITH (NOLOCK)
				INNER JOIN [dbo].[Settings] AS sts WITH (NOLOCK) ON sts.SettingID = tls.SettingID
				WHERE tls.ThresholdLevel=2 AND tls.EntityType=N'Orion.Nodes' AND tls.Name=tn.Name),0) Level2Default
		) ls
		LEFT JOIN [dbo].[Thresholds] AS t ON t.InstanceId = n.NodeID AND t.ThresholdNameId = tn.Id
	) nt
	UNION ALL
	(
		SELECT tls.[EntityType], 0 as InstanceId, tls.[Name], 0 as ThresholdType, 0 as ThresholdOperator, 0 as CurrentValue, NULL as Level1Value, NULL as Level1Formula, 
		0 as IsLevel1State, NULL as Level2Value, NULL as Level2Formyla, 0 as IsLevel2State, MAX(stsW.[CurrentValue]) as GlobalWarningValue, MAX(stsC.[CurrentValue]) as GlobalCriticalValue from [dbo].[ThresholdsLevelSettings] tls
		left join [dbo].[Settings] stsW ON stsW.[SettingID] = rtrim(tls.[SettingID]) AND tls.[ThresholdLevel] = 1
		left join [dbo].[Settings] stsC ON stsC.[SettingID] = rtrim(tls.[SettingID]) AND tls.[ThresholdLevel] = 2
		WHERE tls.[EntityType] = N'Orion.Nodes'
		GROUP BY tls.[EntityType], tls.[Name]
	)
```
