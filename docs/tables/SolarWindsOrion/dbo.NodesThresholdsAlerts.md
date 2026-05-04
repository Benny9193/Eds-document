# View: `dbo.NodesThresholdsAlerts`

**Database:** `SolarWindsOrion` &nbsp;|&nbsp; **Schema:** `dbo`

Updatable: `NO`

[← back to database index](README.md) &nbsp;|&nbsp; [← back to top](../../../SCHEMA.md)

## Columns

| # | Column | Type | Nullable | Default | PK |
|---|--------|------|----------|---------|----|
| 1 | `NodeID` | int | NO |  |  |
| 2 | `CpuLoadWarningValue` | float | YES |  |  |
| 3 | `CpuLoadWarningIsReached` | bit | YES |  |  |
| 4 | `CpuLoadCriticalValue` | float | YES |  |  |
| 5 | `CpuLoadCriticalIsReached` | bit | YES |  |  |
| 6 | `PercentMemoryUsedWarningValue` | float | YES |  |  |
| 7 | `PercentMemoryUsedWarningIsReached` | bit | YES |  |  |
| 8 | `PercentMemoryUsedCriticalValue` | float | YES |  |  |
| 9 | `PercentMemoryUsedCriticalIsReached` | bit | YES |  |  |
| 10 | `ResponseTimeWarningValue` | float | YES |  |  |
| 11 | `ResponseTimeWarningIsReached` | bit | YES |  |  |
| 12 | `ResponseTimeCriticalValue` | float | YES |  |  |
| 13 | `ResponseTimeCriticalIsReached` | bit | YES |  |  |
| 14 | `PercentLossWarningValue` | float | YES |  |  |
| 15 | `PercentLossWarningIsReached` | bit | YES |  |  |
| 16 | `PercentLossCriticalValue` | float | YES |  |  |
| 17 | `PercentLossCriticalIsReached` | bit | YES |  |  |

## Depends on

| Object | Type |
|--------|------|
| [`dbo.NodesThresholds`](dbo.NodesThresholds.md) | VIEW |

## Used by

_No other objects reference this view._

## Definition

```sql
CREATE VIEW [dbo].[NodesThresholdsAlerts] AS
	SELECT 
		[InstanceId] AS NodeID,
			  max( case when [Name]='Nodes.Stats.CpuLoad'           then       Level1Value end )                   as CpuLoadWarningValue,
		CAST( max( case when [Name]='Nodes.Stats.CpuLoad'           then CAST( IsLevel1State as int) end ) as bit) as CpuLoadWarningIsReached,
			  max( case when [Name]='Nodes.Stats.CpuLoad'           then       Level2Value end )                   as CpuLoadCriticalValue,
		CAST( max( case when [Name]='Nodes.Stats.CpuLoad'           then CAST( IsLevel2State as int) end ) as bit) as CpuLoadCriticalIsReached,

			  max( case when [Name]='Nodes.Stats.PercentMemoryUsed' then       Level1Value end )                   as PercentMemoryUsedWarningValue,
		CAST( max( case when [Name]='Nodes.Stats.PercentMemoryUsed' then CAST( IsLevel1State as int) end ) as bit) as PercentMemoryUsedWarningIsReached,
			  max( case when [Name]='Nodes.Stats.PercentMemoryUsed' then       Level2Value end )                   as PercentMemoryUsedCriticalValue,
		CAST( max( case when [Name]='Nodes.Stats.PercentMemoryUsed' then CAST( IsLevel2State as int) end ) as bit) as PercentMemoryUsedCriticalIsReached,

			  max( case when [Name]='Nodes.Stats.ResponseTime'      then       Level1Value end )                   as ResponseTimeWarningValue,
		CAST( max( case when [Name]='Nodes.Stats.ResponseTime'      then CAST( IsLevel1State as int) end ) as bit) as ResponseTimeWarningIsReached,
			  max( case when [Name]='Nodes.Stats.ResponseTime'      then       Level2Value end )                   as ResponseTimeCriticalValue,
		CAST( max( case when [Name]='Nodes.Stats.ResponseTime'      then CAST( IsLevel2State as int) end ) as bit) as ResponseTimeCriticalIsReached,

			  max( case when [Name]='Nodes.Stats.PercentLoss'       then       Level1Value end )                   as PercentLossWarningValue,
		CAST( max( case when [Name]='Nodes.Stats.PercentLoss'       then CAST( IsLevel1State as int) end ) as bit) as PercentLossWarningIsReached,
			  max( case when [Name]='Nodes.Stats.PercentLoss'       then       Level2Value end )                   as PercentLossCriticalValue,
		CAST( max( case when [Name]='Nodes.Stats.PercentLoss'       then CAST( IsLevel2State as int) end ) as bit) as PercentLossCriticalIsReached

	FROM [dbo].[NodesThresholds] WITH (nolock)
	GROUP BY [InstanceId]
```
